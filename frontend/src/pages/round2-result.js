import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  FaTrophy, 
  FaStar, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaClock, 
  FaHome,
  FaDownload,
  FaShare,
  FaMedal,
  FaCode,
  FaKeyboard,
  FaListUl
} from 'react-icons/fa';
import { round2Questions, round2Config } from '../data/round2Questions';

export default function Round2Result() {
  const router = useRouter();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailedResults, setDetailedResults] = useState([]);

  useEffect(() => {
    // Get result from localStorage
    const savedResult = localStorage.getItem('round2Result');
    if (!savedResult) {
      router.push('/quizlogin');
      return;
    }

    const parsedResult = JSON.parse(savedResult);
    setResult(parsedResult);
    
    // Calculate detailed results
    const detailed = round2Questions.map(question => {
      const userAnswer = parsedResult.answers[question.id];
      let isCorrect = false;
      
      if (question.type === 'mcq') {
        isCorrect = parseInt(userAnswer) === question.correctAnswer;
      } else {
        // For oneword and code questions
        const normalizedUserAnswer = userAnswer ? userAnswer.toString().toLowerCase().trim() : '';
        const normalizedCorrectAnswer = question.correctAnswer.toString().toLowerCase().trim();
        isCorrect = normalizedUserAnswer === normalizedCorrectAnswer;
      }

      return {
        ...question,
        userAnswer,
        isCorrect,
        pointsEarned: isCorrect ? question.points : 0
      };
    });
    
    setDetailedResults(detailed);
    setLoading(false);
  }, [router]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getPerformanceLevel = (percentage) => {
    if (percentage >= 90) return { level: 'Excellent', color: 'text-green-600', bg: 'bg-green-100' };
    if (percentage >= 80) return { level: 'Very Good', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (percentage >= 70) return { level: 'Good', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    if (percentage >= 60) return { level: 'Average', color: 'text-orange-600', bg: 'bg-orange-100' };
    return { level: 'Needs Improvement', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const getQuestionTypeStats = () => {
    const stats = {
      mcq: { correct: 0, total: 0, points: 0 },
      oneword: { correct: 0, total: 0, points: 0 },
      code: { correct: 0, total: 0, points: 0 }
    };

    detailedResults.forEach(result => {
      stats[result.type].total++;
      if (result.isCorrect) {
        stats[result.type].correct++;
        stats[result.type].points += result.points;
      }
    });

    return stats;
  };

  const downloadResults = () => {
    const data = {
      studentName: result.userId,
      email: result.email,
      round: 2,
      score: `${result.score}/${result.totalPoints}`,
      percentage: `${result.percentage}%`,
      timeSpent: formatTime(result.timeSpent),
      passed: result.passed,
      submittedAt: new Date(result.submittedAt).toLocaleString(),
      detailedResults: detailedResults.map(q => ({
        questionId: q.id,
        type: q.type,
        question: q.question,
        userAnswer: q.userAnswer || 'Not Answered',
        correctAnswer: q.correctAnswer,
        isCorrect: q.isCorrect,
        points: q.pointsEarned
      }))
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kindle-jr-4.0-round2-result-${result.userId.replace(/\s+/g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No Result Found</h1>
          <button
            onClick={() => router.push('/quizlogin')}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Back to Quiz
          </button>
        </div>
      </div>
    );
  }

  const performance = getPerformanceLevel(parseFloat(result.percentage));
  const typeStats = getQuestionTypeStats();

  return (
    <>
      <Head>
        <title>Round 2 Results - Kindle Jr 4.0 | IEEE Quiz</title>
        <meta name="description" content="Your Round 2 quiz results" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center mb-4">
              {result.passed ? (
                <FaTrophy className="text-6xl text-yellow-500" />
              ) : (
                <FaMedal className="text-6xl text-gray-400" />
              )}
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Kindle Jr 4.0 - Round 2 Results
            </h1>
            <p className="text-xl text-gray-600">
              {result.passed ? 'Congratulations! You passed Round 2!' : 'Round 2 Completed'}
            </p>
          </motion.div>

          {/* Main Results Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-lg p-8 mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Score */}
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {result.score}/{result.totalPoints}
                </div>
                <div className="text-sm text-gray-600">Total Score</div>
              </div>

              {/* Percentage */}
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {result.percentage}%
                </div>
                <div className="text-sm text-gray-600">Percentage</div>
              </div>

              {/* Time Spent */}
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {formatTime(result.timeSpent)}
                </div>
                <div className="text-sm text-gray-600">Time Spent</div>
              </div>

              {/* Status */}
              <div className="text-center">
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                  result.passed 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {result.passed ? <FaCheckCircle className="mr-2" /> : <FaTimesCircle className="mr-2" />}
                  {result.passed ? 'PASSED' : 'NOT PASSED'}
                </div>
              </div>
            </div>

            {/* Performance Level */}
            <div className="mt-6 text-center">
              <div className={`inline-flex items-center px-6 py-3 rounded-lg ${performance.bg} ${performance.color} font-medium`}>
                <FaStar className="mr-2" />
                Performance: {performance.level}
              </div>
            </div>
          </motion.div>

          {/* Question Type Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Performance by Question Type
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* MCQ Stats */}
              <div className="text-center p-4 border border-blue-200 rounded-lg">
                <FaListUl className="text-3xl text-blue-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Multiple Choice</h3>
                <p className="text-2xl font-bold text-blue-600">
                  {typeStats.mcq.correct}/{typeStats.mcq.total}
                </p>
                <p className="text-sm text-gray-600">
                  {typeStats.mcq.points} points earned
                </p>
              </div>

              {/* One Word Stats */}
              <div className="text-center p-4 border border-green-200 rounded-lg">
                <FaKeyboard className="text-3xl text-green-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">One Word</h3>
                <p className="text-2xl font-bold text-green-600">
                  {typeStats.oneword.correct}/{typeStats.oneword.total}
                </p>
                <p className="text-sm text-gray-600">
                  {typeStats.oneword.points} points earned
                </p>
              </div>

              {/* Code Stats */}
              <div className="text-center p-4 border border-purple-200 rounded-lg">
                <FaCode className="text-3xl text-purple-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Code Output</h3>
                <p className="text-2xl font-bold text-purple-600">
                  {typeStats.code.correct}/{typeStats.code.total}
                </p>
                <p className="text-sm text-gray-600">
                  {typeStats.code.points} points earned
                </p>
              </div>
            </div>
          </motion.div>

          {/* Detailed Results */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Results</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {detailedResults.map((question, index) => (
                <div
                  key={question.id}
                  className={`p-4 border rounded-lg ${
                    question.isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-medium text-gray-600">
                          Q{index + 1} • {question.type.toUpperCase()} • {question.points} pts
                        </span>
                        {question.isCorrect ? (
                          <FaCheckCircle className="text-green-500" />
                        ) : (
                          <FaTimesCircle className="text-red-500" />
                        )}
                      </div>
                      <p className="font-medium text-gray-900 mb-2">{question.question}</p>
                      {question.code && (
                        <pre className="bg-gray-900 text-green-400 p-2 rounded text-xs font-mono mb-2 overflow-x-auto">
                          <code>{question.code}</code>
                        </pre>
                      )}
                      <div className="text-sm space-y-1">
                        <p>
                          <span className="font-medium">Your Answer:</span>{' '}
                          <span className={question.isCorrect ? 'text-green-600' : 'text-red-600'}>
                            {question.userAnswer || 'Not Answered'}
                          </span>
                        </p>
                        {!question.isCorrect && (
                          <p>
                            <span className="font-medium">Correct Answer:</span>{' '}
                            <span className="text-green-600">{question.correctAnswer}</span>
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold ${question.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                        {question.pointsEarned}/{question.points}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <button
              onClick={() => router.push('/')}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <FaHome />
              <span>Back to Home</span>
            </button>

            <button
              onClick={downloadResults}
              className="flex items-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <FaDownload />
              <span>Download Results</span>
            </button>

            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'My Kindle Jr 4.0 Round 2 Results',
                    text: `I scored ${result.score}/${result.totalPoints} (${result.percentage}%) in Kindle Jr 4.0 Round 2!`,
                    url: window.location.href
                  });
                }
              }}
              className="flex items-center space-x-2 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              <FaShare />
              <span>Share Results</span>
            </button>
          </motion.div>

          {/* Footer Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-12"
          >
            <p className="text-gray-600">
              Thank you for participating in Kindle Jr 4.0 Round 2!
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Results submitted on {new Date(result.submittedAt).toLocaleString()}
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}