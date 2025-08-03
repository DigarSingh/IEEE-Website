import { useState, useEffect } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUsers,
  FaGraduationCap,
  FaGlobe,
  FaCertificate,
  FaNetworkWired,
  FaRocket,
  FaQrcode,
  FaExternalLinkAlt,
  FaCheckCircle,
  FaStar,
  FaHandshake,
  FaLightbulb,
  FaBookOpen,
  FaLaptopCode,
  FaTrophy,
  FaHeart,
  FaArrowRight,
  FaDownload,
  FaShare,
  FaRegClock,
  FaRegUser,
  FaRegCreditCard,
  FaRegFileAlt,
  FaRegGift,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Layout from "../components/Layout";
import ParticleBackground from "../components/ParticleBackground";

export default function Membership() {
  const [activeTab, setActiveTab] = useState("benefits");
  const [showQR, setShowQR] = useState(false);
  const [hoveredBenefit, setHoveredBenefit] = useState(null);

  // Google Form URL - Replace with your actual Google Form URL
  const googleFormUrl = "https://forms.gle/T4g3ruf1phUwHX1UA";
  
  // QR Code URL - Using placeholder for now, replace with actual QR code
  const qrCodeUrl = "/images/membership/Qr.png";

  const benefits = [
    {
      icon: FaGraduationCap,
      title: "Professional Development",
      description: "Access to workshops, seminars, and training sessions to enhance your skills and knowledge.",
      color: "from-blue-500 to-blue-600",
      gradient: "from-blue-400 via-blue-500 to-blue-600"
    },
    {
      icon: FaNetworkWired,
      title: "Networking Opportunities",
      description: "Connect with industry professionals, alumni, and fellow students across various disciplines.",
      color: "from-purple-500 to-purple-600",
      gradient: "from-purple-400 via-purple-500 to-purple-600"
    },
    {
      icon: FaCertificate,
      title: "Certifications & Recognition",
      description: "Earn IEEE certifications and get recognized for your contributions and achievements.",
      color: "from-green-500 to-green-600",
      gradient: "from-green-400 via-green-500 to-green-600"
    },
    {
      icon: FaGlobe,
      title: "Global IEEE Community",
      description: "Join a worldwide network of over 400,000 IEEE members across 160 countries.",
      color: "from-red-500 to-red-600",
      gradient: "from-red-400 via-red-500 to-red-600"
    },
    {
      icon: FaRocket,
      title: "Career Opportunities",
      description: "Access to job boards, internships, and career guidance from industry experts.",
      color: "from-yellow-500 to-yellow-600",
      gradient: "from-yellow-400 via-yellow-500 to-yellow-600"
    },
    {
      icon: FaBookOpen,
      title: "Learning Resources",
      description: "Access to IEEE Xplore digital library, technical papers, and educational materials.",
      color: "from-indigo-500 to-indigo-600",
      gradient: "from-indigo-400 via-indigo-500 to-indigo-600"
    },
    {
      icon: FaLaptopCode,
      title: "Technical Projects",
      description: "Participate in hackathons, competitions, and hands-on technical projects.",
      color: "from-pink-500 to-pink-600",
      gradient: "from-pink-400 via-pink-500 to-pink-600"
    },
    {
      icon: FaTrophy,
      title: "Competitions & Awards",
      description: "Compete in IEEE-sponsored competitions and win prestigious awards and recognition.",
      color: "from-orange-500 to-orange-600",
      gradient: "from-orange-400 via-orange-500 to-orange-600"
    }
  ];

  const membershipTypes = [
    {
      type: "Basic Membership",
      originalPrice: "₹500",
      price: "₹249",
      discount: "50%",
      duration: "per year",
      features: [
        "Access to all IEEE resources",
        "Participation in events and workshops",
        "Networking opportunities",
        "IEEE email address",
        "Digital library access",
        "Competition participation",
        "Certificate of membership"
      ],
      popular: false,
      color: "from-blue-500 to-blue-600",
      gradient: "from-blue-400 via-blue-500 to-blue-600",
      badge: "Most Popular for Students"
    },
    {
      type: "Core Membership",
      originalPrice: "₹1500",
      price: "₹800",
      discount: "Limited Time",
      duration: "per year",
      features: [
        "All Basic memberships benefits",
        "Advanced technical resources",
        "Professional development programs",
        "Industry networking events",
        "Mentorship opportunities",
        "Leadership roles",
        "Priority event registration"
      ],
      popular: true,
      color: "from-purple-500 to-purple-600",
      gradient: "from-purple-400 via-purple-500 to-purple-600",
      badge: "Best Value"
    }
  ];

  const requirements = [
    "Must be a current student of Graphic Era University",
    "Valid student ID card required",
    "Active email address",
    "Interest in technology and engineering",
    "Commitment to IEEE values and ethics"
  ];

  const process = [
    {
      step: 1,
      title: "Fill Application Form",
      description: "Complete the online membership application form with your details",
      icon: FaRegFileAlt,
      color: "from-blue-500 to-blue-600"
    },
    {
      step: 2,
      title: "Submit Documents",
      description: "Upload required documents including student ID and photo",
      icon: FaRegUser,
      color: "from-green-500 to-green-600"
    },
    {
      step: 3,
      title: "Payment",
      description: "Pay the membership fee through the provided payment gateway",
      icon: FaRegCreditCard,
      color: "from-purple-500 to-purple-600"
    },
    {
      step: 4,
      title: "Verification",
      description: "Your application will be reviewed and verified by the team",
      icon: FaRegClock,
      color: "from-orange-500 to-orange-600"
    }
  ];

  const handleJoinNow = () => {
    window.open(googleFormUrl, '_blank');
  };

  const handleDownloadQR = () => {
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = 'ieee-membership-qr.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join IEEE Student Branch - Graphic Era University',
          text: 'Join our IEEE community and unlock amazing opportunities!',
          url: googleFormUrl
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(googleFormUrl);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <>
      <Head>
        <title>Membership - IEEE Student Branch GEU</title>
        <meta name="description" content="Join IEEE Student Branch at Graphic Era University. Access professional development, networking opportunities, and technical resources." />
        <meta name="keywords" content="IEEE membership, student branch, Graphic Era University, professional development, networking" />
      </Head>

      <Layout>
        <div className="min-h-screen overflow-hidden bg-white">
          {/* Enhanced Hero Section with Modern Theme */}
          <section className="relative flex items-center min-h-screen overflow-hidden">
            {/* Multi-layer Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-blue-900/30"></div>
            
            {/* Particle Background */}
            <ParticleBackground />

            {/* Animated Background Particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-white/20"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0.2, 0.8, 0.2],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            {/* Main Content */}
            <div className="container relative z-10 px-6 mx-auto lg:px-8">
              <div className="grid items-center gap-12 lg:grid-cols-2">
                {/* Left Content */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-white"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium border rounded-full bg-white/10 backdrop-blur-sm border-white/20"
                  >
                    <FaUsers className="mr-2" />
                    Join Our Community
                  </motion.div>
                  
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mb-6 text-5xl font-bold leading-tight lg:text-7xl"
                  >
                    IEEE{' '}
                    <span className="text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text">
                      Membership
                    </span>
                    <br />
                    <span className="text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text">
                      Unlock Your Potential
                    </span>
                  </motion.h1>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="max-w-lg mb-8 text-xl leading-relaxed text-blue-100"
                  >
                    Unlock your potential with access to professional development, networking opportunities, 
                    and cutting-edge technical resources. Join the world's largest technical professional organization.
                  </motion.p>

                  {/* Enhanced Stats */}
                  <motion.div
                    className="grid grid-cols-2 gap-6 mb-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    {[
                      { number: "100", label: "Active Members" },
                      { number: "25+", label: "Projects" },
                      { number: "50+", label: "Events/Year" },
                      { number: "95%", label: "Success Rate" }
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        className="text-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.6 + index * 0.1, type: "spring" }}
                      >
                        <div className="text-2xl font-bold text-white lg:text-3xl">{stat.number}</div>
                        <div className="text-sm text-blue-200 lg:text-base">{stat.label}</div>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex flex-wrap gap-4"
                  >
                    <motion.button
                      onClick={handleJoinNow}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-8 py-4 font-semibold transition-all bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl hover:shadow-xl hover:shadow-blue-500/25"
                    >
                      Join Now
                      <FaArrowRight className="text-sm" />
                    </motion.button>
                    <motion.button
                      onClick={() => setShowQR(!showQR)}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-8 py-4 font-semibold transition-all border bg-white/10 backdrop-blur-sm border-white/20 rounded-xl hover:bg-white/20"
                    >
                      <FaQrcode />
                      Show QR Code
                    </motion.button>
                  </motion.div>
                </motion.div>

                {/* Right Content - Interactive Membership Preview */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative"
                >
                  <div className="relative p-8 border bg-white/10 backdrop-blur-sm border-white/20 rounded-3xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl"></div>
                    <div className="relative z-10">
                      <div className="mb-6 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 mb-4 text-2xl text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl">
                          <FaCertificate />
                        </div>
                        <h3 className="text-2xl font-bold text-white">Membership Benefits</h3>
                        <p className="text-blue-200">Access exclusive resources and opportunities</p>
                      </div>
                      
                      <div className="space-y-4">
                        {benefits.slice(0, 4).map((benefit, index) => (
                          <motion.div
                            key={index}
                            className="flex items-center p-4 bg-white/5 rounded-xl backdrop-blur-sm"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 + index * 0.1 }}
                          >
                            <div className={`flex items-center justify-center w-10 h-10 mr-4 rounded-lg bg-gradient-to-r ${benefit.color}`}>
                              <benefit.icon className="text-white" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-white">{benefit.title}</h4>
                              <p className="text-sm text-blue-200">{benefit.description}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* QR Code Modal */}
            <AnimatePresence>
              {showQR && (
                <motion.div
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowQR(false)}
                >
                  <motion.div
                    className="max-w-sm p-8 mx-4 text-center bg-white shadow-2xl rounded-3xl"
                    initial={{ scale: 0.8, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.8, opacity: 0, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="mb-6">
                      <FaQrcode className="mx-auto mb-2 text-4xl text-blue-600" />
                      <h3 className="text-2xl font-bold text-gray-900">Scan to Join</h3>
                    </div>
                    <div className="relative mb-6">
                      <img
                        src={qrCodeUrl}
                        alt="IEEE Membership QR Code"
                        className="w-56 h-56 mx-auto border-4 border-gray-100 shadow-lg rounded-2xl"
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
                    </div>
                    <p className="mb-6 text-sm text-gray-600">
                      Scan this QR code with your phone to access the membership form
                    </p>
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={handleDownloadQR}
                        className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 transition-colors rounded-lg bg-blue-50 hover:bg-blue-100"
                      >
                        <FaDownload className="mr-2" />
                        Download
                      </button>
                      <button
                        onClick={handleShare}
                        className="flex items-center px-4 py-2 text-sm font-medium text-green-600 transition-colors rounded-lg bg-green-50 hover:bg-green-100"
                      >
                        <FaShare className="mr-2" />
                        Share
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

                                           {/* Enhanced Navigation Tabs */}
            <div className="sticky top-0 z-40 border-b shadow-lg bg-white/95 backdrop-blur-xl">
              <div className="container px-6 mx-auto">
                <div className="grid grid-cols-2 gap-1 md:grid-cols-4">
                  {[
                    { id: "benefits", label: "Benefits", icon: FaStar },
                    { id: "membership", label: "Membership Types", icon: FaUsers },
                    { id: "requirements", label: "Requirements", icon: FaCheckCircle },
                    { id: "process", label: "Join Process", icon: FaArrowRight }
                  ].map((tab) => (
                    <motion.button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        // Auto scroll to content section
                        setTimeout(() => {
                          const contentSection = document.getElementById('content-sections');
                          if (contentSection) {
                            contentSection.scrollIntoView({ 
                              behavior: 'smooth', 
                              block: 'start' 
                            });
                          }
                        }, 100);
                      }}
                      className={`flex flex-col items-center justify-center px-3 py-4 text-xs font-medium transition-all duration-300 rounded-lg border-2 ${
                        activeTab === tab.id
                          ? "border-blue-600 text-blue-600 bg-blue-50/80 shadow-md"
                          : "border-gray-200 text-gray-600 hover:text-blue-600 hover:bg-gray-50/80 hover:border-blue-300"
                      }`}
                      whileHover={{ scale: 1.05, y: -1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <tab.icon className="mb-1 text-lg" />
                      <span className="text-xs text-center">{tab.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

                     {/* Content Sections */}
           <div id="content-sections" className="container px-6 py-12 mx-auto">
                         {/* Enhanced Benefits Section */}
             {activeTab === "benefits" && (
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6 }}
               >
                                   <div className="mb-12 text-center">
                    <motion.div
                      className="inline-flex items-center px-4 py-2 mb-6 text-xs font-medium text-blue-600 border border-blue-200 rounded-full shadow-sm bg-gradient-to-r from-blue-50 to-blue-100"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <FaStar className="mr-2 text-sm" />
                      Why Choose IEEE?
                    </motion.div>
                    <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
                      Why Join IEEE?
                    </h2>
                    <p className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-600">
                      Discover the incredible benefits and opportunities that await you as an IEEE member
                    </p>
                  </div>

                                   <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {benefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        className="relative p-6 transition-all duration-700 bg-white border-2 border-gray-100 shadow-lg group rounded-2xl hover:shadow-xl hover:-translate-y-2 hover:border-blue-200"
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        onHoverStart={() => setHoveredBenefit(index)}
                        onHoverEnd={() => setHoveredBenefit(null)}
                      >
                        {/* Enhanced Background Gradient */}
                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-10 transition-all duration-700`} />
                        
                        {/* Floating Elements */}
                        <div className="absolute w-2 h-2 transition-all duration-500 bg-blue-400 rounded-full opacity-0 top-2 right-2 group-hover:opacity-60 group-hover:animate-pulse" />
                        <div className="absolute w-1.5 h-1.5 transition-all duration-500 bg-purple-400 rounded-full opacity-0 bottom-2 left-2 group-hover:opacity-60 group-hover:animate-pulse" />
                        
                        <div className="relative z-10">
                          <motion.div 
                            className={`inline-flex items-center justify-center w-16 h-16 mb-4 rounded-2xl bg-gradient-to-r ${benefit.color} text-white text-2xl shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-500`}
                            animate={{ 
                              rotate: hoveredBenefit === index ? [0, -10, 10, 0] : 0,
                              y: hoveredBenefit === index ? [-5, 5, -5] : 0
                            }}
                            transition={{ duration: 0.8 }}
                          >
                            <benefit.icon />
                          </motion.div>
                          <h3 className="mb-3 text-lg font-bold text-gray-900 transition-all duration-300 group-hover:text-blue-600 group-hover:scale-105">
                            {benefit.title}
                          </h3>
                          <p className="text-sm leading-relaxed text-gray-600 transition-all duration-300 group-hover:text-gray-700">
                            {benefit.description}
                          </p>
                          
                          {/* Enhanced Hover Effect */}
                          <motion.div 
                            className="absolute bottom-0 left-0 w-full h-1 transition-transform duration-500 transform scale-x-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-b-2xl group-hover:scale-x-100"
                            initial={{ scaleX: 0 }}
                            whileHover={{ scaleX: 1 }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
               </motion.div>
             )}

                         {/* Enhanced Membership Types Section */}
             {activeTab === "membership" && (
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6 }}
               >
                                   <div className="mb-12 text-center">
                    <motion.div
                      className="inline-flex items-center px-4 py-2 mb-6 text-xs font-medium text-purple-600 border border-purple-200 rounded-full shadow-sm bg-gradient-to-r from-purple-50 to-purple-100"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <FaUsers className="mr-2 text-sm" />
                      Choose Your Path
                    </motion.div>
                    <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
                      Choose Your Membership
                    </h2>
                    <p className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-600">
                      Select the membership type that best suits your needs and career goals
                    </p>
                  </div>

                  <div className="grid max-w-6xl grid-cols-1 gap-8 mx-auto lg:grid-cols-2">
                   {membershipTypes.map((type, index) => (
                                           <motion.div
                        key={index}
                        className={`relative p-8 rounded-2xl shadow-xl border-2 transition-all duration-700 hover:shadow-2xl ${
                          type.popular
                            ? "border-purple-300 bg-gradient-to-br from-purple-50 via-white to-purple-50 scale-105 shadow-purple-500/20"
                            : "border-blue-300 bg-gradient-to-br from-blue-50 via-white to-blue-50 shadow-blue-500/20"
                        }`}
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.8, delay: index * 0.2 }}
                        whileHover={{ y: -8, scale: type.popular ? 1.05 : 1.02 }}
                      >
                        {/* Enhanced Popular Badge */}
                        {type.popular && (
                          <motion.div 
                            className="absolute transform -translate-x-1/2 -top-6 left-1/2"
                            initial={{ scale: 0, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                          >
                            <span className="px-6 py-2 text-sm font-bold text-white border-2 border-white rounded-full shadow-lg bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600">
                              ⭐ {type.badge}
                            </span>
                          </motion.div>
                        )}

                        {/* Floating Elements */}
                        <div className="absolute w-3 h-3 rounded-full top-4 right-4 bg-gradient-to-r from-blue-400 to-purple-400 opacity-20 animate-pulse" />
                        <div className="absolute w-2 h-2 rounded-full bottom-4 left-4 bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 animate-pulse" />

                        <div className="mb-8 text-center">
                          <h3 className="mb-4 text-2xl font-bold text-gray-900">
                            {type.type}
                          </h3>
                          <div className="flex flex-col items-center justify-center mb-6">
                            {/* Discount badge */}
                            <div className="mb-3">
                              <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-white rounded-full shadow-sm bg-gradient-to-r from-green-500 to-emerald-500">
                                <span className="mr-1">💰</span> {type.discount} OFF
                              </span>
                            </div>
                            
                            {/* Original price (strike-through) */}
                            <div className="mb-1">
                              <span className="text-xl text-gray-500 line-through">
                                {type.originalPrice}
                              </span>
                            </div>
                            
                            {/* Discounted price */}
                            <div className="flex items-center justify-center">
                              <span className="text-5xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                                {type.price}
                              </span>
                              <span className="ml-3 text-lg text-gray-600">
                                {type.duration}
                              </span>
                            </div>
                          </div>
                        </div>

                        <ul className="mb-8 space-y-4">
                          {type.features.map((feature, featureIndex) => (
                            <motion.li 
                              key={featureIndex} 
                              className="flex items-start p-3 border bg-white/50 rounded-xl backdrop-blur-sm border-white/20"
                              initial={{ opacity: 0, x: -30 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.7 + featureIndex * 0.1 }}
                              whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.8)" }}
                            >
                              <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 mt-1 mr-4 rounded-full shadow-md bg-gradient-to-r from-green-400 to-green-600">
                                <FaCheckCircle className="text-xs font-bold text-white" />
                              </div>
                              <span className="text-sm font-medium leading-relaxed text-gray-700">{feature}</span>
                            </motion.li>
                          ))}
                        </ul>

                        <motion.button
                          onClick={handleJoinNow}
                          className={`w-full py-4 px-8 rounded-2xl font-bold text-white text-lg bg-gradient-to-r ${type.gradient} hover:shadow-xl transition-all duration-500 transform hover:scale-105 shadow-lg`}
                          whileHover={{ scale: 1.02, y: -3 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="flex items-center justify-center">
                            Join Now
                            <FaArrowRight className="ml-2 text-base" />
                          </span>
                        </motion.button>
                      </motion.div>
                   ))}
                 </div>
               </motion.div>
             )}

                         {/* Enhanced Requirements Section */}
             {activeTab === "requirements" && (
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6 }}
               >
                                   <div className="mb-12 text-center">
                    <motion.div
                      className="inline-flex items-center px-4 py-2 mb-6 text-xs font-medium text-green-600 border border-green-200 rounded-full shadow-sm bg-gradient-to-r from-green-50 to-green-100"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <FaCheckCircle className="mr-2 text-sm" />
                      Eligibility & Benefits
                    </motion.div>
                    <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
                      Membership Requirements
                    </h2>
                    <p className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-600">
                      Ensure you meet all the requirements before applying for IEEE membership
                    </p>
                  </div>

                  <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                                           <motion.div
                        className="relative p-8 overflow-hidden bg-white border-2 border-gray-100 shadow-xl rounded-2xl"
                        initial={{ opacity: 0, x: -50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                      >
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-50 bg-gradient-to-br from-green-50 to-blue-50" />
                        <div className="absolute top-0 right-0 w-24 h-24 transform translate-x-12 -translate-y-12 rounded-full bg-gradient-to-br from-green-400 to-blue-400 opacity-10" />
                        
                        <div className="relative z-10">
                          <h3 className="flex items-center mb-6 text-2xl font-bold text-gray-900">
                            <div className="flex items-center justify-center w-12 h-12 mr-4 text-lg text-white shadow-lg bg-gradient-to-r from-green-500 to-green-600 rounded-xl">
                              <FaCheckCircle />
                            </div>
                            Eligibility Criteria
                          </h3>
                          <ul className="space-y-4">
                            {requirements.map((requirement, index) => (
                              <motion.li
                                key={index}
                                className="flex items-start p-4 border shadow-md bg-white/70 backdrop-blur-sm rounded-xl border-white/50"
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                                whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.9)" }}
                              >
                                <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 mt-1 mr-4 rounded-full shadow-md bg-gradient-to-r from-green-400 to-green-600">
                                  <FaCheckCircle className="text-sm font-bold text-white" />
                                </div>
                                <span className="text-sm font-medium leading-relaxed text-gray-700">{requirement}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>

                                           <motion.div
                        className="relative p-8 overflow-hidden border-2 border-blue-200 shadow-xl bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 rounded-2xl"
                        initial={{ opacity: 0, x: 50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                      >
                        {/* Background Pattern */}
                        <div className="absolute top-0 left-0 w-32 h-32 transform -translate-x-16 -translate-y-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 opacity-10" />
                        <div className="absolute bottom-0 right-0 w-24 h-24 transform translate-x-12 translate-y-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 opacity-10" />
                        
                        <div className="relative z-10">
                          <h3 className="flex items-center mb-6 text-2xl font-bold text-gray-900">
                            <div className="flex items-center justify-center w-12 h-12 mr-4 text-lg text-white shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                              <FaHandshake />
                            </div>
                            What You'll Get
                          </h3>
                          <div className="space-y-4">
                            {[
                              { icon: FaCertificate, title: "Membership Card", desc: "Official IEEE membership identification with unique member ID" },
                              { icon: FaNetworkWired, title: "Network Access", desc: "Connect with professionals worldwide through IEEE communities" },
                              { icon: FaBookOpen, title: "Learning Resources", desc: "Access to technical papers, courses, and IEEE Xplore library" },
                              { icon: FaRocket, title: "Career Growth", desc: "Professional development opportunities and mentorship programs" }
                            ].map((item, index) => (
                              <motion.div 
                                key={index}
                                className="flex items-center p-4 border shadow-md bg-white/70 backdrop-blur-sm rounded-xl border-white/50"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 + index * 0.1 }}
                                whileHover={{ y: -3, backgroundColor: "rgba(255,255,255,0.9)" }}
                              >
                                <div className="flex items-center justify-center w-10 h-10 mr-4 text-lg text-white rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-purple-600">
                                  <item.icon />
                                </div>
                                <div>
                                  <h4 className="mb-1 text-base font-bold text-gray-900">{item.title}</h4>
                                  <p className="text-sm text-gray-600">{item.desc}</p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                   </div>
                 </div>
               </motion.div>
             )}

                         {/* Enhanced Join Process Section */}
             {activeTab === "process" && (
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6 }}
               >
                                   <div className="mb-12 text-center">
                    <motion.div
                      className="inline-flex items-center px-4 py-2 mb-6 text-xs font-medium text-orange-600 border border-orange-200 rounded-full shadow-sm bg-gradient-to-r from-orange-50 to-orange-100"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <FaArrowRight className="mr-2 text-sm" />
                      Simple Steps
                    </motion.div>
                    <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
                      How to Join
                    </h2>
                    <p className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-600">
                      Follow these simple steps to become an IEEE member
                    </p>
                  </div>

                  <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                     {process.map((step, index) => (
                                               <motion.div
                          key={index}
                          className="relative text-center group"
                          initial={{ opacity: 0, y: 50, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.8, delay: index * 0.2 }}
                          whileHover={{ y: -5, scale: 1.03 }}
                        >
                          {/* Enhanced Connector Line */}
                          {index < process.length - 1 && (
                            <div className="absolute z-0 hidden w-full h-1 rounded-full shadow-md lg:block top-12 left-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500">
                              <motion.div
                                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ delay: 1 + index * 0.3, duration: 1 }}
                              />
                            </div>
                          )}

                          <div className="relative z-10">
                            {/* Step Number Badge */}
                            <motion.div 
                              className="absolute z-20 transform -translate-x-1/2 -top-3 left-1/2"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.5 + index * 0.2 }}
                            >
                              <span className="inline-flex items-center justify-center w-8 h-8 text-sm font-bold text-white border-2 border-white rounded-full shadow-lg bg-gradient-to-r from-gray-800 to-gray-900">
                                {step.step}
                              </span>
                            </motion.div>

                            {/* Main Step Card */}
                            <motion.div 
                              className={`flex items-center justify-center w-20 h-20 mx-auto mb-6 text-xl font-bold text-white rounded-full shadow-lg bg-gradient-to-r ${step.color} group-hover:shadow-xl transition-all duration-500`}
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <step.icon />
                            </motion.div>

                            {/* Floating Elements */}
                            <div className="absolute w-3 h-3 transition-all duration-500 rounded-full opacity-0 top-4 right-4 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:opacity-60 animate-pulse" />
                            <div className="absolute w-2 h-2 transition-all duration-500 rounded-full opacity-0 bottom-4 left-4 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:opacity-60 animate-pulse" />

                            <div className="p-6 border-2 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl border-white/50">
                              <h3 className="mb-3 text-lg font-bold text-gray-900 transition-colors group-hover:text-blue-600">
                                {step.title}
                              </h3>
                              <p className="text-sm leading-relaxed text-gray-600">
                                {step.description}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                     ))}
                   </div>

                   {/* Enhanced CTA Section */}
                   <motion.div
                     className="relative p-20 mt-24 overflow-hidden text-center text-white shadow-4xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl"
                     initial={{ opacity: 0, y: 50, scale: 0.9 }}
                     animate={{ opacity: 1, y: 0, scale: 1 }}
                     transition={{ duration: 0.8, delay: 0.8 }}
                     whileHover={{ y: -10, scale: 1.02 }}
                   >
                     {/* Background Pattern */}
                     <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
                     <div className="absolute top-0 left-0 w-64 h-64 transform -translate-x-32 -translate-y-32 rounded-full bg-gradient-to-br from-white/10 to-transparent" />
                     <div className="absolute bottom-0 right-0 w-48 h-48 transform translate-x-24 translate-y-24 rounded-full bg-gradient-to-br from-white/10 to-transparent" />
                     
                     <div className="relative z-10">
                       <h3 className="mb-8 text-5xl font-bold md:text-6xl">
                         Ready to Join IEEE?
                       </h3>
                       <p className="max-w-3xl mx-auto mb-12 text-2xl leading-relaxed text-blue-100">
                         Start your journey with the world's largest technical professional organization
                       </p>
                       <div className="flex flex-col items-center justify-center gap-8 sm:flex-row">
                         <motion.button
                           onClick={handleJoinNow}
                           className="flex items-center px-12 py-6 text-2xl font-bold text-blue-600 transition-all duration-500 bg-white rounded-full shadow-2xl group hover:shadow-4xl"
                           whileHover={{ scale: 1.05, y: -5 }}
                           whileTap={{ scale: 0.95 }}
                         >
                           <span className="flex items-center">
                             Apply Now
                             <FaExternalLinkAlt className="ml-4 text-xl transition-transform group-hover:translate-x-2" />
                           </span>
                         </motion.button>
                         <motion.button
                           onClick={() => setShowQR(true)}
                           className="flex items-center px-10 py-6 text-2xl font-bold text-white transition-all duration-500 border-white rounded-full shadow-2xl border-3 hover:bg-white hover:text-blue-600"
                           whileHover={{ scale: 1.05, y: -5 }}
                           whileTap={{ scale: 0.95 }}
                         >
                           <FaQrcode className="mr-4 text-xl" />
                           Scan QR Code
                         </motion.button>
                       </div>
                     </div>
                   </motion.div>
                 </div>
               </motion.div>
             )}
          </div>

          {/* Enhanced FAQ Section */}
          <div className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="container px-6 mx-auto">
              <motion.div
                className="mb-16 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-indigo-600 rounded-full bg-indigo-50"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <FaLightbulb className="mr-2" />
                  Common Questions
                </motion.div>
                <h2 className="mb-6 text-5xl font-bold text-gray-900 md:text-6xl">
                  Frequently Asked Questions
                </h2>
                <p className="max-w-3xl mx-auto text-xl leading-relaxed text-gray-600">
                  Get answers to common questions about IEEE membership
                </p>
              </motion.div>

              <div className="max-w-5xl mx-auto space-y-8">
                {[
                  {
                    question: "What is the cost of IEEE membership?",
                    answer: "Student membership costs ₹249 per year, while professional membership is ₹1500 per year. This includes access to all IEEE resources and benefits."
                  },
                  {
                    question: "Can I join if I'm not an engineering student?",
                    answer: "Yes! IEEE welcomes students from all technical disciplines including computer science, information technology, and related fields."
                  },
                  {
                    question: "How long does the application process take?",
                    answer: "The application process typically takes 2-3 business days for verification and approval. You'll receive your membership card within a week."
                  },
                  {
                    question: "What events can I attend as a member?",
                    answer: "As an IEEE member, you can attend workshops, seminars, hackathons, technical competitions, networking events, and conferences."
                  },
                  {
                    question: "Is there a minimum GPA requirement?",
                    answer: "No, there's no minimum GPA requirement. We welcome all students who are passionate about technology and professional development."
                  }
                ].map((faq, index) => (
                  <motion.div
                    key={index}
                    className="p-8 transition-all duration-300 bg-white border border-gray-100 shadow-xl rounded-3xl hover:shadow-2xl hover:-translate-y-1"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <h3 className="mb-4 text-xl font-bold text-gray-900">
                      {faq.question}
                    </h3>
                    <p className="text-lg leading-relaxed text-gray-600">
                      {faq.answer}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
