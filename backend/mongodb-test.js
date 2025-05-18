// Simple script to test MongoDB connection

const mongoose = require('mongoose');
require('dotenv').config();

// Get connection string from environment or use default
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/ieee_club?authMechanism=DEFAULT';

console.log('Attempting to connect to MongoDB...');
console.log(`Connection string: ${connectionString}`);

mongoose.connect(connectionString)
  .then(() => {
    console.log('✓ Connected to MongoDB successfully!');
    console.log('Database connection is working properly.');
    
    // List all collections
    mongoose.connection.db.listCollections().toArray()
      .then(collections => {
        console.log('Available collections:');
        collections.forEach(collection => {
          console.log(`- ${collection.name}`);
        });
        
        // Close connection when done
        mongoose.connection.close();
        console.log('Connection closed.');
      });
  })
  .catch(err => {
    console.error('✗ MongoDB connection error:', err);
    console.log('Please check your connection string and make sure MongoDB is running.');
    process.exit(1);
  });
