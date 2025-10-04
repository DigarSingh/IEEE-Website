import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaClock, 
  FaArrowLeft, 
  FaArrowRight, 
  FaFlag, 
  FaExclamationTriangle,
  FaExpand,
  FaCheckCircle
} from 'react-icons/fa';
import { useQuiz } from '../contexts/QuizContext';
import { storeStudentResult, updateStudentProgress } from '../lib/mongodb-storage';

export default function Quiz() {
  const router = useRouter();
  const { state, dispatch } = useQuiz();
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Check authentication and quiz state
  useEffect(() => {
    const savedUser = localStorage.getItem('quizUser');
    if (!savedUser) {
      router.push('/quizlogin'); 
      return;
    }

    if (!state.quizStarted || state.questions.length === 0) {
      router.push('/instructions');
      return;
    }

    if (state.quizCompleted) {
      router.push('/result');
      return;
    }
  }, [router, state]);

  // Fullscreen monitoring
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreen = document.fullscreenElement !== null;
      dispatch({ type: 'SET_FULLSCREEN_STATUS', payload: isFullscreen });

      if (!isFullscreen && state.quizStarted && !state.quizCompleted) {
        dispatch({ type: 'INCREMENT_FULLSCREEN_WARNING' });
        
        if (state.fullscreenWarnings >= 1) {
          handleSubmitQuiz();
          setWarningMessage('Quiz submitted automatically due to multiple fullscreen violations.');
        } else {
          setWarningMessage('Warning: You exited fullscreen mode. Please return to fullscreen or your quiz will be submitted.');
          setShowWarning(true);
          setTimeout(() => setShowWarning(false), 5000);
        }
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [state.fullscreenWarnings, state.quizStarted, state.quizCompleted, dispatch]);

  // Request fullscreen on component mount
  useEffect(() => {
    if (state.quizStarted && !document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.log('Fullscreen request failed:', err);
      });
    }
  }, [state.quizStarted]);

  // Prevent back navigation and refresh
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
      return '';
    };

    const handlePopState = (e) => {
      e.preventDefault();
      window.history.pushState(null, '', window.location.href);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);
    window.history.pushState(null, '', window.location.href);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Visibility change detection (tab switching)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && state.quizStarted && !state.quizCompleted) {
        setWarningMessage('Warning: Tab switching detected. Please stay on the quiz page.');
        setShowWarning(true);
        setTimeout(() => setShowWarning(false), 3000);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [state.quizStarted, state.quizCompleted]);

  // Auto-submit when time expires
  useEffect(() => {
    if (state.timeRemaining <= 0 && state.quizStarted) {
      handleSubmitQuiz();
    }
  }, [state.timeRemaining, state.quizStarted]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex) => {
    const currentQuestionId = state.questions[state.currentQuestion]?.id;
    if (currentQuestionId) {
      dispatch({
        type: 'SET_ANSWER',
        questionId: currentQuestionId,
        answer: answerIndex
      });
    }
  };

  const navigateQuestion = (direction) => {
    const newIndex = direction === 'next' 
      ? Math.min(state.currentQuestion + 1, state.questions.length - 1)
      : Math.max(state.currentQuestion - 1, 0);
    
    dispatch({ type: 'SET_CURRENT_QUESTION', payload: newIndex });
  };

  const jumpToQuestion = (index) => {
    dispatch({ type: 'SET_CURRENT_QUESTION', payload: index });
  };

  const handleSubmitQuiz = async () => {
    try {
      dispatch({ type: 'COMPLETE_QUIZ' });
      
      // Calculate score
      let score = 0;
      state.questions.forEach((question, index) => {
        const userAnswer = state.answers[question.id];
        if (userAnswer === question.correctAnswer) {
          score++;
        }
      });
      
      const percentage = Math.round((score / state.questions.length) * 100);
      const grade = getGrade(percentage);
      const timeSpent = 30 * 60 - state.timeRemaining;
      const completedAt = new Date().toISOString();
      
      // Prepare result data for MongoDB
      const resultData = {
        name: state.user.name,
        rollNo: state.user.rollNo,
        studentId: state.user.studentId,
        round: 1,
        score: score,
        totalQuestions: state.questions.length,
        percentage: percentage,
        grade: grade,
        timeTaken: formatTime(timeSpent),
        timeSpent: timeSpent,
        loginTime: state.user.loginTime,
        quizStartedAt: state.quizStartedAt,
        completedAt: completedAt,
        answers: state.answers,
        warnings: state.fullscreenWarnings
      };
      
      // Store in MongoDB
      const mongoResult = await storeStudentResult(resultData);
      if (mongoResult.success) {
        console.log('✅ Quiz result stored in MongoDB:', mongoResult.id);
      } else {
        console.error('❌ Failed to store quiz result:', mongoResult.error);
      }
      
      // Update student data in MongoDB
      if (state.user.studentId) {
        await updateStudentProgress(state.user.studentId, {
          quizCompleted: true,
          score: score,
          percentage: percentage,
          grade: grade,
          timeSpent: timeSpent,
          completedAt: completedAt
        });
      }
      
      // Save to localStorage as backup
      const results = {
        user: state.user,
        answers: state.answers,
        questions: state.questions,
        timeSpent: timeSpent,
        completedAt: completedAt,
        warnings: state.fullscreenWarnings,
        score: score,
        percentage: percentage,
        grade: grade,
        mongoId: mongoResult.id
      };
      
      localStorage.setItem('quizResults', JSON.stringify(results));
      router.push('/result');
      
    } catch (error) {
      console.error('Error submitting quiz:', error);
      // Still redirect to result page even if MongoDB fails
      router.push('/result');
    }
  };
  
  const getGrade = (percentage) => {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B+';
    if (percentage >= 60) return 'B';
    if (percentage >= 50) return 'C';
    if (percentage >= 40) return 'D';
    return 'F';
  };

  const getAnsweredCount = () => {
    return Object.keys(state.answers).length;
  };

  if (!state.quizStarted || state.questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="w-32 h-32 border-b-2 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  const currentQuestion = state.questions[state.currentQuestion];
  const currentAnswer = state.answers[currentQuestion?.id];

  return (
    <>
      <Head>
        <title>Quiz in Progress | IEEE GEU Student Branch</title>
        <meta name="description" content="IEEE GEU Quiz Competition in progress" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        {/* Warning Modal */}
        <AnimatePresence>
          {showWarning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-md p-6 text-center bg-red-600 border border-red-500 rounded-xl"
              >
                <FaExclamationTriangle className="mx-auto mb-4 text-4xl text-white" />
                <h3 className="mb-2 text-xl font-bold text-white">Security Warning</h3>
                <p className="mb-4 text-red-100">{warningMessage}</p>
                <button
                  onClick={() => setShowWarning(false)}
                  className="px-6 py-2 font-semibold text-red-600 transition-colors bg-white rounded-lg hover:bg-gray-100"
                >
                  Continue Quiz
                </button>
                {!state.isFullscreen && (
                  <button
                    onClick={() => {
                      document.documentElement.requestFullscreen();
                      setShowWarning(false);
                    }}
                    className="px-6 py-2 ml-2 font-semibold text-white transition-colors bg-red-800 rounded-lg hover:bg-red-700"
                  >
                    <FaExpand className="inline mr-2" />
                    Return to Fullscreen
                  </button>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Confirmation Modal */}
        <AnimatePresence>
          {showSubmitModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-md p-6 bg-white rounded-xl"
              >
                <h3 className="mb-4 text-xl font-bold text-gray-900">Submit Quiz?</h3>
                <p className="mb-6 text-gray-600">
                  Are you sure you want to submit your quiz? You have answered {getAnsweredCount()} out of {state.questions.length} questions.
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowSubmitModal(false)}
                    className="flex-1 px-4 py-2 font-semibold text-gray-800 transition-colors bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    Continue Quiz
                  </button>
                  <button
                    onClick={handleSubmitQuiz}
                    className="flex-1 px-4 py-2 font-semibold text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
                  >
                    Submit Now
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <div className="p-4 border-b bg-white/10 backdrop-blur-md border-white/20">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-white">IEEE GEU Quiz</h1>
              <div className="text-sm text-blue-200">
                {state.user?.name} • {state.user?.rollNo}
              </div>
            </div>
            
            {/* Timer */}
            <div className="flex items-center space-x-4">
              {state.fullscreenWarnings > 0 && (
                <div className="px-3 py-1 border border-red-500 rounded-lg bg-red-500/20">
                  <span className="text-sm text-red-200">
                    Warnings: {state.fullscreenWarnings}/2
                  </span>
                </div>
              )}
              <div className="flex items-center px-4 py-2 space-x-2 border border-orange-500 rounded-lg bg-orange-500/20">
                <FaClock className="text-orange-400" />
                <span className="font-mono text-lg text-white">
                  {formatTime(state.timeRemaining)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl p-4 mx-auto">
          <div className="grid gap-6 lg:grid-cols-4">
            {/* Question Navigator */}
            <div className="lg:col-span-1">
              <div className="sticky p-4 border bg-white/10 backdrop-blur-md border-white/20 rounded-xl top-4">
                <h3 className="mb-4 text-lg font-semibold text-white">Questions</h3>
                
                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between mb-2 text-sm text-gray-300">
                    <span>Progress</span>
                    <span>{getAnsweredCount()}/{state.questions.length}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-700 rounded-full">
                    <div 
                      className="h-2 transition-all duration-300 bg-green-500 rounded-full"
                      style={{ width: `${(getAnsweredCount() / state.questions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Question Grid */}
                <div className="grid grid-cols-5 gap-2">
                  {state.questions.map((_, index) => {
                    const isAnswered = state.answers[state.questions[index]?.id] !== undefined;
                    const isCurrent = index === state.currentQuestion;
                    
                    return (
                      <button
                        key={index}
                        onClick={() => jumpToQuestion(index)}
                        className={`w-10 h-10 rounded-lg text-sm font-semibold transition-all ${
                          isCurrent
                            ? 'bg-blue-500 text-white ring-2 ring-blue-300'
                            : isAnswered
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                        }`}
                      >
                        {index + 1}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setShowSubmitModal(true)}
                  className="flex items-center justify-center w-full px-4 py-3 mt-6 space-x-2 font-semibold text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
                >
                  <FaFlag />
                  <span>Submit Quiz</span>
                </button>
              </div>
            </div>

            {/* Question Area */}
            <div className="lg:col-span-3">
              <div className="p-8 border bg-white/10 backdrop-blur-md border-white/20 rounded-xl">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-white">
                      Question {state.currentQuestion + 1} of {state.questions.length}
                    </h2>
                    {currentAnswer !== undefined && (
                      <div className="flex items-center space-x-2 text-green-400">
                        <FaCheckCircle />
                        <span className="text-sm">Answered</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-xl leading-relaxed text-white">
                    {currentQuestion?.question}
                  </p>
                </div>

                {/* Options */}
                <div className="mb-8 space-y-3">
                  {currentQuestion?.options.map((option, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full p-4 rounded-lg text-left transition-all border-2 ${
                        currentAnswer === index
                          ? 'bg-blue-500/30 border-blue-400 text-white'
                          : 'bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          currentAnswer === index
                            ? 'border-blue-400 bg-blue-500'
                            : 'border-gray-400'
                        }`}>
                          {currentAnswer === index && (
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                          )}
                        </div>
                        <span className="text-sm font-medium">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span>{option}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => navigateQuestion('prev')}
                    disabled={state.currentQuestion === 0}
                    className="flex items-center px-6 py-3 space-x-2 font-semibold text-white transition-colors bg-gray-600 rounded-lg hover:bg-gray-700 disabled:bg-gray-800 disabled:cursor-not-allowed"
                  >
                    <FaArrowLeft />
                    <span>Previous</span>
                  </button>

                  <div className="text-sm text-gray-300">
                    {getAnsweredCount()} of {state.questions.length} answered
                  </div>

                  <button
                    onClick={() => navigateQuestion('next')}
                    disabled={state.currentQuestion === state.questions.length - 1}
                    className="flex items-center px-6 py-3 space-x-2 font-semibold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-800 disabled:cursor-not-allowed"
                  >
                    <span>Next</span>
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}