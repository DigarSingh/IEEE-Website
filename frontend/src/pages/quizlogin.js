import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaUser, FaIdCard, FaLock, FaArrowRight, FaExclamationTriangle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useQuiz } from '../contexts/QuizContext';

export default function QuizLogin() {
  const router = useRouter();
  const { state, dispatch } = useQuiz();
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    const savedUser = localStorage.getItem('quizUser');
    if (savedUser) {
      router.push('/instructions');
    }
  }, [router]);

  // Check if quiz is active
  const isQuizAvailable = state.isQuizActive;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const validateCredentials = (name, rollNo, password) => {
    // Simple validation - in production, this would be against a real database
    const validPasswords = 'ieee@321';
    return validPasswords.includes(password) && 
           name.length >= 2 && 
           rollNo.match(/^\d{8}$/);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { name, rollNo, password } = formData;
      
      if (!name || !rollNo || !password) {
        throw new Error('All fields are required');
      }

      if (!validateCredentials(name, rollNo, password)) {
        throw new Error('Invalid credentials. Please check your details and password.');
      }

      // Store user data
      const userData = {
        name: name.trim(),
        rollNo: rollNo.trim(),
        loginTime: new Date().toISOString()
      };

      localStorage.setItem('quizUser', JSON.stringify(userData));
      dispatch({ type: 'SET_USER', payload: userData });

      // Redirect to instructions
      router.push('/instructions');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Quiz Login | IEEE GEU Student Branch</title>
        <meta name="description" content="Login to participate in IEEE GEU Quiz Competition" />
      </Head>

      <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.2) 2%, transparent 0%), 
                             radial-gradient(circle at 75px 75px, rgba(255,255,255,0.1) 2%, transparent 0%)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 w-full max-w-md"
        >
          {/* Header */}
          <div className="mb-8 text-center">
            <Link href="/" className="inline-block mb-4">
              <img src="/images/logo.png" alt="IEEE GEU" className="w-auto h-16 mx-auto" />
            </Link>
            <h1 className="mb-2 text-3xl font-bold text-white">Quiz Portal</h1>
            <p className="text-blue-200">IEEE GEU Student Branch</p>
          </div>

          {/* Login Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 border shadow-2xl bg-white/10 backdrop-blur-md border-white/20 rounded-2xl"
          >
            {!isQuizAvailable && (
              <div className="mb-6 p-4 bg-yellow-500/20 border border-yellow-400/30 rounded-lg">
                <div className="flex items-center space-x-2 text-yellow-200">
                  <FaExclamationTriangle />
                  <span className="font-medium">Quiz Not Available</span>
                </div>
                <p className="mt-2 text-sm text-yellow-100">
                  The quiz is currently not active. Please wait for the admin to start the quiz session.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Full Name
                </label>
                <div className="relative">
                  <FaUser className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isQuizAvailable}
                    className="w-full py-3 pl-10 pr-4 text-white placeholder-gray-300 border rounded-lg bg-white/10 border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  University Roll Number
                </label>
                <div className="relative">
                  <FaIdCard className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                  <input
                    type="text"
                    name="rollNo"
                    value={formData.rollNo}
                    onChange={handleInputChange}
                    disabled={!isQuizAvailable}
                    className="w-full py-3 pl-10 pr-4 text-white placeholder-gray-300 border rounded-lg bg-white/10 border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Enter your roll number"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Exam Password
                </label>
                <div className="relative">
                  <FaLock className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    disabled={!isQuizAvailable}
                    className="w-full py-3 pl-10 pr-12 text-white placeholder-gray-300 border rounded-lg bg-white/10 border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Password provided at exam hall"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={!isQuizAvailable}
                    className="absolute text-gray-400 transition-colors transform -translate-y-1/2 right-3 top-1/2 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center p-3 space-x-2 border rounded-lg bg-red-500/20 border-red-500/50"
                >
                  <FaExclamationTriangle className="flex-shrink-0 text-red-400" />
                  <span className="text-sm text-red-200">{error}</span>
                </motion.div>
              )}

              <button
                type="submit"
                disabled={loading || !isQuizAvailable}
                className="flex items-center justify-center w-full px-4 py-3 space-x-2 font-semibold text-white transition-all duration-300 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>{isQuizAvailable ? 'Login to Quiz' : 'Quiz Not Available'}</span>
                    <FaArrowRight />
                  </>
                )}
              </button>
            </form>

            <div className="pt-6 mt-6 border-t border-white/20">
              <p className="text-sm text-center text-gray-300">
                Need help? Contact the exam coordinators
              </p>
            </div>
          </motion.div>

          
        </motion.div>
      </div>
    </>
  );
}