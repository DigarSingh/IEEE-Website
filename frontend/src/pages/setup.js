import { useState } from 'react';
import Head from 'next/head';
import { initializeQuizDatabase, resetQuizData } from '../utils/firebaseInit';

export default function DatabaseSetup() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleInitialize = async () => {
    setLoading(true);
    const result = await initializeQuizDatabase();
    setResult(result);
    setLoading(false);
  };

  const handleReset = async () => {
    setLoading(true);
    const result = await resetQuizData();
    setResult(result);
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Database Setup | IEEE Quiz</title>
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                🔧 Database Setup
              </h1>
              <p className="text-gray-600">
                Initialize the Firebase database for the IEEE Quiz system
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-3">Initialize Database</h3>
                <p className="text-blue-700 mb-4 text-sm">
                  This will set up the initial database structure, quiz questions, and admin settings.
                </p>
                <button
                  onClick={handleInitialize}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors disabled:opacity-50"
                >
                  {loading ? 'Initializing...' : 'Initialize Database'}
                </button>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="font-semibold text-yellow-900 mb-3">Reset Quiz Data</h3>
                <p className="text-yellow-700 mb-4 text-sm">
                  This will reset the quiz state and clear any active sessions.
                </p>
                <button
                  onClick={handleReset}
                  disabled={loading}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg transition-colors disabled:opacity-50"
                >
                  {loading ? 'Resetting...' : 'Reset Quiz Data'}
                </button>
              </div>

              {result && (
                <div className={`border rounded-lg p-6 ${
                  result.success 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-red-50 border-red-200'
                }`}>
                  <h3 className={`font-semibold mb-3 ${
                    result.success ? 'text-green-900' : 'text-red-900'
                  }`}>
                    {result.success ? '✅ Success' : '❌ Error'}
                  </h3>
                  <p className={`text-sm ${
                    result.success ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {result.success ? result.message : result.error}
                  </p>
                </div>
              )}

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Quick Access</h3>
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="/admin-quiz"
                    className="bg-purple-600 hover:bg-purple-700 text-white text-center py-3 px-4 rounded-lg transition-colors"
                  >
                    Admin Dashboard
                  </a>
                  <a
                    href="/quiz"
                    className="bg-green-600 hover:bg-green-700 text-white text-center py-3 px-4 rounded-lg transition-colors"
                  >
                    Take Quiz
                  </a>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">📋 Setup Checklist</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>✅ Firebase configuration in lib/firebase.js</li>
                  <li>✅ Quiz questions in data/quizQuestions.js</li>
                  <li>✅ Admin dashboard at /admin-quiz</li>
                  <li>✅ Quiz interface at /quiz</li>
                  <li>🔲 Database initialization (click button above)</li>
                  <li>🔲 Test admin login (password: admin@ieee2025)</li>
                  <li>🔲 Test quiz with password: ieee@321</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}