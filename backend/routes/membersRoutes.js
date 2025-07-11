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

const fileFilter = (req, file, cb) => {
  // Accept image files only
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Configure upload middleware
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB max file size
});

// @route   GET api/members
// @desc    Get all members (with filtering and pagination)
// @access  Private/Admin
router.get('/', protect, isAdmin, async (req, res) => {
  try {
    const { 
      search = '', 
      status = '', 
      branch = '', 
      year = '', 
      page = 1, 
      limit = 10 
    } = req.query;
    
    // Build query
    const query = {};
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (status) {
      query.isVerified = status === 'verified';
    }
    
    if (branch) {
      query.branch = branch;
    }
    
    if (year) {
      query.year = year;
    }
    
    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const members = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);
    
    const total = await User.countDocuments(query);
    
    res.json({
      success: true,
      members,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (err) {
    console.error('Error fetching members:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET api/members/:id
// @desc    Get member by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const member = await User.findById(req.params.id).select('-password');
    
    if (!member) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }
    
    // Only allow access to own profile unless admin
    if (req.params.id !== req.user.id.toString() && req.user.role !== 'admin' && req.user.role !== 'superadmin') {
      return res.status(403).json({ success: false, message: 'Not authorized to access this profile' });
    }
    
    res.json({ success: true, member });
  } catch (err) {
    console.error('Error fetching member:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   PUT api/members/:id
// @desc    Update member profile
// @access  Private
router.put('/:id', protect, upload.single('profilePhoto'), async (req, res) => {
  try {
    // Only allow updating own profile unless admin
    if (req.params.id !== req.user.id.toString() && req.user.role !== 'admin' && req.user.role !== 'superadmin') {
      return res.status(403).json({ success: false, message: 'Not authorized to update this profile' });
    }
    
    const updateData = { ...req.body };
    
    // If profile photo was uploaded
    if (req.file) {
      updateData.profilePhoto = `/uploads/profiles/${req.file.filename}`;
    }

    // Don't allow role changes through this route
    delete updateData.role;
    
    // Don't update password through this route
    delete updateData.password;
    
    const member = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    ).select('-password');
    
    if (!member) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }
    
    res.json({ success: true, member });
  } catch (err) {
    console.error('Error updating member:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   DELETE api/members/:id
// @desc    Delete member
// @access  Private/Admin
router.delete('/:id', protect, isAdmin, async (req, res) => {
  try {
    const member = await User.findById(req.params.id);
    
    if (!member) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }
    
    await member.deleteOne();
    
    res.json({ success: true, message: 'Member removed' });
  } catch (err) {
    console.error('Error deleting member:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET api/members/export/:format
// @desc    Export members data (CSV/Excel)
// @access  Private/Admin
router.get('/export/:format', protect, isAdmin, async (req, res) => {
  try {
    const format = req.params.format.toLowerCase();
    
    if (format !== 'csv' && format !== 'excel') {
      return res.status(400).json({ success: false, message: 'Invalid export format' });
    }
    
    const members = await User.find().select('-password -__v');
    
    if (format === 'csv') {
      // CSV export logic
      const json2csv = require('json2csv');
      const fields = ['name', 'email', 'college', 'branch', 'year', 'mobile', 'studentId', 'isVerified', 'createdAt'];
      const csv = json2csv.parse(members, { fields });
      
      res.header('Content-Type', 'text/csv');
      res.attachment('ieee_members.csv');
      return res.send(csv);
    } else {
      // Excel export logic
      const excel = require('exceljs');
      const workbook = new excel.Workbook();
      const worksheet = workbook.addWorksheet('Members');
      
      worksheet.columns = [
        { header: 'Name', key: 'name', width: 30 },
        { header: 'Email', key: 'email', width: 30 },
        { header: 'College', key: 'college', width: 30 },
        { header: 'Branch', key: 'branch', width: 20 },
        { header: 'Year', key: 'year', width: 10 },
        { header: 'Mobile', key: 'mobile', width: 15 },
        { header: 'Student ID', key: 'studentId', width: 15 },
        { header: 'Verified', key: 'isVerified', width: 10 },
        { header: 'Join Date', key: 'createdAt', width: 20 }
      ];
      
      members.forEach(member => {
        worksheet.addRow({
          ...member.toObject(),
          createdAt: member.createdAt.toLocaleDateString()
        });
      });
      
      res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.attachment('ieee_members.xlsx');
      return workbook.xlsx.write(res).then(() => {
        res.end();
      });
    }
  } catch (err) {
    console.error('Error exporting members:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET api/members/profile
// @desc    Get current user's profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    res.json({ success: true, user });
  } catch (error) {
    console.error('Error getting profile:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   PUT api/members/profile
// @desc    Update current user's profile
// @access  Private
router.put('/profile', protect, upload.single('profilePhoto'), async (req, res) => {
  try {
    const updateData = { ...req.body };
    
    // If profile photo was uploaded
    if (req.file) {
      updateData.profilePhoto = `/uploads/profiles/${req.file.filename}`;
      
      // If user already has a profile photo, remove the old one
      const currentUser = await User.findById(req.user._id);
      if (currentUser.profilePhoto && !currentUser.profilePhoto.includes('default') && fs.existsSync(path.join(__dirname, '..', currentUser.profilePhoto))) {
        fs.unlinkSync(path.join(__dirname, '..', currentUser.profilePhoto));
      }
    }
    
    // Don't allow updating sensitive fields
    delete updateData.email;
    delete updateData.password;
    delete updateData.role;
    delete updateData._id;
    
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updateData },
      { new: true }
    ).select('-password');
    
    res.json({ success: true, message: 'Profile updated successfully', user });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
