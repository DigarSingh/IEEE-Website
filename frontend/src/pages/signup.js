import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUser, 
  FaLock, 
  FaEnvelope, 
  FaArrowRight, 
  FaMobileAlt, 
  FaIdCard, 
  FaEye, 
  FaEyeSlash,
  FaUserPlus,
  FaGraduationCap,
  FaCalendarAlt
} from 'react-icons/fa';
import ParticleBackground from '@/components/ParticleBackground';
import Layout from '@/components/Layout';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    branch: '',
    year: '',
    mobile: '',
    studentId: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // State for client-side rendering
  const [isMounted, setIsMounted] = useState(false);

  // Handle client-side mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }

    if (!formData.studentId.trim()) {
      newErrors.studentId = 'Student ID is required';
    }

    if (!formData.branch.trim()) {
      newErrors.branch = 'Branch/Department is required';
    }

    if (!formData.year.trim()) {
      newErrors.year = 'Year of study is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Optionally redirect to login or dashboard
        // router.push('/login');
        console.log('Registration successful');
      } else {
        setErrors({ form: data.message || 'Registration failed' });
      }
    } catch (error) {
      setErrors({ form: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Don't render until mounted to prevent hydration mismatch
  if (!isMounted) {
    return null;
  }

  return (
    <Layout hideFooter={true}>
      <Head>
        <title>Sign Up - IEEE GEU Student Branch</title>
        <meta name="description" content="Join IEEE GEU Student Branch and be part of the world's largest technical professional organization." />
      </Head>

      {/* Background gradient */}
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        {/* Particle Background */}
        <ParticleBackground />
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute w-64 h-64 rounded-full top-20 left-20 bg-blue-500/10 blur-xl animate-pulse"></div>
          <div className="absolute delay-75 rounded-full bottom-20 right-20 w-80 h-80 bg-purple-500/10 blur-xl animate-pulse"></div>
          <div className="absolute delay-150 rounded-full top-1/2 left-1/2 w-96 h-96 bg-indigo-500/5 blur-xl animate-pulse"></div>
        </div>

        <div className="relative flex items-center justify-center min-h-screen px-4 py-12 sm:px-6 lg:px-8">
          <div className="w-full max-w-4xl">
            <motion.div 
              className="overflow-hidden border shadow-2xl backdrop-blur-xl bg-white/10 rounded-3xl border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div 
                className="px-8 py-12 sm:px-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* Header */}
                <div className="mb-10 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.1 
                    }}
                    className="inline-flex items-center justify-center w-20 h-20 mx-auto mb-6 overflow-hidden bg-white rounded-full"
                  >
                    <img 
                      src="/images/logo.png" 
                      alt="IEEE Logo" 
                      className="object-contain w-16 h-16"
                    />
                  </motion.div>
                  
                  <motion.h1 
                    className="mb-4 text-4xl font-bold text-white"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    Join IEEE GEU
                  </motion.h1>
                  
                  <motion.p 
                    className="max-w-md mx-auto text-xl text-gray-300"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    Create your account and become part of the college's largest technical professional club
                  </motion.p>
                </div>

                {errors.form && (
                  <motion.div 
                    className="p-4 mb-6 text-sm text-red-400 rounded-lg bg-red-900/30"
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    {errors.form}
                  </motion.div>
                )}

                <motion.form 
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4, staggerChildren: 0.1 }}
                >
                  <motion.div 
                    className="grid gap-6 md:grid-cols-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    {/* Name field */}
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-300" htmlFor="name">
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <FaUser className="text-blue-400" />
                        </div>
                        <motion.input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`block w-full pl-10 pr-3 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-700'} bg-gray-900/60 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 text-white`}
                          placeholder="Your Name"
                          whileFocus={{ scale: 1.01 }}
                        />
                      </div>
                      {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
                    </div>

                    {/* Email field */}
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-300" htmlFor="email">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <FaEnvelope className="text-blue-400" />
                        </div>
                        <motion.input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`block w-full pl-10 pr-3 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-700'} bg-gray-900/60 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 text-white`}
                          placeholder="you@example.com"
                          whileFocus={{ scale: 1.01 }}
                        />
                      </div>
                      {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                    </div>
                  </motion.div>

                  <motion.div 
                    className="grid gap-6 md:grid-cols-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    {/* Mobile field */}
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-300" htmlFor="mobile">
                        Mobile Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <FaMobileAlt className="text-blue-400" />
                        </div>
                        <motion.input
                          type="tel"
                          id="mobile"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleChange}
                          className={`block w-full pl-10 pr-3 py-3 border ${errors.mobile ? 'border-red-500' : 'border-gray-700'} bg-gray-900/60 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 text-white`}
                          placeholder="9876543210"
                          maxLength={10}
                          whileFocus={{ scale: 1.01 }}
                        />
                      </div>
                      {errors.mobile && <p className="mt-1 text-sm text-red-400">{errors.mobile}</p>}
                    </div>

                    {/* Student ID field */}
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-300" htmlFor="studentId">
                        Student ID
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <FaIdCard className="text-blue-400" />
                        </div>
                        <motion.input
                          type="text"
                          id="studentId"
                          name="studentId"
                          value={formData.studentId}
                          onChange={handleChange}
                          className={`block w-full pl-10 pr-3 py-3 border ${errors.studentId ? 'border-red-500' : 'border-gray-700'} bg-gray-900/60 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 text-white`}
                          placeholder="e.g. 2025001"
                          whileFocus={{ scale: 1.01 }}
                        />
                      </div>
                      {errors.studentId && <p className="mt-1 text-sm text-red-400">{errors.studentId}</p>}
                    </div>
                  </motion.div>

                  <motion.div 
                    className="grid gap-6 md:grid-cols-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    {/* Branch/Department field */}
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-300" htmlFor="branch">
                        Branch/Department
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <FaGraduationCap className="text-blue-400" />
                        </div>
                        <motion.input
                          type="text"
                          id="branch"
                          name="branch"
                          value={formData.branch}
                          onChange={handleChange}
                          className={`block w-full pl-10 pr-3 py-3 border ${errors.branch ? 'border-red-500' : 'border-gray-700'} bg-gray-900/60 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 text-white`}
                          placeholder="e.g. Computer Science"
                          whileFocus={{ scale: 1.01 }}
                        />
                      </div>
                      {errors.branch && <p className="mt-1 text-sm text-red-400">{errors.branch}</p>}
                    </div>

                    {/* Year of Study field */}
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-300" htmlFor="year">
                        Year of Study
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <FaCalendarAlt className="text-blue-400" />
                        </div>
                        <motion.input
                          type="text"
                          id="year"
                          name="year"
                          value={formData.year}
                          onChange={handleChange}
                          className={`block w-full pl-10 pr-3 py-3 border ${errors.year ? 'border-red-500' : 'border-gray-700'} bg-gray-900/60 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 text-white`}
                          placeholder="e.g. 2nd Year"
                          whileFocus={{ scale: 1.01 }}
                        />
                      </div>
                      {errors.year && <p className="mt-1 text-sm text-red-400">{errors.year}</p>}
                    </div>
                  </motion.div>

                  <motion.div 
                    className="grid gap-6 md:grid-cols-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-300" htmlFor="password">
                        Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <FaLock className="text-blue-400" />
                        </div>
                        <motion.input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className={`block w-full pl-10 pr-10 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-700'} bg-gray-900/60 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 text-white`}
                          placeholder="••••••••"
                          whileFocus={{ scale: 1.01 }}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="text-gray-400 hover:text-blue-400 focus:outline-none"
                          >
                            {showPassword ? (
                              <FaEyeSlash className="w-5 h-5" />
                            ) : (
                              <FaEye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>
                      {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-300" htmlFor="confirmPassword">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <FaLock className="text-blue-400" />
                        </div>
                        <motion.input
                          type={showConfirmPassword ? "text" : "password"}
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className={`block w-full pl-10 pr-10 py-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-700'} bg-gray-900/60 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 text-white`}
                          placeholder="••••••••"
                          whileFocus={{ scale: 1.01 }}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <button
                            type="button"
                            onClick={toggleConfirmPasswordVisibility}
                            className="text-gray-400 hover:text-blue-400 focus:outline-none"
                          >
                            {showConfirmPassword ? (
                              <FaEyeSlash className="w-5 h-5" />
                            ) : (
                              <FaEye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>
                      {errors.confirmPassword && <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>}
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-start p-4 rounded-lg bg-gray-800/50"
                    whileHover={{ backgroundColor: 'rgba(30, 41, 59, 0.5)' }}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                  >
                    <div className="flex items-center h-5">
                      <motion.input
                        id="terms"
                        type="checkbox"
                        className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-offset-gray-800"
                        required
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="terms" className="font-medium text-gray-300">
                        I agree to the{' '}
                        <Link href="/terms">
                          <motion.span 
                            className="font-medium text-blue-400 hover:text-blue-300"
                            whileHover={{ textDecoration: "underline" }}
                          >
                            Terms and Conditions
                          </motion.span>
                        </Link>
                      </label>
                      <p className="mt-1 text-xs text-gray-500">By signing up, you agree to our terms of service and privacy policy.</p>
                    </div>
                  </motion.div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative flex items-center justify-center w-full px-4 py-3 overflow-hidden text-white transition-all rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-400"
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.15)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                  >
                    {/* Button shine effect */}
                    <motion.div 
                      className="absolute top-0 -left-4 w-1/4 h-full bg-white opacity-30 skew-x-[30deg]"
                      animate={{ 
                        x: ["0%", "400%"],
                      }}
                      transition={{ 
                        duration: 2.5,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                        repeatDelay: 1
                      }}
                    />
                    
                    <span className="relative z-10 flex items-center">
                      {isSubmitting ? (
                        <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <>
                          <FaUserPlus className="mr-3" />
                          Create Account 
                          <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="ml-2"
                          >
                            <FaArrowRight />
                          </motion.span>
                        </>
                      )}
                    </span>
                  </motion.button>
                </motion.form>
                
                <motion.div 
                  className="mt-6 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                >
                  <p className="text-sm text-gray-400">
                    Already have an account?{' '}
                    <Link href="/login">
                      <motion.span 
                        className="font-medium text-blue-400 hover:text-blue-300"
                        whileHover={{ 
                          scale: 1.05,
                          textDecoration: "underline" 
                        }}
                      >
                        Sign in
                      </motion.span>
                    </Link>
                  </p>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="p-4 mt-6 backdrop-blur-lg rounded-lg bg-[#101926]/30 border border-gray-800/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                <p className="text-xs text-center text-gray-400">
                  By signing up, you'll get access to exclusive IEEE events, workshops, and networking opportunities to help advance your career in technology.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
