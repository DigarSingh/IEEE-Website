// MongoDB Storage Functions for IEEE Quiz System

/**
 * Store student login data in MongoDB
 */
export const storeStudentData = async (studentData) => {
  try {
    console.log('🔄 Starting MongoDB storage process...');
    console.log('📝 Student data to store:', studentData);
    
    const response = await fetch('/api/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentData),
    });
    
    const result = await response.json();
    console.log('📊 MongoDB result:', result);
    
    if (!result.success) {
      // Handle specific error types
      if (result.code === 'DUPLICATE_STUDENT' || result.code === 'DUPLICATE_KEY') {
        console.log('🔄 Student already registered, treating as successful login');
        // For duplicate key errors, we can still proceed if the student exists
        return { 
          success: true, 
          id: null, 
          data: null, 
          message: result.error,
          isDuplicate: true 
        };
      }
      throw new Error(result.error);
    }
    
    console.log('✅ Student data stored successfully:', result.id);
    return { 
      success: true, 
      id: result.id, 
      data: result.data, 
      message: result.message || 'Student registered successfully',
      isDuplicate: false 
    };
  } catch (error) {
    console.error('❌ Error storing student data:', error);
    console.error('❌ Error details:', {
      message: error.message,
      stack: error.stack
    });
    
    // Check if it's a duplicate key error from the message
    if (error.message.includes('E11000') || error.message.includes('duplicate key')) {
      console.log('🔄 Detected duplicate key error, treating as existing student');
      return { 
        success: true, 
        id: null, 
        data: null, 
        message: 'Student with this roll number is already registered for this round',
        isDuplicate: true 
      };
    }
    
    return { success: false, error: error.message };
  }
};

/**
 * Get student by roll number
 */
export const getStudentByRollNo = async (rollNo) => {
  try {
    console.log('🔄 Fetching student by roll number:', rollNo);
    
    const response = await fetch(`/api/students?rollNo=${encodeURIComponent(rollNo)}`);
    const result = await response.json();
    
    if (!result.success) {
      if (response.status === 404) {
        return null; // Student not found
      }
      throw new Error(result.error);
    }
    
    console.log('✅ Student found:', result.data);
    return result.data;
  } catch (error) {
    console.error('❌ Error fetching student:', error);
    return null;
  }
};

/**
 * Update student data
 */
export const updateStudentData = async (studentId, updateData) => {
  try {
    console.log('🔄 Updating student data:', studentId, updateData);
    
    const response = await fetch('/api/students', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId,
        updateData
      }),
    });
    
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error);
    }
    
    console.log('✅ Student data updated:', studentId);
    return { success: true, data: result.data };
  } catch (error) {
    console.error('❌ Error updating student data:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get current quiz state
 */
export const getQuizState = async () => {
  try {
    console.log('🔄 Fetching quiz state...');
    
    const response = await fetch('/api/quiz/state');
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error);
    }
    
    console.log('✅ Quiz state fetched:', result.data);
    return { success: true, data: result.data };
  } catch (error) {
    console.error('❌ Error fetching quiz state:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Update quiz state
 */
export const updateQuizState = async (action, round = null, settings = null) => {
  try {
    console.log('🔄 Updating quiz state:', action, round, settings);
    
    const response = await fetch('/api/quiz/state', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action,
        round,
        settings
      }),
    });
    
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error);
    }
    
    console.log('✅ Quiz state updated:', action);
    return { success: true, data: result.data };
  } catch (error) {
    console.error('❌ Error updating quiz state:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get all students
 */
export const getAllStudents = async () => {
  try {
    console.log('🔄 Fetching all students...');
    
    const response = await fetch('/api/students');
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error);
    }
    
    console.log('✅ All students fetched:', result.data.length);
    return { success: true, data: result.data };
  } catch (error) {
    console.error('❌ Error fetching all students:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get quiz results (for leaderboard)
 */
export const getQuizResults = async () => {
  try {
    console.log('🔄 Fetching quiz results...');
    
    const response = await fetch('/api/quiz/results');
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error);
    }
    
    console.log('✅ Quiz results fetched:', result.data.length);
    return { success: true, data: result.data };
  } catch (error) {
    console.error('❌ Error fetching quiz results:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Store student quiz result in MongoDB
 */
export const storeStudentResult = async (resultData) => {
  try {
    console.log('🔄 Storing quiz result in MongoDB...');
    console.log('📝 Result data to store:', resultData);
    
    const response = await fetch('/api/quiz/results', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resultData),
    });
    
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error);
    }
    
    console.log('✅ Quiz result stored successfully:', result.id);
    return { success: true, id: result.id, data: result.data };
  } catch (error) {
    console.error('❌ Error storing quiz result:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Update student progress in MongoDB
 */
export const updateStudentProgress = async (studentId, progressData) => {
  try {
    console.log('🔄 Updating student progress in MongoDB...');
    console.log('📝 Progress data:', progressData);
    
    const response = await fetch(`/api/students/${studentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(progressData),
    });
    
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error);
    }
    
    console.log('✅ Student progress updated successfully');
    return { success: true, data: result.data };
  } catch (error) {
    console.error('❌ Error updating student progress:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Initialize MongoDB database with quiz structure
 */
export const initializeMongoDatabase = async () => {
  try {
    console.log('🔄 Initializing MongoDB database...');
    
    const response = await fetch('/api/database/init', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error);
    }
    
    console.log('✅ MongoDB database initialized successfully');
    return { success: true, message: result.message };
  } catch (error) {
    console.error('❌ Error initializing MongoDB database:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Reset MongoDB quiz data
 */
export const resetMongoData = async () => {
  try {
    console.log('🔄 Resetting MongoDB quiz data...');
    
    const response = await fetch('/api/database/reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error);
    }
    
    console.log('✅ MongoDB quiz data reset successfully');
    return { success: true, message: result.message };
  } catch (error) {
    console.error('❌ Error resetting MongoDB quiz data:', error);
    return { success: false, error: error.message };
  }
};
