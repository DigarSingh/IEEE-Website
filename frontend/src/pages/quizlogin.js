import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaUser,
  FaIdCard,
  FaLock,
  FaArrowRight,
  FaExclamationTriangle,
  FaEye,
  FaEyeSlash,
  FaTrophy,
  FaCode,
  FaSpinner,
  FaClock,
} from "react-icons/fa";
import { useQuiz } from "../contexts/QuizContext";
import { storeStudentData, getStudentByRollNo } from "../lib/mongodb-storage";

export default function QuizLogin() {
  const router = useRouter();
  const { state, dispatch } = useQuiz();
  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRound, setSelectedRound] = useState(1);
  // Removed quiz state checking - no longer needed

  // Redirect if already logged in
  useEffect(() => {
    const savedUser = localStorage.getItem("quizUser");
    if (savedUser) {
      router.push("/instructions");
    }
  }, [router]);

  // No need for quiz state checking

  // Always allow login - no need to check quiz state
  const isQuizAvailable = true;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const validateCredentials = async (name, rollNo, password, selectedRound) => {
    try {
      // Fetch current quiz settings to get the correct password for the selected round
      const response = await fetch('/api/quiz/settings');
      const result = await response.json();
      
      if (!result.success) {
        console.error('Failed to fetch quiz settings:', result.error);
        // Fallback to default passwords
        const fallbackPasswords = {
          1: "ieee@321",
          2: "ieeegg@321"
        };
        const validPassword = fallbackPasswords[selectedRound];
        return validPassword === password && name.length >= 2 && rollNo.match(/^\d{8}$/);
      }
      
      const validPassword = selectedRound === 1 
        ? result.data.round1.password 
        : result.data.round2.password;
      
      console.log(`🔑 Validating Round ${selectedRound} password`);
      
      return (
        validPassword === password &&
        name.length >= 2 &&
        rollNo.match(/^\d{8}$/)
      );
    } catch (error) {
      console.error('Error validating credentials:', error);
      // Fallback validation in case of API error
      const fallbackPasswords = {
        1: "ieee@321",
        2: "ieeegg@321"
      };
      const validPassword = fallbackPasswords[selectedRound];
      return validPassword === password && name.length >= 2 && rollNo.match(/^\d{8}$/);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { name, rollNo, password } = formData;

      if (!name || !rollNo || !password) {
        throw new Error("All fields are required");
      }

      const isValid = await validateCredentials(name, rollNo, password, selectedRound);
      if (!isValid) {
        throw new Error(
          "Invalid credentials. Please check your details and password."
        );
      }

      // Check if student already exists and has completed the quiz
      const existingStudent = await getStudentByRollNo(rollNo.trim());
      
      // If student exists and has completed the quiz for this round, prevent retaking
      if (existingStudent && existingStudent.selectedRound === selectedRound && existingStudent.quizCompleted) {
        throw new Error(
          `You have already completed Round ${selectedRound} quiz. You cannot retake the quiz.`
        );
      }

      // Store user data with selected round
      const userData = {
        name: name.trim(),
        rollNo: rollNo.trim(),
        selectedRound: selectedRound,
        loginTime: new Date().toISOString(),
      };

      // Store in MongoDB
      console.log("🔄 Attempting to store student data in MongoDB...");
      const mongoResult = await storeStudentData(userData);
      console.log("📊 MongoDB result:", mongoResult);

      if (!mongoResult.success) {
        console.error("❌ MongoDB storage failed:", mongoResult.error);
        throw new Error(`Failed to store student data: ${mongoResult.error}`);
      }

      // Add MongoDB student ID to user data
      userData.studentId = mongoResult.id;

      // Store in localStorage and context
      localStorage.setItem("quizUser", JSON.stringify(userData));
      dispatch({ type: "SET_USER", payload: userData });

      console.log("✅ Student data stored in MongoDB:", mongoResult.id);

      // Redirect based on selected round
      if (selectedRound === 1) {
        router.push("/round1-quiz");
      } else {
        router.push("/instructions");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Remove loading state - show login form immediately

  return (
    <>
      <Head>
        <title>Quiz Login | IEEE GEU Student Branch</title>
        <meta
          name="description"
          content="Login to participate in IEEE GEU Quiz Competition"
        />
      </Head>

      <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.2) 2%, transparent 0%), 
                             radial-gradient(circle at 75px 75px, rgba(255,255,255,0.1) 2%, transparent 0%)`,
              backgroundSize: "100px 100px",
            }}
          ></div>
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
              <img
                src="/images/logo.png"
                alt="IEEE GEU"
                className="w-auto h-16 mx-auto"
              />
            </Link>
            <h1 className="mb-2 text-3xl font-bold text-white">
              Kindle Jr 4.0
            </h1>
            <p className="text-blue-200">IEEE GEU Student Branch Quiz Portal</p>
          </div>

          {/* Round Selection */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-white">
                Select Quiz Round
              </h2>
              <button
                onClick={() => window.location.reload()}
                className="px-3 py-1 text-xs bg-white/10 text-white rounded hover:bg-white/20 transition-colors"
                title="Refresh quiz status"
              >
                🔄 Refresh
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <motion.button
                type="button"
                onClick={() => setSelectedRound(1)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedRound === 1
                    ? "border-blue-400 bg-blue-500/20 text-white"
                    : "border-white/20 bg-white/5 text-gray-300 hover:border-white/40"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaTrophy className="mx-auto mb-2 text-2xl" />
                <div className="font-semibold">Round 1</div>
                <div className="text-sm opacity-80">MCQ Based</div>
                <div className="text-xs mt-1">20 Questions • 30 mins</div>
              </motion.button>

              <motion.button
                type="button"
                onClick={() => setSelectedRound(2)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedRound === 2
                    ? "border-purple-400 bg-purple-500/20 text-white"
                    : "border-white/20 bg-white/5 text-gray-300 hover:border-white/40"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaCode className="mx-auto mb-2 text-2xl" />
                <div className="font-semibold">Round 2</div>
                <div className="text-sm opacity-80">MCQ + Code + One Word</div>
                <div className="text-xs mt-1">20 Questions • 45 mins</div>
              </motion.button>
            </div>
          </motion.div>

          {/* Login Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 border shadow-2xl bg-white/10 backdrop-blur-md border-white/20 rounded-2xl"
          >
            {/* Welcome Message */}
            <div className="mb-6 p-4 bg-blue-500/20 border border-blue-400/30 rounded-lg">
              <div className="flex items-center space-x-2 text-blue-200">
                <FaClock />
                <span className="font-medium">Welcome to IEEE Quiz</span>
              </div>
              <p className="mt-2 text-sm text-blue-100">
                Login to join the quiz lobby. You'll be notified when the quiz
                starts.
              </p>
            </div>

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
                    disabled={false}
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
                    disabled={false}
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
                    disabled={false}
                    className="w-full py-3 pl-10 pr-12 text-white placeholder-gray-300 border rounded-lg bg-white/10 border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Password provided at exam hall"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={false}
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
                disabled={loading}
                className="flex items-center justify-center w-full px-4 py-3 space-x-2 font-semibold text-white transition-all duration-300 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Login to Quiz</span>
                    <FaArrowRight />
                  </>
                )}
              </button>
            </form>

            <div className="pt-6 mt-6 border-t border-white/20">
              <div className="flex flex-col items-center space-y-3">
                <p className="text-sm text-center text-gray-300">
                  Need help? Contact the exam coordinators
                </p>

                <div className="flex items-center space-x-2">
                  <div className="flex-1 h-px bg-white/20"></div>
                  <span className="text-xs text-gray-400">or</span>
                  <div className="flex-1 h-px bg-white/20"></div>
                </div>

                <Link href="/admin-quiz">
                  <motion.button
                    className="flex items-center justify-center px-4 py-2 space-x-2 text-sm font-medium text-blue-300 transition-all duration-300 border border-blue-300/30 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 hover:border-blue-300/50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaLock className="w-3 h-3" />
                    <span>Login as Admin</span>
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
