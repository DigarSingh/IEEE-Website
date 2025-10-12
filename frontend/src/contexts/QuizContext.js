"use client";
import React, { createContext, useContext, useReducer, useEffect } from 'react';
// MongoDB imports for quiz state management
import { getQuizState } from '../lib/mongodb-storage';

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

  // Monitor MongoDB quiz state
  useEffect(() => {
    const checkQuizState = async () => {
      try {
        console.log('Checking MongoDB quiz state...');
        const result = await getQuizState();
        
        if (result.success) {
          const data = result.data;
          console.log('MongoDB data received:', data);
          
          // Check for quiz active state
          let isQuizActive = false;
          
          if (data.isActive) {
            isQuizActive = data.isActive;
            console.log('Quiz active via isActive flag:', isQuizActive);
          } else if (data.round1?.isActive) {
            isQuizActive = true;
            console.log('Quiz active via round 1 flag');
          }
          
          console.log('Final quiz active state:', isQuizActive);
          dispatch({ type: 'SET_QUIZ_ACTIVE', payload: isQuizActive });
        } else {
          console.log('No quiz state found in MongoDB');
          dispatch({ type: 'SET_QUIZ_ACTIVE', payload: false });
        }
      } catch (error) {
        console.error('Error checking MongoDB quiz state:', error);
      }
    };

    checkQuizState();
    
    // Check every 10 seconds for more responsive updates
    const interval = setInterval(checkQuizState, 10000);
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