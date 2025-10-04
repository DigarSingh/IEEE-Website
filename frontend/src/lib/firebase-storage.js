// Firebase Storage Functions for IEEE Quiz System
import { 
  collection, 
  doc, 
  addDoc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  onSnapshot, 
  serverTimestamp,
  writeBatch 
} from 'firebase/firestore';
import { db } from './firebase';

// ===========================================
// STUDENT DATA MANAGEMENT
// ===========================================

/**
 * Store student login data in Firebase
 */
export const storeStudentData = async (studentData) => {
  try {
    console.log('🔄 Starting Firebase storage process...');
    console.log('📝 Student data to store:', studentData);
    
    const studentsRef = collection(db, 'students');
    console.log('📁 Students collection reference created');
    
    const studentDoc = {
      name: studentData.name,
      rollNo: studentData.rollNo,
      selectedRound: studentData.selectedRound,
      loginTime: studentData.loginTime,
      isActive: true,
      lastSeen: serverTimestamp(),
      createdAt: serverTimestamp(),
      // Quiz specific data
      quizStarted: false,
      quizCompleted: false,
      currentQuestion: 0,
      answers: {},
      warnings: 0,
      timeSpent: 0,
      score: 0,
      percentage: 0,
      grade: null
    };

    console.log('📄 Student document prepared:', studentDoc);
    console.log('🔄 Attempting to add document to Firebase...');
    
    const docRef = await addDoc(studentsRef, studentDoc);
    console.log('✅ Student data stored successfully:', docRef.id);
    return { success: true, id: docRef.id, data: studentDoc };
  } catch (error) {
    console.error('❌ Error storing student data:', error);
    console.error('❌ Error details:', {
      code: error.code,
      message: error.message,
      stack: error.stack
    });
    return { success: false, error: error.message };
  }
};

/**
 * Update student data (for quiz progress)
 */
export const updateStudentData = async (studentId, updateData) => {
  try {
    const studentRef = doc(db, 'students', studentId);
    await updateDoc(studentRef, {
      ...updateData,
      lastSeen: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    console.log('✅ Student data updated:', studentId);
    return { success: true };
  } catch (error) {
    console.error('❌ Error updating student data:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get student data by roll number
 */
export const getStudentByRollNo = async (rollNo) => {
  try {
    const studentsRef = collection(db, 'students');
    const q = query(studentsRef, where('rollNo', '==', rollNo));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { success: true, id: doc.id, data: doc.data() };
    } else {
      return { success: false, error: 'Student not found' };
    }
  } catch (error) {
    console.error('❌ Error getting student data:', error);
    return { success: false, error: error.message };
  }
};

// ===========================================
// QUIZ RESULTS MANAGEMENT
// ===========================================

/**
 * Store quiz result when student completes quiz
 */
export const storeQuizResult = async (resultData) => {
  try {
    const resultsRef = collection(db, 'quizResults');
    const resultDoc = {
      // Student info
      name: resultData.name,
      rollNo: resultData.rollNo,
      studentId: resultData.studentId,
      
      // Quiz info
      round: resultData.round,
      score: resultData.score,
      totalQuestions: resultData.totalQuestions,
      percentage: resultData.percentage,
      grade: resultData.grade,
      
      // Time info
      timeTaken: resultData.timeTaken,
      timeSpent: resultData.timeSpent,
      loginTime: resultData.loginTime,
      quizStartedAt: resultData.quizStartedAt,
      completedAt: resultData.completedAt,
      
      // Quiz data
      answers: resultData.answers,
      warnings: resultData.warnings,
      isCompleted: true,
      
      // Metadata
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    const docRef = await addDoc(resultsRef, resultDoc);
    console.log('✅ Quiz result stored:', docRef.id);
    return { success: true, id: docRef.id, data: resultDoc };
  } catch (error) {
    console.error('❌ Error storing quiz result:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get quiz results with filtering
 */
export const getQuizResults = async (filters = {}) => {
  try {
    const resultsRef = collection(db, 'quizResults');
    let q = query(resultsRef);

    // Apply filters
    if (filters.round) {
      q = query(q, where('round', '==', filters.round));
    }
    if (filters.completed !== undefined) {
      q = query(q, where('isCompleted', '==', filters.completed));
    }
    if (filters.orderBy) {
      q = query(q, orderBy(filters.orderBy, filters.orderDirection || 'desc'));
    }
    if (filters.limit) {
      q = query(q, limit(filters.limit));
    }

    const querySnapshot = await getDocs(q);
    const results = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return { success: true, data: results };
  } catch (error) {
    console.error('❌ Error getting quiz results:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get leaderboard data
 */
export const getLeaderboard = async (type = 'overall', round = null, limitCount = 20) => {
  try {
    const resultsRef = collection(db, 'quizResults');
    let q = query(resultsRef, where('isCompleted', '==', true));

    if (type === 'round' && round) {
      q = query(q, where('round', '==', round));
    }

    q = query(q, orderBy('percentage', 'desc'), orderBy('completedAt', 'asc'), limit(limitCount));

    const querySnapshot = await getDocs(q);
    const leaderboard = querySnapshot.docs.map((doc, index) => ({
      id: doc.id,
      rank: index + 1,
      ...doc.data()
    }));

    // Calculate statistics
    const totalParticipants = leaderboard.length;
    const averageScore = totalParticipants > 0 
      ? Math.round(leaderboard.reduce((sum, entry) => sum + entry.percentage, 0) / totalParticipants)
      : 0;
    const topScore = totalParticipants > 0 ? leaderboard[0]?.percentage || 0 : 0;

    return { 
      success: true, 
      data: { 
        leaderboard, 
        statistics: { totalParticipants, averageScore, topScore } 
      } 
    };
  } catch (error) {
    console.error('❌ Error getting leaderboard:', error);
    return { success: false, error: error.message };
  }
};

// ===========================================
// ADMIN QUIZ STATE MANAGEMENT
// ===========================================

/**
 * Initialize admin quiz state
 */
export const initializeQuizState = async () => {
  try {
    const quizStateRef = doc(db, 'admin', 'quizState');
    const quizStateSnap = await getDoc(quizStateRef);
    
    if (!quizStateSnap.exists()) {
      const initialState = {
        isActive: false,
        currentRound: 1,
        round1: {
          isActive: false,
          startTime: null,
          endTime: null,
          duration: 30 * 60, // 30 minutes
          globalTimer: 0,
          scheduledStartTime: null,
          quizPassword: 'ieee@321',
          questionsCount: 20
        },
        round2: {
          isActive: false,
          startTime: null,
          endTime: null,
          duration: 45 * 60, // 45 minutes
          globalTimer: 0,
          scheduledStartTime: null,
          quizPassword: 'ieee@321',
          questionsCount: 20
        },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      await setDoc(quizStateRef, initialState);
      console.log('✅ Quiz state initialized');
      return { success: true };
    }
    
    return { success: true, exists: true };
  } catch (error) {
    console.error('❌ Error initializing quiz state:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Update quiz state
 */
export const updateQuizState = async (updateData) => {
  try {
    const quizStateRef = doc(db, 'admin', 'quizState');
    await updateDoc(quizStateRef, {
      ...updateData,
      updatedAt: serverTimestamp()
    });
    console.log('✅ Quiz state updated');
    return { success: true };
  } catch (error) {
    console.error('❌ Error updating quiz state:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Start quiz
 */
export const startQuiz = async (round, settings) => {
  try {
    const quizStateRef = doc(db, 'admin', 'quizState');
    const now = new Date();
    const endTime = new Date(now.getTime() + settings.duration * 60 * 1000);
    
    const updateData = {
      isActive: true,
      currentRound: round,
      [`round${round}`]: {
        isActive: true,
        startTime: now,
        endTime: endTime,
        duration: settings.duration * 60,
        globalTimer: settings.duration * 60,
        questionsCount: settings.questionsCount,
        quizPassword: settings.password,
        scheduledStartTime: now
      },
      updatedAt: serverTimestamp()
    };

    await updateDoc(quizStateRef, updateData);
    console.log(`✅ Quiz Round ${round} started`);
    return { success: true };
  } catch (error) {
    console.error('❌ Error starting quiz:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Stop quiz
 */
export const stopQuiz = async (round) => {
  try {
    const quizStateRef = doc(db, 'admin', 'quizState');
    const updateData = {
      isActive: false,
      [`round${round}`]: {
        isActive: false,
        endTime: new Date(),
        globalTimer: 0,
        scheduledStartTime: null
      },
      updatedAt: serverTimestamp()
    };

    await updateDoc(quizStateRef, updateData);
    console.log(`✅ Quiz Round ${round} stopped`);
    return { success: true };
  } catch (error) {
    console.error('❌ Error stopping quiz:', error);
    return { success: false, error: error.message };
  }
};

// ===========================================
// REAL-TIME LISTENERS
// ===========================================

/**
 * Listen to quiz state changes
 */
export const listenToQuizState = (callback) => {
  const quizStateRef = doc(db, 'admin', 'quizState');
  return onSnapshot(quizStateRef, (doc) => {
    if (doc.exists()) {
      callback({ success: true, data: doc.data() });
    } else {
      callback({ success: false, error: 'Quiz state not found' });
    }
  }, (error) => {
    console.error('❌ Error listening to quiz state:', error);
    callback({ success: false, error: error.message });
  });
};

/**
 * Listen to quiz results changes
 */
export const listenToQuizResults = (callback, filters = {}) => {
  const resultsRef = collection(db, 'quizResults');
  let q = query(resultsRef, orderBy('completedAt', 'desc'));
  
  if (filters.limit) {
    q = query(q, limit(filters.limit));
  }

  return onSnapshot(q, (snapshot) => {
    const results = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback({ success: true, data: results });
  }, (error) => {
    console.error('❌ Error listening to quiz results:', error);
    callback({ success: false, error: error.message });
  });
};

/**
 * Listen to active students
 */
export const listenToActiveStudents = (callback) => {
  const studentsRef = collection(db, 'students');
  const q = query(studentsRef, where('isActive', '==', true));
  
  return onSnapshot(q, (snapshot) => {
    const students = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback({ success: true, data: students });
  }, (error) => {
    console.error('❌ Error listening to active students:', error);
    callback({ success: false, error: error.message });
  });
};

// ===========================================
// STATISTICS AND ANALYTICS
// ===========================================

/**
 * Get quiz statistics
 */
export const getQuizStatistics = async () => {
  try {
    // Get total students
    const studentsRef = collection(db, 'students');
    const studentsSnapshot = await getDocs(studentsRef);
    const totalStudents = studentsSnapshot.size;

    // Get active students
    const activeStudentsQuery = query(studentsRef, where('isActive', '==', true));
    const activeStudentsSnapshot = await getDocs(activeStudentsQuery);
    const activeStudents = activeStudentsSnapshot.size;

    // Get completed quizzes
    const resultsRef = collection(db, 'quizResults');
    const completedQuery = query(resultsRef, where('isCompleted', '==', true));
    const completedSnapshot = await getDocs(completedQuery);
    const completedQuizzes = completedSnapshot.size;

    // Calculate average score
    const allResults = completedSnapshot.docs.map(doc => doc.data());
    const averageScore = allResults.length > 0 
      ? Math.round(allResults.reduce((sum, result) => sum + result.percentage, 0) / allResults.length)
      : 0;

    // Get top score
    const topScore = allResults.length > 0 
      ? Math.max(...allResults.map(result => result.percentage))
      : 0;

    return {
      success: true,
      data: {
        totalStudents,
        activeStudents,
        completedQuizzes,
        averageScore,
        topScore
      }
    };
  } catch (error) {
    console.error('❌ Error getting quiz statistics:', error);
    return { success: false, error: error.message };
  }
};

// ===========================================
// BATCH OPERATIONS
// ===========================================

/**
 * Mark all students as inactive (when quiz ends)
 */
export const markAllStudentsInactive = async () => {
  try {
    const studentsRef = collection(db, 'students');
    const activeStudentsQuery = query(studentsRef, where('isActive', '==', true));
    const snapshot = await getDocs(activeStudentsQuery);
    
    const batch = writeBatch(db);
    snapshot.docs.forEach(doc => {
      batch.update(doc.ref, { 
        isActive: false, 
        updatedAt: serverTimestamp() 
      });
    });
    
    await batch.commit();
    console.log('✅ All students marked as inactive');
    return { success: true };
  } catch (error) {
    console.error('❌ Error marking students inactive:', error);
    return { success: false, error: error.message };
  }
};

export default {
  // Student functions
  storeStudentData,
  updateStudentData,
  getStudentByRollNo,
  
  // Quiz results functions
  storeQuizResult,
  getQuizResults,
  getLeaderboard,
  
  // Admin functions
  initializeQuizState,
  updateQuizState,
  startQuiz,
  stopQuiz,
  
  // Real-time listeners
  listenToQuizState,
  listenToQuizResults,
  listenToActiveStudents,
  
  // Statistics
  getQuizStatistics,
  
  // Batch operations
  markAllStudentsInactive
};

