import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  FaTrophy, 
  FaMedal, 
  FaCrown, 
  FaUser, 
  FaClock,
  FaHome,
  FaRefresh
} from 'react-icons/fa';
import { db } from '../lib/firebase';
import { collection, getDocs, orderBy, query, limit } from 'firebase/firestore';

export default function Leaderboard() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, top10, today

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'quizResults'),
        orderBy('percentage', 'desc'),
        orderBy('timeSpent', 'asc'),
        limit(100)
      );
      
      const querySnapshot = await getDocs(q);
      const fetchedResults = [];
      
      querySnapshot.forEach((doc) => {
        fetchedResults.push({ id: doc.id, ...doc.data() });
      });
      
      setResults(fetchedResults);
    } catch (error) {
      console.error('Error fetching results:', error);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredResults = () => {
    let filtered = [...results];
    
    if (filter === 'top10') {
      filtered = filtered.slice(0, 10);
    } else if (filter === 'today') {
      const today = new Date().toDateString();
      filtered = filtered.filter(result => 
        new Date(result.completedAt).toDateString() === today
      );
    }
    
    return filtered;
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <FaCrown className="text-yellow-500 text-xl" />;
      case 2: return <FaMedal className="text-gray-400 text-xl" />;
      case 3: return <FaMedal className="text-amber-600 text-xl" />;
      default: return <span className="text-gray-400 font-bold">{rank}</span>;
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 90) return 'text-green-400';
    if (percentage >= 70) return 'text-blue-400';
    if (percentage >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  const filteredResults = getFilteredResults();

  return (
    <>
      <Head>
        <title>Leaderboard | IEEE GEU Quiz</title>
        <meta name="description" content="Quiz leaderboard and top performers" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <FaTrophy className="text-yellow-400 text-6xl mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-white mb-2">Leaderboard</h1>
            <p className="text-blue-200">Top performers in IEEE GEU Quiz</p>
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0"
          >
            <div className="flex space-x-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  filter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                All Results
              </button>
              <button
                onClick={() => setFilter('top10')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  filter === 'top10'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                Top 10
              </button>
              <button
                onClick={() => setFilter('today')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  filter === 'today'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                Today
              </button>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={fetchResults}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center space-x-2"
              >
                <FaRefresh />
                <span>Refresh</span>
              </button>
              
              <Link href="/">
                <span className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center space-x-2 cursor-pointer">
                  <FaHome />
                  <span>Home</span>
                </span>
              </Link>
            </div>
          </motion.div>

          {/* Loading */}
          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-300">Loading leaderboard...</p>
            </div>
          )}

          {/* Top 3 Podium */}
          {!loading && filteredResults.length >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-4 mb-8"
            >
              {/* 2nd Place */}
              <div className="order-1 text-center">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 h-48 flex flex-col justify-center">
                  <FaMedal className="text-gray-400 text-4xl mx-auto mb-4" />
                  <h3 className="text-white font-bold text-lg mb-2">{filteredResults[1]?.userName}</h3>
                  <p className={`text-2xl font-bold mb-2 ${getScoreColor(filteredResults[1]?.percentage)}`}>
                    {filteredResults[1]?.percentage}%
                  </p>
                  <p className="text-gray-300 text-sm">{formatTime(filteredResults[1]?.timeSpent)}</p>
                </div>
              </div>

              {/* 1st Place */}
              <div className="order-2 text-center">
                <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-500/50 rounded-xl p-6 h-56 flex flex-col justify-center">
                  <FaCrown className="text-yellow-400 text-5xl mx-auto mb-4" />
                  <h3 className="text-white font-bold text-xl mb-2">{filteredResults[0]?.userName}</h3>
                  <p className={`text-3xl font-bold mb-2 ${getScoreColor(filteredResults[0]?.percentage)}`}>
                    {filteredResults[0]?.percentage}%
                  </p>
                  <p className="text-gray-300 text-sm">{formatTime(filteredResults[0]?.timeSpent)}</p>
                </div>
              </div>

              {/* 3rd Place */}
              <div className="order-3 text-center">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 h-44 flex flex-col justify-center">
                  <FaMedal className="text-amber-600 text-3xl mx-auto mb-4" />
                  <h3 className="text-white font-bold text-lg mb-2">{filteredResults[2]?.userName}</h3>
                  <p className={`text-xl font-bold mb-2 ${getScoreColor(filteredResults[2]?.percentage)}`}>
                    {filteredResults[2]?.percentage}%
                  </p>
                  <p className="text-gray-300 text-sm">{formatTime(filteredResults[2]?.timeSpent)}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Results Table */}
          {!loading && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Complete Rankings</h2>
              
              {filteredResults.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-300">No results found for this filter.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="text-left py-3 px-4 text-white font-semibold">Rank</th>
                        <th className="text-left py-3 px-4 text-white font-semibold">Name</th>
                        <th className="text-left py-3 px-4 text-white font-semibold">Roll No</th>
                        <th className="text-left py-3 px-4 text-white font-semibold">Score</th>
                        <th className="text-left py-3 px-4 text-white font-semibold">Percentage</th>
                        <th className="text-left py-3 px-4 text-white font-semibold">Time</th>
                        <th className="text-left py-3 px-4 text-white font-semibold">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredResults.map((result, index) => (
                        <motion.tr
                          key={result.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="border-b border-white/10 hover:bg-white/5 transition-colors"
                        >
                          <td className="py-4 px-4">
                            <div className="flex items-center">
                              {getRankIcon(index + 1)}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-2">
                              <FaUser className="text-gray-400" />
                              <span className="text-white font-medium">{result.userName}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-gray-300">{result.rollNo}</td>
                          <td className="py-4 px-4 text-gray-300">
                            {result.score}/{result.totalQuestions}
                          </td>
                          <td className="py-4 px-4">
                            <span className={`font-bold ${getScoreColor(result.percentage)}`}>
                              {result.percentage}%
                            </span>
                          </td>
                          <td className="py-4 px-4 text-gray-300">
                            <div className="flex items-center space-x-2">
                              <FaClock className="text-gray-500" />
                              <span>{formatTime(result.timeSpent)}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-gray-300 text-sm">
                            {new Date(result.completedAt).toLocaleDateString()}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          )}

          {/* Stats */}
          {!loading && filteredResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
            >
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-center">
                <h3 className="text-white font-semibold mb-2">Total Participants</h3>
                <p className="text-2xl font-bold text-blue-400">{filteredResults.length}</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-center">
                <h3 className="text-white font-semibold mb-2">Average Score</h3>
                <p className="text-2xl font-bold text-green-400">
                  {Math.round(filteredResults.reduce((acc, r) => acc + r.percentage, 0) / filteredResults.length)}%
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-center">
                <h3 className="text-white font-semibold mb-2">Highest Score</h3>
                <p className="text-2xl font-bold text-yellow-400">
                  {Math.max(...filteredResults.map(r => r.percentage))}%
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-center">
                <h3 className="text-white font-semibold mb-2">Perfect Scores</h3>
                <p className="text-2xl font-bold text-purple-400">
                  {filteredResults.filter(r => r.percentage === 100).length}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}