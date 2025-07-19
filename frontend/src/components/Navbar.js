import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FaSignOutAlt, FaBars, FaTimes, FaUser, FaChevronDown, FaUserCircle, FaCog, FaUserShield } from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  
  // Get scroll progress for animations
  const { scrollY } = useScroll();
  const navbarOpacity = useTransform(scrollY, [0, 100], [1, 0.95]);
  const navbarBlur = useTransform(scrollY, [0, 100], [0, 5]);
  const navbarScale = useTransform(scrollY, [0, 100], [1, 0.98]);

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
            <div className="flex items-center justify-center overflow-hidden text-white rounded-full shadow-inner w-7 h-7">
              {user?.profilePhoto && user.profilePhoto !== 'default-profile.jpg' ? (
                <img 
                  src={user.profilePhoto} 
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-xs">
                  {user?.name?.charAt(0) || 'U'}
                </div>
              )}
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
                <div className="flex items-center justify-center w-16 h-16 mx-auto overflow-hidden text-2xl text-white rounded-full shadow-xl">
                  {user?.profilePhoto && user.profilePhoto !== 'default-profile.jpg' ? (
                    <img 
                      src={user.profilePhoto} 
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                      {user?.name?.charAt(0) || 'U'}
                    </div>
                  )}
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
          <div className="flex items-center justify-center w-8 h-8 mr-2 overflow-hidden text-white rounded-full">
            {user?.profilePhoto && user.profilePhoto !== 'default-profile.jpg' ? (
              <img 
                src={user.profilePhoto} 
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-sm">
                {user?.name?.charAt(0) || 'U'}
              </div>
            )}
          </div>
          <span>{user?.name || 'User'}</span>
        </div>
        <Link href="/profile">
          <span className="flex items-center px-3 py-2 text-base font-medium text-gray-300 transition-colors rounded-md hover:bg-gray-800 hover:text-white">
            <FaUserCircle className="mr-3 text-blue-400" />
            Your Profile
          </span>
        </Link>
        
        {/* Add Admin Dashboard link for mobile */}
        {user?.role === 'admin' && (
          <Link href="/admin">
            <span className="flex items-center px-3 py-2 text-base font-medium text-gray-300 transition-colors rounded-md hover:bg-gray-800 hover:text-white">
              <FaUserShield className="mr-3 text-blue-400" />
              Admin Dashboard
            </span>
          </Link>
        )}
        
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
    <motion.nav 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/10 border-transparent' 
          : 'bg-white shadow-md border-b border-gray-200'
      }`}
      style={{
        opacity: navbarOpacity,
        scale: navbarScale,
        backdropFilter: scrolled ? `blur(${navbarBlur.get()}px)` : "blur(0px)"
      }}
    >
      <div className="container px-4 py-3 mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex-shrink-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/">
              <motion.div 
                className="flex items-center cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.img 
                  src="/images/logo.png" 
                  alt="IEEE Logo" 
                  className="w-auto mr-2 h-14"
                  initial={{ rotate: -5 }}
                  animate={{ rotate: 0 }}
                  transition={{ duration: 0.5 }}
                />
                <span className={`text-xl font-bold ${
                  scrolled ? 'text-gray-800' : 'text-black'
                }`}></span>
              </motion.div>
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="items-center hidden md:flex">
            <div className="flex items-center justify-center mr-6 space-x-6">
              <Link href="/">
                <motion.span 
                  className={`text-sm font-medium transition-colors cursor-pointer hover:text-blue-600 ${
                    scrolled
                      ? 'text-gray-800'
                      : (router.pathname === '/' ? 'text-black' : 'text-gray-700')
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Home
                </motion.span>
              </Link>
              <Link href="/about">
                <motion.span 
                  className={`text-sm font-medium transition-colors cursor-pointer hover:text-blue-600 ${
                    scrolled
                      ? 'text-gray-800'
                      : (router.pathname === '/about' ? 'text-black' : 'text-gray-700')
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  About
                </motion.span>
              </Link>
              <Link href="/events">
                <motion.span 
                  className={`text-sm font-medium transition-colors cursor-pointer hover:text-blue-600 ${
                    scrolled
                      ? 'text-gray-800'
                      : (router.pathname === '/events' ? 'text-black' : 'text-gray-700')
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Events
                </motion.span>
              </Link>
              <Link href="/membership">
                <motion.span 
                  className={`text-sm font-medium transition-colors cursor-pointer hover:text-blue-600 ${
                    scrolled
                      ? 'text-gray-800'
                      : (router.pathname === '/membership' ? 'text-black' : 'text-gray-700')
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Membership
                </motion.span>
              </Link>
              <Link href="/contact">
                <motion.span 
                  className={`text-sm font-medium transition-colors cursor-pointer hover:text-blue-600 ${
                    scrolled
                      ? 'text-gray-800'
                      : (router.pathname === '/contact' ? 'text-black' : 'text-gray-700')
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact
                </motion.span>
              </Link>
            </div>

            <div className="flex items-center space-x-6">
              {/* GEU Logo */}
              <motion.div 
                className={`h-10 mx-1 border-l ${scrolled ? 'border-gray-300' : 'border-gray-300'}`}
                initial={{ height: 0 }}
                animate={{ height: "2.5rem" }}
                transition={{ delay: 0.2, duration: 0.5 }}
              ></motion.div>
              <motion.img 
                src="/images/geu_logo.png" 
                alt="GEU Logo" 
                className="w-auto h-12"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              />

              {/* Authentication Links */}
              {authLinks}
            </div>
          </div>

          {/* Mobile menu button and GEU logo */}
          <div className="flex items-center space-x-4 md:hidden">
            <motion.img 
              src="/images/geu_logo.png" 
              alt="GEU Logo" 
              className="w-auto h-14"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            />
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.1, rotate: isOpen ? 0 : 10 }}
              whileTap={{ scale: 0.9 }}
              className={`p-1 transition-colors rounded-md focus:outline-none ${
                scrolled 
                  ? 'text-gray-800 hover:bg-gray-200/50' 
                  : 'text-gray-700 hover:text-black hover:bg-gray-200'
              }`}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaTimes className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaBars className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="md:hidden"
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ 
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            <motion.div 
              className={`px-2 pt-2 pb-3 space-y-1 border-t ${
                scrolled 
                  ? 'bg-white border-gray-200' 
                  : 'bg-white border-gray-200'
              }`}
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.07
                  }
                }
              }}
              initial="hidden"
              animate="show"
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  show: { opacity: 1, x: 0 }
                }}
              >
                <Link href="/">
                  <motion.span 
                    className={`block px-3 py-2 text-base font-medium text-black rounded-md hover:bg-gray-100 ${
                      router.pathname === '/' ? 'font-semibold bg-gray-100' : ''
                    }`}
                    whileHover={{ x: 5, backgroundColor: "#f3f4f6" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Home
                  </motion.span>
                </Link>
              </motion.div>
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  show: { opacity: 1, x: 0 }
                }}
              >
                <Link href="/about">
                  <motion.span 
                    className={`block px-3 py-2 text-base font-medium text-black rounded-md hover:bg-gray-100 ${
                      router.pathname === '/about' ? 'font-semibold bg-gray-100' : ''
                    }`}
                    whileHover={{ x: 5, backgroundColor: "#f3f4f6" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    About
                  </motion.span>
                </Link>
              </motion.div>
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  show: { opacity: 1, x: 0 }
                }}
              >
                <Link href="/events">
                  <motion.span 
                    className={`block px-3 py-2 text-base font-medium text-black rounded-md hover:bg-gray-100 ${
                      router.pathname === '/events' ? 'font-semibold bg-gray-100' : ''
                    }`}
                    whileHover={{ x: 5, backgroundColor: "#f3f4f6" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Events
                  </motion.span>
                </Link>
              </motion.div>
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  show: { opacity: 1, x: 0 }
                }}
              >
                <Link href="/membership">
                  <motion.span 
                    className={`block px-3 py-2 text-base font-medium text-black rounded-md hover:bg-gray-100 ${
                      router.pathname === '/membership' ? 'font-semibold bg-gray-100' : ''
                    }`}
                    whileHover={{ x: 5, backgroundColor: "#f3f4f6" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Membership
                  </motion.span>
                </Link>
              </motion.div>
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  show: { opacity: 1, x: 0 }
                }}
              >
                <Link href="/contact">
                  <motion.span 
                    className={`block px-3 py-2 text-base font-medium text-black rounded-md hover:bg-gray-100 ${
                      router.pathname === '/contact' ? 'font-semibold bg-gray-100' : ''
                    }`}
                    whileHover={{ x: 5, backgroundColor: "#f3f4f6" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Contact
                  </motion.span>
                </Link>
              </motion.div>

              {/* Mobile Auth Links */}
              {mobileAuthLinks}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}