import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaArrowRight, FaGoogle, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import Layout from '../components/Layout';
import dynamic from 'next/dynamic';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
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
        // Connect to the backend API
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Authentication failed');
        }
        
        // Store token in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Redirect to home page instead of dashboard
        window.location.href = '/'; // Home page
        
      } catch (error) {
        console.error('Login error:', error);
        setErrors({ 
          form: 'Invalid email or password. Please try again.' 
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

  return (
    <Layout hideFooter={true}>
      <div className="relative min-h-screen overflow-hidden bg-[#080D14] text-gray-300">
        <Head>
          <title>Login | IEEE Club</title>
          <meta name="description" content="Login to your IEEE Club account" />
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
              
              {/* Binary code effect - with deterministic positioning */}
              <div className="absolute inset-0 flex flex-wrap opacity-10">
                {[...Array(100)].map((_, i) => (
                  <motion.div 
                    key={`binary-${i}`}
                    className="font-mono text-xs text-blue-400"
                    style={{ 
                      position: 'absolute', 
                      left: `${(i * 1.8) % 100}%`, 
                      top: `${(i * 1.1) % 100}%`
                    }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ 
                      duration: 3 + (i % 5),
                      repeat: Infinity, 
                      delay: i * 0.1
                    }}
                  >
                    {i % 2 === 0 ? '1' : '0'}
                  </motion.div>
                ))}
              </div>
              
              {/* Circuit pattern */}
              <div className="absolute inset-0">
                <svg width="100%" height="100%" className="opacity-10">
                  <pattern id="circuit-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                    <circle cx="10" cy="10" r="2" fill="rgba(59, 130, 246, 0.5)" />
                    <line x1="10" y1="10" x2="50" y2="10" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="1" />
                    <circle cx="50" cy="10" r="2" fill="rgba(59, 130, 246, 0.5)" />
                    <line x1="50" y1="10" x2="50" y2="50" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="1" />
                    <circle cx="50" cy="50" r="2" fill="rgba(59, 130, 246, 0.5)" />
                    <line x1="50" y1="50" x2="90" y2="50" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="1" />
                    <circle cx="90" cy="50" r="2" fill="rgba(59, 130, 246, 0.5)" />
                    <line x1="90" y1="50" x2="90" y2="90" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="1" />
                    <circle cx="90" cy="90" r="2" fill="rgba(59, 130, 246, 0.5)" />
                    <line x1="90" y1="90" x2="10" y2="90" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="1" />
                    <circle cx="10" cy="90" r="2" fill="rgba(59, 130, 246, 0.5)" />
                  </pattern>
                  <rect x="0" y="0" width="100%" height="100%" fill="url(#circuit-pattern)" />
                </svg>
              </div>
            </div>
          </>
        )}

        <div className="container relative z-10 px-6 py-16 mx-auto">
          <div className="flex justify-center">
            <motion.div 
              className="w-full max-w-md"
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
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Link href="/">
                      <img 
                        src="/images/logo.png" 
                        alt="IEEE Logo" 
                        className="h-20 mx-auto mb-4 cursor-pointer" 
                      />
                    </Link>
                  </motion.div>
                  
                  <motion.h2 
                    className="mb-1 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    Access Portal
                  </motion.h2>
                  
                  <motion.p 
                    className="text-gray-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    Sign in to your IEEE account
                  </motion.p>
                </div>

                {errors.form && (
                  <motion.div 
                    className="p-4 mb-6 text-sm text-red-400 rounded-lg bg-red-900/30"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {errors.form}
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <motion.div 
                    className="space-y-2"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <label className="block text-sm font-medium text-gray-300" htmlFor="email">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <FaUser className="text-blue-400" />
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
                    {errors.email && (
                      <motion.p 
                        className="mt-1 text-sm text-red-400"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </motion.div>

                  <motion.div 
                    className="space-y-2"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <label className="block text-sm font-medium text-gray-300" htmlFor="password">
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
                    {errors.password && (
                      <motion.p 
                        className="mt-1 text-sm text-red-400"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {errors.password}
                      </motion.p>
                    )}
                  </motion.div>

                  <motion.div 
                    className="flex items-center justify-between"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <div className="flex items-center">
                      <input
                        id="remember"
                        type="checkbox"
                        className="w-4 h-4 text-blue-500 bg-gray-900 border-gray-700 rounded focus:ring-blue-400"
                      />
                      <label htmlFor="remember" className="block ml-2 text-sm text-gray-300">
                        Remember me
                      </label>
                    </div>
                    <Link href="/forgot-password">
                      <span className="text-sm text-blue-400 hover:text-blue-300">
                        Forgot password?
                      </span>
                    </Link>
                  </motion.div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative flex items-center justify-center w-full px-4 py-3 mt-2 overflow-hidden text-white transition-all rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-400"
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.15)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
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
                          Sign In 
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
                </form>
                
                <motion.div 
                  className="relative my-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-800"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 text-gray-500 bg-[#101926]">Or continue with</span>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="grid grid-cols-3 gap-3"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <motion.button
                    type="button"
                    className="inline-flex justify-center w-full p-3 text-sm font-medium transition-all bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    whileHover={{ y: -4, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.3)" }}
                    whileTap={{ y: 0 }}
                  >
                    <FaGoogle className="w-5 h-5 text-red-400" />
                  </motion.button>
                  <motion.button
                    type="button"
                    className="inline-flex justify-center w-full p-3 text-sm font-medium transition-all bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    whileHover={{ y: -4, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.3)" }}
                    whileTap={{ y: 0 }}
                  >
                    <FaGithub className="w-5 h-5 text-white" />
                  </motion.button>
                  <motion.button
                    type="button"
                    className="inline-flex justify-center w-full p-3 text-sm font-medium transition-all bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    whileHover={{ y: -4, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.3)" }}
                    whileTap={{ y: 0 }}
                  >
                    <FaLinkedinIn className="w-5 h-5 text-blue-400" />
                  </motion.button>
                </motion.div>

                <motion.div 
                  className="mt-6 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  <p className="text-sm text-gray-400">
                    Don't have an account?{' '}
                    <Link href="/signup">
                      <motion.span 
                        className="font-medium text-blue-400 hover:text-blue-300"
                        whileHover={{ 
                          scale: 1.05,
                          textDecoration: "underline" 
                        }}
                      >
                        Sign up
                      </motion.span>
                    </Link>
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
