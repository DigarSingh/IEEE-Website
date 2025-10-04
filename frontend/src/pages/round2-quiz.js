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
  FaCheckCircle,
  FaCode,
  FaKeyboard,
  FaListUl,
  FaLightbulb,
  FaMoon,
  FaSun
} from 'react-icons/fa';
import { round2Questions, round2Config } from '../data/round2Questions';
import { storeStudentResult } from "../lib/mongodb-storage";
import { useTheme } from '../contexts/ThemeContext';

export default function Round2Quiz() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(round2Config.timeLimit * 60); // Convert to seconds
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showHint, setShowHint] = useState({});
  const [fullscreenWarnings, setFullscreenWarnings] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [user, setUser] = useState(null);

  // Check authentication
  useEffect(() => {
    const savedUser = localStorage.getItem('quizUser');
    if (!savedUser) {
      router.push('/quizlogin');
      return;
    }

    // Parse and set user data
    try {
      const userData = JSON.parse(savedUser);
      setUser(userData);
    } catch (error) {
      console.error('Error parsing user data:', error);
      router.push('/quizlogin');
      return;
    }

    // Check if Round 1 is completed (you might want to add this check)
    const round1Completed = localStorage.getItem('round1Completed');
    if (!round1Completed) {
      // Uncomment this if you want to enforce Round 1 completion
      // router.push('/quiz');
      // return;
    }

    setQuizStarted(true);
  }, [router]);

  // Timer effect
  useEffect(() => {
    if (quizStarted && !quizCompleted && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleSubmitQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [quizStarted, quizCompleted, timeRemaining]);

  // Fullscreen monitoring
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreen = document.fullscreenElement !== null;

      if (!isFullscreen && quizStarted && !quizCompleted) {
        setFullscreenWarnings(prev => prev + 1);
        
        if (fullscreenWarnings >= 1) {
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
  }, [fullscreenWarnings, quizStarted, quizCompleted]);

  // Request fullscreen on component mount
  useEffect(() => {
    if (quizStarted && !document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.log('Fullscreen request failed:', err);
      });
    }
  }, [quizStarted]);

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

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Helper function to count answered questions
  const getAnsweredCount = () => {
    return Object.keys(answers).length;
  };

  // Function to jump to a specific question
  const jumpToQuestion = (questionIndex) => {
    if (questionIndex >= 0 && questionIndex < round2Questions.length) {
      setCurrentQuestion(questionIndex);
    }
  };

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < round2Questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const toggleHint = (questionId) => {
    setShowHint(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const calculateScore = () => {
    let totalScore = 0;
    round2Questions.forEach(question => {
      const userAnswer = answers[question.id];
      if (userAnswer) {
        if (question.type === 'mcq') {
          if (parseInt(userAnswer) === question.correctAnswer) {
            totalScore += question.points;
          }
        } else {
          // For oneword and code questions, normalize the comparison
          const normalizedUserAnswer = userAnswer.toString().toLowerCase().trim();
          const normalizedCorrectAnswer = question.correctAnswer.toString().toLowerCase().trim();
          if (normalizedUserAnswer === normalizedCorrectAnswer) {
            totalScore += question.points;
          }
        }
      }
    });
    return totalScore;
  };

  // Grade calculation for Round 2 (Advanced Round) - slightly stricter criteria
  const getGrade = (percentage) => {
    if (percentage >= 95) return "A+";
    if (percentage >= 85) return "A";
    if (percentage >= 75) return "B+";
    if (percentage >= 65) return "B";
    if (percentage >= 55) return "C";
    if (percentage >= 45) return "D";
    return "F";
  };

  const handleSubmitQuiz = async () => {
    try {
      const score = calculateScore();
      const userData = JSON.parse(localStorage.getItem('quizUser'));
      const timeSpent = (round2Config.timeLimit * 60) - timeRemaining;
      const percentage = ((score / round2Config.totalPoints) * 100).toFixed(2);
      const grade = getGrade(parseFloat(percentage));
      const completedAt = new Date().toISOString();
      
      console.log('🎯 Round 2 Quiz Submission');
      console.log('📊 Calculated score:', score);
      console.log('💯 Calculated percentage:', percentage);
      console.log('🎓 Calculated grade:', grade);
      console.log('⏱️ Time spent:', timeSpent);
      console.log('✅ Passed:', score >= round2Config.passingScore);
      
      // Prepare result data for MongoDB
      const resultData = {
        name: userData.name,
        rollNo: userData.rollNo,
        studentId: userData.studentId,
        round: 2,
        score: score,
        totalQuestions: round2Questions.length,
        totalPoints: round2Config.totalPoints,
        percentage: parseFloat(percentage),
        grade: grade,
        timeTaken: timeSpent, // Time in seconds
        timeSpent: timeSpent, // Time in seconds
        loginTime: userData.loginTime,
        completedAt: completedAt,
        answers: answers, // All answers
        passed: score >= round2Config.passingScore
      };

      console.log('📤 Submitting Round 2 results to MongoDB:', resultData);

      // Store in MongoDB (this updates the Student record)
      const mongoResult = await storeStudentResult(resultData);
      if (mongoResult.success) {
        console.log('✅ Round 2 result stored in MongoDB:', mongoResult.id);
        console.log('✅ Student record updated with Round 2 completion data');
      } else {
        console.error('❌ Failed to store Round 2 result:', mongoResult.error);
      }
      
      const result = {
        userId: userData.name,
        email: userData.email,
        score: score,
        totalPoints: round2Config.totalPoints,
        percentage: parseFloat(percentage), // Store as number for consistency
        grade: grade,
        answers: answers,
        timeSpent: timeSpent,
        round: 2,
        submittedAt: completedAt,
        passed: score >= round2Config.passingScore,
        mongoId: mongoResult.id
      };

      // Save to localStorage
      localStorage.setItem('round2Result', JSON.stringify(result));
      localStorage.setItem('round2Completed', 'true');

      console.log('💾 Round 2 results saved to localStorage');

      setQuizCompleted(true);
      router.push('/round2-result');
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert('Error submitting quiz. Please try again.');
    }
  };

  const renderQuestion = () => {
    const question = round2Questions[currentQuestion];
    if (!question) return null;

    const getQuestionIcon = () => {
      switch (question.type) {
        case 'mcq': return <FaListUl className="text-blue-500" />;
        case 'oneword': return <FaKeyboard className="text-green-500" />;
        case 'code': return <FaCode className="text-purple-500" />;
        default: return <FaListUl className="text-blue-500" />;
      }
    };

    const getQuestionTypeLabel = () => {
      switch (question.type) {
        case 'mcq': return 'Multiple Choice';
        case 'oneword': return 'One Word Answer';
        case 'code': return 'Code Output';
        default: return 'Question';
      }
    };

    return (
      <div className={`p-8 rounded-xl shadow-xl transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-white/10 backdrop-blur-md border border-white/20'
          : 'bg-white border border-gray-200 shadow-lg'
      }`}>
        {/* Question Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            {getQuestionIcon()}
            <span className={`text-sm font-medium transition-colors duration-300 ${
              theme === 'dark' ? 'text-white/80' : 'text-gray-600'
            }`}>
              {getQuestionTypeLabel()} • {question.points} points
            </span>
          </div>
          {question.hint && (
            <button
              onClick={() => toggleHint(question.id)}
              className={`flex items-center px-3 py-1 space-x-2 transition-colors rounded-lg ${
                theme === 'dark'
                  ? 'text-yellow-200 bg-yellow-600/20 backdrop-blur-md border border-yellow-400/30 hover:bg-yellow-600/30'
                  : 'text-yellow-700 bg-yellow-100 border border-yellow-300 hover:bg-yellow-200'
              }`}
            >
              <FaLightbulb className="text-sm" />
              <span className="text-sm">Hint</span>
            </button>
          )}
        </div>

        {/* Question Text */}
        <h2 className={`mb-6 text-xl font-semibold transition-colors duration-300 ${
          theme === 'dark' ? 'text-white' : 'text-gray-800'
        }`}>
          {question.question}
        </h2>

        {/* Code Snippet */}
        {question.code && (
          <div className="mb-6">
            <pre className="p-4 overflow-x-auto font-mono text-sm text-green-400 bg-gray-900 rounded-lg">
              <code>{question.code}</code>
            </pre>
          </div>
        )}

        {/* Hint */}
        <AnimatePresence>
          {showHint[question.id] && question.hint && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`p-4 mb-6 rounded-lg transition-colors duration-300 ${
                theme === 'dark'
                  ? 'border border-yellow-400/30 bg-yellow-600/20 backdrop-blur-md'
                  : 'border border-yellow-200 bg-yellow-50'
              }`}
            >
              <p className={`text-sm transition-colors duration-300 ${
                theme === 'dark' ? 'text-yellow-200' : 'text-yellow-800'
              }`}>
                <FaLightbulb className="inline mr-2" />
                <strong>Hint:</strong> {question.hint}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Answer Input */}
        <div className="space-y-4">
          {question.type === 'mcq' ? (
            // MCQ Options
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <motion.label
                  key={index}
                  className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    answers[question.id] === index.toString()
                      ? theme === 'dark'
                        ? 'border-blue-400 bg-blue-500/20 backdrop-blur-md'
                        : 'border-blue-500 bg-blue-50'
                      : theme === 'dark'
                        ? 'border-white/20 bg-white/5 backdrop-blur-md hover:border-blue-400/50 hover:bg-white/10'
                        : 'border-gray-200 hover:border-blue-300 bg-white'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={index}
                    checked={answers[question.id] === index.toString()}
                    onChange={(e) => handleAnswer(question.id, e.target.value)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                    answers[question.id] === index.toString()
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {answers[question.id] === index.toString() && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className={`transition-colors duration-300 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-700'
                  }`}>{option}</span>
                </motion.label>
              ))}
            </div>
          ) : (
            // Text Input for One Word and Code questions
            <div>
              <input
                type="text"
                placeholder={question.type === 'oneword' ? "Enter your answer" : "Enter the output"}
                value={answers[question.id] || ''}
                onChange={(e) => handleAnswer(question.id, e.target.value)}
                className={`w-full p-4 text-lg border-2 rounded-lg focus:outline-none transition-all duration-300 ${
                  theme === 'dark'
                    ? 'border-white/20 bg-white/10 backdrop-blur-md focus:border-blue-400 text-white placeholder-white/60'
                    : 'border-gray-200 bg-white focus:border-blue-500 text-gray-900 placeholder-gray-500'
                }`}
                autoComplete="off"
              />
              <p className={`mt-2 text-sm transition-colors duration-300 ${
                theme === 'dark' ? 'text-white/60' : 'text-gray-500'
              }`}>
                {question.type === 'oneword' 
                  ? "Enter a single word answer (case insensitive)"
                  : "Enter the exact output (case sensitive for strings)"
                }
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (!quizStarted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-32 h-32 border-b-2 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Kindle Jr 4.0 - Round 2 | IEEE Quiz</title>
        <meta name="description" content="Kindle Jr 4.0 Round 2 Quiz" />
      </Head>

      <div className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
          : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
      }`}>
        {/* Header */}
        <div className={`border-b shadow-sm transition-colors duration-300 ${
          theme === 'dark' 
            ? 'bg-white/10 backdrop-blur-md border-white/20' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Quiz Title */}
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-4">
                  <h1 className={`text-xl font-bold transition-colors duration-300 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Kindle Jr 4.0 - Round 2
                  </h1>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full transition-colors duration-300 ${
                    theme === 'dark' 
                      ? 'text-purple-200 bg-purple-800/50' 
                      : 'text-purple-700 bg-purple-100'
                  }`}>
                    Advanced Round
                  </span>
                </div>
                <div className={`text-sm transition-colors duration-300 ${
                  theme === 'dark' ? 'text-purple-200' : 'text-purple-600'
                }`}>
                  {user?.name} • {user?.rollNo}
                </div>
              </div>

              {/* Timer and Theme Toggle */}
              <div className="flex items-center space-x-4">
                {/* Theme Toggle Button */}
                <button
                  onClick={toggleTheme}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300'
                  }`}
                  title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                  {theme === 'dark' ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-blue-600" />}
                </button>
                
                {/* Timer */}
                <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  timeRemaining < 300 
                    ? theme === 'dark'
                      ? 'bg-red-500/20 text-red-200 border border-red-400/30'
                      : 'bg-red-100 text-red-700 border border-red-300'
                    : theme === 'dark'
                      ? 'bg-white/10 text-white border border-white/20'
                      : 'bg-blue-100 text-blue-700 border border-blue-300'
                }`}>
                  <FaClock />
                  <span className="font-mono font-bold">{formatTime(timeRemaining)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Warning Messages */}
        <AnimatePresence>
          {showWarning && (
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              className="fixed z-50 px-6 py-3 text-white transform -translate-x-1/2 bg-red-500 rounded-lg shadow-lg top-20 left-1/2"
            >
              <div className="flex items-center space-x-2">
                <FaExclamationTriangle />
                <span>{warningMessage}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-4">
            {/* Question Navigator */}
            <div className="lg:col-span-1">
              <div className={`sticky p-4 border rounded-xl top-4 transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-white/10 backdrop-blur-md border-white/20'
                  : 'bg-white border-gray-200 shadow-lg'
              }`}>
                <h3 className={`mb-4 text-lg font-semibold transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Questions
                </h3>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className={`flex justify-between mb-2 text-sm transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    <span>Progress</span>
                    <span>
                      {getAnsweredCount()}/{round2Questions.length}
                    </span>
                  </div>
                  <div className={`w-full h-2 rounded-full transition-colors duration-300 ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                  }`}>
                    <div
                      className="h-2 transition-all duration-300 bg-green-500 rounded-full"
                      style={{
                        width: `${
                          (getAnsweredCount() / round2Questions.length) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Question Grid */}
                <div className="grid grid-cols-5 gap-2">
                  {round2Questions.map((_, index) => {
                    const isAnswered = answers[round2Questions[index]?.id] !== undefined;
                    const isCurrent = index === currentQuestion;

                    return (
                      <button
                        key={index}
                        onClick={() => jumpToQuestion(index)}
                        className={`w-10 h-10 rounded-lg text-sm font-semibold transition-all ${
                          isCurrent
                            ? theme === 'dark'
                              ? "bg-blue-500 text-white ring-2 ring-blue-300"
                              : "bg-blue-600 text-white ring-2 ring-blue-400"
                            : isAnswered
                            ? theme === 'dark'
                              ? "bg-green-500 text-white"
                              : "bg-green-600 text-white"
                            : theme === 'dark'
                              ? "bg-gray-600 text-gray-300 hover:bg-gray-500"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        {index + 1}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setShowSubmitModal(true)}
                  className={`flex items-center justify-center w-full px-4 py-3 mt-6 space-x-2 font-semibold transition-colors rounded-lg ${
                    theme === 'dark'
                      ? 'text-white bg-green-600 hover:bg-green-700'
                      : 'text-white bg-green-600 hover:bg-green-700'
                  }`}
                >
                  <FaFlag />
                  <span>Submit Quiz</span>
                </button>
              </div>
            </div>

            {/* Question Area */}
            <div className="lg:col-span-3">
          {/* Question */}
          {renderQuestion()}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestion === 0}
              className={`flex items-center px-6 py-3 space-x-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed rounded-lg ${
                theme === 'dark'
                  ? 'text-white bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20'
                  : 'text-gray-700 bg-gray-100 border border-gray-300 hover:bg-gray-200'
              }`}
            >
              <FaArrowLeft />
              <span>Previous</span>
            </button>

            <div className={`text-sm transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {getAnsweredCount()} of {round2Questions.length} answered
            </div>

            <div className="flex items-center space-x-4">
              {currentQuestion === round2Questions.length - 1 ? (
                <button
                  onClick={() => setShowSubmitModal(true)}
                  className="flex items-center px-6 py-3 space-x-2 text-white transition-colors bg-green-500 rounded-lg hover:bg-green-600"
                >
                  <FaFlag />
                  <span>Submit Quiz</span>
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="flex items-center px-6 py-3 space-x-2 text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600"
                >
                  <span>Next</span>
                  <FaArrowRight />
                </button>
              )}            </div>
          </div>
            </div>
          </div>
        </div>

        {/* Submit Confirmation Modal */}
        <AnimatePresence>
          {showSubmitModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className={`w-full max-w-md p-8 rounded-xl transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-white/10 backdrop-blur-md border border-white/20'
                    : 'bg-white border border-gray-200 shadow-lg'
                }`}
              >
                <div className="text-center">
                  <FaFlag className="mx-auto mb-4 text-4xl text-green-500" />
                  <h3 className={`mb-4 text-xl font-bold transition-colors duration-300 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Submit Round 2 Quiz?
                  </h3>
                  <p className={`mb-6 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-white/80' : 'text-gray-600'
                  }`}>
                    You have answered {getAnsweredCount()} out of {round2Questions.length} questions.
                    Are you sure you want to submit your quiz?
                  </p>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setShowSubmitModal(false)}
                      className={`flex-1 px-6 py-3 transition-all rounded-lg ${
                        theme === 'dark'
                          ? 'text-white bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20'
                          : 'text-gray-700 bg-gray-100 border border-gray-300 hover:bg-gray-200'
                      }`}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmitQuiz}
                      className="flex-1 px-6 py-3 text-white transition-colors bg-green-500 rounded-lg hover:bg-green-600"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}