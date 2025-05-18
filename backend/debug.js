// This is a simple script to test MongoDB connection

const mongoose = require('mongoose');
require('dotenv').config();

// Get connection string
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/ieee_club?authMechanism=DEFAULT';

console.log('Attempting to connect to MongoDB...');
console.log(`Connection string: ${connectionString}`);

mongoose.connect(connectionString)
  .then(() => {
    console.log('✅ Connected to MongoDB successfully!');
    
    // Try creating a test collection
    return mongoose.connection.db.createCollection('test_connection');
  })
  .then(() => {
    console.log('✅ Created test collection successfully');
    return mongoose.connection.db.listCollections().toArray();
  })
  .then(collections => {
    console.log('Available collections:');
    collections.forEach(coll => console.log(` - ${coll.name}`));
    
    // Close connection
    return mongoose.connection.close();
  })
  .then(() => {
    console.log('Connection closed');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });
