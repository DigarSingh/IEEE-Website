import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FaCalendar, FaMapMarkerAlt, FaClock, FaSearch, FaUsers, FaRocket, FaCode, FaStar, FaFilter, FaArrowRight } from 'react-icons/fa';
import EventCard from '@/components/events/EventCard';
import EventsFilter from '@/components/events/EventsFilter';
import Layout from '@/components/Layout';
import { useIntersectionObserver } from '@/hooks/useEnhancedScroll';

export default function Events() {
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const heroRef = useRef(null);
  
  // Temporarily disable parallax effects to fix the error
  // const { scrollY } = useScroll();
  // const { isVisible: sectionsVisible, observeElement } = useIntersectionObserver();
  
  // Parallax effects - temporarily disabled
  // const y = useTransform(scrollY, [0, 500], [0, 150]);
  // const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Enhanced events data
  const allEvents = [
    {
      id: 1,
      title: "Machine Learning Workshop",
      date: "May 23, 2025",
      time: "11:30 Am Onwards",
      location: "Main Campus Auditorium",
      category: "workshop",
      image: "/images/events/ai-workshop.jpg",
      description: "Hands-on session with industry experts on implementing ML models.",
      featured: true,
      attendees: 120,
      difficulty: "Intermediate",
      tags: ["AI", "ML", "Python"]
    },
    {
      id: 2,
      title: "AWS Jam Skill Builder Program",
      date: "May 29, 2025",
      time: "8:00 AM",
      location: "Silver Convention Center",
      category: "conference",
      image: "/images/events/aws.jpg",
      description: "The AWS Cloud Quest Tournament and Jam Skill Builder Program is a hands-on, gamified learning experience designed to equip students with real-world cloud computing skills using the AWS platform.",
      featured: true,
      attendees: 200,
      difficulty: "Beginner",
      tags: ["AWS", "Cloud", "DevOps"]
    },
    {
      id: 3,
      title: "Hackathon 2025",
      date: "May 01, 2025",
      time: "9:00 AM",
      location: "Innovation Hub",
      category: "hackathon",
      image: "/images/events/hackathon.jpg",
      description: "48-hour coding challenge with exciting prizes and opportunities.",
      featured: true,
    },
    {
      id: 4,
      title: "Accollade Code Hunt",
      date: "April 17, 2025",
      time: "9:00 AM - 4:00 PM",
      location: "Param Lab",
      category: "competition",
      image: "/images/events/accollade.jpg",
      description: "Code Hunt 2025 is here - an intense online treasure hunt crafted year-wise for 1st, 2nd & 3rd-year warriors!",
    },
    {
      id: 5,
      title: "KINDLE JUNIOR 3.0",
      date: "November  23, 2024",
      time: "12 PM onwards",
      location: "New Lab 1&2 CSIT",
      category: "competition",
      image: "/images/events/kindle.jpg",
      description: "Kindle Junior 3.0 is the flagship coding competition hosted by the Computer Science Department at CSIT. Designed to challenge and celebrate coding talent, the event features three electrifying rounds—MCQ Blitz, Output Battle, and Test Case Frenzy.",
    },
    {
      id: 6,
      title: "IEEE MATRIX",
      date: "November 23, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "New Lab 1&2 CSIT",
      category: "hackathon",
      image: "/images/events/matrix.jpg",
      description: "IEEE MATRIX is a premier inter-domain innovation challenge hosted by IEEE GEU, where creativity meets cutting-edge technology. Participants collaborate in teams to solve real-world problems across four futuristic domains: IoT, Cloud Computing, AI & ML, and Generative AI",
    },
    {
      id: 7,
      title: "DroneDroidZ",
      date: "September 14, 2024",
      time: "10:00 AM",
      location: "Seminar,CSIT",
      category: "workshop",
      image: "/images/events/drone.jpg",
      description: "Join the Future of Technology: Learn to Build Your Own Drone The IEEE Student Branch and IEI Student Chapter of Graphic Era is excited to invite you to an exclusive Drone Workshop on 14th September 2024!",
    },
    {
      id: 8,
      title: "DevOps",
      date: "May 04, 2024",
      time: "10:00 AM onwards",
      location: "Seminar,CSIT",
      category: "workshop",
      image: "/images/events/devops.jpg",
      description: "From vision to reality: Impacting lives through development at Graphic Era Deemed to be University",
    },
    {
      id: 9,
      title: "IEEE Student Project Competition",
      date: "October 15, 2024",
      time: "10:00 AM - 5:00 PM",
      location: "CSIT",
      category: "competition",
      image: "/images/events/project.jpg",
      description: "Showcase your innovative projects and win exciting prizes.",
    },
    {
      id: 10,
      title: "Prompt Engineering",
      date: "May 04, 2024",
      time: "10:00 AM Onwards",
      location: "Seminar,CSIT",
      category: "workshop",
      image: "/images/events/prompt.jpg",
      description: "Building dreams, one blueprint at a time at Graphic Era Deemed to be University.",
    },
    {
      id: 11,
      title: "Cyber Security",
      date: "August 24, 2024",
      time: "02:00 PM 04:00 PM",
      location: "New Lab 1&2 CSIT",
      category: "workshop",
      image: "/images/events/cyber.jpg",
      description: "Ready to dive into the world of cybersecurity? Join us at Cryptic: A Cybersecurity Workshop where we'll explore the essentials of protecting your digital life.",
    },
    {
      id: 12,
      title: "Web Development Bootcamp",
      date: "August 12, 2024",
      time: "10:00 AM - 3:00 PM",
      location: "Seminar, CSIT",
      category: "workshop",
      image: "/images/events/webdev.jpg",
      description: "Learn modern web development techniques and frameworks from industry experts.",
    },

  ];

  // Filter events based on category and search query
  const filteredEvents = allEvents.filter(event => {
    const matchesCategory = filter === 'all' || event.category === filter;
    const matchesSearch = searchQuery === '' || 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Featured events
  const featuredEvents = allEvents.filter(event => event.featured);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  // Add stagger animation for card groups
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <Layout>
      <div className="overflow-hidden">
        <Head>
          <title>IEEE Events GEU - Technical Workshops, Hackathons & Conferences | Graphic Era University IEEE</title>
          <meta name="description" content="Discover IEEE events at GEU - technical workshops, hackathons, conferences, and networking opportunities. Join cutting-edge technology events hosted by IEEE Club at Graphic Era University." />
          <meta name="keywords" content="IEEE Events GEU, IEEE Workshops GEU, IEEE Hackathons, IEEE Conferences GEU, Technical Events GEU, IEEE Club Events, Graphic Era University IEEE Events, IEEE Competitions GEU, Technology Workshops GEU" />
          <meta name="author" content="IEEE Club - Graphic Era University" />
          
          {/* Open Graph Meta Tags */}
          <meta property="og:title" content="IEEE Events GEU - Technical Workshops, Hackathons & Conferences" />
          <meta property="og:description" content="Discover IEEE events at GEU - technical workshops, hackathons, conferences, and networking opportunities. Join cutting-edge technology events hosted by IEEE Club at Graphic Era University." />
          <meta property="og:image" content="https://your-domain.com/images/hero/IEEE_hero.jpg" />
          <meta property="og:url" content="https://your-domain.com/events" />
          
          {/* Twitter Meta Tags */}
          <meta name="twitter:title" content="IEEE Events GEU - Technical Workshops, Hackathons & Conferences" />
          <meta name="twitter:description" content="Discover IEEE events at GEU - technical workshops, hackathons, conferences, and networking opportunities." />
          <meta name="twitter:image" content="https://your-domain.com/images/hero/IEEE_hero.jpg" />
          
          {/* Canonical URL */}
          <link rel="canonical" href="https://your-domain.com/events" />
          
          {/* Structured Data for Events */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "ItemList",
                "name": "IEEE Events at GEU",
                "description": "Technical workshops, hackathons, conferences, and networking events hosted by IEEE Club at Graphic Era University",
                "url": "https://your-domain.com/events",
                "itemListElement": allEvents.map((event, index) => ({
                  "@type": "Event",
                  "position": index + 1,
                  "name": event.title,
                  "description": event.description,
                  "startDate": event.date,
                  "location": {
                    "@type": "Place",
                    "name": event.location
                  },
                  "organizer": {
                    "@type": "Organization",
                    "name": "IEEE Club - GEU"
                  },
                  "image": `https://your-domain.com${event.image}`,
                  "url": `https://your-domain.com/events/${event.id}`
                }))
              })
            }}
          />
        </Head>

        {/* Enhanced Hero Section */}
        <section ref={heroRef} className="relative flex items-center min-h-screen overflow-hidden">
          {/* Multi-layer Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900"></div>
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
          {/* <div className="absolute inset-0 bg-[url('/images/hero/circuit-pattern.png')] opacity-5"></div> */}
          
          <div className="container relative z-10 px-6 mx-auto">
            <motion.div 
              className="max-w-5xl mx-auto space-y-8 text-center text-white"
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2,
                    delayChildren: 0.1
                  }
                }
              }}
            >
              {/* Badge */}
              <motion.div
                className="inline-flex items-center px-4 py-2 border rounded-full bg-white/10 backdrop-blur-sm border-white/20"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <FaRocket className="mr-2 text-yellow-400" />
                <span className="text-sm font-medium">• Join the Innovation</span>
              </motion.div>
              
              {/* Main Title */}
              <motion.h1 
                className="text-5xl font-bold leading-tight md:text-6xl lg:text-7xl"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <span className="text-white">IEEE</span>
                <br />
                <span className="text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text">
                  Events
                </span>
                <br />
                <span className="text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text">
                  & Workshops
                </span>
              </motion.h1>
              
              {/* Subtitle */}
              <motion.p 
                className="max-w-3xl mx-auto text-xl leading-relaxed text-gray-300 md:text-2xl"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                Discover cutting-edge workshops, conferences, hackathons, and networking opportunities. Join us in shaping the future of technology.
              </motion.p>
              
              {/* Enhanced Search Bar */}
              <motion.div 
                className="max-w-2xl mx-auto"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <div className="relative group">
                  <div className="absolute inset-0 transition duration-300 rounded-full opacity-25 bg-gradient-to-r from-blue-500 to-purple-600 blur group-hover:opacity-40"></div>
                  <div className="relative p-1 border rounded-full bg-white/10 backdrop-blur-lg border-white/20">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 p-3">
                        <FaSearch className="text-lg text-white/70" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search events, workshops, hackathons..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 px-4 py-3 text-lg text-white bg-transparent placeholder-white/50 focus:outline-none"
                      />
                      <button className="flex-shrink-0 px-6 py-3 font-semibold text-white transition-all duration-300 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg">
                        <FaFilter className="mr-2" />
                        Filter
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Stats Grid */}
              <motion.div 
                className="grid max-w-2xl grid-cols-3 gap-6 pt-8 mx-auto"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">50+</div>
                  <div className="text-sm text-gray-400">Annual Events</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">10K+</div>
                  <div className="text-sm text-gray-400">Participants</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">10+</div>
                  <div className="text-sm text-gray-400">Industry Partners</div>
                </div>
              </motion.div>

            </motion.div>
          </div>

          {/*Scroll Indicator */}
          <motion.div 
            className="absolute flex flex-col items-center transform -translate-x-1/2 bottom-1 left-1/2 text-white/70"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <span className="mb-2 text-sm font-medium">Explore Events</span>
            <div className="flex justify-center w-6 h-10 border-2 rounded-full border-white/30">
              <motion.div
                className="w-1 h-3 mt-2 bg-white rounded-full"
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
            </div>
          </motion.div>
        </section>

      <section className="py-14 bg-gradient-to-b from-gray-50 to-white">
        <div className="container px-6 mx-auto">
          {/* Event Filters - Enhanced UI */}
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-3 mb-8"
            >
              {['all', 'workshop', 'conference', 'hackathon', 'webinar', 'competition'].map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    filter === category 
                      ? 'bg-ieee-blue text-white shadow-lg shadow-blue-500/20 scale-105' 
                      : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                  }`}
                >
                  {category === 'all' ? 'All Events' : category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </motion.div>
          </div>
          
          {/* Featured Events Section */}
          {featuredEvents.length > 0 && filter === 'all' && searchQuery === '' && (
            <div className="mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-10"
              >
                <h2 className="mb-2 text-3xl font-bold text-gray-900">Featured Events</h2>
                <div className="w-20 h-1.5 bg-ieee-blue rounded-full"></div>
              </motion.div>
              
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 gap-8 md:grid-cols-3"
              >
                {featuredEvents.map((event, index) => (
                  <EventCard 
                    key={event.id} 
                    event={event} 
                    index={index} 
                    featured={true}
                  />
                ))}
              </motion.div>
            </div>
          )}
          
          {/* All Events Section */}
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-between mb-10"
            >
              <div>
                <h2 className="mb-2 text-3xl font-bold text-gray-900">
                  {filter === 'all' ? 'All Events' : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Events`}
                </h2>
                <div className="w-20 h-1.5 bg-ieee-blue rounded-full"></div>
              </div>
              
              {filteredEvents.length > 0 && (
                <p className="font-medium text-gray-500">
                  {filteredEvents.length} {filteredEvents.length === 1 ? 'Event' : 'Events'} Found
                </p>
              )}
            </motion.div>
            
            {filteredEvents.length > 0 ? (
              <AnimatePresence mode="wait">
                <motion.div 
                  key={filter + searchQuery}
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
                >
                  {filteredEvents.map((event, index) => (
                    <EventCard 
                      key={event.id} 
                      event={event} 
                      index={index}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-20 text-center bg-white shadow-lg rounded-2xl"
              >
                <div className="mb-6">
                  <svg className="w-20 h-20 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <h3 className="mb-2 text-2xl font-semibold text-gray-700">No events found</h3>
                <p className="mb-8 text-gray-500">Try adjusting your search or filter criteria</p>
                <button 
                  onClick={() => {
                    setFilter('all');
                    setSearchQuery('');
                  }}
                  className="px-8 py-3 text-white transition-colors rounded-full shadow-lg bg-ieee-blue hover:bg-blue-700 hover:shadow-blue-500/30"
                >
                  Reset Filters
                </button>
              </motion.div>
            )}
          </div>
          
          {/* Newsletter signup - New section */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="p-10 mt-24 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl"
          >
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Stay Updated on Future Events</h2>
              <p className="mb-6 text-gray-600">
                Subscribe to our newsletter and never miss an upcoming workshop, conference or tech talk.
              </p>
              <div className="flex flex-col max-w-lg gap-3 mx-auto sm:flex-row">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="px-6 py-3 font-medium text-white transition-colors rounded-lg shadow-md bg-ieee-blue hover:bg-blue-700 hover:shadow-blue-500/30">
                  Subscribe
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      </div>
    </Layout>
  );
}
