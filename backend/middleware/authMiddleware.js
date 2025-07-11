const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes
exports.protect = async (req, res, next) => {
  let token;
  console.log('Auth middleware called');
  console.log('Headers:', req.headers);

  // Check for Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    console.log('Found Bearer token in header');
    token = req.headers.authorization.split(' ')[1];
  } 
  // Check for token in cookies as fallback
  else if (req.cookies && req.cookies.token) {
    console.log('Found token in cookies');
    token = req.cookies.token;
  }

  console.log('Token exists:', !!token);

  // Check if token exists
  if (!token) {
    console.log('No token found in request');
    return res.status(401).json({ 
      success: false, 
      message: 'Authentication required. Please log in.' 
    });
  }

  try {
    // Get JWT secret with fallback for development
    const jwtSecret = process.env.JWT_SECRET || 'secretkey';
    if (!process.env.JWT_SECRET) {
      console.warn('WARNING: Using default JWT secret. Set JWT_SECRET environment variable in production.');
    }
    
    // Verify token
    console.log('Verifying token');
    const decoded = jwt.verify(token, jwtSecret);
    console.log('Token verified, user ID:', decoded.id);

    // Get user from the token
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      console.log('User not found in database');
      return res.status(401).json({
        success: false,
        message: 'User account not found or deactivated'
      });
    }

    console.log('User authenticated successfully:', user.email);
    // Add user to request
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    
    // Different error messages based on error type
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid token. Please log in again.' 
      });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false, 
        message: 'Your session has expired. Please log in again.' 
      });
    }
    
    return res.status(401).json({ 
      success: false, 
      message: 'Authentication failed. Please log in again.' 
    });
  }
};

// Admin only middleware
exports.isAdmin = (req, res, next) => {
  if (req.user && (req.user.role === 'admin' || req.user.role === 'superadmin')) {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: 'Admin access required for this route'
    });
  }
};

// Superadmin only middleware
exports.isSuperAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'superadmin') {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: 'Superadmin access required for this route'
    });
  }
};

// Check if user is verified middleware
exports.isVerified = (req, res, next) => {
  if (req.user && req.user.isVerified) {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: 'Account verification required for this route'
    });
  }
};

// For backwards compatibility
exports.authorize = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ 
        success: false, 
        message: `User role ${req.user.role} is not authorized to access this route` 
      });
    }
    next();
  };
};
