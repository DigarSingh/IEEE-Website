require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Import routes
const authRoutes = require('./routes/auth');  // Fix the import path to match actual file name

// Create Express app
const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB with error logging
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ieee_club?authMechanism=DEFAULT')
  .then(() => console.log('✅ Connected to MongoDB successfully'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    console.log('Connection string:', process.env.MONGODB_URI || 'mongodb://localhost:27017/ieee_club?authMechanism=DEFAULT');
  });

// Routes
app.use('/api/auth', authRoutes);

// Comment out routes that aren't implemented yet
// app.use('/api/events', eventsRoutes);
// app.use('/api/members', membersRoutes);
// app.use('/api/projects', projectsRoutes);

// Simple health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Test route for debugging
app.get('/api/test', (req, res) => {
  res.status(200).json({ 
    message: 'API is working correctly',
    env: process.env.NODE_ENV || 'development'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Create uploads directory if it doesn't exist
const fs = require('fs');
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📡 API URL: http://localhost:${PORT}/api`);
});
