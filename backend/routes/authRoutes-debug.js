// This is a test endpoint to log registration requests
const express = require('express');
const router = express.Router();

router.post('/register', (req, res) => {
  console.log('DEBUG - Registration test endpoint called');
  console.log('Request body:', req.body);
  
  // Check if all required fields are present
  const { name, email, password, college, branch, year, mobile, studentId } = req.body;
  
  console.log('Extracted fields:', { 
    name, 
    email, 
    hasPassword: !!password, 
    passwordLength: password?.length,
    college, 
    branch, 
    year, 
    mobile, 
    studentId 
  });

  // Simulate successful registration
  res.status(201).json({
    success: true,
    message: 'Test registration successful',
    token: 'test-token',
    user: {
      id: 'test-id',
      name,
      email,
      college,
      role: 'student',
      isVerified: false
    }
  });
});

module.exports = router;
