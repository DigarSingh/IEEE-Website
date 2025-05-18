import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSignOutAlt, FaBars, FaTimes, FaUser, FaChevronDown, FaUserCircle, FaCog, FaUserShield } from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  // Track scroll position to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Only run authentication check on client-side
  useEffect(() => {
    setMounted(true);
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setIsLoggedIn(true);
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (mounted) {
      const handleClickOutside = (event) => {
        if (userMenuOpen && !event.target.closest('.user-menu-container')) {
          setUserMenuOpen(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [userMenuOpen, mounted]);

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Update state
    setIsLoggedIn(false);
    setUser(null);
    setUserMenuOpen(false);
    
    // Redirect to home page
    window.location.href = '/';
  };

  // This prevents hydration errors by ensuring the component
  // renders the same content on both server and client initially
  const authLinks = mounted ? (
    isLoggedIn ? (
      <div className="relative flex items-center space-x-3 user-menu-container">
        <motion.div 
          className="flex items-center cursor-pointer"
          onClick={() => setUserMenuOpen(!userMenuOpen)}
          whileHover={{ scale: 1.03 }}
        >
          <div className="flex items-center px-3 py-1.5 space-x-2 text-sm rounded-full bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 hover:border-blue-500 transition-all duration-200">
            <div className="flex items-center justify-center overflow-hidden text-white rounded-full shadow-inner w-7 h-7 bg-gradient-to-br from-blue-500 to-violet-600">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <span className="hidden font-medium text-gray-200 sm:inline-block">{user?.name?.split(' ')[0] || 'User'}</span>
            <motion.div
              animate={{ rotate: userMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <FaChevronDown className="w-3 h-3 text-gray-400" />
            </motion.div>
          </div>
        </motion.div>
        
        {/* User dropdown */}
        <AnimatePresence>
          {userMenuOpen && (
            <motion.div 
              className="absolute right-0 z-10 w-64 mt-2 overflow-hidden bg-gray-800 rounded-lg shadow-lg top-full"
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-4 text-center border-b border-gray-700 bg-gradient-to-b from-gray-800 to-gray-900">
                <div className="flex items-center justify-center w-16 h-16 mx-auto overflow-hidden text-2xl text-white rounded-full shadow-xl bg-gradient-to-br from-blue-500 to-violet-600">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <p className="mt-2 font-medium text-white">{user?.name}</p>
                <p className="text-xs text-gray-400 truncate">{user?.email}</p>
              </div>
              <div className="p-2">
                <Link href="/profile">
                  <span className="flex items-center px-4 py-2 text-sm text-gray-300 transition-colors rounded-md hover:bg-gray-700">
                    <FaUserCircle className="mr-3 text-blue-400" />
                    Your Profile
                  </span>
                </Link>
                
                {/* Add this Admin Dashboard link */}
                {user?.role === 'admin' && (
                  <Link href="/admin">
                    <span className="flex items-center px-4 py-2 text-sm text-gray-300 transition-colors rounded-md hover:bg-gray-700">
                      <FaUserShield className="mr-3 text-blue-400" />
                      Admin Dashboard
                    </span>
                  </Link>
                )}
                
                
                <div className="my-2 border-t border-gray-700"></div>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-left text-red-400 transition-colors rounded-md hover:bg-gray-700"
                >
                  <FaSignOutAlt className="mr-3" />
                  Sign out
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    ) : (
      <div className="flex items-center space-x-3">
        <Link href="/login">
          <motion.span 
            className="px-4 py-2 text-sm font-medium text-white transition-all rounded-lg shadow-sm cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600"
            whileHover={{ scale: 1.05, boxShadow: "0 4px 8px rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.span>
        </Link>
        <Link href="/signup">
          <motion.span 
            className="px-4 py-2 text-sm font-medium text-white transition-all border border-gray-700 rounded-lg cursor-pointer bg-gray-800/80 hover:bg-gray-700/80"
            whileHover={{ scale: 1.05, boxShadow: "0 4px 8px rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.95 }}
          >
            Sign Up
          </motion.span>
        </Link>
      </div>
    )
  ) : (
    // Initial server-side render state (empty)
    <div className="flex items-center space-x-3"></div>
  );

  // Mobile auth links with same hydration fix
  const mobileAuthLinks = mounted ? (
    isLoggedIn ? (
      <div className="pt-4 mt-4 border-t border-gray-700">
        <div className="flex items-center px-3 py-2 mb-2 text-base font-medium text-white rounded-lg bg-gradient-to-r from-gray-800 to-gray-900">
          <div className="flex items-center justify-center w-8 h-8 mr-2 overflow-hidden text-white rounded-full bg-gradient-to-br from-blue-500 to-violet-600">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <span>{user?.name || 'User'}</span>
        </div>
        <Link href="/profile">
          <span className="flex items-center px-3 py-2 text-base font-medium text-gray-300 transition-colors rounded-md hover:bg-gray-800 hover:text-white">
            <FaUserCircle className="mr-3 text-blue-400" />
            Your Profile
          </span>
        </Link>
        
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-3 py-2 mt-3 text-base font-medium text-white transition-colors rounded-md bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
        >
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
      </div>
    ) : (
      <div className="pt-4 mt-4 space-y-2 border-t border-gray-700">
        <Link href="/login">
          <span className="block px-3 py-2 text-base font-medium text-white transition-colors rounded-md bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600">
            Login
          </span>
        </Link>
        <Link href="/signup">
          <span className="block px-3 py-2 text-base font-medium text-white transition-colors bg-gray-800 border border-gray-700 rounded-md hover:bg-gray-700">
            Sign Up
          </span>
        </Link>
      </div>
    )
  ) : (
    // Initial server-side render state (empty)
    <div></div>
  );

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 border-b ${
      scrolled 
        ? 'bg-transparent border-transparent backdrop-blur-sm' 
        : 'bg-[#0A1222] shadow-md border-gray-800 backdrop-blur-md'
    }`}>
      <div className="container px-4 py-3 mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <img 
                  src="/images/logo.png" 
                  alt="IEEE Logo" 
                  className="w-auto mr-2 h-14" 
                />
                <span className={`text-xl font-bold ${
                  scrolled ? 'text-black' : 'text-white'
                }`}></span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="items-center hidden md:flex">
            <div className="flex items-center justify-center mr-6 space-x-6">
              <Link href="/">
                <span className={`text-sm font-medium transition-colors cursor-pointer hover:text-blue-400 ${
                  scrolled
                    ? 'text-black'
                    : (router.pathname === '/' ? 'text-white' : 'text-gray-300')
                }`}>
                  Home
                </span>
              </Link>
              <Link href="/about">
                <span className={`text-sm font-medium transition-colors cursor-pointer hover:text-blue-400 ${
                  scrolled
                    ? 'text-black'
                    : (router.pathname === '/about' ? 'text-white' : 'text-gray-300')
                }`}>
                  About
                </span>
              </Link>
              <Link href="/events">
                <span className={`text-sm font-medium transition-colors cursor-pointer hover:text-blue-400 ${
                  scrolled
                    ? 'text-black'
                    : (router.pathname === '/events' ? 'text-white' : 'text-gray-300')
                }`}>
                  Events
                </span>
              </Link>
              <Link href="/membership">
                <span className={`text-sm font-medium transition-colors cursor-pointer hover:text-blue-400 ${
                  scrolled
                    ? 'text-black'
                    : (router.pathname === '/membership' ? 'text-white' : 'text-gray-300')
                }`}>
                  Membership
                </span>
              </Link>
              <Link href="/contact">
                <span className={`text-sm font-medium transition-colors cursor-pointer hover:text-blue-400 ${
                  scrolled
                    ? 'text-black'
                    : (router.pathname === '/contact' ? 'text-white' : 'text-gray-300')
                }`}>
                  Contact
                </span>
              </Link>
            </div>

            <div className="flex items-center space-x-6">
              {/* GEU Logo */}
              <div className={`h-10 mx-1 border-l ${scrolled ? 'border-gray-300' : 'border-gray-700'}`}></div>
              <img 
                src="/images/geu_logo.png" 
                alt="GEU Logo" 
                className="w-auto h-12" 
              />

              {/* Authentication Links */}
              {authLinks}
            </div>
          </div>

          {/* Mobile menu button and GEU logo */}
          <div className="flex items-center space-x-4 md:hidden">
            <img 
              src="/images/geu_logo.png" 
              alt="GEU Logo" 
              className="w-auto h-14" 
            />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-1 transition-colors rounded-md focus:outline-none ${
                scrolled 
                  ? 'text-black hover:bg-gray-200' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              {isOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className={`px-2 pt-2 pb-3 space-y-1 border-t ${
              scrolled 
                ? 'bg-white border-gray-200' 
                : 'bg-[#0A1222] border-gray-800'
            }`}>
              <Link href="/">
                <span className={`block px-3 py-2 text-base font-medium text-black rounded-md hover:bg-gray-100 ${
                  router.pathname === '/' ? 'font-semibold bg-gray-100' : ''
                }`}>
                  Home
                </span>
              </Link>
              <Link href="/about">
                <span className={`block px-3 py-2 text-base font-medium text-black rounded-md hover:bg-gray-100 ${
                  router.pathname === '/about' ? 'font-semibold bg-gray-100' : ''
                }`}>
                  About
                </span>
              </Link>
              <Link href="/events">
                <span className={`block px-3 py-2 text-base font-medium text-black rounded-md hover:bg-gray-100 ${
                  router.pathname === '/events' ? 'font-semibold bg-gray-100' : ''
                }`}>
                  Events
                </span>
              </Link>
              <Link href="/membership">
                <span className={`block px-3 py-2 text-base font-medium text-black rounded-md hover:bg-gray-100 ${
                  router.pathname === '/membership' ? 'font-semibold bg-gray-100' : ''
                }`}>
                  Membership
                </span>
              </Link>
              <Link href="/contact">
                <span className={`block px-3 py-2 text-base font-medium text-black rounded-md hover:bg-gray-100 ${
                  router.pathname === '/contact' ? 'font-semibold bg-gray-100' : ''
                }`}>
                  Contact
                </span>
              </Link>

              {/* Mobile Auth Links */}
              {mobileAuthLinks}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}