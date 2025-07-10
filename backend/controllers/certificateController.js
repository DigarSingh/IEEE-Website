const Certificate = require('../models/Certificate');
const User = require('../models/User');
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);

// @desc    Upload a certificate
// @route   POST /api/certificates/upload
// @access  Admin
exports.uploadCertificate = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a certificate file'
      });
    }

    const { name, description, userId, eventId } = req.body;

    // Create certificate
    const certificate = await Certificate.create({
      name,
      description,
      filePath: req.file.path,
      event: eventId || null,
      issuedTo: userId,
      issuedBy: req.user.id
    });

    // Add certificate to user's certificates
    await User.findByIdAndUpdate(userId, {
      $push: { certificates: certificate._id }
    });

    res.status(201).json({
      success: true,
      certificate
    });
  } catch (error) {
    console.error('Certificate upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during certificate upload',
      error: error.message
    });
  }
};

// @desc    Get certificates for a user
// @route   GET /api/certificates/user/:userId or GET /api/certificates/user
// @access  Admin or Owner
exports.getUserCertificates = async (req, res) => {
  try {
    // If userId is provided in params, use it (admin access)
    // Otherwise use the current user's ID (user access)
    const userId = req.params.userId || req.user.id;
    
    // If admin is accessing other user's certificates
    if (req.params.userId && req.user.role !== 'admin' && req.params.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access these certificates'
      });
    }
    
    const certificates = await Certificate.find({ issuedTo: userId })
      .populate('event', 'title date')
      .populate('issuedBy', 'name');

    res.status(200).json({
      success: true,
      count: certificates.length,
      certificates
    });
  } catch (error) {
    console.error('Get certificates error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching certificates',
      error: error.message
    });
  }
};

// @desc    Get all certificates (admin)
// @route   GET /api/certificates
// @access  Admin
exports.getAllCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find()
      .populate('event', 'title date')
      .populate('issuedTo', 'name email studentId')
      .populate('issuedBy', 'name');

    res.status(200).json({
      success: true,
      count: certificates.length,
      certificates
    });
  } catch (error) {
    console.error('Get all certificates error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching certificates',
      error: error.message
    });
  }
};

// @desc    Download a certificate
// @route   GET /api/certificates/download/:id
// @access  Admin or Owner
exports.downloadCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found'
      });
    }

    // Check if user is owner or admin
    if (certificate.issuedTo.toString() !== req.user.id && req.user.role !== 'admin' && req.user.role !== 'superadmin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this certificate'
      });
    }

    const file = path.resolve(certificate.filePath);
    res.download(file);
  } catch (error) {
    console.error('Certificate download error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during certificate download',
      error: error.message
    });
  }
};

// @desc    Delete a certificate
// @route   DELETE /api/certificates/:id
// @access  Admin
exports.deleteCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found'
      });
    }

    // Remove certificate file
    try {
      await unlinkAsync(certificate.filePath);
    } catch (err) {
      console.error('File deletion error:', err);
    }

    // Remove certificate reference from user
    await User.findByIdAndUpdate(certificate.issuedTo, {
      $pull: { certificates: certificate._id }
    });

    // Delete certificate record
    await Certificate.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Certificate successfully deleted'
    });
  } catch (error) {
    console.error('Certificate deletion error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during certificate deletion',
      error: error.message
    });
  }
};
