import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { FaUserShield, FaPlay, FaStop, FaClock, FaUsers } from 'react-icons/fa';

export default function AdminQuizDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [quizActive, setQuizActive] = useState(false);
  const [timer, setTimer] = useState(1800); // 30 minutes

  const handleAdminLogin = () => {
    if (adminPassword === 'admin@ieee2025') {
      setIsAuthenticated(true);
      setAdminPassword('');
    } else {
      alert('Invalid admin password!');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isAuthenticated) {
    return (
      <>
        <Head>
          <title>Admin Login | IEEE Quiz Dashboard</title>
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-md w-full"
          >
            <div className="text-center mb-8">
              <FaUserShield className="text-6xl text-blue-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-2">Admin Access</h1>
              <p className="text-gray-300">Enter admin password to access quiz dashboard</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <input
                  type="password"
                  placeholder="Admin Password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              
              <button
                onClick={handleAdminLogin}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300"
              >
                Access Dashboard
              </button>
            </div>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Quiz Admin Dashboard | IEEE GEU</title>
        <meta name="description" content="Admin dashboard for managing IEEE quiz competitions" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Admin Dashboard</h1>
                <p className="text-gray-600">Manage and monitor IEEE quiz competitions</p>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Quiz Control Panel */}
          <div className="grid gap-6 lg:grid-cols-3 mb-8">
            {/* Quiz Status */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Quiz Control Panel</h2>
              
              <div className="grid gap-6 md:grid-cols-2">
                {/* Quiz Status Card */}
                <div className={`p-6 rounded-xl border-2 ${
                  quizActive 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Quiz Status</h3>
                  </div>
                  
                  <div className="text-2xl font-bold mb-2">
                    {quizActive ? (
                      <span className="text-green-600">ACTIVE</span>
                    ) : (
                      <span className="text-gray-600">INACTIVE</span>
                    )}
                  </div>
                </div>

                {/* Global Timer */}
                <div className="p-6 rounded-xl bg-blue-50 border-2 border-blue-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Global Timer</h3>
                    <FaClock className="text-blue-500 text-xl" />
                  </div>
                  
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {formatTime(timer)}
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    {quizActive ? 'Time Remaining' : 'Not Started'}
                  </div>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex space-x-4 mt-6">
                {!quizActive ? (
                  <button
                    onClick={() => setQuizActive(true)}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <FaPlay />
                    <span>Start Quiz</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setQuizActive(false)}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <FaStop />
                    <span>Stop Quiz</span>
                  </button>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <FaUsers className="mr-2 text-blue-500" />
                  Participants
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total:</span>
                    <span className="font-bold text-2xl text-blue-600">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active:</span>
                    <span className="font-bold text-lg text-green-600">0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results and Leaderboard */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Live Leaderboard */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Live Leaderboard</h2>
              <div className="text-center text-gray-400 py-8">
                No results available yet
              </div>
            </div>

            {/* Recent Results */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Results</h2>
              <div className="text-center text-gray-400 py-8">
                No submissions yet
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}