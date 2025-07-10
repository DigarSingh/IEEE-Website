require('dotenv').config();
const express = require('express');
const app = express();

// Test each route file individually
try {
  console.log('Testing auth.js');
  const authRoutes = require('./routes/auth');
  console.log('auth.js exports type:', typeof authRoutes);
  if (typeof authRoutes === 'function') {
    console.log('✅ auth.js is exporting correctly');
  } else {
    console.log('❌ auth.js is exporting incorrectly:', authRoutes);
  }
} catch (error) {
  console.error('Error with auth.js:', error.message);
}

try {
  console.log('\nTesting eventsRoutes.js');
  const eventsRoutes = require('./routes/eventsRoutes');
  console.log('eventsRoutes.js exports type:', typeof eventsRoutes);
  if (typeof eventsRoutes === 'function') {
    console.log('✅ eventsRoutes.js is exporting correctly');
  } else {
    console.log('❌ eventsRoutes.js is exporting incorrectly:', eventsRoutes);
  }
} catch (error) {
  console.error('Error with eventsRoutes.js:', error.message);
}

try {
  console.log('\nTesting membersRoutes.js');
  const membersRoutes = require('./routes/membersRoutes');
  console.log('membersRoutes.js exports type:', typeof membersRoutes);
  if (typeof membersRoutes === 'function') {
    console.log('✅ membersRoutes.js is exporting correctly');
  } else {
    console.log('❌ membersRoutes.js is exporting incorrectly:', membersRoutes);
  }
} catch (error) {
  console.error('Error with membersRoutes.js:', error.message);
}

try {
  console.log('\nTesting certificatesRoutes.js');
  const certificatesRoutes = require('./routes/certificatesRoutes');
  console.log('certificatesRoutes.js exports type:', typeof certificatesRoutes);
  if (typeof certificatesRoutes === 'function') {
    console.log('✅ certificatesRoutes.js is exporting correctly');
  } else {
    console.log('❌ certificatesRoutes.js is exporting incorrectly:', certificatesRoutes);
  }
} catch (error) {
  console.error('Error with certificatesRoutes.js:', error.message);
}

try {
  console.log('\nTesting messagesRoutes.js');
  const messagesRoutes = require('./routes/messagesRoutes');
  console.log('messagesRoutes.js exports type:', typeof messagesRoutes);
  if (typeof messagesRoutes === 'function') {
    console.log('✅ messagesRoutes.js is exporting correctly');
  } else {
    console.log('❌ messagesRoutes.js is exporting incorrectly:', messagesRoutes);
  }
} catch (error) {
  console.error('Error with messagesRoutes.js:', error.message);
}

try {
  console.log('\nTesting adminRoutes.js');
  const adminRoutes = require('./routes/adminRoutes');
  console.log('adminRoutes.js exports type:', typeof adminRoutes);
  if (typeof adminRoutes === 'function') {
    console.log('✅ adminRoutes.js is exporting correctly');
  } else {
    console.log('❌ adminRoutes.js is exporting incorrectly:', adminRoutes);
  }
} catch (error) {
  console.error('Error with adminRoutes.js:', error.message);
}

// Test authRoutes.js (the alternative file)
try {
  console.log('\nTesting authRoutes.js');
  const authRoutesAlt = require('./routes/authRoutes');
  console.log('authRoutes.js exports type:', typeof authRoutesAlt);
  if (typeof authRoutesAlt === 'function') {
    console.log('✅ authRoutes.js is exporting correctly');
  } else {
    console.log('❌ authRoutes.js is exporting incorrectly:', authRoutesAlt);
  }
} catch (error) {
  console.error('Error with authRoutes.js:', error.message);
}

console.log('\nDone testing all routes');
