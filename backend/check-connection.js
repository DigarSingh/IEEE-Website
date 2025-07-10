require('dotenv').config();
const mongoose = require('mongoose');

// Get connection string from environment or use default
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/ieee_club?authMechanism=DEFAULT';

console.log('Checking MongoDB connection...');
console.log(`Connection string: ${connectionString}`);
console.log('Node.js version:', process.version);
console.log('MongoDB driver version:', require('mongoose/package.json').version);

mongoose.connect(connectionString)
  .then(() => {
    console.log('✅ Connected to MongoDB successfully!');
    console.log('MongoDB server version:', mongoose.connection.version);
    
    // Check if required collections exist
    return mongoose.connection.db.listCollections().toArray();
  })
  .then(collections => {
    console.log('Available collections:');
    if (collections.length === 0) {
      console.log('  No collections found. Database might be empty.');
    } else {
      collections.forEach(collection => {
        console.log(`  - ${collection.name}`);
      });
    }
    
    // Close connection when done
    return mongoose.connection.close();
  })
  .then(() => {
    console.log('Connection closed.');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    console.log('Please check:');
    console.log('1. Is MongoDB running?');
    console.log('2. Is the connection string correct?');
    console.log('3. Are there any network issues or firewall blocking the connection?');
    process.exit(1);
  });
