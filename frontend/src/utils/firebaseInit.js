// Firebase Database Initialization Script
// Run this to initialize the database structure for the quiz system

import { db } from '../lib/firebase';
import { doc, setDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { quizQuestions } from '../data/quizQuestions';

export async function initializeQuizDatabase() {
  try {
    console.log('Initializing quiz database...');

    // 1. Initialize quiz state
    await setDoc(doc(db, 'admin', 'quizState'), {
      isActive: false,
      startTime: null,
      endTime: null,
      duration: 30 * 60, // 30 minutes
      settings: {
        duration: 30 * 60,
        questionsCount: 20,
        password: 'ieee@321'
      },
      createdAt: serverTimestamp(),
      lastUpdated: serverTimestamp()
    });

    console.log('✅ Quiz state initialized');

    // 2. Add sample questions to Firestore (optional - questions are also in local data)
    const questionsCollection = collection(db, 'quizQuestions');
    for (const question of quizQuestions) {
      await addDoc(questionsCollection, {
        ...question,
        createdAt: serverTimestamp()
      });
    }

    console.log('✅ Quiz questions added to database');

    // 3. Initialize admin settings
    await setDoc(doc(db, 'admin', 'settings'), {
      adminPassword: 'admin@ieee2025',
      allowedAdmins: ['admin@ieee.org'],
      maxParticipants: 1000,
      enableWarnings: true,
      maxWarnings: 3,
      createdAt: serverTimestamp()
    });

    console.log('✅ Admin settings initialized');

    // 4. Create initial log entry
    await addDoc(collection(db, 'adminLogs'), {
      action: 'DATABASE_INITIALIZED',
      timestamp: serverTimestamp(),
      details: 'Quiz database structure initialized successfully'
    });

    console.log('✅ Initial admin log created');

    console.log('🎉 Database initialization completed successfully!');
    
    return {
      success: true,
      message: 'Database initialized successfully'
    };

  } catch (error) {
    console.error('❌ Error initializing database:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Function to reset quiz data (for testing)
export async function resetQuizData() {
  try {
    console.log('Resetting quiz data...');

    // Reset quiz state
    await setDoc(doc(db, 'admin', 'quizState'), {
      isActive: false,
      startTime: null,
      endTime: null,
      duration: 30 * 60,
      settings: {
        duration: 30 * 60,
        questionsCount: 20,
        password: 'ieee@321'
      },
      lastUpdated: serverTimestamp()
    });

    // Add reset log
    await addDoc(collection(db, 'adminLogs'), {
      action: 'QUIZ_DATA_RESET',
      timestamp: serverTimestamp(),
      details: 'Quiz data reset by admin'
    });

    console.log('✅ Quiz data reset successfully');
    
    return {
      success: true,
      message: 'Quiz data reset successfully'
    };

  } catch (error) {
    console.error('❌ Error resetting quiz data:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Function to get quiz statistics
export async function getQuizStatistics() {
  try {
    // This would normally query the quizResults collection
    // For now, return sample data structure
    return {
      totalParticipants: 0,
      activeParticipants: 0,
      completedQuizzes: 0,
      averageScore: 0,
      topScore: 0,
      quizStatus: 'inactive'
    };
  } catch (error) {
    console.error('Error getting quiz statistics:', error);
    return null;
  }
}

export default {
  initializeQuizDatabase,
  resetQuizData,
  getQuizStatistics
};