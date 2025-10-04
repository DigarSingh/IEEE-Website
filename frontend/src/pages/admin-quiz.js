import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
// MongoDB imports for admin functionality
import { 
  getQuizState,
  updateQuizState,
  getAllStudents,
  getQuizResults
} from '../lib/mongodb-storage';

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
      password: 'ieeegg@321'
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
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboardType, setLeaderboardType] = useState('overall'); // overall, round, recent
  
  // UI State
  const [showSettings, setShowSettings] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  
  // Leaderboard functions
  const fetchLeaderboard = async (type = 'overall', round = null) => {
    try {
      const result = await getQuizResults();
      
      if (result.success) {
        // Filter and sort results for leaderboard
        let filteredResults = result.data;
        
        if (round) {
          filteredResults = result.data.filter(r => r.selectedRound === round);
        }
        
        const leaderboard = filteredResults
          .sort((a, b) => {
            if (b.percentage !== a.percentage) {
              return b.percentage - a.percentage;
            }
            return a.timeSpent - b.timeSpent;
          })
          .slice(0, 20);
        
        setLeaderboard(leaderboard);
        
        // Calculate statistics
        const stats = {
          totalParticipants: result.data.length,
          averageScore: result.data.reduce((sum, r) => sum + r.percentage, 0) / result.data.length || 0,
          highestScore: Math.max(...result.data.map(r => r.percentage), 0),
          completedQuizzes: result.data.filter(r => r.quizCompleted).length
        };
        
        setStats(prev => ({
          ...prev,
          ...stats
        }));
      } else {
        console.error('Error fetching leaderboard:', result.error);
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  const updateLeaderboard = () => {
    fetchLeaderboard(leaderboardType, selectedRound);
  };

  const exportLeaderboardCSV = () => {
    if (leaderboard.length === 0) {
      alert("No data to export");
      return;
    }

    const headers = [
      "Rank", "Name", "Roll No", "Score", "Total Questions", "Percentage", "Grade",
      "Time Taken", "Round", "Status", "Warnings", "Completed At"
    ];
    
    const csvRows = [];
    csvRows.push(headers.join(','));
    
    leaderboard.forEach((participant, index) => {
      const row = [
        index + 1,
        `"${participant.name}"`,
        `"${participant.rollNo}"`,
        participant.score || 0,
        participant.totalQuestions || 20,
        participant.percentage || 0,
        `"${participant.grade || 'N/A'}"`,
        `"${participant.timeTaken || 'N/A'}"`,
        participant.round || 1,
        participant.completed ? 'Completed' : 'In Progress',
        participant.warnings || 0,
        `"${new Date(participant.completedAt).toLocaleString()}"`
      ];
      csvRows.push(row.join(','));
    });
    
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `leaderboard_${leaderboardType}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Auto-refresh leaderboard every 30 seconds
  useEffect(() => {
    if (isAuthenticated) {
      const interval = setInterval(() => {
        fetchLeaderboard(leaderboardType, selectedRound);
      }, 30000); // 30 seconds
      
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, leaderboardType, selectedRound]);

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

  // Initialize leaderboard on component mount
  useEffect(() => {
    if (isAuthenticated) {
      fetchLeaderboard();
    }
  }, [isAuthenticated]);

  // Update leaderboard when type or round changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchLeaderboard(leaderboardType, selectedRound);
    }
  }, [leaderboardType, selectedRound, isAuthenticated]);

  // Load quiz state and setup real-time listeners
  useEffect(() => {
    if (isAuthenticated) {
      loadQuizState(); // Load quiz state from MongoDB
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
      const result = await getQuizState();
      if (result.success) {
        const data = result.data;
        
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
    // Poll MongoDB for quiz results every 5 seconds
    const pollResults = async () => {
      try {
        const result = await getQuizResults();
        if (result.success) {
          setResults(result.data);
          
          // Calculate statistics
          const now = new Date();
          const thirtyMinutesAgo = new Date(now.getTime() - 30 * 60 * 1000);
          
          const recentResults = result.data.filter(r => 
            new Date(r.completedAt) > thirtyMinutesAgo
          );
          
          const totalScore = result.data.reduce((sum, r) => sum + (r.percentage || 0), 0);
          const avgScore = result.data.length > 0 ? Math.round(totalScore / result.data.length) : 0;
          
          setStats({
            totalParticipants: result.data.length,
            activeParticipants: recentResults.length,
            completedQuizzes: result.data.length,
            averageScore: avgScore
          });
          
          // Create leaderboard
          const sortedResults = [...result.data]
            .sort((a, b) => {
              if (b.percentage === a.percentage) {
                return (a.timeSpent || 0) - (b.timeSpent || 0); // Less time is better
              }
              return (b.percentage || 0) - (a.percentage || 0); // Higher percentage is better
            })
            .slice(0, 10);
          
          setLeaderboard(sortedResults);
        }
      } catch (error) {
        console.error('Error polling results:', error);
      }
    };
    
    // Poll every 5 seconds
    const interval = setInterval(pollResults, 5000);
    
    // Initial poll
    pollResults();
    
    return () => {
      clearInterval(interval);
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
      
      const result = await updateQuizState('START_ROUND', selectedRound, {
        duration: roundSettings.duration,
        questionsCount: roundSettings.questionsCount
      });
      
      if (!result.success) {
        throw new Error(result.error);
      }
      
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
      
      alert(`Round ${selectedRound} started successfully!`);
      
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
      
      const result = await updateQuizState('STOP_ROUND', quizState.currentRound);
      
      if (!result.success) {
        throw new Error(result.error);
      }
      
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
      
      const result = await updateQuizState('UPDATE_SETTINGS', null, settingsData);
      
      if (!result.success) {
        throw new Error(result.error);
      }
      
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
        <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
          <div className="w-full max-w-md p-8 border bg-white/10 backdrop-blur-md border-white/20 rounded-2xl">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 text-6xl text-blue-400">🔒</div>
              <h1 className="mb-2 text-2xl font-bold text-white">Admin Access</h1>
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
                  className="w-full px-4 py-3 text-white placeholder-gray-300 border rounded-lg bg-white/10 border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              
              <button
                onClick={handleAdminLogin}
                className="w-full px-6 py-3 font-semibold text-white transition-all duration-300 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg"
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

      <div className="min-h-screen py-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="px-4 mx-auto max-w-7xl">
          {/* Header */}
          <div className="p-6 mb-8 bg-white shadow-lg rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="mb-2 text-3xl font-bold text-gray-900">
                  Quiz Admin Dashboard
                  {quizState.isActive && (
                    <span className="px-3 py-1 ml-3 text-sm text-green-800 bg-green-100 rounded-full">
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
                  onClick={() => setShowSettings(true)}
                  className="flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-gray-600 rounded-lg hover:bg-gray-700"
                >
                  <span>⚙️</span>
                  <span>Settings</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Round Selector */}
          <div className="mb-6">
            <div className="p-6 bg-white shadow-lg rounded-2xl">
              <h2 className="mb-4 text-xl font-bold text-gray-900">Round Management</h2>
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
          <div className="grid gap-6 mb-8 lg:grid-cols-4">
            {/* Quiz Status */}
            <div className="p-6 bg-white shadow-lg lg:col-span-2 rounded-2xl">
              <h2 className="mb-6 text-xl font-bold text-gray-900">Quiz Control Panel</h2>
              
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
                  
                  <div className="mb-2 text-2xl font-bold">
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
                <div className="p-6 border-2 border-blue-200 rounded-xl bg-blue-50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Round {selectedRound} Timer</h3>
                    <div className="text-xl text-blue-500">⏰</div>
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
              <div className="flex mt-6 space-x-4">
                {!quizState[`round${selectedRound}`]?.isActive ? (
                  <button
                    onClick={handleStartQuiz}
                    disabled={loading}
                    className="flex items-center px-6 py-3 space-x-2 font-semibold text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50"
                  >
                    <span>▶️</span>
                    <span>{loading ? 'Starting...' : `Start Round ${selectedRound}`}</span>
                  </button>
                ) : (
                  <button
                    onClick={handleStopQuiz}
                    disabled={loading}
                    className="flex items-center px-6 py-3 space-x-2 font-semibold text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50"
                  >
                    <span>⏹️</span>
                    <span>{loading ? 'Stopping...' : `Stop Round ${selectedRound}`}</span>
                  </button>
                )}
                
                <button
                  onClick={() => setShowExportModal(true)}
                  disabled={results.length === 0}
                  className="flex items-center px-6 py-3 space-x-2 font-semibold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  <span>📥</span>
                  <span>Export Results</span>
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 lg:col-span-2">
              <div className="p-4 bg-white shadow-lg rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Participants</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.totalParticipants}</p>
                  </div>
                  <div className="text-2xl">👥</div>
                </div>
              </div>
              
              <div className="p-4 bg-white shadow-lg rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active (30m)</p>
                    <p className="text-2xl font-bold text-green-600">{stats.activeParticipants}</p>
                  </div>
                  <div className="text-2xl">🟢</div>
                </div>
              </div>
              
              <div className="p-4 bg-white shadow-lg rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Average Score</p>
                    <p className="text-2xl font-bold text-yellow-600">{stats.averageScore}%</p>
                  </div>
                  <div className="text-2xl">🎯</div>
                </div>
              </div>
              
              <div className="p-4 bg-white shadow-lg rounded-xl">
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

          {/* Enhanced Leaderboard Section */}
          <div className="p-6 mb-8 bg-white shadow-lg rounded-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="flex items-center text-2xl font-bold text-gray-900">
                <span className="mr-3 text-yellow-500">🏆</span>
                Live Leaderboard
              </h2>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">Type:</label>
                  <select
                    value={leaderboardType}
                    onChange={(e) => setLeaderboardType(e.target.value)}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="overall">Overall</option>
                    <option value="round">Round Specific</option>
                    <option value="recent">Recent</option>
                  </select>
                </div>
                <button
                  onClick={updateLeaderboard}
                  className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600"
                >
                  🔄 Refresh
                </button>
                <button
                  onClick={() => setShowLeaderboard(!showLeaderboard)}
                  className="px-4 py-2 text-sm font-medium text-white transition-colors bg-purple-500 rounded-lg hover:bg-purple-600"
                >
                  {showLeaderboard ? 'Hide' : 'Show'} Details
                </button>
                <button
                  onClick={exportLeaderboardCSV}
                  className="px-4 py-2 text-sm font-medium text-white transition-colors bg-green-500 rounded-lg hover:bg-green-600"
                >
                  📊 Export CSV
                </button>
              </div>
            </div>

            {showLeaderboard && (
              <div className="space-y-4">
                {/* Leaderboard Stats */}
                <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-4">
                  <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100">
                    <div className="text-2xl font-bold text-blue-600">{stats.totalParticipants}</div>
                    <div className="text-sm text-blue-800">Total Participants</div>
                  </div>
                  <div className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100">
                    <div className="text-2xl font-bold text-green-600">{stats.completedQuizzes}</div>
                    <div className="text-sm text-green-800">Completed</div>
                  </div>
                  <div className="p-4 rounded-lg bg-gradient-to-r from-yellow-50 to-yellow-100">
                    <div className="text-2xl font-bold text-yellow-600">{stats.averageScore}%</div>
                    <div className="text-sm text-yellow-800">Average Score</div>
                  </div>
                  <div className="p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100">
                    <div className="text-2xl font-bold text-purple-600">{stats.topScore}%</div>
                    <div className="text-sm text-purple-800">Top Score</div>
                  </div>
                </div>

                {/* Leaderboard Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-sm font-semibold text-left text-gray-700">Rank</th>
                        <th className="px-4 py-3 text-sm font-semibold text-left text-gray-700">Participant</th>
                        <th className="px-4 py-3 text-sm font-semibold text-left text-gray-700">Score</th>
                        <th className="px-4 py-3 text-sm font-semibold text-left text-gray-700">Percentage</th>
                        <th className="px-4 py-3 text-sm font-semibold text-left text-gray-700">Time</th>
                        <th className="px-4 py-3 text-sm font-semibold text-left text-gray-700">Round</th>
                        <th className="px-4 py-3 text-sm font-semibold text-left text-gray-700">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboard.map((participant, index) => (
                        <tr key={participant.id} className={`border-b hover:bg-gray-50 ${
                          index < 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50' : ''
                        }`}>
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              {index === 0 && <span className="mr-2 text-yellow-500">🥇</span>}
                              {index === 1 && <span className="mr-2 text-gray-400">🥈</span>}
                              {index === 2 && <span className="mr-2 text-orange-500">🥉</span>}
                              <span className={`font-bold ${
                                index < 3 ? 'text-lg' : 'text-base'
                              }`}>
                                #{participant.rank || index + 1}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div>
                              <div className="font-semibold text-gray-900">{participant.name}</div>
                              <div className="text-sm text-gray-500">{participant.rollNo}</div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="text-lg font-bold text-blue-600">
                              {participant.score || 0}/{participant.totalQuestions || 20}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className={`font-bold ${
                              (participant.percentage || 0) >= 90 ? 'text-green-600' :
                              (participant.percentage || 0) >= 80 ? 'text-blue-600' :
                              (participant.percentage || 0) >= 70 ? 'text-yellow-600' :
                              (participant.percentage || 0) >= 60 ? 'text-orange-600' :
                              'text-red-600'
                            }`}>
                              {participant.percentage || 0}%
                            </div>
                            <div className="text-xs text-gray-500">
                              Grade: {participant.grade || 'N/A'}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="text-sm text-gray-600">
                              {participant.timeTaken || 'N/A'}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded-full">
                              Round {participant.round || 1}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              <span className={`w-2 h-2 rounded-full mr-2 ${
                                participant.completed ? 'bg-green-500' : 'bg-yellow-500'
                              }`}></span>
                              <span className="text-sm text-gray-600">
                                {participant.completed ? 'Completed' : 'In Progress'}
                              </span>
                            </div>
                            {participant.warnings > 0 && (
                              <div className="mt-1 text-xs text-red-500">
                                ⚠️ {participant.warnings} warnings
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {leaderboard.length === 0 && (
                  <div className="py-12 text-center">
                    <div className="mb-4 text-6xl">🏆</div>
                    <h3 className="mb-2 text-xl font-semibold text-gray-700">No Results Yet</h3>
                    <p className="text-gray-500">Leaderboard will populate as participants complete the quiz</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Results and Leaderboard */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Live Leaderboard */}
            <div className="p-6 bg-white shadow-lg rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="flex items-center text-xl font-bold text-gray-900">
                  <span className="mr-2 text-purple-500">📊</span>
                  Live Leaderboard
                </h2>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-500">Live</span>
                </div>
              </div>
              
              <div className="space-y-3 overflow-y-auto max-h-96">
                {leaderboard.map((result, index) => (
                  <div key={result.id} className="flex items-center justify-between p-3 transition-colors rounded-lg bg-gray-50 hover:bg-gray-100">
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
                      <div className="text-lg font-bold text-blue-600">{result.percentage}%</div>
                      <div className="text-sm text-gray-500">
                        {Math.floor((result.timeSpent || 0) / 60)}:{String((result.timeSpent || 0) % 60).padStart(2, '0')}
                      </div>
                    </div>
                  </div>
                ))}
                
                {leaderboard.length === 0 && (
                  <div className="py-8 text-center text-gray-400">
                    <div className="mb-2 text-4xl">📋</div>
                    <p>No results available yet</p>
                    <p className="text-sm">Results will appear here when participants complete the quiz</p>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Results */}
            <div className="p-6 bg-white shadow-lg rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="flex items-center text-xl font-bold text-gray-900">
                  <span className="mr-2 text-green-500">📝</span>
                  Recent Submissions
                </h2>
                <span className="text-sm text-gray-500">
                  Last {Math.min(results.length, 10)} submissions
                </span>
              </div>
              
              <div className="space-y-3 overflow-y-auto max-h-96">
                {results.slice(0, 10).map((result) => (
                  <div key={result.id} className="p-3 transition-colors border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-start justify-between">
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
                          <div className="flex items-center justify-end text-xs text-red-500">
                            <span>⚠️</span>
                            <span className="ml-1">{result.warnings} warnings</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {results.length === 0 && (
                  <div className="py-8 text-center text-gray-400">
                    <div className="mb-2 text-4xl">📄</div>
                    <p>No submissions yet</p>
                    <p className="text-sm">Participant submissions will appear here in real-time</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Debug Information */}
          <div className="p-6 bg-white shadow-lg rounded-2xl">
            <h2 className="flex items-center mb-6 text-xl font-bold text-gray-900">
              <span className="mr-2 text-red-500">🐛</span>
              Debug Information
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-gray-50">
                  <h3 className="mb-2 font-semibold text-gray-700">Current States</h3>
                  <div className="space-y-1 text-sm">
                    <div>Current Round: <span className="font-mono">{quizState.currentRound}</span></div>
                    <div>Global Active: <span className={`font-mono ${quizState.isActive ? 'text-green-600' : 'text-red-600'}`}>{quizState.isActive ? 'true' : 'false'}</span></div>
                    <div>Round 1: <span className={`font-mono ${quizState.round1?.isActive ? 'text-green-600' : 'text-red-600'}`}>{quizState.round1?.isActive ? 'true' : 'false'}</span></div>
                    <div>Round 2: <span className={`font-mono ${quizState.round2?.isActive ? 'text-green-600' : 'text-red-600'}`}>{quizState.round2?.isActive ? 'true' : 'false'}</span></div>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-gray-50">
                  <h3 className="mb-2 font-semibold text-gray-700">MongoDB Raw Data</h3>
                  <pre className="p-2 overflow-x-auto text-xs text-gray-600 bg-white border rounded max-h-32">
                    {JSON.stringify(quizState, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Settings Modal */}
          {showSettings && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <div className="w-full max-w-md p-6 bg-white rounded-2xl">
                <h3 className="mb-6 text-xl font-bold text-gray-900">Quiz Settings</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
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
                    <label className="block mb-2 text-sm font-medium text-gray-700">
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
                    <label className="block mb-2 text-sm font-medium text-gray-700">
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
                
                <div className="flex mt-6 space-x-4">
                  <button
                    onClick={() => setShowSettings(false)}
                    className="flex-1 px-4 py-2 text-gray-800 transition-colors bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateSettings}
                    disabled={loading}
                    className="flex-1 px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : 'Save Settings'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Export Modal */}
          {showExportModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <div className="w-full max-w-md p-6 bg-white rounded-2xl">
                <h3 className="mb-4 text-xl font-bold text-gray-900">Export Results</h3>
                <p className="mb-6 text-gray-600">
                  Export {results.length} quiz results as CSV file?
                </p>
                
                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowExportModal(false)}
                    className="flex-1 px-4 py-2 text-gray-800 transition-colors bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={exportResults}
                    className="flex items-center justify-center flex-1 px-4 py-2 space-x-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
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