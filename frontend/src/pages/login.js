import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaLock,
  FaArrowRight,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
  FaRocket,
  FaCheckCircle,
} from "react-icons/fa";
import Layout from "@/components/Layout";
import ParticleBackground from "@/components/ParticleBackground";
import dynamic from "next/dynamic";

import { useRouter } from "next/router";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // State for client-side rendering
  const [isMounted, setIsMounted] = useState(false);

  // Handle client-side mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      setErrors({});

      try {
        console.log("Attempting login with:", { email: formData.email });

        // Use the local Next.js API route
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        console.log(`Login response status: ${response.status}`);
        const data = await response.json();
        console.log("Login response data:", {
          success: data.success,
          hasToken: !!data.token,
          hasUser: !!data.user,
          message: data.message,
        });
        if (response.ok) {
          // Store both token and user data if available

          alert(
            "🎉 Registration successful! Welcome to IEEE GEU Student Branch!"
          );
          console.log("Registration successful, redirecting to home page");

          // Use router.replace for better UX (doesn't add to history stack)
          setTimeout(async () => {
            await router.replace("/");
            console.log("login redirect completed");
          }, 1000);
        }

        if (!response.ok) {
          console.error("Login failed:", data);
          throw new Error(data.message || "Authentication failed");
        }

        if (!data.token || !data.user) {
          throw new Error(
            "Invalid response from server: missing token or user data"
          );
        }

        // Store token in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        console.log("User data stored in localStorage");
        console.log("User role:", data.user.role);
        console.log("Full user data:", data.user);
      } catch (error) {
        console.error("Login error:", error);
        setErrors({
          form: error.message || "Invalid email or password. Please try again.",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <Layout hideFooter={true}>
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <Head>
          <title>Login | IEEE GEU Student Branch</title>
          <meta
            name="description"
            content="Sign in to your IEEE GEU Student Branch account"
          />
        </Head>

        {/* Background Elements */}
        <ParticleBackground />
        <div className="absolute inset-0">
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-blue-900/30"></div>

          {/* Animated Background Patterns */}
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

          {/* Floating Elements */}
          {isMounted && (
            <>
              <motion.div
                className="absolute w-32 h-32 rounded-full top-20 left-10 bg-blue-500/10 blur-xl"
                animate={{
                  y: [0, -20, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute w-48 h-48 rounded-full top-40 right-20 bg-purple-500/10 blur-2xl"
                animate={{
                  y: [0, 15, 0],
                  scale: [1, 0.9, 1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />
              <motion.div
                className="absolute w-40 h-40 rounded-full bottom-40 left-20 bg-cyan-500/10 blur-xl"
                animate={{
                  y: [0, -15, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                }}
              />
            </>
          )}
        </div>

        {/* Main Content */}
        <div className="container relative z-10 flex items-center justify-center min-h-screen px-6 py-8 mx-auto">
          <motion.div
            className="w-full max-w-md"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Enhanced Login Card */}
            <motion.div
              variants={fadeIn}
              className="relative p-8 overflow-hidden border shadow-2xl bg-white/10 backdrop-blur-xl border-white/20 rounded-3xl"
              whileHover={{
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)",
                scale: 1.02,
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Header Section */}
              <motion.div variants={fadeIn} className="mb-8 text-center">
                <motion.div
                  className="inline-flex items-center justify-center w-20 h-20 mb-6 overflow-hidden shadow-lg bg-white rounded-2xl"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <img
                    src="/images/logo.png"
                    alt="IEEE Logo"
                    className="w-16 h-16 object-contain"
                  />
                </motion.div>

                <motion.h1
                  variants={fadeIn}
                  className="mb-2 text-3xl font-bold text-white"
                >
                  Welcome Back
                </motion.h1>

                <motion.p variants={fadeIn} className="text-blue-100">
                  Sign in to access your IEEE dashboard
                </motion.p>
              </motion.div>

              {/* Error Alert */}
              {errors.form && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 mb-6 text-red-200 border rounded-xl bg-red-500/20 border-red-500/30"
                >
                  <div className="flex items-center">
                    <FaShieldAlt className="mr-2 text-red-400" />
                    {errors.form}
                  </div>
                </motion.div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <motion.div variants={fadeIn}>
                  <label className="block mb-2 text-sm font-medium text-blue-100">
                    Email Address
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                      <FaUser
                        className={`text-lg transition-colors ${
                          errors.email
                            ? "text-red-400"
                            : "text-blue-400 group-focus-within:text-purple-400"
                        }`}
                      />
                    </div>
                    <motion.input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-12 pr-4 py-4 bg-white/10 border rounded-xl text-white placeholder-blue-200/50 transition-all duration-300 focus:outline-none focus:ring-2 backdrop-blur-sm ${
                        errors.email
                          ? "border-red-500/50 focus:ring-red-500/50"
                          : "border-white/20 focus:border-blue-400/50 focus:ring-blue-400/50"
                      }`}
                      placeholder="Enter your email"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-2 text-sm text-red-300"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </motion.div>

                {/* Password Field */}
                <motion.div variants={fadeIn}>
                  <label className="block mb-2 text-sm font-medium text-blue-100">
                    Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                      <FaLock
                        className={`text-lg transition-colors ${
                          errors.password
                            ? "text-red-400"
                            : "text-blue-400 group-focus-within:text-purple-400"
                        }`}
                      />
                    </div>
                    <motion.input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full pl-12 pr-12 py-4 bg-white/10 border rounded-xl text-white placeholder-blue-200/50 transition-all duration-300 focus:outline-none focus:ring-2 backdrop-blur-sm ${
                        errors.password
                          ? "border-red-500/50 focus:ring-red-500/50"
                          : "border-white/20 focus:border-blue-400/50 focus:ring-blue-400/50"
                      }`}
                      placeholder="Enter your password"
                      whileFocus={{ scale: 1.02 }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-400 transition-colors hover:text-purple-400"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-2 text-sm text-red-300"
                    >
                      {errors.password}
                    </motion.p>
                  )}
                </motion.div>

                {/* Remember Me & Forgot Password */}
                <motion.div
                  variants={fadeIn}
                  className="flex items-center justify-between"
                >
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-500 rounded bg-white/10 border-white/20 focus:ring-blue-400/50"
                    />
                    <span className="ml-2 text-sm text-blue-100">
                      Remember me
                    </span>
                  </label>
                  <Link href="/forgot-password">
                    <span className="text-sm text-blue-300 transition-colors cursor-pointer hover:text-purple-300">
                      Forgot password?
                    </span>
                  </Link>
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  variants={fadeIn}
                  className="relative w-full px-6 py-4 overflow-hidden font-semibold text-white transition-all duration-300 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-400/50 disabled:opacity-70 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Button Shimmer Effect */}
                  <div className="absolute inset-0 transition-transform duration-1000 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full"></div>

                  <span className="relative flex items-center justify-center">
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-3 animate-spin"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Signing In...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        Sign In
                        <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                      </div>
                    )}
                  </span>
                </motion.button>
              </form>

              {/* Sign Up Link */}
              <motion.div variants={fadeIn} className="mt-8 text-center">
                <p className="text-blue-100">
                  Don't have an account?{" "}
                  <Link href="/signup">
                    <span className="font-semibold text-blue-300 transition-colors cursor-pointer hover:text-purple-300">
                      Create Account
                    </span>
                  </Link>
                </p>
              </motion.div>

              {/* Features */}
              <motion.div
                variants={fadeIn}
                className="pt-6 mt-8 border-t border-white/10"
              >
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="flex flex-col items-center p-3 rounded-xl bg-white/5">
                    <FaRocket className="mb-2 text-2xl text-blue-400" />
                    <span className="text-xs text-blue-100">Fast Access</span>
                  </div>
                  <div className="flex flex-col items-center p-3 rounded-xl bg-white/5">
                    <FaCheckCircle className="mb-2 text-2xl text-green-400" />
                    <span className="text-xs text-blue-100">Secure Login</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
