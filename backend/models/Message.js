const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true
  },
  message: {
    type: String,
    required: [true, 'Message content is required'],
    trim: true
  },
  fromUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  toAdmin: {
    type: Boolean,
    default: true
  },
  read: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  // For admin responses
  reply: {
    message: {
      type: String
    },
    sentAt: {
      type: Date
    },
    readByUser: {
      type: Boolean,
      default: false
    }
  }
});

module.exports = mongoose.model('Message', MessageSchema);
