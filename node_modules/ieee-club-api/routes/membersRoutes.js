const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// @route   GET api/members
// @desc    Get all members
// @access  Private (Admin only)
router.get('/', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin' && req.user.role !== 'moderator') {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    // Get query parameters for filtering
    const { status, department, yearOfStudy, limit = 10, page = 1 } = req.query;
    
    // Build query
    let query = {};
    
    if (status) {
      query.membershipStatus = status;
    }
    
    if (department) {
      query.department = department;
    }
    
    if (yearOfStudy) {
      query.yearOfStudy = yearOfStudy;
    }
    
    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const members = await User.find(query)
      .select('-password')
      .sort({ firstName: 1 })
      .limit(parseInt(limit))
      .skip(skip);
    
    const total = await User.countDocuments(query);
    
    res.json({
      members,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/members/:id
// @desc    Get member by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const member = await User.findById(req.params.id).select('-password');
    
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    
    // Only allow access to own profile unless admin or moderator
    if (req.params.id !== req.user.id && req.user.role !== 'admin' && req.user.role !== 'moderator') {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    res.json(member);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   PUT api/members/:id
// @desc    Update member
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    // Only allow updating own profile unless admin
    if (req.params.id !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    const member = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).select('-password');
    
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    
    res.json(member);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   PUT api/members/:id/status
// @desc    Update membership status
// @access  Private (Admin only)
router.put('/:id/status', auth, async (req, res) => {
  const { membershipStatus, membershipExpiry } = req.body;
  
  // Check if user is admin
  if (req.user.role !== 'admin') {
    return res.status(401).json({ message: 'Not authorized' });
  }
  
  try {
    const member = await User.findByIdAndUpdate(
      req.params.id,
      { 
        $set: { 
          membershipStatus,
          membershipExpiry: membershipExpiry || undefined
        } 
      },
      { new: true }
    ).select('-password');
    
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    
    res.json(member);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/members/:id
// @desc    Delete member
// @access  Private (Admin only or own account)
router.delete('/:id', auth, async (req, res) => {
  try {
    // Only allow deleting own account or if admin
    if (req.params.id !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    await User.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Member removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;
