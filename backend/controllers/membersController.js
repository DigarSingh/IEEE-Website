const User = require('../models/User');
const Certificate = require('../models/Certificate');
const fs = require('fs');
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);
const path = require('path');
const { Parser } = require('json2csv');
const ExcelJS = require('exceljs');

// @desc    Get all members
// @route   GET /api/members
// @access  Admin
exports.getAllMembers = async (req, res) => {
  try {
    const members = await User.find({ role: 'student' }).select('-password');

    res.status(200).json({
      success: true,
      count: members.length,
      members
    });
  } catch (error) {
    console.error('Get members error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching members',
      error: error.message
    });
  }
};

// @desc    Get member by ID
// @route   GET /api/members/:id
// @access  Admin or Owner
exports.getMemberById = async (req, res) => {
  try {
    const member = await User.findById(req.params.id)
      .select('-password')
      .populate('registeredEvents', 'title date location status')
      .populate('certificates');

    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Member not found'
      });
    }

    // Check if user is owner or admin
    if (member._id.toString() !== req.user.id && req.user.role !== 'admin' && req.user.role !== 'superadmin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this profile'
      });
    }

    res.status(200).json({
      success: true,
      member
    });
  } catch (error) {
    console.error('Get member error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching member',
      error: error.message
    });
  }
};

// @desc    Update member
// @route   PUT /api/members/:id
// @access  Admin or Owner
exports.updateMember = async (req, res) => {
  try {
    const member = await User.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Member not found'
      });
    }

    // Check if user is owner or admin
    if (member._id.toString() !== req.user.id && req.user.role !== 'admin' && req.user.role !== 'superadmin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this profile'
      });
    }

    // Fields that can be updated
    const { name, mobile, college, branch, year, ieeeId } = req.body;
    const updateFields = {};

    if (name) updateFields.name = name;
    if (mobile) updateFields.mobile = mobile;
    if (college) updateFields.college = college;
    if (branch) updateFields.branch = branch;
    if (year) updateFields.year = year;
    if (ieeeId) updateFields.ieeeId = ieeeId;

    // Handle profile photo upload if present
    if (req.file) {
      // Delete old photo if it exists and is not the default
      if (member.profilePhoto && member.profilePhoto !== 'default-profile.jpg') {
        const oldPhotoPath = path.join(__dirname, '..', 'uploads', 'profiles', path.basename(member.profilePhoto));
        try {
          await unlinkAsync(oldPhotoPath);
        } catch (err) {
          console.error('Failed to delete old profile photo:', err);
        }
      }
      updateFields.profilePhoto = req.file.filename;
    }

    // Only admins can update role
    if (req.user.role === 'admin' || req.user.role === 'superadmin') {
      if (req.body.role) {
        // superadmin can change any role, admin can only promote to student
        if (req.user.role === 'superadmin' || req.body.role === 'student') {
          updateFields.role = req.body.role;
        }
      }

      if (req.body.isVerified !== undefined) {
        updateFields.isVerified = req.body.isVerified;
      }
    }

    const updatedMember = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true, runValidators: true }
    ).select('-password');

    res.status(200).json({
      success: true,
      member: updatedMember
    });
  } catch (error) {
    console.error('Update member error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating member',
      error: error.message
    });
  }
};

// @desc    Delete member
// @route   DELETE /api/members/:id
// @access  Admin
exports.deleteMember = async (req, res) => {
  try {
    const member = await User.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Member not found'
      });
    }

    // Delete member's profile photo
    if (member.profilePhoto && member.profilePhoto !== 'default-profile.jpg') {
      const photoPath = path.join(__dirname, '..', 'uploads', 'profiles', path.basename(member.profilePhoto));
      try {
        await unlinkAsync(photoPath);
      } catch (err) {
        console.error('Failed to delete profile photo:', err);
      }
    }

    // Delete member's certificates
    const certificates = await Certificate.find({ issuedTo: member._id });
    for (const cert of certificates) {
      try {
        await unlinkAsync(cert.filePath);
        await Certificate.findByIdAndDelete(cert._id);
      } catch (err) {
        console.error('Failed to delete certificate file or record:', err);
      }
    }

    // Delete member
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Member successfully deleted'
    });
  } catch (error) {
    console.error('Delete member error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting member',
      error: error.message
    });
  }
};

// @desc    Export members data
// @route   GET /api/members/export/:format
// @access  Admin
exports.exportMembersData = async (req, res) => {
  try {
    const members = await User.find({ role: 'student' })
      .select('name email mobile college branch year ieeeId studentId isVerified createdAt')
      .lean();

    const format = req.params.format.toLowerCase();

    if (format === 'csv') {
      // CSV export
      const fields = ['name', 'email', 'mobile', 'college', 'branch', 'year', 'ieeeId', 'studentId', 'isVerified', 'createdAt'];
      const json2csvParser = new Parser({ fields });
      const csv = json2csvParser.parse(members);

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="ieee-members.csv"');
      return res.status(200).send(csv);
    } else if (format === 'excel') {
      // Excel export
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('IEEE Members');

      worksheet.columns = [
        { header: 'Name', key: 'name', width: 20 },
        { header: 'Email', key: 'email', width: 25 },
        { header: 'Mobile', key: 'mobile', width: 15 },
        { header: 'College', key: 'college', width: 25 },
        { header: 'Branch', key: 'branch', width: 15 },
        { header: 'Year', key: 'year', width: 10 },
        { header: 'IEEE ID', key: 'ieeeId', width: 15 },
        { header: 'Student ID', key: 'studentId', width: 15 },
        { header: 'Verified', key: 'isVerified', width: 10 },
        { header: 'Joined Date', key: 'createdAt', width: 15 }
      ];

      // Format dates nicely
      members.forEach(member => {
        member.createdAt = new Date(member.createdAt).toLocaleDateString();
        worksheet.addRow(member);
      });

      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename="ieee-members.xlsx"');

      return workbook.xlsx.write(res).then(() => res.end());
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid format. Use "csv" or "excel"'
      });
    }
  } catch (error) {
    console.error('Export members error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while exporting members data',
      error: error.message
    });
  }
};
