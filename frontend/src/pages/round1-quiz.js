import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaClock,
  FaArrowLeft,
  FaArrowRight,
  FaFlag,
  FaExclamationTriangle,
  FaExpand,
  FaCheckCircle,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { useQuiz } from "../contexts/QuizContext";
import { useTheme } from '../contexts/ThemeContext';
import {
  storeStudentResult,
  updateStudentProgress,
  getStudentByRollNo,
} from "../lib/mongodb-storage";

export default function Round1Quiz() {
  const router = useRouter();
  const { state, dispatch } = useQuiz();
  const { theme, toggleTheme } = useTheme();
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Check authentication and Round 1 quiz state
  useEffect(() => {
    const checkQuizCompletion = async () => {
      const savedUser = localStorage.getItem("quizUser");
      if (!savedUser) {
        router.push("/quizlogin");
        return;
      }

      // Check if student has already completed the quiz
      try {
        const userData = JSON.parse(savedUser);
        const existingStudent = await getStudentByRollNo(userData.rollNo);
        if (existingStudent && existingStudent.selectedRound === 1 && existingStudent.quizCompleted) {
          alert("You have already completed Round 1 quiz. You cannot retake the quiz.");
          router.push("/round1-result");
          return;
        }
      } catch (error) {
        console.error('Error checking quiz completion status:', error);
        // Continue with normal flow if check fails
      }

      if (!state.quizStarted || state.questions.length === 0) {
        router.push("/instructions");
        return;
      }

      if (state.quizCompleted) {
        router.push("/round1-result");
        return;
      }
    };

    checkQuizCompletion();
  }, [router, state]);

  // Fullscreen monitoring
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreen = document.fullscreenElement !== null;
      dispatch({ type: "SET_FULLSCREEN_STATUS", payload: isFullscreen });

      if (!isFullscreen && state.quizStarted && !state.quizCompleted) {
        dispatch({ type: "INCREMENT_FULLSCREEN_WARNING" });

        if (state.fullscreenWarnings >= 1) {
          handleSubmitQuiz();
          setWarningMessage(
            "Round 1 quiz submitted automatically due to multiple fullscreen violations."
          );
        } else {
          setWarningMessage(
            "Warning: You exited fullscreen mode. Please return to fullscreen or your Round 1 quiz will be submitted."
          );
          setShowWarning(true);
          setTimeout(() => setShowWarning(false), 5000);
        }
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, [
    state.fullscreenWarnings,
    state.quizStarted,
    state.quizCompleted,
    dispatch,
  ]);

  // Request fullscreen on component mount
  useEffect(() => {
    if (state.quizStarted && !document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.log("Fullscreen request failed:", err);
      });
    }
  }, [state.quizStarted]);

  // Prevent back navigation and refresh
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
      return "";
    };

    const handlePopState = (e) => {
      e.preventDefault();
      window.history.pushState(null, "", window.location.href);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);
    window.history.pushState(null, "", window.location.href);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // Visibility change detection (tab switching)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && state.quizStarted && !state.quizCompleted) {
        setWarningMessage(
          "Warning: Tab switching detected. Please stay on the quiz page."
        );
        setShowWarning(true);
        setTimeout(() => setShowWarning(false), 3000);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [state.quizStarted, state.quizCompleted]);

  // Auto-submit when time expires
  useEffect(() => {
    if (state.timeRemaining <= 0 && state.quizStarted) {
      handleSubmitQuiz();
    }
  }, [state.timeRemaining, state.quizStarted]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleAnswerSelect = (answerIndex) => {
    const currentQuestionId = state.questions[state.currentQuestion]?.id;
    console.log("📝 Answer selected:", {
      questionId: currentQuestionId,
      answerIndex: answerIndex,
      answerType: typeof answerIndex,
      question: state.questions[state.currentQuestion]?.question,
    });

    if (currentQuestionId) {
      dispatch({
        type: "SET_ANSWER",
        questionId: currentQuestionId,
        answer: answerIndex,
      });
    }
  };

  const navigateQuestion = (direction) => {
    const newIndex =
      direction === "next"
        ? Math.min(state.currentQuestion + 1, state.questions.length - 1)
        : Math.max(state.currentQuestion - 1, 0);

    dispatch({ type: "SET_CURRENT_QUESTION", payload: newIndex });
  };

  const jumpToQuestion = (index) => {
    dispatch({ type: "SET_CURRENT_QUESTION", payload: index });
  };

  const handleSubmitQuiz = async () => {
    try {
      dispatch({ type: "COMPLETE_QUIZ" });

      // Calculate score with detailed logging
      let score = 0;
      console.log("🔍 Starting score calculation...");
      console.log("📝 Total questions:", state.questions.length);
      console.log("📝 User answers object:", state.answers);
      console.log("📝 User answers keys:", Object.keys(state.answers));

      state.questions.forEach((question, index) => {
        const userAnswer = state.answers[question.id];
        // FIX: questions.json uses 'correct' field, not 'correctAnswer'
        const correctAnswer =
          question.correct !== undefined
            ? question.correct
            : question.correctAnswer;

        // Only count as correct if user actually answered AND answer is correct
        const isCorrect =
          userAnswer !== undefined && userAnswer === correctAnswer;

        console.log(`\n=== Question ${index + 1} (ID: ${question.id}) ===`);
        console.log("Question text:", question.question);
        console.log(
          "User answer:",
          userAnswer,
          "(type:",
          typeof userAnswer,
          ")"
        );
        console.log(
          "Correct answer:",
          correctAnswer,
          "(type:",
          typeof correctAnswer,
          ")"
        );
        console.log("User answered?", userAnswer !== undefined);
        console.log("Options:", question.options);
        console.log("User selected:", question.options[userAnswer]);
        console.log("Correct option:", question.options[correctAnswer]);
        console.log("Comparison (===):", userAnswer === correctAnswer);
        console.log("Comparison (==):", userAnswer == correctAnswer);
        console.log("Is correct?", isCorrect);

        if (isCorrect) {
          score++;
          console.log("✅ CORRECT!");
        } else {
          if (userAnswer === undefined) {
            console.log("⚠️ NOT ANSWERED!");
          } else {
            console.log("❌ WRONG!");
          }
        }
      });

      console.log("\n✅ Final Score:", score, "out of", state.questions.length);

      const percentage = Math.round((score / state.questions.length) * 100);
      const grade = getGrade(percentage);
      const timeSpentInSeconds = 45 * 60 - state.timeRemaining; // Time in seconds
      const completedAt = new Date().toISOString();

      console.log("📊 Calculated:", { score, percentage, grade });

      // Prepare result data for MongoDB - send timeSpent in SECONDS
      const resultData = {
        name: state.user.name,
        rollNo: state.user.rollNo,
        studentId: state.user.studentId,
        round: 1,
        score: score,
        totalQuestions: state.questions.length,
        percentage: percentage,
        grade: grade,
        timeTaken: timeSpentInSeconds, // Send as seconds (API expects this)
        timeSpent: timeSpentInSeconds, // Send as seconds
        loginTime: state.user.loginTime,
        quizStartedAt: state.quizStartedAt,
        completedAt: completedAt,
        answers: state.answers, // This stores all answers
        warnings: state.fullscreenWarnings,
      };

      console.log("📤 Submitting Round 1 quiz results:", resultData);

      // Store in MongoDB (this updates the Student record)
      const mongoResult = await storeStudentResult(resultData);
      if (mongoResult.success) {
        console.log("✅ Round 1 quiz result stored in MongoDB:", mongoResult.id);
        console.log("✅ Student record updated with Round 1 quiz completion data");
      } else {
        console.error("❌ Failed to store Round 1 quiz result:", mongoResult.error);
      }

      // Save to localStorage as backup
      const results = {
        user: state.user,
        answers: state.answers,
        questions: state.questions,
        timeSpent: timeSpentInSeconds,
        timeSpentFormatted: formatTime(timeSpentInSeconds),
        completedAt: completedAt,
        warnings: state.fullscreenWarnings,
        score: score,
        percentage: percentage,
        grade: grade,
        mongoId: mongoResult.id,
      };

      localStorage.setItem("round1Results", JSON.stringify(results));

      // Clear quiz state after successful submission
      dispatch({ type: "RESET_QUIZ" });
      localStorage.removeItem("quizState");
      localStorage.removeItem("quizResults");

      console.log("✅ Round 1 quiz submission complete, state cleared, redirecting to results...");
      router.push("/round1-result");
    } catch (error) {
      console.error("❌ Error submitting Round 1 quiz:", error);
      // Still redirect to result page even if MongoDB fails
      router.push("/round1-result");
    }
  };

  const getGrade = (percentage) => {
    if (percentage >= 90) return "A+";
    if (percentage >= 80) return "A";
    if (percentage >= 70) return "B+";
    if (percentage >= 60) return "B";
    if (percentage >= 50) return "C";
    if (percentage >= 40) return "D";
    return "F";
  };

  const getAnsweredCount = () => {
    return Object.keys(state.answers).length;
  };

  if (!state.quizStarted || state.questions.length === 0) {
    return (
      <div className={`flex items-center justify-center min-h-screen transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'
      }`}>
        <div className="w-32 h-32 border-b-2 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  const currentQuestion = state.questions[state.currentQuestion];
  const currentAnswer = state.answers[currentQuestion?.id];

  return (
    <>
      <Head>
        <title>Kindle Jr 4.0 - Round 1 | IEEE Quiz</title>
        <meta name="description" content="Kindle Jr 4.0 Round 1 Quiz" />
      </Head>

      <div className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
          : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
      }`}>
        {/* Warning Modal */}
        <AnimatePresence>
          {showWarning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-md p-6 text-center bg-red-600 border border-red-500 rounded-xl"
              >
                <FaExclamationTriangle className="mx-auto mb-4 text-4xl text-white" />
                <h3 className="mb-2 text-xl font-bold text-white">
                  Security Warning
                </h3>
                <p className="mb-4 text-red-100">{warningMessage}</p>
                <button
                  onClick={() => setShowWarning(false)}
                  className={`px-6 py-2 font-semibold transition-colors rounded-lg ${
                    theme === 'dark'
                      ? 'text-red-400 bg-red-500/20 border border-red-500/50 hover:bg-red-500/30'
                      : 'text-red-600 bg-white border border-red-300 hover:bg-gray-100'
                  }`}
                >
                  Continue Quiz
                </button>
                {!state.isFullscreen && (
                  <button
                    onClick={() => {
                      document.documentElement.requestFullscreen();
                      setShowWarning(false);
                    }}
                    className="px-6 py-2 ml-2 font-semibold text-white transition-colors bg-red-800 rounded-lg hover:bg-red-700"
                  >
                    <FaExpand className="inline mr-2" />
                    Return to Fullscreen
                  </button>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Confirmation Modal */}
        <AnimatePresence>
          {showSubmitModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className={`w-full max-w-md p-6 rounded-xl transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-white/10 backdrop-blur-md border border-white/20'
                    : 'bg-white border border-gray-200 shadow-lg'
                }`}
              >
                <h3 className={`mb-4 text-xl font-bold transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Submit Round 1 Quiz?
                </h3>
                <p className={`mb-6 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white/80' : 'text-gray-600'
                }`}>
                  Are you sure you want to submit your Round 1 quiz? You have answered{" "}
                  {getAnsweredCount()} out of {state.questions.length}{" "}
                  questions.
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowSubmitModal(false)}
                    className={`flex-1 px-4 py-2 font-semibold transition-colors rounded-lg ${
                      theme === 'dark'
                        ? 'text-white bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20'
                        : 'text-gray-800 bg-gray-200 border border-gray-300 hover:bg-gray-300'
                    }`}
                  >
                    Continue Quiz
                  </button>
                  <button
                    onClick={handleSubmitQuiz}
                    className="flex-1 px-4 py-2 font-semibold text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
                  >
                    Submit Now
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <div className={`p-4 border-b transition-colors duration-300 ${
          theme === 'dark' 
            ? 'bg-white/10 backdrop-blur-md border-white/20' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                <h1 className={`text-xl font-bold transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Kindle Jr 4.0 - Round 1
                </h1>
                <span className={`px-3 py-1 text-sm font-medium rounded-full transition-colors duration-300 ${
                  theme === 'dark' 
                    ? 'text-blue-200 bg-blue-800/50' 
                    : 'text-blue-700 bg-blue-100'
                }`}>
                  Basic Round
                </span>
              </div>
              <div className={`text-sm transition-colors duration-300 ${
                theme === 'dark' ? 'text-blue-200' : 'text-blue-600'
              }`}>
                {state.user?.name} • {state.user?.rollNo}
              </div>
            </div>

            {/* Timer and Theme Toggle */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300'
                }`}
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-blue-600" />}
              </button>
              
              {state.fullscreenWarnings > 0 && (
                <div className={`px-3 py-1 rounded-lg transition-colors duration-300 ${
                  theme === 'dark'
                    ? 'border border-red-500 bg-red-500/20'
                    : 'border border-red-400 bg-red-100'
                }`}>
                  <span className={`text-sm transition-colors duration-300 ${
                    theme === 'dark' ? 'text-red-200' : 'text-red-700'
                  }`}>
                    Warnings: {state.fullscreenWarnings}/2
                  </span>
                </div>
              )}
              <div className={`flex items-center px-4 py-2 space-x-2 rounded-lg transition-colors duration-300 ${
                theme === 'dark'
                  ? 'border border-orange-500 bg-orange-500/20'
                  : 'border border-orange-400 bg-orange-100'
              }`}>
                <FaClock className={`transition-colors duration-300 ${
                  theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
                }`} />
                <span className={`font-mono text-lg transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {formatTime(state.timeRemaining)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl p-4 mx-auto">
          <div className="grid gap-6 lg:grid-cols-4">
            {/* Question Navigator */}
            <div className="lg:col-span-1">
              <div className={`sticky p-4 border rounded-xl top-4 transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-white/10 backdrop-blur-md border-white/20'
                  : 'bg-white border-gray-200 shadow-lg'
              }`}>
                <h3 className={`mb-4 text-lg font-semibold transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Questions
                </h3>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className={`flex justify-between mb-2 text-sm transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    <span>Progress</span>
                    <span>
                      {getAnsweredCount()}/{state.questions.length}
                    </span>
                  </div>
                  <div className={`w-full h-2 rounded-full transition-colors duration-300 ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                  }`}>
                    <div
                      className="h-2 transition-all duration-300 bg-green-500 rounded-full"
                      style={{
                        width: `${
                          (getAnsweredCount() / state.questions.length) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Question Grid */}
                <div className="grid grid-cols-5 gap-2">
                  {state.questions.map((_, index) => {
                    const isAnswered =
                      state.answers[state.questions[index]?.id] !== undefined;
                    const isCurrent = index === state.currentQuestion;

                    return (
                      <button
                        key={index}
                        onClick={() => jumpToQuestion(index)}
                        className={`w-10 h-10 rounded-lg text-sm font-semibold transition-all ${
                          isCurrent
                            ? theme === 'dark'
                              ? "bg-blue-500 text-white ring-2 ring-blue-300"
                              : "bg-blue-600 text-white ring-2 ring-blue-400"
                            : isAnswered
                            ? theme === 'dark'
                              ? "bg-green-500 text-white"
                              : "bg-green-600 text-white"
                            : theme === 'dark'
                              ? "bg-gray-600 text-gray-300 hover:bg-gray-500"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        {index + 1}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setShowSubmitModal(true)}
                  className={`flex items-center justify-center w-full px-4 py-3 mt-6 space-x-2 font-semibold transition-colors rounded-lg ${
                    theme === 'dark'
                      ? 'text-white bg-green-600 hover:bg-green-700'
                      : 'text-white bg-green-600 hover:bg-green-700'
                  }`}
                >
                  <FaFlag />
                  <span>Submit Round 1 Quiz</span>
                </button>
              </div>
            </div>

            {/* Question Area */}
            <div className="lg:col-span-3">
              <div className={`p-8 border rounded-xl transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-white/10 backdrop-blur-md border-white/20'
                  : 'bg-white border-gray-200 shadow-lg'
              }`}>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className={`text-lg font-semibold transition-colors duration-300 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Question {state.currentQuestion + 1} of{" "}
                      {state.questions.length}
                    </h2>
                    {currentAnswer !== undefined && (
                      <div className={`flex items-center space-x-2 transition-colors duration-300 ${
                        theme === 'dark' ? 'text-green-400' : 'text-green-600'
                      }`}>
                        <FaCheckCircle />
                        <span className="text-sm">Answered</span>
                      </div>
                    )}
                  </div>

                  <p className={`text-xl leading-relaxed transition-colors duration-300 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-800'
                  }`}>
                    {currentQuestion?.question}
                  </p>
                </div>

                {/* Options */}
                <div className="mb-8 space-y-3">
                  {currentQuestion?.options.map((option, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full p-4 rounded-lg text-left transition-all border-2 ${
                        currentAnswer === index
                          ? theme === 'dark'
                            ? "bg-blue-500/30 border-blue-400 text-white"
                            : "bg-blue-100 border-blue-500 text-blue-900"
                          : theme === 'dark'
                            ? "bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:border-white/30"
                            : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            currentAnswer === index
                              ? theme === 'dark'
                                ? "border-blue-400 bg-blue-500"
                                : "border-blue-500 bg-blue-500"
                              : theme === 'dark'
                                ? "border-gray-400"
                                : "border-gray-400"
                          }`}
                        >
                          {currentAnswer === index && (
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                          )}
                        </div>
                        <span className="text-sm font-medium">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span>{option}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => navigateQuestion("prev")}
                    disabled={state.currentQuestion === 0}
                    className={`flex items-center px-6 py-3 space-x-2 font-semibold transition-colors rounded-lg disabled:cursor-not-allowed ${
                      theme === 'dark'
                        ? 'text-white bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800'
                        : 'text-gray-700 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400'
                    }`}
                  >
                    <FaArrowLeft />
                    <span>Previous</span>
                  </button>

                  <div className={`text-sm transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {getAnsweredCount()} of {state.questions.length} answered
                  </div>

                  <button
                    onClick={() => navigateQuestion("next")}
                    disabled={
                      state.currentQuestion === state.questions.length - 1
                    }
                    className={`flex items-center px-6 py-3 space-x-2 font-semibold transition-colors rounded-lg disabled:cursor-not-allowed ${
                      theme === 'dark'
                        ? 'text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-800'
                        : 'text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500'
                    }`}
                  >
                    <span>Next</span>
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
