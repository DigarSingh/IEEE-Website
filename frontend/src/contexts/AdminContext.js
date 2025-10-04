import { createContext, useContext, useReducer, useEffect } from 'react';
// MongoDB imports for admin functionality
import { getQuizState, updateQuizState, getAllStudents, getQuizResults } from '../lib/mongodb-storage';

const AdminContext = createContext();

const initialState = {
  isQuizActive: false,
  globalTimer: 0, // in seconds
  quizStartTime: null,
  quizEndTime: null,
  totalParticipants: 0,
  activeParticipants: 0,
  results: [],
  leaderboard: [],
  quizSettings: {
    duration: 30 * 60, // 30 minutes
    questionsCount: 20,
    password: 'ieee@321'
  },
  loading: false,
  error: null
};

function adminReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'START_QUIZ':
      return {
        ...state,
        isQuizActive: true,
        quizStartTime: action.payload.startTime,
        quizEndTime: action.payload.endTime,
        globalTimer: action.payload.duration
      };
    case 'STOP_QUIZ':
      return {
        ...state,
        isQuizActive: false,
        globalTimer: 0
      };
    case 'UPDATE_TIMER':
      return {
        ...state,
        globalTimer: Math.max(0, state.globalTimer - 1)
      };
    case 'SET_PARTICIPANTS':
      return {
        ...state,
        totalParticipants: action.payload.total,
        activeParticipants: action.payload.active
      };
    case 'SET_RESULTS':
      return { ...state, results: action.payload };
    case 'SET_LEADERBOARD':
      return { ...state, leaderboard: action.payload };
    case 'UPDATE_QUIZ_SETTINGS':
      return {
        ...state,
        quizSettings: { ...state.quizSettings, ...action.payload }
      };
    case 'SET_QUIZ_STATE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export function AdminProvider({ children }) {
  const [state, dispatch] = useReducer(adminReducer, initialState);

  // Load MongoDB quiz state on mount
  useEffect(() => {
    loadQuizState();
    setupRealtimeListeners();
  }, []);

  // Global timer effect
  useEffect(() => {
    let interval;
    if (state.isQuizActive && state.globalTimer > 0) {
      interval = setInterval(() => {
        dispatch({ type: 'UPDATE_TIMER' });
      }, 1000);
    } else if (state.isQuizActive && state.globalTimer === 0) {
      // Auto-stop quiz when timer reaches 0
      stopQuiz();
    }
    return () => clearInterval(interval);
  }, [state.isQuizActive, state.globalTimer]);

  const loadQuizState = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const result = await getQuizState();
      
      if (result.success) {
        dispatch({ type: 'SET_QUIZ_STATE', payload: result.data });
      } else {
        console.error('Failed to load quiz state:', result.error);
      }
    } catch (error) {
      console.error('Error loading quiz state:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const setupRealtimeListeners = () => {
    // Poll MongoDB for updates every 5 seconds
    const interval = setInterval(async () => {
      try {
        // Update quiz results/leaderboard
        const resultsResult = await getQuizResults();
        if (resultsResult.success) {
          dispatch({ type: 'SET_RESULTS', payload: resultsResult.data });
          
          // Update leaderboard
          const leaderboard = [...resultsResult.data]
            .sort((a, b) => {
              if (b.percentage !== a.percentage) {
                return b.percentage - a.percentage;
              }
              return a.timeSpent - b.timeSpent;
            })
            .slice(0, 10);
          
          dispatch({ type: 'SET_LEADERBOARD', payload: leaderboard });
          
          // Update participant counts
          dispatch({
            type: 'SET_PARTICIPANTS',
            payload: {
              total: resultsResult.data.length,
              active: resultsResult.data.filter(r => 
                new Date(r.completedAt) > new Date(Date.now() - 30 * 60 * 1000)
              ).length
            }
          });
        }
      } catch (error) {
        console.error('Error updating realtime data:', error);
      }
    }, 5000);

    return () => clearInterval(interval);
  };

  const startQuiz = async (settings = {}) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const startTime = new Date();
      const duration = settings.duration || state.quizSettings.duration;
      const endTime = new Date(startTime.getTime() + duration * 1000);
      
      const quizState = {
        isQuizActive: true,
        quizStartTime: startTime.toISOString(),
        quizEndTime: endTime.toISOString(),
        globalTimer: duration,
        quizSettings: { ...state.quizSettings, ...settings }
      };
      
      // Save to MongoDB
      const result = await updateQuizState('START_QUIZ', state.currentRound, settings);
      if (!result.success) {
        throw new Error(result.error);
      }
      
      dispatch({
        type: 'START_QUIZ',
        payload: {
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          duration
        }
      });
      
      // Log admin action
      await addDoc(collection(db, 'adminLogs'), {
        action: 'START_QUIZ',
        timestamp: new Date(),
        settings: quizState.quizSettings
      });
      
    } catch (error) {
      console.error('Error starting quiz:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const stopQuiz = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const quizState = {
        isQuizActive: false,
        globalTimer: 0,
        quizEndTime: new Date().toISOString()
      };
      
      // Save to MongoDB
      const result = await updateQuizState('STOP_QUIZ');
      if (!result.success) {
        throw new Error(result.error);
      }
      
      dispatch({ type: 'STOP_QUIZ' });
      
      // Log admin action
      await addDoc(collection(db, 'adminLogs'), {
        action: 'STOP_QUIZ',
        timestamp: new Date()
      });
      
    } catch (error) {
      console.error('Error stopping quiz:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const updateQuizSettings = async (newSettings) => {
    try {
      const updatedSettings = { ...state.quizSettings, ...newSettings };
      
      await setDoc(doc(db, 'admin', 'quizState'), {
        quizSettings: updatedSettings
      }, { merge: true });
      
      dispatch({ type: 'UPDATE_QUIZ_SETTINGS', payload: newSettings });
      
    } catch (error) {
      console.error('Error updating settings:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const exportResults = () => {
    const csvContent = [
      ['Name', 'Roll No', 'Score', 'Percentage', 'Time Spent', 'Warnings', 'Completed At'],
      ...state.results.map(result => [
        result.userName,
        result.rollNo,
        `${result.score}/${result.totalQuestions}`,
        `${result.percentage}%`,
        `${Math.floor(result.timeSpent / 60)}:${String(result.timeSpent % 60).padStart(2, '0')}`,
        result.warnings || 0,
        new Date(result.completedAt).toLocaleString()
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quiz-results-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const value = {
    state,
    dispatch,
    startQuiz,
    stopQuiz,
    updateQuizSettings,
    exportResults
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
}