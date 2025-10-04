import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { FaTrophy, FaMedal, FaAward, FaClock, FaUsers, FaChartLine, FaDownload, FaArrowLeft } from 'react-icons/fa';

export default function Leaderboard() {
  const router = useRouter();
  const [leaderboard, setLeaderboard] = useState([]);
  const [stats, setStats] = useState({
    totalParticipants: 0,
    averageScore: 0,
    topScore: 0,
    completedQuizzes: 0
  });
  const [loading, setLoading] = useState(true);
  const [leaderboardType, setLeaderboardType] = useState('overall');
  const [selectedRound, setSelectedRound] = useState(1);

  useEffect(() => {
    fetchLeaderboard();
  }, [leaderboardType, selectedRound]);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      let url = `/api/quiz/leaderboard?type=${leaderboardType}&limit=50`;
      if (leaderboardType === 'round') {
        url += `&round=${selectedRound}`;
      }
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success) {
        setLeaderboard(data.data.leaderboard);
        setStats(data.data.statistics);
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (index) => {
    if (index === 0) return <FaTrophy className="text-yellow-500 text-2xl" />;
    if (index === 1) return <FaMedal className="text-gray-400 text-xl" />;
    if (index === 2) return <FaAward className="text-orange-500 text-xl" />;
    return <span className="text-gray-500 font-bold">#{index + 1}</span>;
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 80) return 'text-blue-600';
    if (percentage >= 70) return 'text-yellow-600';
    if (percentage >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const exportCSV = () => {
    if (leaderboard.length === 0) {
      alert("No data to export");
      return;
    }

    const headers = [
      "Rank", "Name", "Roll No", "Score", "Percentage", "Grade", "Time Taken", "Round"
    ];
    
    const csvRows = [];
    csvRows.push(headers.join(','));
    
    leaderboard.forEach((participant, index) => {
      const row = [
        index + 1,
        `"${participant.name}"`,
        `"${participant.rollNo}"`,
        participant.score || 0,
        participant.percentage || 0,
        `"${participant.grade || 'N/A'}"`,
        `"${participant.timeTaken || 'N/A'}"`,
        participant.round || 1
      ];
      csvRows.push(row.join(','));
    });
    
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `leaderboard_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Head>
        <title>Leaderboard | IEEE GEU Quiz</title>
        <meta name="description" content="Live leaderboard for IEEE GEU Quiz competition" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                  <FaTrophy className="mr-3 text-yellow-500" />
                  Live Leaderboard
                </h1>
                <p className="text-gray-600">
                  Real-time rankings and statistics for IEEE GEU Quiz
                </p>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => router.push('/')}
                  className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <FaArrowLeft className="mr-2" />
                  Back to Home
                </button>
                <button
                  onClick={exportCSV}
                  className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <FaDownload className="mr-2" />
                  Export CSV
                </button>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold">{stats.totalParticipants}</div>
                  <div className="text-blue-100">Total Participants</div>
                </div>
                <FaUsers className="text-4xl opacity-80" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold">{stats.completedQuizzes}</div>
                  <div className="text-green-100">Completed</div>
                </div>
                <FaClock className="text-4xl opacity-80" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-2xl shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold">{stats.averageScore}%</div>
                  <div className="text-yellow-100">Average Score</div>
                </div>
                <FaChartLine className="text-4xl opacity-80" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold">{stats.topScore}%</div>
                  <div className="text-purple-100">Top Score</div>
                </div>
                <FaTrophy className="text-4xl opacity-80" />
              </div>
            </motion.div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Type:</label>
                <select
                  value={leaderboardType}
                  onChange={(e) => setLeaderboardType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="overall">Overall</option>
                  <option value="round">Round Specific</option>
                  <option value="recent">Recent</option>
                </select>
              </div>
              
              {leaderboardType === 'round' && (
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">Round:</label>
                  <select
                    value={selectedRound}
                    onChange={(e) => setSelectedRound(parseInt(e.target.value))}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value={1}>Round 1</option>
                    <option value={2}>Round 2</option>
                  </select>
                </div>
              )}
              
              <button
                onClick={fetchLeaderboard}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
              >
                🔄 Refresh
              </button>
            </div>
          </div>

          {/* Leaderboard Table */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <FaTrophy className="mr-3 text-yellow-500" />
                Rankings
              </h2>
            </div>
            
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                <span className="ml-3 text-gray-600">Loading leaderboard...</span>
              </div>
            ) : leaderboard.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🏆</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Results Yet</h3>
                <p className="text-gray-500">Leaderboard will populate as participants complete the quiz</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Rank</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Participant</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Score</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Percentage</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Time</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Round</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((participant, index) => (
                      <motion.tr
                        key={participant.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`border-b hover:bg-gray-50 transition-colors ${
                          index < 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50' : ''
                        }`}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            {getRankIcon(index)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-semibold text-gray-900">{participant.name}</div>
                            <div className="text-sm text-gray-500">{participant.rollNo}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-bold text-lg text-blue-600">
                            {participant.score || 0}/{participant.totalQuestions || 20}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className={`font-bold text-lg ${getScoreColor(participant.percentage || 0)}`}>
                            {participant.percentage || 0}%
                          </div>
                          <div className="text-xs text-gray-500">
                            Grade: {participant.grade || 'N/A'}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">
                            {participant.timeTaken || 'N/A'}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                            Round {participant.round || 1}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}