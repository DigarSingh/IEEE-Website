const express = require('express');
const router = express.Router();
const {
  createMessage,
  getAdminMessages,
  getUserMessages,
  replyToMessage,
  markMessageAsRead,
  deleteMessage
} = require('../controllers/messageController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

// Routes
router.post('/', protect, createMessage);
router.get('/admin', protect, isAdmin, getAdminMessages);
router.get('/user', protect, getUserMessages);
router.put('/:id/reply', protect, isAdmin, replyToMessage);
router.put('/:id/read', protect, markMessageAsRead);
router.delete('/:id', protect, deleteMessage);

module.exports = router;
