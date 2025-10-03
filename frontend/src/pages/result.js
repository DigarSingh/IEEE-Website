import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  FaTrophy, 
  FaClock, 
  FaCheckCircle, 
  FaTimes, 
  FaHome, 
  FaChartBar,
  FaRedo,
  FaShare,
  FaSignOutAlt
} from 'react-icons/fa';
import { db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function Result() {
  const router = useRouter();
  const [results, setResults] = useState(null);
  const [score, setScore] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedResults = localStorage.getItem('quizResults');
    if (!savedResults) {
      router.push('/quizlogin');
      return;
    }

    const parsedResults = JSON.parse(savedResults);
    setResults(parsedResults);
    
    // Calculate score
    let correctAnswers = 0;
    parsedResults.questions.forEach(question => {
      const userAnswer = parsedResults.answers[question.id];
      if (userAnswer === question.correct) {
        correctAnswers++;
      }
    });
    
    setScore(correctAnswers);
    setPercentage(Math.round((correctAnswers / parsedResults.questions.length) * 100));
    setLoading(false);

    // Save to Firebase
    saveResultsToFirebase(parsedResults, correctAnswers);
  }, [router]);

  const saveResultsToFirebase = async (results, correctAnswers) => {
    try {
      const resultData = {
        userName: results.user.name,
        rollNo: results.user.rollNo,
        score: correctAnswers,
        totalQuestions: results.questions.length,
        percentage: Math.round((correctAnswers / results.questions.length) * 100),
        timeSpent: results.timeSpent,
        warnings: results.warnings,
        completedAt: results.completedAt,
        timestamp: new Date()
      };

      await addDoc(collection(db, 'quizResults'), resultData);
      setSaved(true);
    } catch (error) {
      console.error('Error saving results:', error);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getGrade = (percentage) => {
    if (percentage >= 90) return { grade: 'A+', color: 'text-green-500', bg: 'bg-green-500' };
    if (percentage >= 80) return { grade: 'A', color: 'text-green-400', bg: 'bg-green-400' };
    if (percentage >= 70) return { grade: 'B+', color: 'text-blue-500', bg: 'bg-blue-500' };
    if (percentage >= 60) return { grade: 'B', color: 'text-blue-400', bg: 'bg-blue-400' };
    if (percentage >= 50) return { grade: 'C', color: 'text-yellow-500', bg: 'bg-yellow-500' };
    return { grade: 'F', color: 'text-red-500', bg: 'bg-red-500' };
  };

  const shareResults = () => {
    const text = `I scored ${score}/${results?.questions.length} (${percentage}%) in the IEEE GEU Quiz! 🎉`;
    if (navigator.share) {
      navigator.share({ title: 'Quiz Results', text });
    } else {
      navigator.clipboard.writeText(text);
      alert('Results copied to clipboard!');
    }
  };

  const handleLogout = () => {
    // Clear quiz data
    localStorage.removeItem('quizUser');
    localStorage.removeItem('quizResults');
    localStorage.removeItem('quizState');
    
    // Redirect to login
    router.push('/quizlogin');
  };

  if (loading || !results) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const gradeInfo = getGrade(percentage);

  return (
    <>
      <Head>
        <title>Quiz Results | IEEE GEU Student Branch</title>
        <meta name="description" content="Your quiz results and score" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-8 px-4">
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
              <div className="flex-1 flex flex-col items-center">
                <FaTrophy className="text-yellow-400 text-6xl mx-auto mb-4" />
                <h1 className="text-4xl font-bold text-white mb-2">Quiz Completed!</h1>
                <p className="text-blue-200">Here are your results</p>
              </div>
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
          </motion.div>

          {/* Score Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 mb-8"
          >
            <div className="grid gap-6 md:grid-cols-3">
              {/* Score */}
              <div className="text-center">
                <div className={`w-24 h-24 ${gradeInfo.bg}/20 border-2 border-current rounded-full flex items-center justify-center mx-auto mb-4 ${gradeInfo.color}`}>
                  <span className="text-2xl font-bold">{gradeInfo.grade}</span>
                </div>
                <h3 className="text-white text-lg font-semibold mb-2">Your Grade</h3>
                <p className="text-gray-300">{percentage}% Score</p>
              </div>

              {/* Correct Answers */}
              <div className="text-center">
                <div className="w-24 h-24 bg-green-500/20 border-2 border-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCheckCircle className="text-green-400 text-3xl" />
                </div>
                <h3 className="text-white text-lg font-semibold mb-2">Correct Answers</h3>
                <p className="text-gray-300">{score} out of {results.questions.length}</p>
              </div>

              {/* Time Taken */}
              <div className="text-center">
                <div className="w-24 h-24 bg-blue-500/20 border-2 border-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaClock className="text-blue-400 text-3xl" />
                </div>
                <h3 className="text-white text-lg font-semibold mb-2">Time Taken</h3>
                <p className="text-gray-300">{formatTime(results.timeSpent)}</p>
              </div>
            </div>

            {/* User Info */}
            <div className="mt-8 pt-6 border-t border-white/20">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white font-semibold">{results.user.name}</p>
                  <p className="text-gray-300 text-sm">Roll No: {results.user.rollNo}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-300 text-sm">Completed on</p>
                  <p className="text-white text-sm">{new Date(results.completedAt).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Question Review */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Answer Review</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {results.questions.map((question, index) => {
                const userAnswer = results.answers[question.id];
                const isCorrect = userAnswer === question.correct;
                const wasAnswered = userAnswer !== undefined;
                
                return (
                  <div key={question.id} className={`p-4 rounded-lg border-l-4 ${
                    !wasAnswered 
                      ? 'bg-gray-500/20 border-gray-500'
                      : isCorrect 
                      ? 'bg-green-500/20 border-green-500' 
                      : 'bg-red-500/20 border-red-500'
                  }`}>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-white font-medium">Q{index + 1}: {question.question}</h3>
                      <div className="flex items-center space-x-2">
                        {!wasAnswered ? (
                          <span className="text-gray-400 text-sm">Not Answered</span>
                        ) : isCorrect ? (
                          <FaCheckCircle className="text-green-400" />
                        ) : (
                          <FaTimes className="text-red-400" />
                        )}
                      </div>
                    </div>
                    
                    <div className="grid gap-2 md:grid-cols-2">
                      <div>
                        <p className="text-green-300 text-sm font-medium">Correct Answer:</p>
                        <p className="text-green-200 text-sm">{question.options[question.correct]}</p>
                      </div>
                      {wasAnswered && (
                        <div>
                          <p className={`text-sm font-medium ${
                            isCorrect ? 'text-green-300' : 'text-red-300'
                          }`}>Your Answer:</p>
                          <p className={`text-sm ${
                            isCorrect ? 'text-green-200' : 'text-red-200'
                          }`}>{question.options[userAnswer]}</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/">
              <span className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2 cursor-pointer">
                <FaHome />
                <span>Back to Home</span>
              </span>
            </Link>
            
            <Link href="/leaderboard">
              <span className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2 cursor-pointer">
                <FaChartBar />
                <span>View Leaderboard</span>
              </span>
            </Link>
            
            <button
              onClick={shareResults}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <FaShare />
              <span>Share Results</span>
            </button>
          </motion.div>

          {/* Status */}
          {saved && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 text-center"
            >
              <p className="text-green-400 text-sm">✓ Results saved successfully</p>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}