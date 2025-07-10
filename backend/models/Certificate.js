const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Certificate name is required'],
    trim: true
  },
  description: {
    type: String,
    required: false,
    trim: true
  },
  filePath: {
    type: String,
    required: [true, 'Certificate file path is required'],
    trim: true
  },
  issueDate: {
    type: Date,
    default: Date.now
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: false
  },
  issuedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Certificate must be issued to a user']
  },
  issuedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Certificate must have an issuer']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Certificate', CertificateSchema);
