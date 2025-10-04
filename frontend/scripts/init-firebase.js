// Firebase Database Initialization Script
// Run this script to set up the required Firestore collections and documents

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfF5vjulpfDWBEXmEUjMNJNtG1RzI6Eqw",
  authDomain: "ieee-quiz-15aec.firebaseapp.com",
  projectId: "ieee-quiz-15aec",
  storageBucket: "ieee-quiz-15aec.firebasestorage.app",
  messagingSenderId: "225813222869",
  appId: "1:225813222869:web:644f7d9c88d313dda2595c",
  measurementId: "G-5MLVVBPH3E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize the admin quiz state document
async function initializeQuizState() {
  try {
    const quizStateRef = doc(db, 'admin', 'quizState');
    
    const initialQuizState = {
      isActive: false,
      currentRound: 1,
      round1: {
        isActive: false,
        startTime: null,
        endTime: null,
        duration: 30 * 60, // 30 minutes in seconds
        globalTimer: 0,
        scheduledStartTime: null,
        quizPassword: 'ieee@321',
        questionsCount: 20
      },
      round2: {
        isActive: false,
        startTime: null,
        endTime: null,
        duration: 45 * 60, // 45 minutes in seconds
        globalTimer: 0,
        scheduledStartTime: null,
        quizPassword: 'ieee@321',
        questionsCount: 20
      },
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    await setDoc(quizStateRef, initialQuizState);
    console.log('✅ Quiz state document initialized successfully!');
    
  } catch (error) {
    console.error('❌ Error initializing quiz state:', error);
  }
}

// Initialize sample quiz results (for testing)
async function initializeSampleResults() {
  try {
    const sampleResults = [
      {
        name: "John Doe",
        rollNo: "12345678",
        score: 18,
        totalQuestions: 20,
        percentage: 90,
        grade: "A+",
        timeTaken: "25:30",
        round: 1,
        completed: true,
        completedAt: new Date().toISOString(),
        answers: {
          "1": "A", "2": "B", "3": "C", "4": "A", "5": "B"
        },
        warnings: 0,
        loginTime: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
        createdAt: serverTimestamp()
      },
      {
        name: "Jane Smith",
        rollNo: "87654321",
        score: 16,
        totalQuestions: 20,
        percentage: 80,
        grade: "A",
        timeTaken: "28:45",
        round: 1,
        completed: true,
        completedAt: new Date().toISOString(),
        answers: {
          "1": "A", "2": "B", "3": "C", "4": "A", "5": "B"
        },
        warnings: 1,
        loginTime: new Date(Date.now() - 25 * 60 * 1000).toISOString(), // 25 minutes ago
        createdAt: serverTimestamp()
      },
      {
        name: "Bob Johnson",
        rollNo: "11223344",
        score: 14,
        totalQuestions: 20,
        percentage: 70,
        grade: "B+",
        timeTaken: "32:15",
        round: 1,
        completed: true,
        completedAt: new Date().toISOString(),
        answers: {
          "1": "A", "2": "B", "3": "C", "4": "A", "5": "B"
        },
        warnings: 0,
        loginTime: new Date(Date.now() - 35 * 60 * 1000).toISOString(), // 35 minutes ago
        createdAt: serverTimestamp()
      }
    ];

    // Note: In a real scenario, you wouldn't add sample data
    // This is just for testing the leaderboard functionality
    console.log('📝 Sample results would be added here for testing');
    console.log('Sample results:', sampleResults);
    
  } catch (error) {
    console.error('❌ Error creating sample results:', error);
  }
}

// Main initialization function
async function initializeFirebase() {
  console.log('🚀 Initializing Firebase database for IEEE Quiz System...');
  
  try {
    await initializeQuizState();
    await initializeSampleResults();
    
    console.log('✅ Firebase initialization completed successfully!');
    console.log('📋 Next steps:');
    console.log('1. Go to Firebase Console → Firestore Database');
    console.log('2. Verify the "admin/quizState" document exists');
    console.log('3. Set up Firestore security rules');
    console.log('4. Test the quiz system');
    
  } catch (error) {
    console.error('❌ Firebase initialization failed:', error);
  }
}

// Run the initialization
if (typeof window !== 'undefined') {
  // Browser environment
  initializeFirebase();
} else {
  // Node.js environment
  console.log('Run this script in a browser environment or use the Firebase Console');
}

export { initializeFirebase };
