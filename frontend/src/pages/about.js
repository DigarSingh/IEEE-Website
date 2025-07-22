import Head from 'next/head';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaUsers, FaLightbulb, FaHistory, FaGlobe, FaAward, FaBullseye, FaLinkedin, FaGithub, FaTwitter, FaRocket, FaHeart, FaCode, FaStar } from 'react-icons/fa';
import { useState, useRef } from 'react';
import Layout from '@/components/Layout';
import { useIntersectionObserver } from '@/hooks/useEnhancedScroll';

export default function About() {
  const heroRef = useRef(null);
  
  // Temporarily disable parallax effects to fix the error
  // const { scrollY } = useScroll();
  // const { isVisible, observeElement } = useIntersectionObserver();
  
  // Parallax effects - temporarily disabled
  // const y = useTransform(scrollY, [0, 500], [0, 150]);
  // const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Enhanced animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const slideIn = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  // State for active team member
  const [activeTeamMember, setActiveTeamMember] = useState(null);

  // Enhanced team members data
  const teamMembers = [
    {
      name: 'Mr. Piyush Agarwal',
      role: 'Faculty Advisor',
      image: '/images/team/advisor.jpg',
      bio: 'Associate Professor with 15+ years of experience in electrical engineering research and education. Leading our academic initiatives and industry partnerships.',
      expertise: ['Research Leadership', 'Industry Partnerships', 'Academic Excellence'],
      socialLinks: [
        { icon: <FaLinkedin />, url: 'https://linkedin.com' },
        { icon: <FaGithub />, url: 'https://github.com' }
      ]
    },
    {
      name: 'Ankit Choudhary',
      role: 'Chairperson',
      image: '/images/team/chair.jpg',
      bio: 'Final year Computer Science student passionate about AI and machine learning. Spearheading our technical vision and strategic initiatives.',
      expertise: ['AI/ML', 'Leadership', 'Strategic Planning'],
      socialLinks: [
        { icon: <FaLinkedin />, url: 'https://linkedin.com' },
        { icon: <FaGithub />, url: 'https://github.com' },
        { icon: <FaTwitter />, url: 'https://twitter.com' }
      ]
    },
    {
      name: 'Sanjay Singh',
      role: 'Vice-Chairperson',
      image: '/images/team/vice-chair.jpg',
      bio: 'Computer Science Engineering student with expertise in IoT systems and embedded design. Driving innovation in hardware-software integration.',
      expertise: ['IoT Systems', 'Embedded Design', 'Hardware Integration'],
      socialLinks: [
        { icon: <FaLinkedin />, url: 'https://linkedin.com' },
        { icon: <FaGithub />, url: 'https://github.com' }
      ]
    },
    {
      name: 'Ninand Gangodkar',
      role: 'Secretary',
      image: '/images/team/secretary.jpg',
      bio: 'Information Technology student focused on web development and cybersecurity. Managing our digital presence and security initiatives.',
      expertise: ['Web Development', 'Cybersecurity', 'Digital Innovation'],
      socialLinks: [
        { icon: <FaLinkedin />, url: 'https://linkedin.com' },
        { icon: <FaGithub />, url: 'https://github.com' }
      ]
    },
    {
      name: 'Jiya Bisht',
      role: 'Treasurer',
      image: '/images/team/treasurer.jpg',
      bio: 'Computer Science Engineering student with strong organizational and financial management skills. Ensuring fiscal responsibility and growth.',
      expertise: ['Financial Management', 'Organization', 'Strategic Planning'],
      socialLinks: [
        { icon: <FaLinkedin />, url: 'https://linkedin.com' },
        { icon: <FaGithub />, url: 'https://github.com' }
      ]
    },
    {
      name: 'Pranav Maheshwari',
      role: 'Technical Lead',
      image: '/images/team/tech-lead.jpg',
      bio: 'Robotics enthusiast with experience in organizing multiple hackathons and technical workshops. Leading our technical innovation and events.',
      expertise: ['Robotics', 'Event Management', 'Technical Innovation'],
      socialLinks: [
        { icon: <FaLinkedin />, url: 'https://linkedin.com' },
        { icon: <FaGithub />, url: 'https://github.com' }
      ]
    }
  ];

  // Enhanced milestones data
  const milestones = [
    {
      year: '2022',
      title: 'IEEE Student Branch Established',
      description: 'Our journey began with just 20 founding members dedicated to fostering innovation.',
      icon: <FaRocket className="text-blue-500" />,
      stats: '20 Founding Members'
    },
    {
      year: '2023',
      title: 'First Annual Technical Symposium',
      description: 'Successfully launched our flagship event bringing together participants from various institutions.',
      icon: <FaUsers className="text-green-500" />,
      stats: '300+ Participants'
    },
    {
      year: '2024',
      title: 'Recognition Award',
      description: 'Received the "Outstanding Student Branch" award from IEEE Regional Council.',
      icon: <FaAward className="text-yellow-500" />,
      stats: 'Regional Recognition'
    },
    {
      year: '2024',
      title: 'International Conference',
      description: 'Hosted our first international conference on emerging technologies with global participation.',
      icon: <FaGlobe className="text-purple-500" />,
      stats: 'Global Reach'
    },
    {
      year: '2025',
      title: 'National Hackathon Hosts',
      description: 'Organized a major 48-hour hackathon with participants from across the country.',
      icon: <FaCode className="text-red-500" />,
      stats: '48-Hour Challenge'
    },
  ];

  // Values data
  const values = [
    {
      title: 'Innovation',
      description: 'Pushing boundaries and exploring new technological frontiers',
      icon: <FaLightbulb className="text-yellow-500" />,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'Excellence',
      description: 'Striving for the highest standards in everything we do',
      icon: <FaStar className="text-blue-500" />,
      color: 'from-blue-500 to-purple-500'
    },
    {
      title: 'Collaboration',
      description: 'Building strong partnerships and working together towards common goals',
      icon: <FaUsers className="text-green-500" />,
      color: 'from-green-500 to-teal-500'
    },
    {
      title: 'Impact',
      description: 'Creating meaningful change in technology and society',
      icon: <FaHeart className="text-red-500" />,
      color: 'from-red-500 to-pink-500'
    }
  ];

  return (
    <Layout>
      <div className="overflow-hidden">
        <Head>
          <title>About Us | IEEE Club - Empowering Innovation</title>
          <meta name="description" content="Learn about IEEE Student Branch at GEU - our mission, vision, team, and journey in fostering technological innovation and leadership." />
        </Head>

        {/* Enhanced Hero Section */}
        <section ref={heroRef} className="relative flex items-center min-h-screen overflow-hidden">
          {/* Multi-layer Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-blue-900/30"></div>
          
          {/* Animated Background Elements */}
          <motion.div 
            className="absolute inset-0"
          >
            <div className="absolute w-32 h-32 rounded-full top-20 left-10 bg-blue-500/10 blur-xl animate-pulse"></div>
            <div className="absolute w-48 h-48 delay-1000 rounded-full top-40 right-20 bg-purple-500/10 blur-2xl animate-pulse"></div>
            <div className="absolute w-40 h-40 rounded-full bottom-40 left-20 bg-cyan-500/10 blur-xl animate-pulse delay-2000"></div>
          </motion.div>
          
          {/* Circuit Pattern Overlay */}
          <div className="absolute inset-0 bg-[url('/images/hero/circuit-pattern.png')] opacity-5"></div>
          
          <div className="container relative z-10 px-6 mx-auto">
            <motion.div 
              className="grid items-center gap-12 lg:grid-cols-2"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {/* Enhanced Text Content */}
              <motion.div 
                className="space-y-8 text-white"
                variants={slideIn}
              >
                <div className="space-y-6">
                  <motion.div
                    className="inline-flex items-center px-4 py-2 border rounded-full bg-white/10 backdrop-blur-sm border-white/20"
                    variants={fadeIn}
                  >
                    <FaStar className="mr-2 text-yellow-400" />
                    <span className="text-sm font-medium">Established 2022</span>
                  </motion.div>
                  
                  <motion.h1 
                    className="text-5xl font-bold leading-tight md:text-6xl lg:text-7xl"
                    variants={fadeIn}
                  >
                    <span className="text-white">About</span>
                    <br />
                    <span className="text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text">
                      IEEE
                    </span>
                    <br />
                    <span className="text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text">
                      Student Branch
                    </span>
                  </motion.h1>
                  
                  <motion.p 
                    className="max-w-2xl text-xl leading-relaxed text-gray-300 md:text-2xl"
                    variants={fadeIn}
                  >
                    Fostering innovation, technical excellence, and leadership among the next generation of technology pioneers.
                  </motion.p>
                </div>
                
                <motion.div 
                  className="flex flex-col gap-4 sm:flex-row"
                  variants={fadeIn}
                >
                  <motion.a
                    href="#mission"
                    className="relative px-8 py-4 overflow-hidden font-semibold text-white rounded-full cursor-pointer group bg-gradient-to-r from-blue-500 to-purple-600"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-purple-600 to-blue-500 group-hover:opacity-100"></div>
                    <span className="relative z-10 flex items-center">
                      Explore Our Mission
                      <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </span>
                  </motion.a>
                  
                  <motion.a
                    href="#team"
                    className="px-8 py-4 font-semibold text-white transition-all duration-300 border rounded-full cursor-pointer group bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="flex items-center">
                      Meet Our Team
                      <FaUsers className="ml-2" />
                    </span>
                  </motion.a>
                </motion.div>

                {/* Enhanced Stats */}
                <motion.div 
                  className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20"
                  variants={fadeIn}
                >
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400">500+</div>
                    <div className="text-sm text-gray-400">Active Members</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400">50+</div>
                    <div className="text-sm text-gray-400">Annual Events</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400">25+</div>
                    <div className="text-sm text-gray-400">Projects</div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Enhanced Visual Content */}
              <motion.div
                className="relative"
                variants={fadeIn}
              >
                <div className="relative">
                  {/* Floating Cards */}
                  <motion.div
                    className="absolute w-64 h-64 border -top-4 -left-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl backdrop-blur-sm border-white/10"
                    animate={{ 
                      y: [0, -20, 0],
                      rotate: [0, 2, 0]
                    }}
                    transition={{ 
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  <motion.div
                    className="absolute w-48 h-48 border -bottom-8 -right-8 bg-gradient-to-br from-yellow-500/20 to-red-500/20 rounded-3xl backdrop-blur-sm border-white/10"
                    animate={{ 
                      y: [0, 15, 0],
                      rotate: [0, -2, 0]
                    }}
                    transition={{ 
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  />
                  
                  <div className="relative p-8 border shadow-2xl bg-white/10 backdrop-blur-lg rounded-3xl border-white/20">
                    <img 
                      src="/images/hero/IEEE_hero.jpg"
                      alt="IEEE Team" 
                      className="w-2/4 h-auto max-w-md mx-auto shadow-xl rounded-2xl"
                    />
                    
                    {/* Achievement Badge */}
                    <motion.div
                      className="absolute p-4 shadow-lg -top-6 -right-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <FaAward className="text-2xl text-white" />
                    </motion.div>
                    
                    {/* Member Count */}
                    <motion.div
                      className="absolute p-4 shadow-lg -bottom-4 -left-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl"
                      animate={{ y: [0, 10, 0] }}
                      transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                    >
                      <div className="text-center text-white">
                        <FaUsers className="mb-1 text-xl" />
                        <div className="text-xs">Active Community</div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Enhanced Scroll Indicator */}
          <motion.div 
            className="absolute flex flex-col items-center transform -translate-x-1/2 bottom-8 left-1/2 text-white/70"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <span className="mb-2 text-sm font-medium">Discover Our Story</span>
            <div className="flex justify-center w-6 h-10 border-2 rounded-full border-white/30">
              <motion.div
                className="w-1 h-3 mt-2 bg-white rounded-full"
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
            </div>
          </motion.div>
        </section>

        {/* Enhanced Mission & Vision Section */}
        <section id="mission" className="py-20 bg-gray-50">
          <div className="container px-4 mx-auto">
            <div className="grid gap-12 lg:grid-cols-2">
              <motion.div 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.5 }}
                className="p-8 overflow-hidden border border-blue-100 shadow-xl bg-gradient-to-br from-white to-blue-50 rounded-3xl"
              >
                <div className="flex items-center mb-6">
                  <div className="p-3 mr-4 text-white rounded-full bg-ieee-blue">
                    <FaBullseye className="text-2xl" />
                  </div>
                  <h2 className="text-3xl font-bold">Our Mission</h2>
                </div>
                <p className="mb-6 text-lg leading-relaxed text-gray-700">
                  To foster technological innovation and excellence for the benefit of humanity by providing a vibrant platform for students to grow their technical, professional, and leadership skills.
                </p>
                <p className="text-lg leading-relaxed text-gray-700">
                  We aim to bridge the gap between theoretical knowledge and practical implementation through experiential learning opportunities, industry collaboration, and community engagement.
                </p>
                
                <div className="mt-8 overflow-hidden">
                  <div className="relative h-1 overflow-hidden bg-gray-200 rounded-full">
                    <motion.div 
                      className="absolute top-0 left-0 h-full rounded-full bg-ieee-blue"
                      initial={{ width: 0 }}
                      whileInView={{ width: "85%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                    ></motion.div>
                  </div>
                  <div className="flex justify-between mt-2 text-sm font-medium">
                    <span>Our Progress</span>
                    <span>85%</span>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-8 overflow-hidden border border-blue-100 shadow-xl bg-gradient-to-br from-white to-blue-50 rounded-3xl"
              >
                <div className="flex items-center mb-6">
                  <div className="p-3 mr-4 text-white rounded-full bg-ieee-blue">
                    <FaLightbulb className="text-2xl" />
                  </div>
                  <h2 className="text-3xl font-bold">Our Vision</h2>
                </div>
                <p className="mb-6 text-lg leading-relaxed text-gray-700">
                  To be the preeminent catalyst for technological innovation and educational excellence, inspiring a diverse community of students to become future technology leaders and innovators.
                </p>
                <p className="text-lg leading-relaxed text-gray-700">
                  We envision a world where our members lead the advancement of technology for the betterment of society while embodying the highest standards of integrity, professionalism, and ethical conduct.
                </p>
                
                <div className="relative mt-8">
                  <div className="grid grid-cols-4 gap-2">
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${[80, 45, 65, 95][i]}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.3 + i * 0.1 }}
                        className="h-24 rounded-t-lg bg-ieee-blue"
                        style={{ alignSelf: "flex-end" }}
                      ></motion.div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2 text-sm font-medium">
                    <span>Innovation</span>
                    <span>Education</span>
                    <span>Leadership</span>
                    <span>Technology</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Enhanced Values Section */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto mb-16 text-center"
            >
              <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">Our Core Values</h2>
              <p className="text-xl text-gray-600">The principles that guide our actions and define our community</p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="relative h-full p-8 overflow-hidden transition-all duration-500 bg-white border border-gray-100 shadow-lg rounded-3xl hover:shadow-2xl">
                    {/* Background Gradient on Hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                    
                    {/* Content */}
                    <div className="relative z-10 text-center">
                      <div className="flex justify-center mb-6">
                        <div className={`p-4 rounded-2xl bg-gradient-to-br ${value.color} shadow-lg`}>
                          <div className="text-3xl text-white">
                            {value.icon}
                          </div>
                        </div>
                      </div>
                      <h3 className="mb-4 text-xl font-bold text-gray-900">{value.title}</h3>
                      <p className="leading-relaxed text-gray-600">{value.description}</p>
                    </div>
                    
                    {/* Hover Effect */}
                    <div className="absolute w-16 h-16 transition-all duration-500 transform scale-0 rounded-full opacity-0 -top-2 -right-2 bg-gradient-to-br from-blue-400 to-purple-400 group-hover:opacity-10 group-hover:scale-100"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Do Section - Glass Morphism Style */}
        <section className="py-20 bg-white">
          <div className="container px-4 mx-auto">
            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto mb-16 text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 text-white rounded-full bg-gradient-to-r from-ieee-blue to-blue-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h2 className="mb-6 text-4xl font-bold text-gray-900">What We Do</h2>
              <p className="text-xl text-gray-700">
                Our student branch is dedicated to creating opportunities for technical growth, professional development, and community service.
              </p>
            </motion.div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-5 rounded-3xl"></div>
              <div className="grid gap-8 p-8 md:grid-cols-3 rounded-3xl">
                <motion.div 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true }}
                  variants={fadeIn}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -10 }}
                  className="p-6 transition-all bg-white shadow-lg rounded-xl hover:shadow-xl"
                >
                  <div className="p-4 mb-6 text-white rounded-xl w-fit bg-gradient-to-r from-ieee-blue to-blue-600">
                    <FaUsers className="text-2xl" />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-gray-900">Technical Workshops</h3>
                  <p className="text-gray-700">
                    Regular hands-on workshops covering cutting-edge technologies, programming languages, hardware design, and more to enhance technical skills.
                  </p>
                </motion.div>

                <motion.div 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true }}
                  variants={fadeIn}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  whileHover={{ y: -10 }}
                  className="p-6 transition-all bg-white shadow-lg rounded-xl hover:shadow-xl"
                >
                  <div className="p-4 mb-6 text-white rounded-xl w-fit bg-gradient-to-r from-ieee-blue to-blue-600">
                    <FaAward className="text-2xl" />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-gray-900">Competitions</h3>
                  <p className="text-gray-700">
                    Hosting and participating in hackathons, coding contests, design competitions, and technical paper presentations to challenge creativity.
                  </p>
                </motion.div>

                <motion.div 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true }}
                  variants={fadeIn}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  whileHover={{ y: -10 }}
                  className="p-6 transition-all bg-white shadow-lg rounded-xl hover:shadow-xl"
                >
                  <div className="p-4 mb-6 text-white rounded-xl w-fit bg-gradient-to-r from-ieee-blue to-blue-600">
                    <FaGlobe className="text-2xl" />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-gray-900">Networking Events</h3>
                  <p className="text-gray-700">
                    Creating opportunities to connect with industry professionals, alumni, and peers through seminars, conferences, and social gatherings.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Team Members Section */}
        <section className="py-20 bg-gray-50">
          <div className="container px-4 mx-auto">
            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto mb-16 text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 text-white rounded-full bg-gradient-to-r from-ieee-blue to-blue-600">
                <FaUsers className="text-3xl" />
              </div>
              <h2 className="mb-6 text-4xl font-bold text-gray-900">Meet Our Team</h2>
              <p className="text-xl text-gray-700">
                Dedicated professionals and student leaders working together to drive innovation and excellence in technology.
              </p>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  transition={{ duration: 0.5 }}
                  className="relative overflow-hidden bg-white shadow-lg group rounded-2xl hover:shadow-xl"
                  whileHover={{ 
                    y: -10, 
                    transition: { duration: 0.3 }
                  }}
                  onMouseEnter={() => setActiveTeamMember(index)}
                  onMouseLeave={() => setActiveTeamMember(null)}
                >
                  <div className="relative overflow-hidden h-80">
                    <div className="absolute inset-0 z-10 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black to-transparent group-hover:opacity-60"></div>
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="object-cover object-center w-full h-full transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Social links overlay */}
                    <div className="absolute bottom-0 left-0 right-0 z-20 flex justify-center p-4 transition-all duration-300 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="flex space-x-3">
                        {member.socialLinks?.map((link, i) => (
                          <a 
                            key={i} 
                            href={link.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-10 h-10 text-white transition-all bg-white rounded-full bg-opacity-20 backdrop-blur-sm hover:bg-opacity-40"
                          >
                            {link.icon}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative p-6">
                    <div className="absolute top-0 right-0 w-20 h-20 transform translate-x-10 -translate-y-10">
                      <div className="absolute w-full h-full bg-yellow-300 rounded-full opacity-10"></div>
                    </div>
                    
                    <h3 className="mb-1 text-xl font-bold text-gray-900">{member.name}</h3>
                    <p className="mb-4 font-medium text-ieee-blue">{member.role}</p>
                    
                    <div className="relative">
                      <motion.p 
                        className="text-gray-700"
                        animate={{ 
                          height: activeTeamMember === index ? "auto" : "3.6rem",
                          overflow: activeTeamMember === index ? "visible" : "hidden"
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {member.bio}
                      </motion.p>
                      {activeTeamMember !== index && (
                        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white"></div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* History & Milestones */}
        <section className="py-20 bg-white">
          <div className="container px-4 mx-auto">
            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto mb-16 text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 text-white rounded-full bg-ieee-blue">
                <FaHistory className="text-3xl" />
              </div>
              <h2 className="mb-6 text-4xl font-bold text-gray-900">Our Journey</h2>
              <p className="text-xl text-gray-700">
                From a small group of enthusiastic students to a vibrant community of tech innovators — our history is marked by continuous growth and achievement.
              </p>
            </motion.div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute w-1 h-full transform -translate-x-1/2 left-1/2 bg-ieee-light"></div>
              
              {/* Timeline items */}
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <motion.div 
                    key={index}
                    initial="hidden" 
                    whileInView="visible" 
                    viewport={{ once: true }}
                    variants={fadeIn}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'} md:justify-between`}
                  >
                    <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}>
                      <div className="p-6 shadow-sm bg-gray-50 rounded-xl">
                        <span className="inline-block px-3 py-1 mb-2 text-sm font-bold text-white rounded-full bg-ieee-blue">
                          {milestone.year}
                        </span>
                        <h3 className="mb-2 text-xl font-bold text-gray-900">{milestone.title}</h3>
                        <p className="text-gray-700">{milestone.description}</p>
                      </div>
                    </div>

                    <div className="absolute z-10 flex items-center justify-center w-10 h-10 text-white transform -translate-x-1/2 rounded-full left-1/2 bg-ieee-blue">
                      {index + 1}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 text-white bg-gradient-to-r from-ieee-blue to-blue-900">
          <div className="container px-4 mx-auto">
            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto mb-16 text-center"
            >
              <h2 className="mb-6 text-4xl font-bold">Our Core Values</h2>
              <p className="text-xl text-blue-100">
                These principles guide everything we do and represent what we stand for as an organization.
              </p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-3">
              <motion.div
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.5 }}
                className="p-6 transition-all border border-blue-400 rounded-xl hover:bg-white/10"
              >
                <h3 className="mb-4 text-2xl font-bold">Excellence</h3>
                <p className="text-blue-100">
                  We strive for the highest standards in everything we do, pushing boundaries and challenging the status quo to achieve breakthrough results.
                </p>
              </motion.div>

              <motion.div
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-6 transition-all border border-blue-400 rounded-xl hover:bg-white/10"
              >
                <h3 className="mb-4 text-2xl font-bold">Integrity</h3>
                <p className="text-blue-100">
                  We uphold the highest ethical standards, ensuring honesty, transparency, and accountability in all our interactions and initiatives.
                </p>
              </motion.div>

              <motion.div
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="p-6 transition-all border border-blue-400 rounded-xl hover:bg-white/10"
              >
                <h3 className="mb-4 text-2xl font-bold">Collaboration</h3>
                <p className="text-blue-100">
                  We believe in the power of teamwork and inclusive participation, recognizing that diverse perspectives lead to better solutions.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Enhanced Join Us CTA */}
        <section className="py-20 bg-white">
          <div className="container px-4 mx-auto">
            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.5 }}
              className="relative max-w-4xl p-12 mx-auto overflow-hidden border shadow-2xl bg-gradient-to-r from-white to-blue-50 rounded-3xl border-blue-50"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-40 h-40 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-300 rounded-full opacity-10"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 transform bg-blue-400 rounded-full translate-x-1/4 translate-y-1/4 opacity-10"></div>
              
              <div className="relative z-10 text-center">
                <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">Ready to Join Our IEEE Community?</h2>
                <p className="mb-8 text-xl text-gray-700">
                  Take the first step towards enhancing your academic and professional journey with IEEE. Connect, learn, and grow with us!
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <motion.a 
                    href="/gallery"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 font-medium text-white transition-all rounded-full shadow-lg bg-gradient-to-r from-ieee-blue to-blue-600 hover:from-blue-600 hover:to-blue-700"
                  >
                    View Gallery
                  </motion.a>
                  <motion.a 
                    href="/contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 font-medium transition-all bg-white border-2 rounded-full shadow-lg text-ieee-blue border-ieee-blue hover:bg-ieee-blue hover:text-white"
                  >
                    Contact Us
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
