// Database Index Cleanup Script for IEEE Quiz System
// This script fixes duplicate key errors by ensuring proper indexes

import mongoose from 'mongoose';
import dbConnect from '../lib/mongodb.js';
import Student from '../models/Student.js';

async function cleanupDatabaseIndexes() {
  try {
    console.log('🔄 Starting database index cleanup...');
    
    // Connect to database
    await dbConnect();
    console.log('✅ Connected to MongoDB');
    
    // Get the collection
    const collection = mongoose.connection.db.collection('students');
    
    // List current indexes
    const indexes = await collection.indexes();
    console.log('📋 Current indexes:', indexes.map(idx => ({ name: idx.name, key: idx.key })));
    
    // Check for conflicting rollNo index
    const rollNoIndex = indexes.find(idx => 
      idx.name === 'rollNo_1' && 
      JSON.stringify(idx.key) === '{"rollNo":1}' &&
      idx.unique === true
    );
    
    if (rollNoIndex) {
      console.log('⚠️ Found conflicting rollNo unique index, removing...');
      await collection.dropIndex('rollNo_1');
      console.log('✅ Removed conflicting rollNo_1 index');
    }
    
    // Ensure the correct composite unique index exists
    try {
      await collection.createIndex(
        { rollNo: 1, selectedRound: 1 }, 
        { 
          unique: true, 
          name: 'rollNo_selectedRound_unique',
          background: true 
        }
      );
      console.log('✅ Created/verified composite unique index: rollNo + selectedRound');
    } catch (indexError) {
      if (indexError.code === 85) {
        console.log('ℹ️ Composite index already exists');
      } else {
        console.error('❌ Error creating composite index:', indexError);
      }
    }
    
    // Create performance indexes
    const performanceIndexes = [
      { rollNo: 1 },
      { selectedRound: 1 },
      { quizCompleted: 1 },
      { createdAt: -1 }
    ];
    
    for (const indexSpec of performanceIndexes) {
      try {
        await collection.createIndex(indexSpec, { background: true });
        console.log(`✅ Created/verified index:`, indexSpec);
      } catch (indexError) {
        if (indexError.code === 85) {
          console.log(`ℹ️ Index already exists:`, indexSpec);
        } else {
          console.error(`❌ Error creating index ${JSON.stringify(indexSpec)}:`, indexError);
        }
      }
    }
    
    // List final indexes
    const finalIndexes = await collection.indexes();
    console.log('📋 Final indexes:', finalIndexes.map(idx => ({ name: idx.name, key: idx.key, unique: !!idx.unique })));
    
    console.log('✅ Database index cleanup completed successfully!');
    
  } catch (error) {
    console.error('❌ Error during database cleanup:', error);
    throw error;
  } finally {
    // Close connection
    await mongoose.connection.close();
    console.log('🔐 Database connection closed');
  }
}

// Export for use in API routes or direct execution
export default cleanupDatabaseIndexes;

// Allow script to be run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  cleanupDatabaseIndexes()
    .then(() => {
      console.log('🎉 Cleanup script completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Cleanup script failed:', error);
      process.exit(1);
    });
}