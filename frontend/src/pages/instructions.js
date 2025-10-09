import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaClock, FaExclamationTriangle, FaRocket, FaUser, FaShieldAlt, FaSignOutAlt, FaSpinner, FaTrophy, FaCode } from 'react-icons/fa';
import { useQuiz } from '../contexts/QuizContext';
// MongoDB imports for quiz state
import { getQuizState, updateQuizState, getStudentByRollNo } from '../lib/mongodb-storage';
import questionsData from '../data/questions.json';

export default function Instructions() {
  const router = useRouter();
  const { state, dispatch } = useQuiz();
  const [user, setUser] = useState(null);
  const [acknowledged, setAcknowledged] = useState(false);
  const [quizState, setQuizState] = useState({
    isActive: false,
    currentRound: 1,
    round1: { isActive: false, globalTimer: 0 },
    round2: { isActive: false, globalTimer: 0 }
  });
  const [loadingQuizState, setLoadingQuizState] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const savedUser = localStorage.getItem('quizUser');
    if (!savedUser) {
      router.push('/quizlogin');
      return;
    }

    const userData = JSON.parse(savedUser);
    setUser(userData);
    dispatch({ type: 'SET_USER', payload: userData });
  }, [router, dispatch]);

  // Fetch quiz state from MongoDB
  useEffect(() => {
    const fetchQuizState = async () => {
      try {
        setLoadingQuizState(true);
        const result = await getQuizState();
        
        if (result.success) {
          setQuizState(result.data);
          // Update context with quiz state
          const isQuizActive = result.data.isActive || result.data[`round${user?.selectedRound || 1}`]?.isActive;
          dispatch({ type: 'SET_QUIZ_ACTIVE', payload: isQuizActive });
        } else {
          console.error('Failed to fetch quiz state:', result.error);
        }
      } catch (error) {
        console.error('Error fetching quiz state:', error);
      } finally {
        setLoadingQuizState(false);
      }
    };

    if (user) {
      fetchQuizState();
      
      // Poll for quiz state updates every 5 seconds
      const interval = setInterval(fetchQuizState, 5000);
      return () => clearInterval(interval);
    }
  }, [user, dispatch]);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleLogout = () => {
    // Clear quiz data
    localStorage.removeItem('quizUser');
    localStorage.removeItem('quizResults');
    localStorage.removeItem('quizState');
    
    // Reset quiz context
    dispatch({ type: 'RESET_QUIZ' });
    
    // Redirect to login
    router.push('/quizlogin');
  };

  const startQuiz = async () => {
    // Check if quiz is active using MongoDB state
    const isQuizActive = quizState.isActive || quizState[`round${user?.selectedRound || 1}`]?.isActive;
    
    if (!isQuizActive) {
      alert('Quiz is not currently active. Please wait for the admin to start the quiz session.');
      return;
    }

    // Check if student has already completed the quiz
    try {
      const existingStudent = await getStudentByRollNo(user.rollNo);
      if (existingStudent && existingStudent.selectedRound === user.selectedRound && existingStudent.quizCompleted) {
        alert(`You have already completed Round ${user.selectedRound} quiz. You cannot retake the quiz.`);
        return;
      }
    } catch (error) {
      console.error('Error checking quiz completion status:', error);
      // Continue with quiz start if check fails
    }

    // Randomly select 25 questions
    const shuffledQuestions = shuffleArray(questionsData);
    const selectedQuestions = shuffledQuestions.slice(0, 25);
    
    dispatch({ type: 'SET_QUESTIONS', payload: selectedQuestions });
    dispatch({ type: 'START_QUIZ' });
    
    // Redirect based on selected round
    if (user?.selectedRound === 2) {
      router.push('/round2-quiz');
    } else {
      router.push('/round1-quiz');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Quiz Instructions | IEEE GEU Student Branch</title>
        <meta name="description" content="Quiz instructions and rules for IEEE GEU Quiz Competition" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex-1"></div>
              <h1 className="text-4xl font-bold text-white mb-4 flex-1">Quiz Instructions</h1>
              <div className="flex-1 flex justify-end">
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 inline-block">
              <div className="flex items-center justify-center space-x-2 text-blue-200">
                <FaUser />
                <span>Welcome, <strong>{user.name}</strong></span>
                <span className="text-gray-300">•</span>
                <span>Roll No: {user.rollNo}</span>
              </div>
            </div>
            
            {/* Quiz Status Indicator - Enhanced Lobby View */}
            <div className={`mt-4 p-4 rounded-lg border ${
              quizState.isActive || quizState[`round${user?.selectedRound || 1}`]?.isActive
                ? 'bg-green-500/20 border-green-400/30 text-green-200' 
                : 'bg-blue-500/20 border-blue-400/30 text-blue-200'
            }`}>
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className={`w-3 h-3 rounded-full ${
                  quizState.isActive || quizState[`round${user?.selectedRound || 1}`]?.isActive ? 'bg-green-400' : 'bg-blue-400'
                }`}></div>
                <span className="font-medium">
                  {quizState.isActive || quizState[`round${user?.selectedRound || 1}`]?.isActive ? 'QUIZ IS ACTIVE!' : 'WAITING IN LOBBY'}
                </span>
              </div>
              
              {loadingQuizState ? (
                <div className="flex items-center justify-center space-x-2">
                  <FaSpinner className="animate-spin" />
                  <span className="text-sm">Loading quiz status...</span>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-sm mb-2">
                    {false // Simplified - always show waiting state 
                      ? 'The quiz is now active! You can start when ready.'
                      : 'Please wait for the admin to start the quiz session'
                    }
                  </p>
                  
                  <div className="text-xs space-y-1">
                    <p>Selected Round: {user?.selectedRound || 1}</p>
                    <p>Round Status: {quizState[`round${user?.selectedRound || 1}`]?.isActive ? 'Active' : 'Inactive'}</p>
                    {quizState[`round${user?.selectedRound || 1}`]?.globalTimer > 0 && (
                      <p>Time Remaining: {Math.floor(quizState[`round${user?.selectedRound || 1}`].globalTimer / 60)}:{(quizState[`round${user?.selectedRound || 1}`].globalTimer % 60).toString().padStart(2, '0')}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Instructions */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <FaShieldAlt className="mr-3 text-blue-400" />
                Quiz Rules & Instructions
              </h2>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <FaClock className="text-yellow-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-white font-semibold">Time Limit</h3>
                    <p className="text-gray-300 text-sm">You have exactly <strong>30 minutes</strong> to complete all 25 questions.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-white font-semibold">Question Format</h3>
                    <p className="text-gray-300 text-sm">All questions are multiple choice with 4 options each. Only one answer is correct.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <FaExclamationTriangle className="text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-white font-semibold">Security Rules</h3>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• You must remain in <strong>fullscreen mode</strong> during the quiz</li>
                      <li>• Exiting fullscreen will trigger warnings</li>
                      <li>• After 2 warnings, your quiz will be auto-submitted</li>
                      <li>• Switching tabs or windows is monitored</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <FaRocket className="text-purple-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-white font-semibold">Navigation</h3>
                    <p className="text-gray-300 text-sm">You can navigate between questions using Next/Previous buttons. Your answers are automatically saved.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Lobby/Waiting Area */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Lobby Status Card */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <FaClock className="mr-2 text-blue-400" />
                  Lobby Status
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Selected Round:</span>
                    <span className="text-white font-semibold">Round {user?.selectedRound || 1}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Quiz Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      quizState.isActive || quizState[`round${user?.selectedRound || 1}`]?.isActive
                        ? 'bg-green-500/20 text-green-300'
                        : 'bg-blue-500/20 text-blue-300'
                    }`}>
                      {quizState.isActive || quizState[`round${user?.selectedRound || 1}`]?.isActive ? 'ACTIVE' : 'WAITING'}
                    </span>
                  </div>
                  
                  {quizState[`round${user?.selectedRound || 1}`]?.globalTimer > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Time Remaining:</span>
                      <span className="text-yellow-300 font-mono">
                        {Math.floor(quizState[`round${user?.selectedRound || 1}`].globalTimer / 60)}:{(quizState[`round${user?.selectedRound || 1}`].globalTimer % 60).toString().padStart(2, '0')}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 pt-4 border-t border-white/20">
                  <button
                    onClick={() => window.location.reload()}
                    className="w-full px-4 py-2 text-sm bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    <FaSpinner className="w-3 h-3" />
                    <span>Refresh Status</span>
                  </button>
                </div>
              </div>
              {/* Quick Stats */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Quiz Overview</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-500/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-400">20</div>
                    <div className="text-blue-200 text-sm">Questions</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-500/20 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-400">30</div>
                    <div className="text-yellow-200 text-sm">Minutes</div>
                  </div>
                  <div className="text-center p-4 bg-green-500/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-400">MCQ</div>
                    <div className="text-green-200 text-sm">Format</div>
                  </div>
                  <div className="text-center p-4 bg-purple-500/20 rounded-lg">
                    <div className="text-2xl font-bold text-purple-400">1</div>
                    <div className="text-purple-200 text-sm">Attempt</div>
                  </div>
                </div>
              </div>

              {/* Important Notes */}
              <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-yellow-300 mb-3 flex items-center">
                  <FaExclamationTriangle className="mr-2" />
                  Important Notes
                </h3>
                <ul className="text-yellow-100 text-sm space-y-2">
                  <li>• Once you start the quiz, the timer cannot be paused</li>
                  <li>• Make sure you have a stable internet connection</li>
                  <li>• Your progress is automatically saved every few seconds</li>
                  <li>• You can review and change answers before final submission</li>
                  <li>• The quiz will auto-submit when time expires</li>
                </ul>
              </div>

              {/* Acknowledgment */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acknowledged}
                    onChange={(e) => setAcknowledged(e.target.checked)}
                    className="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="text-white text-sm">
                    I have read and understood all the instructions. I agree to follow the quiz rules and understand that violations may result in disqualification.
                  </span>
                </label>
              </div>

              {/* Start Button */}
              <motion.button
                whileHover={{ scale: (quizState.isActive || quizState[`round${user?.selectedRound || 1}`]?.isActive) && acknowledged ? 1.05 : 1 }}
                whileTap={{ scale: (quizState.isActive || quizState[`round${user?.selectedRound || 1}`]?.isActive) && acknowledged ? 0.95 : 1 }}
                onClick={startQuiz}
                disabled={!acknowledged || !(quizState.isActive || quizState[`round${user?.selectedRound || 1}`]?.isActive)}
                className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <FaRocket />
                <span>
                  {!(quizState.isActive || quizState[`round${user?.selectedRound || 1}`]?.isActive)
                    ? 'Quiz Not Available' 
                    : !acknowledged 
                      ? 'Accept Terms to Continue'
                      : 'Start Quiz Now'
                  }
                </span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}