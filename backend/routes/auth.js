const express = require('express');
const router = express.Router();
const { register, login, getCurrentUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Debug middleware
router.use((req, res, next) => {
  console.log(`Auth Route: ${req.method} ${req.originalUrl}`);
  if (req.body) {
    console.log('Request body:', JSON.stringify(req.body, null, 2));
  }
  next();
});

// Auth routes
router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getCurrentUser);

// Test route
router.get('/test', (req, res) => {
  res.status(200).json({ message: 'Auth routes are working' });
});

module.exports = router;
