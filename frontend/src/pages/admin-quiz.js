import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { db } from '../lib/firebase';
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  onSnapshot, 
  query, 
  orderBy, 
  addDoc,
  updateDoc,
  serverTimestamp
} from 'firebase/firestore';

export default function AdminQuizDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Quiz State
  const [quizState, setQuizState] = useState({
    isActive: false,
    currentRound: 1, // Track current round
    round1: {
      isActive: false,
      startTime: null,
      endTime: null,
      duration: 30 * 60,
      globalTimer: 0
    },
    round2: {
      isActive: false,
      startTime: null,
      endTime: null,
      duration: 45 * 60,
      globalTimer: 0
    }
  });
  
  // Quiz Settings
  const [settings, setSettings] = useState({
    round1: {
      duration: 30,
      questionsCount: 20,
      password: 'ieee@321'
    },
    round2: {
      duration: 45,
      questionsCount: 20,
      password: 'ieee@321'
    }
  });
  
  // Current round selector
  const [selectedRound, setSelectedRound] = useState(1);
  
  // Statistics
  const [stats, setStats] = useState({
    totalParticipants: 0,
    activeParticipants: 0,
    completedQuizzes: 0,
    averageScore: 0
  });
  
  // Results and Leaderboard
  const [results, setResults] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  
  // UI State
  const [showSettings, setShowSettings] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // Timer effect for countdown
  useEffect(() => {
    let interval;
    const currentRoundData = quizState[`round${quizState.currentRound}`];
    
    if (currentRoundData.isActive && currentRoundData.globalTimer > 0) {
      interval = setInterval(() => {
        setQuizState(prev => ({
          ...prev,
          [`round${prev.currentRound}`]: {
            ...prev[`round${prev.currentRound}`],
            globalTimer: Math.max(0, prev[`round${prev.currentRound}`].globalTimer - 1)
          }
        }));
      }, 1000);
    } else if (currentRoundData.isActive && currentRoundData.globalTimer === 0) {
      // Auto-stop quiz when timer reaches 0
      handleStopQuiz();
    }
    return () => clearInterval(interval);
  }, [quizState.round1.isActive, quizState.round1.globalTimer, quizState.round2.isActive, quizState.round2.globalTimer, quizState.currentRound]);

  // Load quiz state and setup real-time listeners
  useEffect(() => {
    if (isAuthenticated) {
      loadQuizState();
      setupRealtimeListeners();
    }
  }, [isAuthenticated]);

  // Check authentication on mount
  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth');
    if (adminAuth === 'authenticated') {
      setIsAuthenticated(true);
    }
  }, []);

  const loadQuizState = async () => {
    try {
      const quizDoc = await getDoc(doc(db, 'admin', 'quizState'));
      if (quizDoc.exists()) {
        const data = quizDoc.data();
        
        // Handle new round-based structure
        const newQuizState = {
          isActive: data.isActive || false,
          currentRound: data.currentRound || 1,
          round1: {
            isActive: false,
            startTime: null,
            endTime: null,
            duration: 30 * 60,
            globalTimer: 0
          },
          round2: {
            isActive: false,
            startTime: null,
            endTime: null,
            duration: 45 * 60,
            globalTimer: 0
          }
        };

        // Update round data if exists
        if (data.round1) {
          newQuizState.round1 = { ...newQuizState.round1, ...data.round1 };
          if (data.round1.isActive && data.round1.startTime && data.round1.duration) {
            const now = new Date();
            const startTime = new Date(data.round1.startTime);
            const elapsed = Math.floor((now - startTime) / 1000);
            newQuizState.round1.globalTimer = Math.max(0, data.round1.duration - elapsed);
          }
        }

        if (data.round2) {
          newQuizState.round2 = { ...newQuizState.round2, ...data.round2 };
          if (data.round2.isActive && data.round2.startTime && data.round2.duration) {
            const now = new Date();
            const startTime = new Date(data.round2.startTime);
            const elapsed = Math.floor((now - startTime) / 1000);
            newQuizState.round2.globalTimer = Math.max(0, data.round2.duration - elapsed);
          }
        }

        setQuizState(newQuizState);
        
        // Update settings
        const newSettings = {
          round1: {
            duration: 30,
            questionsCount: 20,
            password: 'ieee@321'
          },
          round2: {
            duration: 45,
            questionsCount: 20,
            password: 'ieee@321'
          }
        };

        if (data.settings) {
          if (data.settings.round1) {
            newSettings.round1 = {
              duration: Math.floor((data.settings.round1.duration || 30 * 60) / 60),
              questionsCount: data.settings.round1.questionsCount || 20,
              password: data.settings.round1.password || 'ieee@321'
            };
          }
          if (data.settings.round2) {
            newSettings.round2 = {
              duration: Math.floor((data.settings.round2.duration || 45 * 60) / 60),
              questionsCount: data.settings.round2.questionsCount || 20,
              password: data.settings.round2.password || 'ieee@321'
            };
          }
        }

        setSettings(newSettings);
      }
    } catch (error) {
      console.error('Error loading quiz state:', error);
    }
  };

  const setupRealtimeListeners = () => {
    // Listen to quiz results
    const resultsQuery = query(
      collection(db, 'quizResults'),
      orderBy('completedAt', 'desc')
    );
    
    const unsubscribeResults = onSnapshot(resultsQuery, (snapshot) => {
      const allResults = [];
      snapshot.forEach((doc) => {
        allResults.push({ id: doc.id, ...doc.data() });
      });
      
      setResults(allResults);
      
      // Calculate statistics
      const now = new Date();
      const thirtyMinutesAgo = new Date(now.getTime() - 30 * 60 * 1000);
      
      const recentResults = allResults.filter(r => 
        new Date(r.completedAt) > thirtyMinutesAgo
      );
      
      const totalScore = allResults.reduce((sum, r) => sum + (r.percentage || 0), 0);
      const avgScore = allResults.length > 0 ? Math.round(totalScore / allResults.length) : 0;
      
      setStats({
        totalParticipants: allResults.length,
        activeParticipants: recentResults.length,
        completedQuizzes: allResults.length,
        averageScore: avgScore
      });
      
      // Create leaderboard
      const sortedResults = [...allResults]
        .sort((a, b) => {
          if (b.percentage === a.percentage) {
            return (a.timeSpent || 0) - (b.timeSpent || 0); // Less time is better
          }
          return (b.percentage || 0) - (a.percentage || 0); // Higher percentage is better
        })
        .slice(0, 10);
      
      setLeaderboard(sortedResults);
    });

    return () => {
      unsubscribeResults();
    };
  };

  const handleAdminLogin = () => {
    if (adminPassword === 'admin@ieee2025') {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'authenticated');
      setAdminPassword('');
    } else {
      alert('Invalid admin password!');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
    router.push('/');
  };

  const testFirebaseConnection = async () => {
    try {
      console.log('Testing Firebase connection...');
      const testData = {
        isActive: true,
        testTime: new Date().toISOString(),
        round1: { isActive: false },
        round2: { isActive: false }
      };
      
      await setDoc(doc(db, 'admin', 'quizState'), testData);
      console.log('Firebase test write successful');
      alert('Firebase connection test successful! Check console for details.');
      
      // Read it back
      const readDoc = await getDoc(doc(db, 'admin', 'quizState'));
      if (readDoc.exists()) {
        console.log('Firebase test read successful:', readDoc.data());
      }
    } catch (error) {
      console.error('Firebase connection test failed:', error);
      alert('Firebase connection test failed! Check console for error details.');
    }
  };

  const handleStartQuiz = async () => {
    try {
      setLoading(true);
      
      const startTime = new Date();
      const roundSettings = settings[`round${selectedRound}`];
      const duration = roundSettings.duration * 60; // Convert to seconds
      const endTime = new Date(startTime.getTime() + duration * 1000);
      
      const quizData = {
        isActive: true, // Global flag for compatibility
        currentRound: selectedRound,
        [`round${selectedRound}`]: {
          isActive: true,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          duration,
        },
        settings: {
          [`round${selectedRound}`]: {
            duration,
            questionsCount: roundSettings.questionsCount,
            password: roundSettings.password
          }
        }
      };
      
      await setDoc(doc(db, 'admin', 'quizState'), quizData);
      
      // Log admin action
      await addDoc(collection(db, 'adminLogs'), {
        action: `START_QUIZ_ROUND_${selectedRound}`,
        timestamp: serverTimestamp(),
        round: selectedRound,
        duration: roundSettings.duration,
        questionsCount: roundSettings.questionsCount
      });
      
      setQuizState(prev => ({
        ...prev,
        isActive: true,
        currentRound: selectedRound,
        [`round${selectedRound}`]: {
          isActive: true,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          duration,
          globalTimer: duration
        }
      }));
      
    } catch (error) {
      console.error('Error starting quiz:', error);
      alert('Error starting quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleStopQuiz = async () => {
    try {
      setLoading(true);
      
      const currentRoundData = quizState[`round${quizState.currentRound}`];
      const quizData = {
        isActive: false, // Global flag for compatibility
        currentRound: quizState.currentRound,
        [`round${quizState.currentRound}`]: {
          ...currentRoundData,
          isActive: false,
          endTime: new Date().toISOString()
        },
        settings: settings
      };
      
      await updateDoc(doc(db, 'admin', 'quizState'), quizData);
      
      // Log admin action
      await addDoc(collection(db, 'adminLogs'), {
        action: `STOP_QUIZ_ROUND_${quizState.currentRound}`,
        timestamp: serverTimestamp(),
        round: quizState.currentRound
      });
      
      setQuizState(prev => ({
        ...prev,
        isActive: false,
        [`round${prev.currentRound}`]: {
          ...prev[`round${prev.currentRound}`],
          isActive: false,
          globalTimer: 0
        }
      }));
      
    } catch (error) {
      console.error('Error stopping quiz:', error);
      alert('Error stopping quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSettings = async () => {
    try {
      setLoading(true);
      
      const settingsData = {
        duration: settings.duration * 60,
        questionsCount: settings.questionsCount,
        password: settings.password
      };
      
      await updateDoc(doc(db, 'admin', 'quizState'), {
        settings: settingsData
      });
      
      setShowSettings(false);
      alert('Settings updated successfully!');
      
    } catch (error) {
      console.error('Error updating settings:', error);
      alert('Error updating settings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const exportResults = () => {
    if (results.length === 0) {
      alert('No results to export!');
      return;
    }

    const csvContent = [
      ['Name', 'Roll No', 'Score', 'Percentage', 'Time Spent (min)', 'Warnings', 'Completed At'],
      ...results.map(result => [
        result.userName || 'N/A',
        result.rollNo || 'N/A',
        `${result.score || 0}/${result.totalQuestions || 20}`,
        `${result.percentage || 0}%`,
        Math.round((result.timeSpent || 0) / 60),
        result.warnings || 0,
        new Date(result.completedAt).toLocaleString()
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quiz-results-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    setShowExportModal(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInSeconds = Math.floor((now - time) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  if (!isAuthenticated) {
    return (
      <>
        <Head>
          <title>Admin Login | IEEE Quiz Dashboard</title>
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-md w-full">
            <div className="text-center mb-8">
              <div className="text-6xl text-blue-400 mx-auto mb-4">🔒</div>
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
          </div>
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
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Quiz Admin Dashboard
                  {quizState.isActive && (
                    <span className="ml-3 px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                      🟢 LIVE
                    </span>
                  )}
                </h1>
                <p className="text-gray-600">
                  Manage and monitor IEEE quiz competitions • {stats.totalParticipants} total participants
                </p>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={testFirebaseConnection}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Test Firebase Connection
                </button>
                <button
                  onClick={() => setShowSettings(true)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <span>⚙️</span>
                  <span>Settings</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Round Selector */}
          <div className="mb-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Round Management</h2>
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">Select Round:</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedRound(1)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedRound === 1
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Round 1 (MCQ)
                  </button>
                  <button
                    onClick={() => setSelectedRound(2)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedRound === 2
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Round 2 (Advanced)
                  </button>
                </div>
                <div className="ml-auto">
                  <span className="text-sm text-gray-500">
                    Managing: <span className="font-semibold">Round {selectedRound}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quiz Control Panel */}
          <div className="grid gap-6 lg:grid-cols-4 mb-8">
            {/* Quiz Status */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Quiz Control Panel</h2>
              
              <div className="grid gap-6 md:grid-cols-2">
                {/* Quiz Status Card */}
                <div className={`p-6 rounded-xl border-2 ${
                  quizState[`round${selectedRound}`]?.isActive 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Round {selectedRound} Status</h3>
                    <div className="text-2xl">
                      {quizState[`round${selectedRound}`]?.isActive ? '✅' : '❌'}
                    </div>
                  </div>
                  
                  <div className="text-2xl font-bold mb-2">
                    {quizState[`round${selectedRound}`]?.isActive ? (
                      <span className="text-green-600">ACTIVE</span>
                    ) : (
                      <span className="text-gray-600">INACTIVE</span>
                    )}
                  </div>
                  
                  {quizState[`round${selectedRound}`]?.isActive && quizState[`round${selectedRound}`]?.startTime && (
                    <div className="text-sm text-gray-600">
                      Started: {new Date(quizState[`round${selectedRound}`].startTime).toLocaleTimeString()}
                    </div>
                  )}
                </div>

                {/* Global Timer */}
                <div className="p-6 rounded-xl bg-blue-50 border-2 border-blue-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Round {selectedRound} Timer</h3>
                    <div className="text-blue-500 text-xl">⏰</div>
                  </div>
                  
                  <div className={`text-3xl font-bold mb-2 ${
                    (quizState[`round${selectedRound}`]?.globalTimer || 0) <= 300 ? 'text-red-600' : 'text-blue-600'
                  }`}>
                    {formatTime(quizState[`round${selectedRound}`]?.globalTimer || 0)}
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    {quizState.isActive ? (
                      quizState.globalTimer <= 300 ? '⚠️ Less than 5 minutes left' : 'Time Remaining'
                    ) : 'Not Started'}
                  </div>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex space-x-4 mt-6">
                {!quizState[`round${selectedRound}`]?.isActive ? (
                  <button
                    onClick={handleStartQuiz}
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center space-x-2 disabled:opacity-50"
                  >
                    <span>▶️</span>
                    <span>{loading ? 'Starting...' : `Start Round ${selectedRound}`}</span>
                  </button>
                ) : (
                  <button
                    onClick={handleStopQuiz}
                    disabled={loading}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center space-x-2 disabled:opacity-50"
                  >
                    <span>⏹️</span>
                    <span>{loading ? 'Stopping...' : `Stop Round ${selectedRound}`}</span>
                  </button>
                )}
                
                <button
                  onClick={() => setShowExportModal(true)}
                  disabled={results.length === 0}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center space-x-2 disabled:opacity-50"
                >
                  <span>📥</span>
                  <span>Export Results</span>
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="lg:col-span-2 grid gap-4 grid-cols-2">
              <div className="bg-white rounded-xl shadow-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Participants</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.totalParticipants}</p>
                  </div>
                  <div className="text-2xl">👥</div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active (30m)</p>
                    <p className="text-2xl font-bold text-green-600">{stats.activeParticipants}</p>
                  </div>
                  <div className="text-2xl">🟢</div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Average Score</p>
                    <p className="text-2xl font-bold text-yellow-600">{stats.averageScore}%</p>
                  </div>
                  <div className="text-2xl">🎯</div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Top Score</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {leaderboard.length > 0 ? `${leaderboard[0].percentage}%` : '0%'}
                    </p>
                  </div>
                  <div className="text-2xl">🏆</div>
                </div>
              </div>
            </div>
          </div>

          {/* Results and Leaderboard */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Live Leaderboard */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <span className="mr-2 text-purple-500">📊</span>
                  Live Leaderboard
                </h2>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-500">Live</span>
                </div>
              </div>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {leaderboard.map((result, index) => (
                  <div key={result.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        index === 0 ? 'bg-yellow-500 text-white' :
                        index === 1 ? 'bg-gray-400 text-white' :
                        index === 2 ? 'bg-amber-600 text-white' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{result.userName}</div>
                        <div className="text-sm text-gray-500">{result.rollNo}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg text-blue-600">{result.percentage}%</div>
                      <div className="text-sm text-gray-500">
                        {Math.floor((result.timeSpent || 0) / 60)}:{String((result.timeSpent || 0) % 60).padStart(2, '0')}
                      </div>
                    </div>
                  </div>
                ))}
                
                {leaderboard.length === 0 && (
                  <div className="text-center text-gray-400 py-8">
                    <div className="text-4xl mb-2">📋</div>
                    <p>No results available yet</p>
                    <p className="text-sm">Results will appear here when participants complete the quiz</p>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Results */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <span className="mr-2 text-green-500">📝</span>
                  Recent Submissions
                </h2>
                <span className="text-sm text-gray-500">
                  Last {Math.min(results.length, 10)} submissions
                </span>
              </div>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {results.slice(0, 10).map((result) => (
                  <div key={result.id} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{result.userName}</div>
                        <div className="text-sm text-gray-500">{result.rollNo}</div>
                        <div className="text-xs text-gray-400">
                          {getTimeAgo(result.completedAt)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-bold ${
                          (result.percentage || 0) >= 80 ? 'text-green-600' :
                          (result.percentage || 0) >= 60 ? 'text-blue-600' :
                          (result.percentage || 0) >= 40 ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {result.score || 0}/{result.totalQuestions || 20}
                        </div>
                        <div className="text-sm text-gray-500">{result.percentage || 0}%</div>
                        {(result.warnings || 0) > 0 && (
                          <div className="text-xs text-red-500 flex items-center justify-end">
                            <span>⚠️</span>
                            <span className="ml-1">{result.warnings} warnings</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {results.length === 0 && (
                  <div className="text-center text-gray-400 py-8">
                    <div className="text-4xl mb-2">📄</div>
                    <p>No submissions yet</p>
                    <p className="text-sm">Participant submissions will appear here in real-time</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Debug Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="mr-2 text-red-500">🐛</span>
              Debug Information
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-2">Current States</h3>
                  <div className="space-y-1 text-sm">
                    <div>Current Round: <span className="font-mono">{quizState.currentRound}</span></div>
                    <div>Global Active: <span className={`font-mono ${quizState.isActive ? 'text-green-600' : 'text-red-600'}`}>{quizState.isActive ? 'true' : 'false'}</span></div>
                    <div>Round 1: <span className={`font-mono ${quizState.round1?.isActive ? 'text-green-600' : 'text-red-600'}`}>{quizState.round1?.isActive ? 'true' : 'false'}</span></div>
                    <div>Round 2: <span className={`font-mono ${quizState.round2?.isActive ? 'text-green-600' : 'text-red-600'}`}>{quizState.round2?.isActive ? 'true' : 'false'}</span></div>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-2">Firebase Raw Data</h3>
                  <pre className="text-xs text-gray-600 bg-white p-2 rounded border overflow-x-auto max-h-32">
                    {JSON.stringify(quizState, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Settings Modal */}
          {showSettings && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl p-6 max-w-md w-full">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Quiz Settings</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration (minutes)
                    </label>
                    <input
                      type="number"
                      min="5"
                      max="120"
                      value={settings.duration}
                      onChange={(e) => setSettings({...settings, duration: parseInt(e.target.value) || 30})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Questions
                    </label>
                    <input
                      type="number"
                      min="10"
                      max="50"
                      value={settings.questionsCount}
                      onChange={(e) => setSettings({...settings, questionsCount: parseInt(e.target.value) || 20})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quiz Password
                    </label>
                    <input
                      type="text"
                      value={settings.password}
                      onChange={(e) => setSettings({...settings, password: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                </div>
                
                <div className="flex space-x-4 mt-6">
                  <button
                    onClick={() => setShowSettings(false)}
                    className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateSettings}
                    disabled={loading}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : 'Save Settings'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Export Modal */}
          {showExportModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl p-6 max-w-md w-full">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Export Results</h3>
                <p className="text-gray-600 mb-6">
                  Export {results.length} quiz results as CSV file?
                </p>
                
                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowExportModal(false)}
                    className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={exportResults}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>📥</span>
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}