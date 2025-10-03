"use client";
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

const QuizContext = createContext();

const initialState = {
  user: null,
  questions: [],
  currentQuestion: 0,
  answers: {},
  timeRemaining: 30 * 60, // 30 minutes in seconds
  quizStarted: false,
  quizCompleted: false,
  fullscreenWarnings: 0,
  isFullscreen: false,
  isQuizActive: false, // Global quiz state from admin
};

function quizReducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_QUESTIONS':
      return { ...state, questions: action.payload };
    case 'SET_CURRENT_QUESTION':
      return { ...state, currentQuestion: action.payload };
    case 'SET_ANSWER':
      return {
        ...state,
        answers: { ...state.answers, [action.questionId]: action.answer }
      };
    case 'DECREMENT_TIME':
      return { ...state, timeRemaining: Math.max(0, state.timeRemaining - 1) };
    case 'START_QUIZ':
      return { ...state, quizStarted: true };
    case 'COMPLETE_QUIZ':
      return { ...state, quizCompleted: true, quizStarted: false };
    case 'INCREMENT_FULLSCREEN_WARNING':
      return { ...state, fullscreenWarnings: state.fullscreenWarnings + 1 };
    case 'SET_FULLSCREEN_STATUS':
      return { ...state, isFullscreen: action.payload };
    case 'SET_QUIZ_ACTIVE':
      return { ...state, isQuizActive: action.payload };
    case 'RESET_QUIZ':
      return { ...initialState, user: state.user, isQuizActive: state.isQuizActive };
    case 'LOAD_SAVED_STATE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  // Monitor admin quiz state
  useEffect(() => {
    const checkAdminQuizState = async () => {
      try {
        console.log('Checking admin quiz state...');
        const quizStateDoc = await getDoc(doc(db, 'admin', 'quizState'));
        if (quizStateDoc.exists()) {
          const data = quizStateDoc.data();
          console.log('Firebase data received:', data);
          
          // Check for new round-based structure
          let isQuizActive = false;
          
          if (data.isActive) {
            // New structure: check if any round is active
            isQuizActive = data.isActive;
            console.log('Quiz active via isActive flag:', isQuizActive);
          } else if (data.round1?.isActive || data.round2?.isActive) {
            // Alternative: check individual rounds
            isQuizActive = true;
            console.log('Quiz active via round flags');
          } else if (data.isQuizActive !== undefined) {
            // Fallback to old structure
            isQuizActive = data.isQuizActive;
            console.log('Quiz active via legacy isQuizActive flag:', isQuizActive);
          }
          
          console.log('Final quiz active state:', isQuizActive);
          dispatch({ type: 'SET_QUIZ_ACTIVE', payload: isQuizActive });
        } else {
          console.log('No quiz state document found in Firebase');
          dispatch({ type: 'SET_QUIZ_ACTIVE', payload: false });
        }
      } catch (error) {
        console.error('Error checking admin quiz state:', error);
      }
    };

    checkAdminQuizState();
    
    // Check every 10 seconds for more responsive updates
    const interval = setInterval(checkAdminQuizState, 10000);
    return () => clearInterval(interval);
  }, []);

  // Load saved state on mount
  useEffect(() => {
    const savedState = localStorage.getItem('quizState');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        dispatch({ type: 'LOAD_SAVED_STATE', payload: parsed });
      } catch (error) {
        console.error('Error loading saved quiz state:', error);
      }
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (state.quizStarted || state.quizCompleted) {
      localStorage.setItem('quizState', JSON.stringify({
        answers: state.answers,
        currentQuestion: state.currentQuestion,
        timeRemaining: state.timeRemaining,
        quizStarted: state.quizStarted,
        quizCompleted: state.quizCompleted,
        fullscreenWarnings: state.fullscreenWarnings
      }));
    }
  }, [state]);

  // Timer effect
  useEffect(() => {
    let interval;
    if (state.quizStarted && !state.quizCompleted && state.timeRemaining > 0) {
      interval = setInterval(() => {
        dispatch({ type: 'DECREMENT_TIME' });
      }, 1000);
    } else if (state.timeRemaining <= 0 && state.quizStarted) {
      dispatch({ type: 'COMPLETE_QUIZ' });
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [state.quizStarted, state.quizCompleted, state.timeRemaining]);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}