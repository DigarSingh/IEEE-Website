import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendar, FaMapMarkerAlt, FaClock, FaSearch } from 'react-icons/fa';
import EventCard from '../components/events/EventCard';
import EventsFilter from '../components/events/EventsFilter';
import Layout from '../components/Layout'; // Import Layout component

export default function Events() {
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Mock events data
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
      <Head>
        <title>Events | IEEE Club</title>
        <meta name="description" content="Discover workshops, conferences, and networking opportunities with IEEE Club" />
      </Head>

      {/* Hero Banner with enhanced styling */}
      <section className="relative py-20 overflow-hidden text-white bg-gradient-to-r from-ieee-blue to-blue-700">
        <div className="absolute inset-0 z-0 opacity-10 bg-[url('/images/hero/circuit-pattern.png')] bg-repeat"></div>
        <div 
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 25% 100%, rgba(255,255,255,0.2) 0%, transparent 25%), radial-gradient(circle at 75% 0%, rgba(255,255,255,0.2) 0%, transparent 25%)'
          }}
        ></div>
        <div className="container relative z-10 px-6 mx-auto">
          <motion.div
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeIn}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="mb-4 text-5xl font-extrabold md:text-6xl">
              <span className="text-white drop-shadow-md">IEEE </span>
              <span className="text-yellow-300 drop-shadow-md">Events</span>
            </h1>
            <p className="max-w-3xl mx-auto mb-10 text-xl text-blue-100">
              Discover workshops, conferences, competitions, and networking opportunities to enhance your skills and connect with industry professionals.
            </p>
            
            {/* Search Bar with enhanced styling */}
            <div className="relative max-w-2xl mx-auto transform transition-all duration-300 hover:scale-[1.02]">
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-4 pl-12 pr-4 text-gray-800 rounded-full shadow-xl focus:outline-none focus:ring-4 focus:ring-yellow-300/50"
              />
              <FaSearch className="absolute text-lg text-gray-500 top-5 left-5" />
            </div>
          </motion.div>
        </div>
        
        {/* Decorative wave element at bottom */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-b from-transparent to-gray-50"></div>
        <div className="absolute left-0 w-full -bottom-10">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full text-gray-50">
            <path fill="currentColor" fillOpacity="1" d="M0,128L48,144C96,160,192,192,288,181.3C384,171,480,117,576,117.3C672,117,768,171,864,197.3C960,224,1056,224,1152,208C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
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
    </Layout>
  );
}
