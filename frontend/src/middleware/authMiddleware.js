import jwt from 'jsonwebtoken';
import User from '@/models/User';

// Generate JWT token
export const generateToken = (id) => {
  const jwtSecret = process.env.JWT_SECRET || 'secretkey';
  if (!process.env.JWT_SECRET) {
    console.warn('WARNING: Using default JWT secret. Set JWT_SECRET environment variable in production.');
  }
  
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: '30d'
  });
};

// Auth middleware for API routes
export const authMiddleware = async (req) => {
  let token;
  
  // Get token from Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } 
  // Check for token in cookies as fallback
  else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return { 
      success: false, 
      status: 401, 
      message: 'Authentication required. Please log in.' 
    };
  }

  try {
    // Get JWT secret with fallback for development
    const jwtSecret = process.env.JWT_SECRET || 'secretkey';
    
    // Verify token
    const decoded = jwt.verify(token, jwtSecret);
    
    // Get user from database
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return {
        success: false,
        status: 401,
        message: 'User account not found or deactivated'
      };
    }

    // Return the user
    return { success: true, user };
  } catch (error) {
    console.error('Auth middleware error:', error);
    
    // Different error messages based on error type
    if (error.name === 'JsonWebTokenError') {
      return { 
        success: false, 
        status: 401, 
        message: 'Invalid token. Please log in again.' 
      };
    } else if (error.name === 'TokenExpiredError') {
      return { 
        success: false, 
        status: 401, 
        message: 'Your session has expired. Please log in again.' 
      };
    }
    
    return { 
      success: false, 
      status: 401, 
      message: 'Authentication failed. Please log in again.' 
    };
  }
};
