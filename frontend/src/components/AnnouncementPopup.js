import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCalendar, FaMapMarkerAlt, FaClock, FaRupeeSign, FaExternalLinkAlt, FaFire, FaStar, FaGift } from 'react-icons/fa';
import Link from 'next/link';

export default function AnnouncementPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    // Add custom scrollbar styles
    const style = document.createElement('style');
    style.textContent = `
      .custom-scrollbar::-webkit-scrollbar {
        width: 8px;
      }
      
      .custom-scrollbar::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
      }
      
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 10px;
        border: 2px solid transparent;
        background-clip: content-box;
      }
      
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
        background-clip: content-box;
      }
      
      .custom-scrollbar {
        scrollbar-width: thin;
        scrollbar-color: #667eea rgba(255, 255, 255, 0.1);
      }
    `;
    document.head.appendChild(style);

    return () => {
      // Clean up style on unmount
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    // Show popup after a short delay when component mounts on every page refresh
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500); // Show after 1.5 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Just close the popup without storing any data
  };

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    // Hide scroll indicator after user starts scrolling
    if (scrollTop > 10) {
      setShowScrollIndicator(false);
    }
    // Show indicator again if user scrolls back to top
    if (scrollTop === 0) {
      setShowScrollIndicator(true);
    }
  };

  const handleRegisterClick = () => {
    // Open registration link
    window.open('https://www.geuieee.com', '_blank');
    handleClose();
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-gradient-to-br from-black/80 via-blue-900/20 to-purple-900/20 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative bg-gradient-to-br from-white via-white to-gray-50/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 max-w-2xl w-full max-h-[95vh] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-500/20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-gradient-to-tr from-orange-400/20 to-pink-500/20 blur-2xl"></div>
          
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute z-20 p-3 text-white transition-all duration-300 rounded-full bg-black/30 backdrop-blur-md top-4 right-4 hover:bg-black/50 hover:scale-110 group"
          >
            <FaTimes size={16} className="transition-transform duration-300 group-hover:rotate-90" />
          </button>

          {/* Poster Section */}
          <div className="relative flex-shrink-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-transparent to-purple-600/10"></div>
            <img
              src="/images/events/kindlejunior4.0.png"
              alt="Kindle Junior 4.0 Event"
              className="object-cover w-full transition-transform duration-700 transform h-80 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            
            {/* Floating Badge */}
            <div className="absolute px-4 py-2 text-sm font-bold text-white rounded-full shadow-lg top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 animate-pulse">
              <FaFire className="inline mr-2" />
              HOT EVENT!
            </div>
            
            {/* Event Title Overlay */}
            <div className="absolute text-white bottom-6 left-6 right-20">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <h2 className="mb-2 text-3xl font-black tracking-wide drop-shadow-lg">
                  <span className="text-yellow-300">🔥</span> Exciting Event Alert!
                </h2>
                <p className="text-xl font-semibold opacity-95 drop-shadow-md">
                  Kindle Junior 4.0 is here!
                </p>
              </motion.div>
            </div>
          </div>

          {/* Scrollable Content Section */}
          <div 
            className="relative flex-1 overflow-y-auto custom-scrollbar scroll-smooth"
            onScroll={handleScroll}
          >
            {/* Scroll Indicator */}
            {showScrollIndicator && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute z-10 flex flex-col items-center text-gray-400 top-2 right-4"
              >
                <div className="mb-1 text-xs">Scroll</div>
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-1 h-6 rounded-full bg-gradient-to-b from-blue-400 to-purple-500 opacity-60"
                ></motion.div>
              </motion.div>
            )}
            
            <div className="min-h-0 p-8 space-y-6">
            <motion.div 
              className="text-center"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <h3 className="mb-3 text-3xl font-black text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text">
                Don't Miss Out!
              </h3>
              <div className="mb-4 text-xl font-bold text-transparent text-gradient bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text">
                <FaStar className="inline mr-2 text-yellow-500" />
                Register Now & Win Amazing Prizes!
                <FaStar className="inline ml-2 text-yellow-500" />
              </div>
              <p className="text-lg leading-relaxed text-gray-600">
                Join us for an incredible event with 
                <span className="font-semibold text-purple-600"> exciting prizes</span> and 
                <span className="font-semibold text-blue-600"> learning opportunities!</span>
              </p>
            </motion.div>

            {/* Event Details */}
            <motion.div 
              className="grid grid-cols-2 gap-6"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.6 }}
            >
              <div className="flex items-center p-4 space-x-4 transition-all duration-300 border border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl hover:shadow-lg group">
                <div className="p-3 transition-transform duration-300 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl group-hover:scale-110">
                  <FaCalendar className="text-white" size={20} />
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-800">Date</p>
                  <p className="font-semibold text-blue-700">14th Oct 2025</p>
                </div>
              </div>
              
              <div className="flex items-center p-4 space-x-4 transition-all duration-300 border border-green-200 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl hover:shadow-lg group">
                <div className="p-3 transition-transform duration-300 shadow-lg bg-gradient-to-br from-green-500 to-green-600 rounded-xl group-hover:scale-110">
                  <FaClock className="text-white" size={20} />
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-800">Time</p>
                  <p className="font-semibold text-green-700">10 AM - 4 PM</p>
                </div>
              </div>
              
              <div className="flex items-center p-4 space-x-4 transition-all duration-300 border border-purple-200 bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl hover:shadow-lg group">
                <div className="p-3 transition-transform duration-300 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl group-hover:scale-110">
                  <FaMapMarkerAlt className="text-white" size={20} />
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-800">Venue</p>
                  <p className="font-semibold text-purple-700">New Lab 1, 2 (CSIT)</p>
                </div>
              </div>
              
              <div className="flex items-center p-4 space-x-4 transition-all duration-300 border border-orange-200 bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl hover:shadow-lg group">
                <div className="p-3 transition-transform duration-300 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl group-hover:scale-110">
                  <FaRupeeSign className="text-white" size={20} />
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-800">Entry Fee</p>
                  <p className="font-semibold text-orange-700">₹99 <span className="text-sm">(₹49 for first IEEE Members)</span></p>
                </div>
              </div>
            </motion.div>

            {/* Highlights */}
            <motion.div 
              className="p-6 border border-purple-200 shadow-lg rounded-2xl bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <h4 className="flex items-center mb-4 text-xl font-black text-gray-800">
                <FaGift className="mr-3 text-purple-600" size={24} />
                🎯 Event Highlights
              </h4>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div className="flex items-center p-3 space-x-3 rounded-lg bg-white/70 backdrop-blur-sm">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"></div>
                  <span className="font-medium text-gray-700">Exciting prizes worth thousands!</span>
                </div>
                <div className="flex items-center p-3 space-x-3 rounded-lg bg-white/70 backdrop-blur-sm">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-400 to-blue-500"></div>
                  <span className="font-medium text-gray-700">Hands-on learning experience</span>
                </div>
                <div className="flex items-center p-3 space-x-3 rounded-lg bg-white/70 backdrop-blur-sm">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-500"></div>
                  <span className="font-medium text-gray-700">Industry expert sessions</span>
                </div>
                <div className="flex items-center p-3 space-x-3 rounded-lg bg-white/70 backdrop-blur-sm">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"></div>
                  <span className="font-medium text-gray-700">Networking opportunities</span>
                </div>
                <div className="flex items-center p-3 space-x-3 rounded-lg bg-white/70 backdrop-blur-sm md:col-span-2">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-red-400 to-yellow-500"></div>
                  <span className="font-medium text-gray-700">Certificate of participation</span>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              className="flex space-x-4"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              <button
                onClick={handleRegisterClick}
                className="flex items-center justify-center flex-1 px-8 py-4 space-x-3 font-bold text-white transition-all duration-500 transform rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 hover:scale-105 hover:shadow-2xl group"
              >
                <span className="text-lg">Register Now</span>
                <FaExternalLinkAlt size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              
              <Link href="/events">
                <button
                  onClick={handleClose}
                  className="flex-1 px-8 py-4 font-bold text-gray-700 transition-all duration-500 transform border-2 border-gray-300 rounded-2xl hover:border-purple-400 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:scale-105 hover:shadow-lg"
                >
                  <span className="text-lg">View All Events</span>
                </button>
              </Link>
            </motion.div>

            <motion.p 
              className="p-3 mt-6 text-sm text-center text-gray-500 rounded-lg bg-gray-50/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.6 }}
            >
              <span className="inline-block w-2 h-2 mr-2 bg-green-500 rounded-full animate-pulse"></span>
              This announcement will show again after refresh in home page
            </motion.p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}