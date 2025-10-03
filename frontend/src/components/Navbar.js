import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaUser,
  FaChevronDown,
  FaUserCircle,
  FaCog,
  FaUserShield,
  FaBell,
  FaSearch,
} from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  // Get scroll progress for enhanced animations
  const { scrollY } = useScroll();
  const navbarOpacity = useTransform(scrollY, [0, 100], [1, 0.98]);
  const navbarBlur = useTransform(scrollY, [0, 100], [0, 20]);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.95]);

  // Enhanced scroll tracking for dynamic navbar
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Only run authentication check on client-side
  useEffect(() => {
    setMounted(true);
    // Check if user is logged in
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setIsLoggedIn(true);
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        console.error("Error parsing user data:", e);
      }
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (mounted) {
      const handleClickOutside = (event) => {
        if (userMenuOpen && !event.target.closest(".user-menu-container")) {
          setUserMenuOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [userMenuOpen, mounted]);

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Update state
    setIsLoggedIn(false);
    setUser(null);
    setUserMenuOpen(false);

    // Redirect to home page
    window.location.href = "/";
  };

  // Enhanced auth links component
  const authLinks = mounted ? (
    isLoggedIn ? (
      <div className="relative flex items-center space-x-4 user-menu-container">
        {/* Notification Bell */}
        <motion.button
          className="relative p-2 text-gray-600 transition-colors rounded-full hover:text-blue-600 hover:bg-blue-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaBell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
        </motion.button>

        {/* User Menu Trigger */}
        <motion.div
          className="flex items-center cursor-pointer group"
          onClick={() => setUserMenuOpen(!userMenuOpen)}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center px-4 py-2 space-x-3 transition-all duration-300 bg-white border border-gray-200 rounded-full shadow-sm group-hover:shadow-lg group-hover:border-blue-300">
            <div className="flex items-center justify-center w-8 h-8 overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
              {user?.profilePhoto &&
              user.profilePhoto !== "default-profile.jpg" ? (
                <img
                  src={user.profilePhoto}
                  alt={user.name}
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-sm font-semibold text-white">
                  {user?.name?.charAt(0) || "U"}
                </span>
              )}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-800">
                {user?.name?.split(" ")[0] || "User"}
              </p>
              <p className="text-xs text-gray-500">
                {user?.role === "admin" ? "Administrator" : "Member"}
              </p>
            </div>
            <motion.div
              animate={{ rotate: userMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <FaChevronDown className="w-3 h-3 text-gray-400" />
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced User Dropdown */}
        <AnimatePresence>
          {userMenuOpen && (
            <motion.div
              className="absolute right-0 z-10 mt-2 overflow-hidden bg-white border border-gray-200 shadow-2xl w-72 rounded-2xl top-full"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-6 border-b border-gray-100 bg-gradient-to-br from-blue-50 to-purple-50">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-16 h-16 overflow-hidden rounded-full shadow-lg bg-gradient-to-br from-blue-500 to-purple-600">
                    {user?.profilePhoto &&
                    user.profilePhoto !== "default-profile.jpg" ? (
                      <img
                        src={user.profilePhoto}
                        alt={user.name}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <span className="text-xl font-bold text-white">
                        {user?.name?.charAt(0) || "U"}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{user?.name}</p>
                    <p className="text-sm text-gray-600 truncate">
                      {user?.email}
                    </p>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${
                        user?.role === "admin"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {user?.role === "admin" ? "Administrator" : "Member"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="py-2">
                <Link href="/profile">
                  <motion.div
                    className="flex items-center px-6 py-3 text-gray-700 transition-colors cursor-pointer hover:bg-blue-50"
                    whileHover={{ x: 4 }}
                  >
                    <FaUserCircle className="mr-3 text-blue-500" />
                    View Profile
                  </motion.div>
                </Link>

                {/* Dashboard Links */}
                {user && (
                  <div className="space-y-2">
                    <Link
                      href="/dashboard"
                      className="block px-6 py-3 text-gray-700 transition-colors cursor-pointer hover:bg-blue-50"
                      whileHover={{ x: 4 }}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/profile"
                      className="block px-6 py-3 text-gray-700 transition-colors cursor-pointer hover:bg-blue-50"
                      whileHover={{ x: 4 }}
                    >
                      Profile
                    </Link>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-100">
                <motion.button
                  onClick={handleLogout}
                  className="flex items-center w-full px-6 py-3 text-red-600 transition-colors hover:bg-red-50"
                  whileHover={{ x: 4 }}
                >
                  <FaSignOutAlt className="mr-3" />
                  Sign Out
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    ) : (
      <div className="flex items-center space-x-4">
        <Link href="/login">
          <motion.div
            className="px-6 py-2 text-sm font-medium text-gray-700 transition-all duration-200 border border-gray-300 rounded-full cursor-pointer hover:border-blue-500 hover:text-blue-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign In
          </motion.div>
        </Link>
        <Link href="/signup">
          <motion.div
            className="px-6 py-2 text-sm font-medium text-white transition-all duration-200 rounded-full cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join IEEE
          </motion.div>
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
            {user?.profilePhoto &&
            user.profilePhoto !== "default-profile.jpg" ? (
              <img
                src={user.profilePhoto}
                alt={user.name}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-sm bg-gradient-to-br from-blue-500 to-violet-600">
                {user?.name?.charAt(0) || "U"}
              </div>
            )}
          </div>
          <span>{user?.name || "User"}</span>
        </div>
        <Link href="/profile">
          <span className="flex items-center px-3 py-2 text-base font-medium text-gray-300 transition-colors rounded-md hover:bg-gray-800 hover:text-white">
            <FaUserCircle className="mr-3 text-blue-400" />
            Your Profile
          </span>
        </Link>

        {/* Dashboard link for mobile */}
        <Link href="/">
          <span className="flex items-center px-3 py-2 text-base font-medium text-gray-300 transition-colors rounded-md hover:bg-gray-800 hover:text-white">
            <FaCog className="mr-3 text-blue-400" />
            Dashboard
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
    <motion.nav
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl border-white/20 shadow-2xl"
          : "bg-white shadow-lg border-b border-gray-100"
      }`}
      style={{
        opacity: navbarOpacity,
        backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container px-6 py-4 mx-auto">
        <div className="flex items-center justify-between">
          {/* Enhanced Logo Section */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ scale: logoScale }}
          >
            <Link href="/">
              <motion.div
                className="relative flex items-center p-2 -m-2 cursor-pointer rounded-xl group"
                whileHover={{
                  scale: 1.05,
                  background:
                    "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div className="absolute inset-0 transition-all duration-300 rounded-xl bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10" />
                <motion.img
                  src="/images/logo.png"
                  alt="IEEE Logo"
                  className="relative w-auto h-12 mr-3 rounded-lg shadow-lg"
                  whileHover={{ rotate: [0, -2, 2, 0] }}
                  transition={{ duration: 0.5 }}
                  onError={(e) => {
                    const el = e.currentTarget;
                    if (el.dataset.fallbackTried === "1") return;
                    el.dataset.fallbackTried = "1";
                    el.src = "/images/hero/IEEE_hero.jpg";
                  }}
                />
                <motion.div className="relative">
                  <motion.h1
                    className="text-xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    IEEE Student Branch
                  </motion.h1>
                  <motion.p
                    className="-mt-1 text-xs text-gray-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    Graphic Era University
                  </motion.p>
                </motion.div>
              </motion.div>
            </Link>
          </motion.div>

          {/* Enhanced Desktop Navigation */}
          <div className="items-center hidden lg:flex">
            <motion.div
              className="flex items-center mr-8 space-x-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link href="/">
                <motion.div
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 cursor-pointer group ${
                    router.pathname === "/"
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Home
                  <motion.div
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 origin-left ${
                      router.pathname === "/" ? "scale-x-100" : "scale-x-0"
                    } group-hover:scale-x-100 transition-transform duration-300`}
                  />
                </motion.div>
              </Link>
              <Link href="/about">
                <motion.div
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 cursor-pointer group ${
                    router.pathname === "/about"
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  About
                  <motion.div
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 origin-left ${
                      router.pathname === "/about" ? "scale-x-100" : "scale-x-0"
                    } group-hover:scale-x-100 transition-transform duration-300`}
                  />
                </motion.div>
              </Link>
              <Link href="/events">
                <motion.div
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 cursor-pointer group ${
                    router.pathname === "/events"
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Events
                  <motion.div
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 origin-left ${
                      router.pathname === "/events"
                        ? "scale-x-100"
                        : "scale-x-0"
                    } group-hover:scale-x-100 transition-transform duration-300`}
                  />
                </motion.div>
              </Link>
              <Link href="/gallery">
                <motion.div
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 cursor-pointer group ${
                    router.pathname === "/gallery"
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Gallery
                  <motion.div
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 origin-left ${
                      router.pathname === "/gallery"
                        ? "scale-x-100"
                        : "scale-x-0"
                    } group-hover:scale-x-100 transition-transform duration-300`}
                  />
                </motion.div>
              </Link>
              <Link href="/membership">
                <motion.div
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 cursor-pointer group ${
                    router.pathname === "/membership"
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Membership
                  <motion.div
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 origin-left ${
                      router.pathname === "/membership"
                        ? "scale-x-100"
                        : "scale-x-0"
                    } group-hover:scale-x-100 transition-transform duration-300`}
                  />
                </motion.div>
              </Link>
              <Link href="/contact">
                <motion.div
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 cursor-pointer group ${
                    router.pathname === "/contact"
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact
                  <motion.div
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 origin-left ${
                      router.pathname === "/contact"
                        ? "scale-x-100"
                        : "scale-x-0"
                    } group-hover:scale-x-100 transition-transform duration-300`}
                  />
                </motion.div>
              </Link>
            </motion.div>

            {/* Divider */}
            <motion.div
              className="w-px h-8 mr-6 bg-gray-300"
              initial={{ height: 0 }}
              animate={{ height: "2rem" }}
              transition={{ delay: 0.8, duration: 0.3 }}
            />

            {/* GEU Logo */}
            <motion.img
              src="/images/geu_logo.png"
              alt="GEU Logo"
              className="w-auto h-10 mr-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              onError={(e) => {
                const el = e.currentTarget;
                if (el.dataset.fallbackTried === "1") return;
                el.dataset.fallbackTried = "1";
                el.src = "/images/logo.png";
              }}
            />

            {/* Auth Links */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              {authLinks}
            </motion.div>
          </div>

          {/* Enhanced Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="relative p-2 text-gray-600 transition-colors lg:hidden hover:text-blue-600"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="border-t border-gray-200 lg:hidden bg-white/95 backdrop-blur-xl"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="container px-6 py-6 mx-auto"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1, delayChildren: 0.1 },
                },
              }}
              initial="hidden"
              animate="show"
            >
              {/* Mobile Navigation Links */}
              <div className="mb-6 space-y-4">
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    show: { opacity: 1, x: 0 },
                  }}
                >
                  <Link href="/">
                    <motion.div
                      className={`block px-4 py-3 text-base font-medium rounded-xl transition-all cursor-pointer ${
                        router.pathname === "/"
                          ? "bg-blue-50 text-blue-600 border border-blue-200"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      whileHover={{ x: 4, backgroundColor: "#f3f4f6" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsOpen(false)}
                    >
                      Home
                    </motion.div>
                  </Link>
                </motion.div>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    show: { opacity: 1, x: 0 },
                  }}
                >
                  <Link href="/about">
                    <motion.div
                      className={`block px-4 py-3 text-base font-medium rounded-xl transition-all cursor-pointer ${
                        router.pathname === "/about"
                          ? "bg-blue-50 text-blue-600 border border-blue-200"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      whileHover={{ x: 4, backgroundColor: "#f3f4f6" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsOpen(false)}
                    >
                      About
                    </motion.div>
                  </Link>
                </motion.div>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    show: { opacity: 1, x: 0 },
                  }}
                >
                  <Link href="/events">
                    <motion.div
                      className={`block px-4 py-3 text-base font-medium rounded-xl transition-all cursor-pointer ${
                        router.pathname === "/events"
                          ? "bg-blue-50 text-blue-600 border border-blue-200"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      whileHover={{ x: 4, backgroundColor: "#f3f4f6" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsOpen(false)}
                    >
                      Events
                    </motion.div>
                  </Link>
                </motion.div>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    show: { opacity: 1, x: 0 },
                  }}
                >
                  <Link href="/gallery">
                    <motion.div
                      className={`block px-4 py-3 text-base font-medium rounded-xl transition-all cursor-pointer ${
                        router.pathname === "/gallery"
                          ? "bg-blue-50 text-blue-600 border border-blue-200"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      whileHover={{ x: 4, backgroundColor: "#f3f4f6" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsOpen(false)}
                    >
                      Gallery
                    </motion.div>
                  </Link>
                </motion.div>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    show: { opacity: 1, x: 0 },
                  }}
                >
                  <Link href="/membership">
                    <motion.div
                      className={`block px-4 py-3 text-base font-medium rounded-xl transition-all cursor-pointer ${
                        router.pathname === "/membership"
                          ? "bg-blue-50 text-blue-600 border border-blue-200"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      whileHover={{ x: 4, backgroundColor: "#f3f4f6" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsOpen(false)}
                    >
                      Membership
                    </motion.div>
                  </Link>
                </motion.div>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    show: { opacity: 1, x: 0 },
                  }}
                >
                  <Link href="/contact">
                    <motion.div
                      className={`block px-4 py-3 text-base font-medium rounded-xl transition-all cursor-pointer ${
                        router.pathname === "/contact"
                          ? "bg-blue-50 text-blue-600 border border-blue-200"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      whileHover={{ x: 4, backgroundColor: "#f3f4f6" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsOpen(false)}
                    >
                      Contact
                    </motion.div>
                  </Link>
                </motion.div>
              </div>

              {/* Mobile Auth Section */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
                className="pt-4 border-t border-gray-200"
              >
                {mounted && !isLoggedIn ? (
                  <div className="space-y-3">
                    <Link href="/login">
                      <motion.div
                        className="block w-full px-4 py-3 text-center text-gray-700 border border-gray-300 cursor-pointer rounded-xl hover:bg-gray-50"
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsOpen(false)}
                      >
                        Sign In
                      </motion.div>
                    </Link>
                    <Link href="/signup">
                      <motion.div
                        className="block w-full px-4 py-3 text-center text-white cursor-pointer rounded-xl bg-gradient-to-r from-blue-500 to-purple-600"
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsOpen(false)}
                      >
                        Join IEEE
                      </motion.div>
                    </Link>
                  </div>
                ) : mounted && isLoggedIn ? (
                  <div className="space-y-3">
                    <div className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                      <div className="flex items-center justify-center w-12 h-12 overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                        {user?.profilePhoto &&
                        user.profilePhoto !== "default-profile.jpg" ? (
                          <img
                            src={user.profilePhoto}
                            alt={user.name}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <span className="text-sm font-bold text-white">
                            {user?.name?.charAt(0) || "U"}
                          </span>
                        )}
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">
                          {user?.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {user?.role === "admin" ? "Administrator" : "Member"}
                        </p>
                      </div>
                    </div>

                    <Link href="/profile">
                      <motion.div
                        className="flex items-center px-4 py-3 text-gray-700 cursor-pointer rounded-xl hover:bg-gray-50"
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsOpen(false)}
                      >
                        <FaUserCircle className="mr-3 text-blue-500" />
                        View Profile
                      </motion.div>
                    </Link>

                    {user?.role === "student" && (
                      <Link href="/">
                        <motion.div
                          className="flex items-center px-4 py-3 text-gray-700 cursor-pointer rounded-xl hover:bg-gray-50"
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setIsOpen(false)}
                        >
                          <FaCog className="mr-3 text-green-500" />
                          Student Dashboard
                        </motion.div>
                      </Link>
                    )}

                    {user?.role === "admin" && (
                      <Link href="/admin">
                        <motion.div
                          className="flex items-center px-4 py-3 text-gray-700 cursor-pointer rounded-xl hover:bg-gray-50"
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setIsOpen(false)}
                        >
                          <FaUserShield className="mr-3 text-red-500" />
                          Admin Panel
                        </motion.div>
                      </Link>
                    )}

                    <motion.button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-3 text-red-600 rounded-xl hover:bg-red-50"
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaSignOutAlt className="mr-3" />
                      Sign Out
                    </motion.button>
                  </div>
                ) : null}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
