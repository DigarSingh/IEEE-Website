const Message = require('../models/Message');
const User = require('../models/User');

// @desc    Create a new message
// @route   POST /api/messages
// @access  Student
exports.createMessage = async (req, res) => {
  try {
    const { subject, message } = req.body;

    const newMessage = await Message.create({
      subject,
      message,
      fromUser: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: newMessage
    });
  } catch (error) {
    console.error('Create message error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while sending message',
      error: error.message
    });
  }
};

// @desc    Get all messages for admin
// @route   GET /api/messages/admin
// @access  Admin
exports.getAdminMessages = async (req, res) => {
  try {
    const messages = await Message.find({ toAdmin: true })
      .populate('fromUser', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: messages.length,
      messages
    });
  } catch (error) {
    console.error('Get admin messages error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching messages',
      error: error.message
    });
  }
};

// @desc    Get all messages for a user
// @route   GET /api/messages/user
// @access  Student
exports.getUserMessages = async (req, res) => {
  try {
    const messages = await Message.find({ fromUser: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: messages.length,
      messages
    });
  } catch (error) {
    console.error('Get user messages error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching messages',
      error: error.message
    });
  }
};

// @desc    Reply to a message
// @route   PUT /api/messages/:id/reply
// @access  Admin
exports.replyToMessage = async (req, res) => {
  try {
    const { replyMessage } = req.body;

    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    message.reply = {
      message: replyMessage,
      sentAt: Date.now()
    };
    message.read = true;

    await message.save();

    res.status(200).json({
      success: true,
      message: 'Reply sent successfully',
      data: message
    });
  } catch (error) {
    console.error('Reply to message error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while replying to message',
      error: error.message
    });
  }
};

// @desc    Mark message as read
// @route   PUT /api/messages/:id/read
// @access  Admin or Owner
exports.markMessageAsRead = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    // Check if user is admin or message owner
    if (req.user.role === 'admin' || req.user.role === 'superadmin') {
      message.read = true;
    } else if (message.fromUser.toString() === req.user.id) {
      if (message.reply && message.reply.message) {
        message.reply.readByUser = true;
      }
    } else {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this message'
      });
    }

    await message.save();

    res.status(200).json({
      success: true,
      message: 'Message marked as read',
      data: message
    });
  } catch (error) {
    console.error('Mark message as read error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while marking message as read',
      error: error.message
    });
  }
};

// @desc    Delete a message
// @route   DELETE /api/messages/:id
// @access  Admin or Owner
exports.deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    // Check if user is admin or message owner
    if (message.fromUser.toString() !== req.user.id && req.user.role !== 'admin' && req.user.role !== 'superadmin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this message'
      });
    }

    await Message.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (error) {
    console.error('Delete message error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting message',
      error: error.message
    });
  }
};
