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

  const handleSubmitQuiz = () => {
    dispatch({ type: 'COMPLETE_QUIZ' });
    
    // Save final results
    const results = {
      user: state.user,
      answers: state.answers,
      questions: state.questions,
      timeSpent: 30 * 60 - state.timeRemaining,
      completedAt: new Date().toISOString(),
      warnings: state.fullscreenWarnings
    };
    
    localStorage.setItem('quizResults', JSON.stringify(results));
    router.push('/result');
  };

  const getAnsweredCount = () => {
    return Object.keys(state.answers).length;
  };

  if (!state.quizStarted || state.questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
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
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-red-600 border border-red-500 rounded-xl p-6 max-w-md w-full text-center"
              >
                <FaExclamationTriangle className="text-white text-4xl mx-auto mb-4" />
                <h3 className="text-white text-xl font-bold mb-2">Security Warning</h3>
                <p className="text-red-100 mb-4">{warningMessage}</p>
                <button
                  onClick={() => setShowWarning(false)}
                  className="bg-white text-red-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Continue Quiz
                </button>
                {!state.isFullscreen && (
                  <button
                    onClick={() => {
                      document.documentElement.requestFullscreen();
                      setShowWarning(false);
                    }}
                    className="bg-red-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors ml-2"
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
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl p-6 max-w-md w-full"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">Submit Quiz?</h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to submit your quiz? You have answered {getAnsweredCount()} out of {state.questions.length} questions.
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowSubmitModal(false)}
                    className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Continue Quiz
                  </button>
                  <button
                    onClick={handleSubmitQuiz}
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Submit Now
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <div className="bg-white/10 backdrop-blur-md border-b border-white/20 p-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-white text-xl font-bold">IEEE GEU Quiz</h1>
              <div className="text-blue-200 text-sm">
                {state.user?.name} • {state.user?.rollNo}
              </div>
            </div>
            
            {/* Timer */}
            <div className="flex items-center space-x-4">
              {state.fullscreenWarnings > 0 && (
                <div className="bg-red-500/20 border border-red-500 rounded-lg px-3 py-1">
                  <span className="text-red-200 text-sm">
                    Warnings: {state.fullscreenWarnings}/2
                  </span>
                </div>
              )}
              <div className="bg-orange-500/20 border border-orange-500 rounded-lg px-4 py-2 flex items-center space-x-2">
                <FaClock className="text-orange-400" />
                <span className="text-white font-mono text-lg">
                  {formatTime(state.timeRemaining)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto p-4">
          <div className="grid gap-6 lg:grid-cols-4">
            {/* Question Navigator */}
            <div className="lg:col-span-1">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 sticky top-4">
                <h3 className="text-white text-lg font-semibold mb-4">Questions</h3>
                
                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-300 mb-2">
                    <span>Progress</span>
                    <span>{getAnsweredCount()}/{state.questions.length}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
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
                  className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <FaFlag />
                  <span>Submit Quiz</span>
                </button>
              </div>
            </div>

            {/* Question Area */}
            <div className="lg:col-span-3">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-white text-lg font-semibold">
                      Question {state.currentQuestion + 1} of {state.questions.length}
                    </h2>
                    {currentAnswer !== undefined && (
                      <div className="flex items-center space-x-2 text-green-400">
                        <FaCheckCircle />
                        <span className="text-sm">Answered</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-white text-xl leading-relaxed">
                    {currentQuestion?.question}
                  </p>
                </div>

                {/* Options */}
                <div className="space-y-3 mb-8">
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
                    className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    <FaArrowLeft />
                    <span>Previous</span>
                  </button>

                  <div className="text-gray-300 text-sm">
                    {getAnsweredCount()} of {state.questions.length} answered
                  </div>

                  <button
                    onClick={() => navigateQuestion('next')}
                    disabled={state.currentQuestion === state.questions.length - 1}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-800 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors"
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