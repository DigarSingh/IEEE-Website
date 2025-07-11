const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  console.log('Register endpoint called');
  try {
    const { name, email, password, college, branch, year, mobile, studentId } = req.body;
    console.log('Registration data received:', { 
      name, 
      email, 
      college, 
      branch, 
      year, 
      mobile, 
      studentId, 
      passwordProvided: !!password 
    });
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'password', 'college', 'branch', 'year', 'mobile', 'studentId'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      console.log('Missing required fields:', missingFields);
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log('User already exists:', email);
      return res.status(400).json({ 
        success: false, 
        message: 'User with this email already exists' 
      });
    }

    // Check if student ID already exists
    const studentIdExists = await User.findOne({ studentId });
    if (studentIdExists) {
      console.log('Student ID already exists:', studentId);
      return res.status(400).json({
        success: false,
        message: 'User with this Student ID already exists'
      });
    }

    // Create user
    console.log('Creating new user...');
    const user = await User.create({
      name,
      email,
      password,
      college,
      branch,
      year,
      mobile,
      studentId
    });
    console.log('User created successfully:', user._id);

    // Generate token using JWT_SECRET from environment variables or fallback
    const jwtSecret = process.env.JWT_SECRET || 'secretkey';
    if (!process.env.JWT_SECRET) {
      console.warn('WARNING: Using default JWT secret. Set JWT_SECRET environment variable in production.');
    }
    
    const token = generateToken(user._id);

    // Send response
    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        college: user.college,
        role: user.role,
        isVerified: user.isVerified
      },
      message: 'Registration successful'
    });
  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    
    // Handle duplicate key error
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({
        success: false,
        message: `${field} already exists. Please use a different value.`
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error during registration',
      error: error.message
    });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    console.log('Login endpoint called');
    const { email, password } = req.body;
    
    // Validate inputs
    if (!email || !password) {
      console.log('Missing email or password');
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    console.log('Looking up user by email:', email);
    
    // Check for user email
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found:', email);
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    console.log('User found, checking password');
    
    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log('Password does not match');
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    console.log('Password matched, generating token');
    
    // Generate token using JWT_SECRET from environment variables or fallback
    const jwtSecret = process.env.JWT_SECRET || 'secretkey';
    if (!process.env.JWT_SECRET) {
      console.warn('WARNING: Using default JWT secret. Set JWT_SECRET environment variable in production.');
    }
    
    const token = generateToken(user._id);
    console.log('Token generated successfully');

    // Send response
    console.log('Login successful for user:', user.email);
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        college: user.college,
        role: user.role,
        isVerified: user.isVerified,
        studentId: user.studentId
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred during login. Please try again.'
    });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
