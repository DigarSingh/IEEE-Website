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
  FaLightbulb
} from 'react-icons/fa';
import { round2Questions, round2Config } from '../data/round2Questions';

export default function Round2Quiz() {
  const router = useRouter();
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

  // Check authentication
  useEffect(() => {
    const savedUser = localStorage.getItem('quizUser');
    if (!savedUser) {
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

  const handleSubmitQuiz = async () => {
    try {
      const score = calculateScore();
      const userData = JSON.parse(localStorage.getItem('quizUser'));
      
      const result = {
        userId: userData.name,
        email: userData.email,
        score: score,
        totalPoints: round2Config.totalPoints,
        percentage: ((score / round2Config.totalPoints) * 100).toFixed(2),
        answers: answers,
        timeSpent: (round2Config.timeLimit * 60) - timeRemaining,
        round: 2,
        submittedAt: new Date().toISOString(),
        passed: score >= round2Config.passingScore
      };

      // Save to localStorage
      localStorage.setItem('round2Result', JSON.stringify(result));
      localStorage.setItem('round2Completed', 'true');

      // Results are handled by MongoDB

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
      <div className="bg-white rounded-xl shadow-lg p-8">
        {/* Question Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            {getQuestionIcon()}
            <span className="text-sm font-medium text-gray-600">
              {getQuestionTypeLabel()} • {question.points} points
            </span>
          </div>
          {question.hint && (
            <button
              onClick={() => toggleHint(question.id)}
              className="flex items-center space-x-2 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors"
            >
              <FaLightbulb className="text-sm" />
              <span className="text-sm">Hint</span>
            </button>
          )}
        </div>

        {/* Question Text */}
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          {question.question}
        </h2>

        {/* Code Snippet */}
        {question.code && (
          <div className="mb-6">
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono">
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
              className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
            >
              <p className="text-yellow-800 text-sm">
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
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
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
                  <span className="text-gray-700">{option}</span>
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
                className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
                autoComplete="off"
              />
              <p className="text-sm text-gray-500 mt-2">
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Kindle Jr 4.0 - Round 2 | IEEE Quiz</title>
        <meta name="description" content="Kindle Jr 4.0 Round 2 Quiz" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Quiz Title */}
              <div className="flex items-center space-x-4">
                <h1 className="text-xl font-bold text-gray-900">
                  Kindle Jr 4.0 - Round 2
                </h1>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                  Advanced Round
                </span>
              </div>

              {/* Timer */}
              <div className="flex items-center space-x-6">
                <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  timeRemaining < 300 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
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
              className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg"
            >
              <div className="flex items-center space-x-2">
                <FaExclamationTriangle />
                <span>{warningMessage}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">
                Question {currentQuestion + 1} of {round2Questions.length}
              </span>
              <span className="text-sm text-gray-500">
                {Object.keys(answers).length} answered
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / round2Questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          {renderQuestion()}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestion === 0}
              className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <FaArrowLeft />
              <span>Previous</span>
            </button>

            <div className="flex items-center space-x-4">
              {currentQuestion === round2Questions.length - 1 ? (
                <button
                  onClick={() => setShowSubmitModal(true)}
                  className="flex items-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <FaFlag />
                  <span>Submit Quiz</span>
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <span>Next</span>
                  <FaArrowRight />
                </button>
              )}
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
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white rounded-xl p-8 max-w-md w-full"
              >
                <div className="text-center">
                  <FaFlag className="text-4xl text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Submit Round 2 Quiz?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    You have answered {Object.keys(answers).length} out of {round2Questions.length} questions.
                    Are you sure you want to submit your quiz?
                  </p>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setShowSubmitModal(false)}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmitQuiz}
                      className="flex-1 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
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