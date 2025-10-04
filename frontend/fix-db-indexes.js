// Simple script to check and fix database indexes
require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

async function fixDatabaseIndexes() {
  try {
    console.log('🔄 Starting database index cleanup...');
    
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI environment variable is not set');
    }
    
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');
    
    // Get the students collection
    const db = mongoose.connection.db;
    const collection = db.collection('students');
    
    // List current indexes
    const indexes = await collection.indexes();
    console.log('📋 Current indexes:');
    indexes.forEach(idx => {
      console.log(`  - ${idx.name}: ${JSON.stringify(idx.key)} ${idx.unique ? '(UNIQUE)' : ''}`);
    });
    
    // Check for problematic rollNo unique index
    const problematicIndex = indexes.find(idx => 
      idx.name === 'rollNo_1' && idx.unique === true
    );
    
    if (problematicIndex) {
      console.log('⚠️ Found problematic unique rollNo index, removing...');
      try {
        await collection.dropIndex('rollNo_1');
        console.log('✅ Removed problematic rollNo_1 unique index');
      } catch (dropError) {
        console.log('ℹ️ Could not drop index (may not exist):', dropError.message);
      }
    }
    
    // Ensure correct composite unique index
    try {
      await collection.createIndex(
        { rollNo: 1, selectedRound: 1 }, 
        { 
          unique: true, 
          name: 'rollNo_selectedRound_unique',
          background: true 
        }
      );
      console.log('✅ Created/ensured composite unique index: rollNo + selectedRound');
    } catch (error) {
      if (error.code === 85) {
        console.log('ℹ️ Composite unique index already exists');
      } else {
        console.error('❌ Error with composite index:', error.message);
      }
    }
    
    // Create performance indexes
    const performanceIndexes = [
      { spec: { rollNo: 1 }, name: 'rollNo_1_performance' },
      { spec: { selectedRound: 1 }, name: 'selectedRound_1' },
      { spec: { quizCompleted: 1 }, name: 'quizCompleted_1' },
      { spec: { createdAt: -1 }, name: 'createdAt_-1' }
    ];
    
    for (const { spec, name } of performanceIndexes) {
      try {
        await collection.createIndex(spec, { background: true, name });
        console.log(`✅ Created/ensured index: ${name}`);
      } catch (error) {
        if (error.code === 85) {
          console.log(`ℹ️ Index ${name} already exists`);
        } else {
          console.error(`❌ Error creating index ${name}:`, error.message);
        }
      }
    }
    
    // Final index list
    const finalIndexes = await collection.indexes();
    console.log('📋 Final indexes:');
    finalIndexes.forEach(idx => {
      console.log(`  - ${idx.name}: ${JSON.stringify(idx.key)} ${idx.unique ? '(UNIQUE)' : ''}`);
    });
    
    console.log('✅ Database index cleanup completed!');
    
  } catch (error) {
    console.error('❌ Error during cleanup:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔐 Disconnected from MongoDB');
  }
}

// Run the cleanup
fixDatabaseIndexes()
  .then(() => {
    console.log('🎉 Cleanup completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Cleanup failed:', error);
    process.exit(1);
  });