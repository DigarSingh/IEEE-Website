import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaEnvelope, FaUniversity, FaArrowRight, FaGoogle, FaGithub, FaMobileAlt, FaIdCard } from 'react-icons/fa';
import Layout from '../components/Layout';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    college: '',
    mobile: '',
    studentId: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

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
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // College validation
    if (!formData.college.trim()) {
      newErrors.college = 'College name is required';
    }
    
    // Mobile validation
    if (!formData.mobile) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Enter a valid 10-digit mobile number';
    }
    
    // Student ID validation
    if (!formData.studentId.trim()) {
      newErrors.studentId = 'Student ID is required';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
        console.log('Submitting registration data:', formData);
        
        // Fix API endpoint and ensure proper error handling
        const response = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        
        // Check response status first before attempting to parse JSON
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Registration failed');
        }
        
        // Get the response data
        const data = await response.json();
        console.log('Registration response:', data);
        
        // Store token in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Show success message
        setRegistrationSuccess(true);
        
      } catch (error) {
        console.error('Registration error:', error);
        setErrors({ 
          form: error.message || 'Registration failed. Please try again.' 
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Registration success screen
  if (registrationSuccess) {
    return (
      <Layout hideFooter={true}>
        <div className="relative min-h-screen overflow-hidden bg-[#080D14] text-gray-300">
          <Head>
            <title>Registration Success | IEEE Club</title>
          </Head>
          
          {/* Only render animations on client-side */}
          {isMounted && (
            <>
              {/* Tech success background elements */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                <div className="absolute inset-0">
                  <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute top-0 left-0 w-full h-full">
                    <motion.path 
                      d="M0,0 L100,0 L100,5 L0,20 Z" 
                      fill="rgba(16, 185, 129, 0.5)"
                      animate={{ opacity: [0.4, 0.6, 0.4] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                    <motion.path 
                      d="M0,30 L100,15 L100,25 L0,40 Z" 
                      fill="rgba(5, 150, 105, 0.5)"
                      animate={{ opacity: [0.3, 0.5, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                    />
                    <motion.path 
                      d="M0,50 L100,40 L100,45 L0,55 Z" 
                      fill="rgba(16, 185, 129, 0.5)"
                      animate={{ opacity: [0.5, 0.7, 0.5] }}
                      transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                    />
                    <motion.path 
                      d="M0,70 L100,65 L100,75 L0,85 Z" 
                      fill="rgba(5, 150, 105, 0.5)"
                      animate={{ opacity: [0.4, 0.6, 0.4] }}
                      transition={{ duration: 5, repeat: Infinity, delay: 1.5 }}
                    />
                    <motion.path 
                      d="M0,100 L100,90 L100,100 L0,100 Z" 
                      fill="rgba(16, 185, 129, 0.5)"
                      animate={{ opacity: [0.5, 0.8, 0.5] }}
                      transition={{ duration: 4, repeat: Infinity, delay: 0.8 }}
                    />
                  </svg>
                </div>
              </div>

              {/* Success floating particles */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                {[...Array(25)].map((_, i) => (
                  <motion.div
                    key={`particle-${i}`}
                    className={`absolute w-2 h-2 rounded-full ${
                      ['bg-green-400', 'bg-green-500', 'bg-teal-400', 'bg-emerald-500'][i % 4]
                    }`}
                    initial={{ 
                      x: `${i * 4}%`, 
                      y: -20,
                      opacity: 0
                    }}
                    animate={{ 
                      y: '120%',
                      opacity: [0, 1, 0],
                      rotate: i * 14
                    }}
                    transition={{ 
                      duration: (i % 5) + 2,
                      repeat: Infinity,
                      repeatType: 'loop',
                      delay: (i % 5) * 0.4
                    }}
                    style={{ left: `${(i * 4) % 100}%` }}
                  />
                ))}
              </div>
            </>
          )}

          <div className="container relative z-10 px-6 py-24 mx-auto">
            <motion.div 
              className="max-w-md p-10 mx-auto overflow-hidden border border-gray-800 shadow-2xl bg-[#101926]/70 backdrop-blur-lg rounded-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <div className="text-center">
                <motion.div 
                  className="flex items-center justify-center w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-700"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ duration: 0.8, times: [0, 0.6, 1] }}
                >
                  <motion.svg 
                    className="w-12 h-12 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  >
                    <motion.path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M5 13l4 4L19 7"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                    />
                  </motion.svg>
                </motion.div>
                <motion.h2 
                  className="mb-2 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Registration Successful!
                </motion.h2>
                
                <motion.p 
                  className="mb-8 text-gray-400"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Thank you for registering with IEEE. Please check your email to verify your account.
                </motion.p>
                
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <Link href="/login">
                    <motion.span 
                      className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium text-white transition-all rounded-lg cursor-pointer bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.15)"
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Button shine effect */}
                      <motion.div 
                        className="absolute top-0 -left-4 w-1/4 h-full bg-white opacity-30 skew-x-[30deg]"
                        animate={{ x: ["0%", "400%"] }}
                        transition={{ 
                          duration: 2.5, 
                          repeat: Infinity,
                          repeatType: "loop",
                          ease: "easeInOut",
                          repeatDelay: 1
                        }}
                      />
                      <span className="relative z-10 flex items-center">
                        Go to Login 
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                          className="ml-2"
                        >
                          <FaArrowRight />
                        </motion.span>
                      </span>
                    </motion.span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </Layout>
    );
  }

  // Main signup form
  return (
    <Layout hideFooter={true}>
      <div className="relative min-h-screen overflow-hidden bg-[#080D14] text-gray-300">
        <Head>
          <title>Sign Up | IEEE Club</title>
          <meta name="description" content="Create your IEEE Club account" />
        </Head>
        
        {/* Only render animations on client-side */}
        {isMounted && (
          <>
            {/* Tech background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
              <div className="absolute top-0 right-0 w-full h-full">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute top-0 left-0 w-full h-full">
                  <motion.path 
                    d="M0,0 L100,0 L100,5 L0,20 Z" 
                    fill="rgba(59, 130, 246, 0.5)"
                    animate={{ opacity: [0.4, 0.6, 0.4] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <motion.path 
                    d="M0,30 L100,15 L100,25 L0,40 Z" 
                    fill="rgba(79, 70, 229, 0.5)"
                    animate={{ opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  />
                  <motion.path 
                    d="M0,50 L100,40 L100,45 L0,55 Z" 
                    fill="rgba(16, 185, 129, 0.5)"
                    animate={{ opacity: [0.5, 0.7, 0.5] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  />
                  <motion.path 
                    d="M0,70 L100,65 L100,75 L0,85 Z" 
                    fill="rgba(236, 72, 153, 0.5)"
                    animate={{ opacity: [0.4, 0.6, 0.4] }}
                    transition={{ duration: 5, repeat: Infinity, delay: 1.5 }}
                  />
                  <motion.path 
                    d="M0,100 L100,90 L100,100 L0,100 Z" 
                    fill="rgba(124, 58, 237, 0.5)"
                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 0.8 }}
                  />
                </svg>
              </div>
              
              {/* Code symbols effect - with deterministic positioning */}
              <div className="absolute inset-0 flex flex-wrap opacity-10">
                {[...Array(30)].map((_, i) => (
                  <motion.div 
                    key={`symbol-${i}`}
                    className="font-mono text-xs text-blue-400"
                    style={{ 
                      position: 'absolute', 
                      left: `${(i * 3) % 100}%`, 
                      top: `${(i * 3.3) % 100}%`,
                      fontSize: `${8 + (i % 8)}px`
                    }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ 
                      duration: 3 + (i % 5),
                      repeat: Infinity, 
                      delay: i * 0.3
                    }}
                  >
                    {['{ }', '[ ]', '( )', '//', '/* */', '&&', '||', '<=>', '=>', '==='][i % 10]}
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="container relative z-10 px-6 py-10 mx-auto md:py-16">
          <div className="flex justify-center">
            <motion.div 
              className="w-full max-w-2xl"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="p-8 overflow-hidden border border-gray-800 shadow-2xl bg-[#101926]/70 backdrop-blur-lg rounded-2xl"
                whileHover={{ boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8 text-center">
                  <Link href="/">
                    <img 
                      src="/images/logo.png" 
                      alt="IEEE Logo" 
                      className="h-16 mx-auto mb-4 cursor-pointer" 
                    />
                  </Link>
                  <motion.h2 
                    className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    Join IEEE Network
                  </motion.h2>
                  <motion.p 
                    className="mt-2 text-gray-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    Create your account to access exclusive resources
                  </motion.p>
                  
                  {/* Step indicators */}
                  <motion.div
                    className="flex items-center justify-center gap-1 mt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <motion.div 
                      className="w-10 h-1.5 rounded-full bg-blue-500" 
                      initial={{ width: 0 }}
                      animate={{ width: '40px' }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    />
                    <div className="w-10 h-1.5 rounded-full bg-gray-700" />
                    <div className="w-10 h-1.5 rounded-full bg-gray-700" />
                  </motion.div>
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
                  <div className="space-y-1 text-xs tracking-wide text-blue-400 uppercase">
                    <span>Step 1 of 3</span>
                    <h3 className="text-lg font-medium tracking-wide text-white uppercase">Personal Information</h3>
                  </div>

                  <motion.div 
                    className="grid gap-6 md:grid-cols-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    {/* Existing name field */}
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
                          placeholder="John Doe"
                          whileFocus={{ scale: 1.01 }}
                        />
                      </div>
                      {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
                    </div>

                    {/* Existing email field */}
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
                    {/* New mobile field */}
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

                    {/* New student ID field */}
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
                          placeholder="e.g. GEU/2023/001"
                          whileFocus={{ scale: 1.01 }}
                        />
                      </div>
                      {errors.studentId && <p className="mt-1 text-sm text-red-400">{errors.studentId}</p>}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    <label className="block mb-2 text-sm font-medium text-gray-300" htmlFor="college">
                      College / University
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <FaUniversity className="text-blue-400" />
                      </div>
                      <motion.input
                        type="text"
                        id="college"
                        name="college"
                        value={formData.college}
                        onChange={handleChange}
                        className={`block w-full pl-10 pr-3 py-3 border ${errors.college ? 'border-red-500' : 'border-gray-700'} bg-gray-900/60 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 text-white`}
                        placeholder="Your college name"
                        whileFocus={{ scale: 1.01 }}
                      />
                    </div>
                    {errors.college && <p className="mt-1 text-sm text-red-400">{errors.college}</p>}
                  </motion.div>

                  <div className="pt-3 space-y-1 text-xs tracking-wide text-blue-400 uppercase">
                    <h3 className="text-lg font-medium tracking-wide text-white uppercase">Security Settings</h3>
                  </div>

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
                          type="password"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className={`block w-full pl-10 pr-3 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-700'} bg-gray-900/60 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 text-white`}
                          placeholder="••••••••"
                          whileFocus={{ scale: 1.01 }}
                        />
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
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className={`block w-full pl-10 pr-3 py-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-700'} bg-gray-900/60 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 text-white`}
                          placeholder="••••••••"
                          whileFocus={{ scale: 1.01 }}
                        />
                      </div>
                      {errors.confirmPassword && <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>}
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-start p-4 rounded-lg bg-gray-800/50"
                    whileHover={{ backgroundColor: 'rgba(30, 41, 59, 0.5)' }}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
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
                    transition={{ duration: 0.5, delay: 0.9 }}
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
                  className="relative my-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-800"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 text-gray-500 bg-[#101926]">Or sign up with</span>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="grid grid-cols-2 gap-3"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                >
                  <motion.button
                    type="button"
                    className="inline-flex items-center justify-center w-full p-3 text-sm font-medium transition-all bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    whileHover={{ y: -4, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.3)" }}
                    whileTap={{ y: 0 }}
                  >
                    <FaGoogle className="w-5 h-5 mr-2 text-red-400" />
                    Google
                  </motion.button>
                  <motion.button
                    type="button"
                    className="inline-flex items-center justify-center w-full p-3 text-sm font-medium transition-all bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    whileHover={{ y: -4, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.3)" }}
                    whileTap={{ y: 0 }}
                  >
                    <FaGithub className="w-5 h-5 mr-2 text-white" />
                    GitHub
                  </motion.button>
                </motion.div>

                <motion.div 
                  className="mt-6 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
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
                transition={{ duration: 0.5, delay: 1.3 }}
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
