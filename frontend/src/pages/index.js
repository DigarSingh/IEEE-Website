import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaCalendar, FaLightbulb, FaUsers, FaGraduationCap, FaArrowRight } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import Layout from '../components/Layout'; // Import Layout component

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const stats = [
    { value: '500+', label: 'Members', icon: <FaUsers className="text-2xl text-ieee-blue" /> },
    { value: '50+', label: 'Annual Events', icon: <FaCalendar className="text-2xl text-ieee-blue" /> },
    { value: '25+', label: 'Projects', icon: <FaLightbulb className="text-2xl text-ieee-blue" /> },
    { value: '10+', label: 'Industry Partners', icon: <FaGraduationCap className="text-2xl text-ieee-blue" /> },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Machine Learning Workshop',
      date: '11:30 Am Onwards',
      image: '/images/events/ai-workshop.jpg',
      description: 'Hands-on session with industry experts on implementing ML models.'
    },
    {
      id: 2,
      title: 'IEEE Leadership Summit',
      date: 'July 8, 2023',
      image: '/images/events/leadership-summit.jpg',
      description: 'Annual leadership conference with speakers from top tech companies.'
    },
    {
      id: 3,
      title: 'Hackathon 2025',
      date: 'May 01, 2025',
      image: '/images/events/hackathon.jpg',
      description: '48-hour coding challenge with exciting prizes and opportunities.'
    }
  ];

  return (
    <Layout> {/* Add Layout wrapper here */}
      <div className="overflow-hidden">
        <Head>
          <title>IEEE | Empowering Technology Leaders</title>
          <meta name="description" content="IEEE Club - Fostering innovation and technology leadership among students" />
        </Head>

        {/* Hero Section with Glass Morphism */}
        <section className="relative flex items-center h-screen">
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-ieee-blue to-purple-900"></div>
          <div className="absolute inset-0 bg-[url('/images/hero/circuit-pattern.png')] opacity-20 z-0"></div>
          <div className="absolute bottom-0 left-0 right-0 z-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
          
          <div className="container relative z-10 px-6 mx-auto">
            <div className="flex flex-col items-center justify-between md:flex-row">
              <motion.div 
                className="text-white md:w-1/2"
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                variants={fadeIn}
                transition={{ duration: 0.8 }}
              >
                <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
                  Innovate. <span className="text-yellow-300">Learn.</span> Lead.
                </h1>
                <p className="max-w-2xl mb-8 text-xl text-gray-100 md:text-2xl">
                  Join IEEE Club to build skills, create innovative solutions, and connect with technology leaders worldwide.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <Link href="/membership">
                    <span className="flex items-center justify-center px-8 py-3 font-medium transition-all bg-white rounded-full shadow-lg cursor-pointer text-ieee-blue hover:bg-yellow-300 hover:text-gray-900">
                      Join Now <FaArrowRight className="ml-2" />
                    </span>
                  </Link>
                  <Link href="/about">
                    <span className="flex items-center justify-center px-8 py-3 font-medium text-white transition-all bg-transparent border-2 border-white rounded-full cursor-pointer hover:bg-white hover:text-ieee-blue">
                      Learn More
                    </span>
                  </Link>
                </div>
              </motion.div>
              
              <motion.div 
                className="mt-10 md:w-1/2 md:mt-0"
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                variants={fadeIn}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="relative">
                  <div className="absolute w-64 h-64 bg-yellow-300 rounded-full opacity-50 -top-4 -left-4 blur-3xl"></div>
                  <div className="absolute w-64 h-64 rounded-full opacity-50 -bottom-8 -right-8 bg-ieee-blue blur-3xl"></div>
                  <div className="relative w-4/6 p-5 mx-auto bg-white border border-white shadow-5xl bg-opacity-10 backdrop-blur-lg rounded-2xl border-opacity-20">
                    <img 
                      src="/images/hero/hero.jpeg"
                      alt="IEEE Innovation" 
                      className="w-full h-auto rounded-xl"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div 
            className="absolute flex flex-col items-center text-white transform -translate-x-1/2 bottom-10 left-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <span className="mb-2 text-sm">Scroll Down</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </section>

        {/* About Section with Stats */}
        <section className="py-20 bg-white">
          <div className="container px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto mb-16 text-center"
            >
              <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">Empowering the Next Generation of Tech Leaders</h2>
              <p className="text-lg text-gray-600">
                IEEE Club provides a platform for students to develop technical skills, leadership abilities, and professional networks through hands-on projects, workshops, and industry connections.
              </p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-8 text-center transition-all bg-gray-50 rounded-2xl hover:shadow-xl hover:-translate-y-2"
                >
                  <div className="flex justify-center mb-4">
                    {stat.icon}
                  </div>
                  <h3 className="mb-2 text-4xl font-bold text-gray-900">{stat.value}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto mb-16 text-center"
            >
              <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">Why Join IEEE Club?</h2>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-2xl"
              >
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-ieee-blue to-blue-700"></div>
                <div className="relative z-10 flex flex-col h-full p-8">
                  <div className="self-start p-4 mb-6 bg-white rounded-full bg-opacity-20">
                    <FaUsers className="text-2xl text-white" />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-white">Professional Network</h3>
                  <p className="mb-6 text-white text-opacity-90">
                    Connect with industry professionals, IEEE members worldwide, and like-minded peers to build valuable relationships.
                  </p>
                  <Link href="/membership" className="mt-auto">
                    <span className="inline-flex items-center text-white transition-all cursor-pointer hover:text-yellow-300">
                      <span>Learn more</span>
                      <FaArrowRight className="ml-2" />
                    </span>
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative overflow-hidden rounded-2xl"
              >
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-purple-600 to-purple-900"></div>
                <div className="relative z-10 flex flex-col h-full p-8">
                  <div className="self-start p-4 mb-6 bg-white rounded-full bg-opacity-20">
                    <FaGraduationCap className="text-2xl text-white" />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-white">Skill Development</h3>
                  <p className="mb-6 text-white text-opacity-90">
                    Participate in specialized workshops, hackathons, and technical projects to enhance both technical and soft skills.
                  </p>
                  <Link href="/about" className="mt-auto">
                    <span className="inline-flex items-center text-white transition-all cursor-pointer hover:text-yellow-300">
                      <span>Learn more</span>
                      <FaArrowRight className="ml-2" />
                    </span>
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="relative overflow-hidden rounded-2xl"
              >
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-teal-500 to-green-700"></div>
                <div className="relative z-10 flex flex-col h-full p-8">
                  <div className="self-start p-4 mb-6 bg-white rounded-full bg-opacity-20">
                    <FaLightbulb className="text-2xl text-white" />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-white">Leadership Development</h3>
                  <p className="mb-6 text-white text-opacity-90">
                    Develop essential leadership and teamwork skills through organizing events, leading teams, and participating in community initiatives.
                  </p>
                  <Link href="/about" className="mt-auto">
                    <span className="inline-flex items-center text-white transition-all cursor-pointer hover:text-yellow-300">
                      <span>Learn more</span>
                      <FaArrowRight className="ml-2" />
                    </span>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section className="py-20 bg-white">
          <div className="container px-6 mx-auto">
            <div className="flex items-center justify-between mb-12">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold text-gray-900 md:text-4xl"
              >
                Events
              </motion.h2>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Link href="/events">
                  <span className="inline-flex items-center transition-all cursor-pointer text-ieee-blue hover:text-ieee-dark">
                    <span>View all events</span>
                    <FaArrowRight className="ml-2" />
                  </span>
                </Link>
              </motion.div>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="overflow-hidden transition-all bg-white shadow-lg rounded-2xl hover:shadow-xl"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-2 text-sm font-semibold text-ieee-blue">
                      <FaCalendar className="mr-2" />
                      {event.date}
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-gray-900">{event.title}</h3>
                    <p className="mb-4 text-gray-600">{event.description}</p>
                    <Link href={`/events/${event.id}`}>
                      <span className="inline-flex items-center font-medium transition-all cursor-pointer text-ieee-blue hover:text-ieee-dark">
                        <span></span>
                       
                      </span>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-gray-50">
          <div className="container px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto mb-16 text-center"
            >
              <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">What Our Members Say</h2>
              <p className="text-lg text-gray-600">
                Hear from our community about how IEEE Club has influenced their academic and professional journeys.
              </p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative p-8 bg-white shadow-lg rounded-2xl"
              >
                <div className="absolute top-0 right-0 p-3 -mt-4 -mr-4 rounded-full bg-ieee-blue">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.13 5.93C9.62 5.93 10 6.31 10 6.8V10H6.8C6.31 10 5.93 9.62 5.93 9.13V5.93H9.13ZM11.07 5.93H13C13 8.79 10.72 11.07 7.87 11.07V9.13C9.3 9.13 10.42 8.27 10.87 7.07C10.93 6.69 10.97 6.32 11 5.93H11.07Z" fill="white"/>
                    <path d="M17.13 5.93C17.62 5.93 18 6.31 18 6.8V10H14.8C14.31 10 13.93 9.62 13.93 9.13V5.93H17.13ZM19.07 5.93H21C21 8.79 18.72 11.07 15.87 11.07V9.13C17.3 9.13 18.42 8.27 18.87 7.07C18.93 6.69 18.97 6.32 19 5.93H19.07Z" fill="white"/>
                  </svg>
                </div>
                <p className="mb-6 italic text-gray-600">
                  "Being part of IEEE has been transformative for my career. The workshops and networking opportunities helped me secure an internship at a top tech company."
                </p>
                <div className="flex items-center">
                  <img 
                    src="/images/testimonials/member1.jpg" 
                    alt="Member" 
                    className="object-cover w-12 h-12 mr-4 rounded-full" 
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">Ananya Sharma</h4>
                    <p className="text-sm text-gray-500">Computer Science, Final Year</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative p-8 bg-white shadow-lg rounded-2xl"
              >
                <div className="absolute top-0 right-0 p-3 -mt-4 -mr-4 rounded-full bg-ieee-blue">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.13 5.93C9.62 5.93 10 6.31 10 6.8V10H6.8C6.31 10 5.93 9.62 5.93 9.13V5.93H9.13ZM11.07 5.93H13C13 8.79 10.72 11.07 7.87 11.07V9.13C9.3 9.13 10.42 8.27 10.87 7.07C10.93 6.69 10.97 6.32 11 5.93H11.07Z" fill="white"/>
                    <path d="M17.13 5.93C17.62 5.93 18 6.31 18 6.8V10H14.8C14.31 10 13.93 9.62 13.93 9.13V5.93H17.13ZM19.07 5.93H21C21 8.79 18.72 11.07 15.87 11.07V9.13C17.3 9.13 18.42 8.27 18.87 7.07C18.93 6.69 18.97 6.32 19 5.93H19.07Z" fill="white"/>
                  </svg>
                </div>
                <p className="mb-6 italic text-gray-600">
                  "The hands-on project experience with IEEE gave me practical skills that my regular coursework couldn't provide. It's been invaluable for my growth as an engineer."
                </p>
                <div className="flex items-center">
                  <img 
                    src="/images/testimonials/member2.jpg" 
                    alt="Member" 
                    className="object-cover w-12 h-12 mr-4 rounded-full" 
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">Rahul Patel</h4>
                    <p className="text-sm text-gray-500">Electronics Engineering, Third Year</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="relative p-8 bg-white shadow-lg rounded-2xl"
              >
                <div className="absolute top-0 right-0 p-3 -mt-4 -mr-4 rounded-full bg-ieee-blue">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.13 5.93C9.62 5.93 10 6.31 10 6.8V10H6.8C6.31 10 5.93 9.62 5.93 9.13V5.93H9.13ZM11.07 5.93H13C13 8.79 10.72 11.07 7.87 11.07V9.13C9.3 9.13 10.42 8.27 10.87 7.07C10.93 6.69 10.97 6.32 11 5.93H11.07Z" fill="white"/>
                    <path d="M17.13 5.93C17.62 5.93 18 6.31 18 6.8V10H14.8C14.31 10 13.93 9.62 13.93 9.13V5.93H17.13ZM19.07 5.93H21C21 8.79 18.72 11.07 15.87 11.07V9.13C17.3 9.13 18.42 8.27 18.87 7.07C18.93 6.69 18.97 6.32 19 5.93H19.07Z" fill="white"/>
                  </svg>
                </div>
                <p className="mb-6 italic text-gray-600">
                  "Leading a team for the IEEE hackathon helped me develop leadership skills and confidence. The mentorship from seniors and industry professionals was exceptional."
                </p>
                <div className="flex items-center">
                  <img 
                    src="/images/testimonials/member3.jpg" 
                    alt="Member" 
                    className="object-cover w-12 h-12 mr-4 rounded-full" 
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">Priya Mehta</h4>
                    <p className="text-sm text-gray-500">Computer Engineering, Graduate</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Join CTA Section */}
        <section className="py-20 text-white bg-ieee-blue">
          <div className="container px-6 mx-auto">
            <div className="flex flex-col items-center justify-between md:flex-row">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-10 md:w-1/2 md:mb-0"
              >
                <h2 className="mb-6 text-3xl font-bold md:text-4xl">Ready to Start Your IEEE Journey?</h2>
                <p className="max-w-lg mb-8 text-xl text-gray-100">
                  Join our community of innovators, tech enthusiasts, and future leaders. Membership applications are now open!
                </p>
                <Link href="/membership">
                  <span className="inline-flex items-center px-8 py-3 font-medium transition-all bg-white rounded-full shadow-lg cursor-pointer text-ieee-blue hover:bg-yellow-300">
                    Become a Member <FaArrowRight className="ml-2" />
                  </span>
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="md:w-1/3"
              >
                <div className="p-6 bg-white border border-white bg-opacity-10 backdrop-blur-lg rounded-2xl border-opacity-20">
                  <div className="mb-6 text-center">
                    <img 
                      src="/images/logo.png" 
                      alt="IEEE Logo" 
                      className="h-16 mx-auto mb-4" 
                    />
                    <h3 className="text-2xl font-bold">Membership Benefits</h3>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 mt-1 mr-3 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Access to exclusive workshops and events</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 mt-1 mr-3 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Networking with industry professionals</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 mt-1 mr-3 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Opportunities to lead projects and events</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 mt-1 mr-3 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>IEEE digital library and publication access</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 mt-1 mr-3 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Certificate of membership and participation</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-white">
          <div className="container px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">Stay Updated</h2>
              <p className="mb-8 text-gray-600">
                Subscribe to our newsletter for the latest events, workshops, and opportunities.
              </p>
              <form className="flex flex-col gap-4 md:flex-row">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow px-6 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-ieee-blue focus:border-transparent" 
                  required 
                />
                <button 
                  type="submit" 
                  className="px-8 py-3 font-medium text-white transition-all rounded-full bg-ieee-blue hover:bg-ieee-dark"
                >
                  Subscribe
                </button>
              </form>
              <p className="mt-4 text-sm text-gray-500">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
