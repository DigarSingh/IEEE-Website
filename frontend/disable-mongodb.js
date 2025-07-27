#!/usr/bin/env node

// Simple script to disable MongoDB during development
// Usage: node disable-mongodb.js

const fs = require('fs');
const path = require('path');

// Create a .env.local file with MongoDB disabled
const envContent = `# MongoDB Configuration
MONGODB_URI=mongodb+srv://digarsingh90:nFH2FjprhO6VSf0R@cluster0.sjhwbjk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

# Development Settings
NODE_ENV=development

# Disable MongoDB during development
SKIP_MONGODB=true
`;

const envPath = path.join(__dirname, '.env.local');

try {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Created .env.local with MongoDB disabled');
  console.log('🔄 MongoDB will be skipped during development');
  console.log('📝 To re-enable MongoDB, set SKIP_MONGODB=false in .env.local');
} catch (error) {
  console.error('❌ Error creating .env.local:', error.message);
} 