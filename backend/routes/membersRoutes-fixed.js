const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect, isAdmin } = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Setup storage for profile photo uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../uploads/profiles');
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'profile-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter to only allow image files
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|gif/;
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedFileTypes.test(file.mimetype);
  
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Error: Only image files are allowed!'));
  }
};

// Configure upload middleware
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB max file size
});

// @route   GET api/members
// @desc    Get all members
// @access  Private (Admin only)
router.get('/', protect, isAdmin, async (req, res) => {
  try {
    // Get query parameters
    const { page = 1, limit = 10, search = '', role, verified } = req.query;
    
    // Build query
    let query = {};
    
    // Search by name or email
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { college: { $regex: search, $options: 'i' } },
      ];
    }
    
    // Filter by role
    if (role) {
      query.role = role;
    }
    
    // Filter by verification status
    if (verified === 'true') {
      query.isVerified = true;
    } else if (verified === 'false') {
      query.isVerified = false;
    }
    
    // Calculate pagination
    const startIndex = (Number(page) - 1) * Number(limit);
    
    // Get members with pagination
    const members = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip(startIndex);
      
    // Get total count
    const total = await User.countDocuments(query);
    
    res.json({
      members,
      currentPage: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      totalMembers: total
    });
  } catch (error) {
    console.error('Get members error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET api/members/profile
// @desc    Get current user profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT api/members/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, upload.single('profilePhoto'), async (req, res) => {
  try {
    const { name, college, branch, year, mobile } = req.body;
    
    // Build profile object
    const profileFields = {};
    if (name) profileFields.name = name;
    if (college) profileFields.college = college;
    if (branch) profileFields.branch = branch;
    if (year) profileFields.year = year;
    if (mobile) profileFields.mobile = mobile;
    
    // Add profile photo if uploaded
    if (req.file) {
      profileFields.profilePhoto = '/uploads/profiles/' + req.file.filename;
    }
    
    // Update user
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: profileFields },
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      user,
      message: 'Profile updated successfully'
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Export module
module.exports = router;
