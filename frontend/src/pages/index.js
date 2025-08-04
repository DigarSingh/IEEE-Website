import Head from 'next/head';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaCalendar, FaLightbulb, FaUsers, FaGraduationCap, FaArrowRight, FaStar, FaQuoteLeft, FaChevronRight, FaPlay } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';
import Layout from '@/components/Layout';
import ParticleBackground from '@/components/ParticleBackground';
import { useIntersectionObserver } from '@/hooks/useEnhancedScroll';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  const stats = [
    { 
      value: '100+', 
      label: 'Active Members', 
      icon: <FaUsers className="text-3xl text-white" />,
      description: 'Students actively participating in IEEE activities',
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      value: '50+', 
      label: 'Annual Events', 
      icon: <FaCalendar className="text-3xl text-white" />,
      description: 'Technical workshops, seminars, and competitions',
      color: 'from-green-500 to-emerald-500'
    },
    { 
      value: '25+', 
      label: 'Innovation Projects', 
      icon: <FaLightbulb className="text-3xl text-white" />,
      description: 'Cutting-edge research and development initiatives',
      color: 'from-yellow-500 to-orange-500'
    },
    { 
      value: '10+', 
      label: 'Industry Partners', 
      icon: <FaGraduationCap className="text-3xl text-white" />,
      description: 'Leading companies collaborating with our students',
      color: 'from-purple-500 to-pink-500'
    },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Software Engineer at Google",
      image: "/images/testimonials/member1.jpg",
      quote: "IEEE Club at GEU transformed my technical skills and opened doors to amazing opportunities. The hands-on workshops and industry connections were invaluable.",
      rating: 5
    },
    {
      name: "Rahul Kumar",
      role: "Data Scientist at Microsoft",
      image: "/images/testimonials/member2.jpg",
      quote: "The collaborative environment and cutting-edge projects helped me develop both technical expertise and leadership skills that I use daily in my career.",
      rating: 5
    },
    {
      name: "Anjali Gupta",
      role: "Startup Founder",
      image: "/images/testimonials/member3.jpg",
      quote: "IEEE Club provided the perfect platform to network with like-minded individuals and mentors who supported my entrepreneurial journey.",
      rating: 5
    }
  ];

  const features = [
    {
      title: "Technical Workshops",
      description: "Hands-on learning sessions covering latest technologies, from AI/ML to IoT and blockchain.",
      icon: "🔧",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      title: "Industry Connect",
      description: "Direct interaction with industry professionals and networking opportunities with leading companies.",
      icon: "🤝",
      gradient: "from-green-500 to-blue-500"
    },
    {
      title: "Research Projects",
      description: "Collaborative research initiatives that contribute to technological advancement and innovation.",
      icon: "🔬",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Leadership Development",
      description: "Opportunities to lead teams, organize events, and develop essential soft skills.",
      icon: "👑",
      gradient: "from-yellow-500 to-red-500"
    },
    {
      title: "Global Network",
      description: "Access to IEEE's worldwide network of professionals and exclusive member benefits.",
      icon: "🌍",
      gradient: "from-indigo-500 to-cyan-500"
    },
    {
      title: "Certification Programs",
      description: "Industry-recognized certifications and skill development programs for career advancement.",
      icon: "🏆",
      gradient: "from-orange-500 to-pink-500"
    }
  ];

  const Events = [
    {
      id: 1,
      title: 'Machine Learning Workshop',
      date: '11:30 Am Onwards',
      image: '/images/events/ai-workshop.jpg',
      description: 'Hands-on session with industry experts on implementing ML models.',
      category: 'Workshop',
      attendees: 120
    },
    {
      id: 2,
      title: 'AWS Jam Skill Builder Program',
      date: 'May 29, 2025',
      image: '/images/events/aws.jpg',
      description: 'The AWS Cloud Quest Tournament and Jam Skill Builder Program is a hands-on, gamified learning experience designed to equip students with real-world cloud computing skills using the AWS platform.',
      category: 'Competition',
      attendees: 200
    },
    {
      id: 3,
      title: 'Hackathon 2025',
      date: 'May 01, 2025',
      image: '/images/events/hackathon.jpg',
      description: '48-hour coding challenge with exciting prizes and opportunities.',
      category: 'Hackathon',
      attendees: 300
    }
  ];

  return (
    <Layout>
      <div className="overflow-hidden">
        <Head>
          <title>IEEE | Empowering Technology Leaders</title>
          <meta name="description" content="IEEE Club - Fostering innovation and technology leadership among students" />
        </Head>

        {/* Announcement Bar */}
        <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600">
          <div className="announcement-scroll">
            <div className="flex items-center justify-center py-3 text-sm font-medium text-white md:text-base whitespace-nowrap">
              <span className="mr-4">🎉</span>
              <span className="mr-2">IEEE Membership Drive is now OPEN!</span>
              <span className="mr-4">Apply now and join our community of innovators.</span>
              <Link href="/membership" className="inline-flex items-center px-3 py-1 text-xs font-semibold text-purple-600 transition-colors duration-200 bg-white rounded-full hover:bg-gray-100">
                Click Here to Fill Form
                <FaArrowRight className="ml-1 text-xs" />
              </Link>
              <span className="ml-4">🎉</span>
              <span className="ml-2">IEEE Membership Drive is now OPEN!</span>
              <span className="ml-4">Apply now and join our community of innovators.</span>
              <Link href="/membership" className="inline-flex items-center px-3 py-1 text-xs font-semibold text-purple-600 transition-colors duration-200 bg-white rounded-full hover:bg-gray-100">
                Click Here to Fill Form
                <FaArrowRight className="ml-1 text-xs" />
              </Link>
              <span className="ml-4">🎉</span>
              <span className="ml-2">IEEE Membership Drive is now OPEN!</span>
              <span className="ml-4">Apply now and join our community of innovators.</span>
              <Link href="/membership" className="inline-flex items-center px-3 py-1 text-xs font-semibold text-purple-600 transition-colors duration-200 bg-white rounded-full hover:bg-gray-100">
                Click Here to Fill Form
                <FaArrowRight className="ml-1 text-xs" />
              </Link>
            </div>
          </div>
        </div>

        {/* Enhanced Hero Section */}
        <section ref={heroRef} className="relative flex items-center min-h-screen overflow-hidden">
          {/* Multi-layer Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 via-transparent to-purple-900/30"></div>
          
          {/* Animated Background Elements */}
          <motion.div 
            className="absolute inset-0"
          >
            <div className="absolute w-32 h-32 rounded-full top-20 left-10 bg-blue-500/10 blur-xl animate-pulse"></div>
            <div className="absolute w-48 h-48 delay-1000 rounded-full top-40 right-20 bg-purple-500/10 blur-2xl animate-pulse"></div>
            <div className="absolute w-40 h-40 rounded-full bottom-40 left-20 bg-cyan-500/10 blur-xl animate-pulse delay-2000"></div>
          </motion.div>
          
          {/* <div className="absolute inset-0 bg-[url('/images/hero/circuit-pattern.png')] opacity-5"></div> */}
          <div className="absolute inset-0">
            <ParticleBackground />
          </div>
          
          <div className="container relative z-10 px-6 mx-auto">
            <motion.div 
              className="grid items-center gap-12 lg:grid-cols-2"
              variants={containerVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
            >
              {/* Enhanced Text Content */}
              <motion.div 
                className="space-y-8 text-white"
                variants={itemVariants}
              >
                <div className="space-y-6">
                  <motion.div
                    className="inline-flex items-center px-4 py-2 border rounded-full bg-white/10 backdrop-blur-sm border-white/20"
                    variants={itemVariants}
                  >
                    <FaStar className="mr-2 text-yellow-400" />
                    <span className="text-sm font-medium">IEEE Excellence 2025</span>
                  </motion.div>
                  
                  <motion.h1 
                    className="text-5xl font-bold leading-tight md:text-6xl lg:text-7xl"
                    variants={itemVariants}
                  >
                    <span className="text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text">
                      Innovate.
                    </span>
                    <br />
                    <span className="text-white">Learn.</span>
                    <br />
                    <span className="text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text">
                      Lead.
                    </span>
                  </motion.h1>
                  
                  <motion.p 
                    className="max-w-2xl text-xl leading-relaxed text-gray-300 md:text-2xl"
                    variants={itemVariants}
                  >
                    Join IEEE Club to build cutting-edge skills, create innovative solutions, and connect with technology leaders worldwide. Shape the future of technology.
                  </motion.p>
                </div>
                
                <motion.div 
                  className="flex flex-col gap-4 sm:flex-row"
                  variants={itemVariants}
                >
                  <Link href="/events">
                    <motion.div
                      className="relative px-8 py-4 overflow-hidden font-semibold text-white rounded-full cursor-pointer group bg-gradient-to-r from-blue-500 to-purple-600"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-purple-600 to-blue-500 group-hover:opacity-100"></div>
                      <span className="relative z-10 flex items-center">
                        Explore Events 
                        <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                      </span>
                    </motion.div>
                  </Link>
                  
                  <Link href="/about">
                    <motion.div
                      className="px-8 py-4 font-semibold text-white transition-all duration-300 border rounded-full cursor-pointer group bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="flex items-center">
                        About Us
                      </span>
                    </motion.div>
                  </Link>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div 
                  className="flex items-center space-x-8 text-sm text-gray-400"
                  variants={itemVariants}
                >
                  
                </motion.div>
              </motion.div>

              {/* Enhanced Visual Content */}
              <motion.div
                className="relative"
                variants={itemVariants}
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
                      alt="IEEE Innovation" 
                      className="w-2/4 h-auto max-w-md mx-auto shadow-xl rounded-2xl"
                    />
                    
                    {/* Floating Stats */}
                    <motion.div
                      className="absolute p-4 shadow-lg -top-6 -right-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <div className="text-center text-white">
                        <div className="text-2xl font-bold">50+</div>
                        <div className="text-xs">Events</div>
                      </div>
                    </motion.div>
                    
                    <motion.div
                      className="absolute p-4 shadow-lg -bottom-4 -left-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl"
                      animate={{ y: [0, 10, 0] }}
                      transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                    >
                      <div className="text-center text-white">
                        <div className="text-2xl font-bold">25+</div>
                        <div className="text-xs">Projects</div>
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
            <span className="mb-2 text-sm font-medium">Explore More</span>
            <div className="flex justify-center w-6 h-10 border-2 rounded-full border-white/30">
              <motion.div
                className="w-1 h-3 mt-2 bg-white rounded-full"
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
            </div>
          </motion.div>
        </section>

        {/* Enhanced Stats Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="container px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto mb-16 text-center"
            >
              <h2 className="mb-6 text-4xl font-bold text-transparent md:text-5xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                Empowering the Next Generation
              </h2>
              <p className="text-xl leading-relaxed text-gray-600">
                IEEE Club provides a platform for students to develop technical skills, leadership abilities, and professional networks through hands-on projects, workshops, and industry connections.
              </p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="relative p-8 overflow-hidden transition-all duration-500 bg-white border border-gray-100 shadow-lg rounded-3xl hover:shadow-2xl">
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                    
                    {/* Content */}
                    <div className="relative z-10 text-center">
                      <div className="flex justify-center mb-4">
                        <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                          {stat.icon}
                        </div>
                      </div>
                      <div className="mb-2">
                        <div className="mb-1 text-4xl font-bold text-gray-900">{stat.value}</div>
                        <div className="text-lg font-semibold text-gray-700">{stat.label}</div>
                      </div>
                      <p className="text-sm leading-relaxed text-gray-600">{stat.description}</p>
                    </div>
                    
                    {/* Hover Effect */}
                    <div className="absolute w-16 h-16 transition-all duration-500 transform scale-0 rounded-full opacity-0 -top-2 -right-2 bg-gradient-to-br from-blue-400 to-purple-400 group-hover:opacity-10 group-hover:scale-100"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Features Section */}
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto mb-16 text-center"
            >
              <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">Why Choose IEEE?</h2>
              <p className="text-xl text-gray-600">Discover the opportunities that await you in our vibrant tech community</p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="relative h-full p-8 overflow-hidden transition-all duration-500 bg-white border border-gray-100 shadow-lg rounded-2xl hover:shadow-2xl">
                    {/* Background Gradient on Hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <div className="mb-4 text-4xl">{feature.icon}</div>
                      <h3 className="mb-3 text-xl font-bold text-gray-900">{feature.title}</h3>
                      <p className="leading-relaxed text-gray-600">{feature.description}</p>
                    </div>
                    
                    {/* Hover Arrow */}
                    <div className="absolute transition-opacity duration-300 opacity-0 top-6 right-6 group-hover:opacity-100">
                      <FaChevronRight className="text-lg text-gray-400" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Events Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="container px-6 mx-auto">
            <div className="flex items-center justify-between mb-12">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold text-gray-900 md:text-5xl"
              >
                Upcoming Events
              </motion.h2>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Link href="/events">
                  <span className="inline-flex items-center px-6 py-3 font-semibold text-white transition-all rounded-full cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg">
                    <span>View All Events</span>
                    <FaArrowRight className="ml-2" />
                  </span>
                </Link>
              </motion.div>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {Events.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative overflow-hidden transition-all duration-500 bg-white shadow-lg group rounded-2xl hover:shadow-2xl"
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="object-cover w-full h-48 transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-xs font-semibold text-gray-800 rounded-full bg-white/90 backdrop-blur-sm">
                        {event.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full">
                        {event.attendees}+ Attending
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-3">
                      <span className="text-sm font-medium text-blue-600">{event.date}</span>
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-600">
                      {event.title}
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed text-gray-600">
                      {event.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <Link href={`/events/${event.id}`}>
                        <span className="text-sm font-semibold text-blue-600 transition-colors cursor-pointer hover:text-blue-700">
                          Learn More
                        </span>
                      </Link>
                      <FaArrowRight className="text-gray-400 transition-all duration-300 group-hover:text-blue-600 group-hover:translate-x-1" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Testimonials Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="container px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto mb-16 text-center"
            >
              <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">What Our Members Say</h2>
              <p className="text-xl text-gray-600">Hear from our alumni who are now leading in tech industry</p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="p-8 bg-white shadow-lg rounded-3xl md:p-12"
              >
                <div className="mb-8 text-center">
                  <FaQuoteLeft className="mx-auto mb-6 text-4xl text-blue-500" />
                  <p className="mb-8 text-xl leading-relaxed text-gray-700 md:text-2xl">
                    "{testimonials[currentTestimonial].quote}"
                  </p>
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <FaStar key={i} className="mr-1 text-xl text-yellow-400" />
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-center">
                  <img 
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="object-cover w-16 h-16 mr-4 rounded-full"
                  />
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">{testimonials[currentTestimonial].name}</h4>
                    <p className="text-gray-600">{testimonials[currentTestimonial].role}</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Testimonial Navigation */}
              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial 
                        ? 'bg-blue-500 w-8' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="relative py-20 overflow-hidden text-white bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0">
            <div className="absolute w-32 h-32 rounded-full top-10 left-10 bg-white/10 blur-xl animate-pulse"></div>
            <div className="absolute w-48 h-48 delay-1000 rounded-full bottom-10 right-10 bg-white/5 blur-2xl animate-pulse"></div>
          </div>
          
          <div className="container relative z-10 px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="mb-6 text-4xl font-bold md:text-5xl">Ready to Shape the Future?</h2>
              <p className="mb-8 text-xl leading-relaxed text-blue-100 md:text-2xl">
                Join IEEE Club today and become part of a community that's pushing the boundaries of technology and innovation.
              </p>
              
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link href="/events">
                  <motion.div
                    className="px-8 py-4 text-lg font-bold text-blue-600 transition-all duration-300 bg-white rounded-full shadow-lg cursor-pointer group hover:bg-blue-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="flex items-center">
                      Explore Events
                      <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                    </span>
                  </motion.div>
                </Link>
                
                <Link href="/contact">
                  <motion.div
                    className="px-8 py-4 text-lg font-bold text-white transition-all duration-300 border-2 border-white rounded-full cursor-pointer hover:bg-white hover:text-blue-600"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Contact Us
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
