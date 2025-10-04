import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaTrophy,
  FaClock,
  FaCheckCircle,
  FaTimes,
  FaHome,
  FaRedo,
  FaShare,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Result() {
  const router = useRouter();
  const [results, setResults] = useState(null);
  const [score, setScore] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedResults = localStorage.getItem("quizResults");
    if (!savedResults) {
      router.push("/quizlogin");
      return;
    }

    const parsedResults = JSON.parse(savedResults);
    setResults(parsedResults);

    console.log("📊 Result Page - Loading saved results");
    console.log("� Saved score:", parsedResults.score);
    console.log("💾 Saved percentage:", parsedResults.percentage);

    // Use the ALREADY CALCULATED score from quiz submission
    // Don't recalculate - this can cause discrepancies!
    setScore(parsedResults.score || 0);
    setPercentage(parsedResults.percentage || 0);
    setLoading(false);

    // Results are already saved in MongoDB during quiz completion
    setSaved(true);
  }, [router]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getGrade = (percentage) => {
    if (percentage >= 90)
      return { grade: "A+", color: "text-green-500", bg: "bg-green-500" };
    if (percentage >= 80)
      return { grade: "A", color: "text-green-400", bg: "bg-green-400" };
    if (percentage >= 70)
      return { grade: "B+", color: "text-blue-500", bg: "bg-blue-500" };
    if (percentage >= 60)
      return { grade: "B", color: "text-blue-400", bg: "bg-blue-400" };
    if (percentage >= 50)
      return { grade: "C", color: "text-yellow-500", bg: "bg-yellow-500" };
    return { grade: "F", color: "text-red-500", bg: "bg-red-500" };
  };

  const shareResults = () => {
    const text = `I scored ${score}/${results?.questions.length} (${percentage}%) in the IEEE GEU Quiz! 🎉`;
    if (navigator.share) {
      navigator.share({ title: "Quiz Results", text });
    } else {
      navigator.clipboard.writeText(text);
      alert("Results copied to clipboard!");
    }
  };

  const handleLogout = () => {
    // Clear quiz data
    localStorage.removeItem("quizUser");
    localStorage.removeItem("quizResults");
    localStorage.removeItem("quizState");

    // Redirect to login
    router.push("/quizlogin");
  };

  if (loading || !results) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="w-32 h-32 border-b-2 border-blue-500 rounded-full animate-spin"></div>
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

      <div className="min-h-screen px-4 py-8 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-center"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1"></div>
              <div className="flex flex-col items-center flex-1">
                <FaTrophy className="mx-auto mb-4 text-6xl text-yellow-400" />
                <h1 className="mb-2 text-4xl font-bold text-white">
                  Quiz Completed!
                </h1>
                <p className="text-blue-200">Here are your results</p>
              </div>
              <div className="flex justify-end flex-1">
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 space-x-2 font-semibold text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700"
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
            className="p-8 mb-8 border bg-white/10 backdrop-blur-md border-white/20 rounded-2xl"
          >
            <div className="grid gap-6 md:grid-cols-3">
              {/* Score */}
              <div className="text-center">
                <div
                  className={`w-24 h-24 ${gradeInfo.bg}/20 border-2 border-current rounded-full flex items-center justify-center mx-auto mb-4 ${gradeInfo.color}`}
                >
                  <span className="text-2xl font-bold">{gradeInfo.grade}</span>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  Your Grade
                </h3>
                <p className="text-gray-300">{percentage}% Score</p>
              </div>

              {/* Correct Answers */}
              <div className="text-center">
                <div className="flex items-center justify-center w-24 h-24 mx-auto mb-4 border-2 border-green-500 rounded-full bg-green-500/20">
                  <FaCheckCircle className="text-3xl text-green-400" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  Correct Answers
                </h3>
                <p className="text-gray-300">
                  {score} out of {results.questions.length}
                </p>
              </div>

              {/* Time Taken */}
              <div className="text-center">
                <div className="flex items-center justify-center w-24 h-24 mx-auto mb-4 border-2 border-blue-500 rounded-full bg-blue-500/20">
                  <FaClock className="text-3xl text-blue-400" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  Time Taken
                </h3>
                <p className="text-gray-300">{formatTime(results.timeSpent)}</p>
              </div>
            </div>

            {/* User Info */}
            <div className="pt-6 mt-8 border-t border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white">
                    {results.user.name}
                  </p>
                  <p className="text-sm text-gray-300">
                    Roll No: {results.user.rollNo}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-300">Completed on</p>
                  <p className="text-sm text-white">
                    {new Date(results.completedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Question Review */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="p-8 mb-8 border bg-white/10 backdrop-blur-md border-white/20 rounded-2xl"
          >
            <h2 className="mb-6 text-2xl font-bold text-white">
              Answer Review
            </h2>
            <div className="space-y-4 overflow-y-auto max-h-96">
              {results.questions.map((question, index) => {
                const userAnswer = results.answers[question.id];
                const isCorrect = userAnswer === question.correct;
                const wasAnswered = userAnswer !== undefined;

                return (
                  <div
                    key={question.id}
                    className={`p-4 rounded-lg border-l-4 ${
                      !wasAnswered
                        ? "bg-gray-500/20 border-gray-500"
                        : isCorrect
                        ? "bg-green-500/20 border-green-500"
                        : "bg-red-500/20 border-red-500"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-white">
                        Q{index + 1}: {question.question}
                      </h3>
                      <div className="flex items-center space-x-2">
                        {!wasAnswered ? (
                          <span className="text-sm text-gray-400">
                            Not Answered
                          </span>
                        ) : isCorrect ? (
                          <FaCheckCircle className="text-green-400" />
                        ) : (
                          <FaTimes className="text-red-400" />
                        )}
                      </div>
                    </div>

                    <div className="grid gap-2 md:grid-cols-2">
                      <div>
                        <p className="text-sm font-medium text-green-300">
                          Correct Answer:
                        </p>
                        <p className="text-sm text-green-200">
                          {question.options[question.correct]}
                        </p>
                      </div>
                      {wasAnswered && (
                        <div>
                          <p
                            className={`text-sm font-medium ${
                              isCorrect ? "text-green-300" : "text-red-300"
                            }`}
                          >
                            Your Answer:
                          </p>
                          <p
                            className={`text-sm ${
                              isCorrect ? "text-green-200" : "text-red-200"
                            }`}
                          >
                            {question.options[userAnswer]}
                          </p>
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
            className="flex flex-col justify-center gap-4 sm:flex-row"
          >
            <Link href="/">
              <span className="flex items-center justify-center px-6 py-3 space-x-2 font-semibold text-white transition-colors bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-700">
                <FaHome />
                <span>Back to Home</span>
              </span>
            </Link>

            <button
              onClick={shareResults}
              className="flex items-center justify-center px-6 py-3 space-x-2 font-semibold text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
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
              <p className="text-sm text-green-400">
                ✓ Results saved successfully
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}
