import Head from 'next/head';
import { motion } from 'framer-motion';
import { FaUsers, FaLightbulb, FaHistory, FaGlobe, FaAward, FaBullseye, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import { useState } from 'react';
import Layout from '../components/Layout'; // Import Layout component

export default function About() {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // State for active team member
  const [activeTeamMember, setActiveTeamMember] = useState(null);

  // Team members data
  const teamMembers = [
    {
      name: 'Mr.Piyush Agarwal',
      role: 'Faculty Advisor',
      image: '/images/team/advisor.jpg',
      bio: 'Associate Professor with 15+ years of experience in electrical engineering research and education.',
      socialLinks: [
        { icon: <FaLinkedin />, url: 'https://linkedin.com' },
        { icon: <FaGithub />, url: 'https://github.com' }
      ]
    },
    {
      name: 'Ankit Choudhary',
      role: 'Chairperson',
      image: '/images/team/chair.jpg',
      bio: 'Final year Computer Science student passionate about AI and machine learning.',
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
      bio: 'Computer Science Engineering student with expertise in IoT systems and embedded design.',
      socialLinks: [
        { icon: <FaLinkedin />, url: 'https://linkedin.com' },
        { icon: <FaGithub />, url: 'https://github.com' }
      ]
    },
    {
      name: 'Ninand Gangodkar',
      role: 'Secretary',
      image: '/images/team/secretary.jpg',
      bio: 'Information Technology student focused on web development and cybersecurity.',
      socialLinks: [
        { icon: <FaLinkedin />, url: 'https://linkedin.com' },
        { icon: <FaGithub />, url: 'https://github.com' }
      ]
    },
    {
      name: 'Jiya Bisht',
      role: 'Treasurer',
      image: '/images/team/treasurer.jpg',
      bio: 'Computer Science Engineering student with strong organizational and financial management skills.',
      socialLinks: [
        { icon: <FaLinkedin />, url: 'https://linkedin.com' },
        { icon: <FaGithub />, url: 'https://github.com' }
      ]
    },
    {
      name: 'Pranav Maheshwari',
      role: 'Technical Lead',
      image: '/images/team/tech-lead.jpg',
      bio: 'Robotics enthusiast with experience in organizing multiple hackathons and technical workshops.',
      socialLinks: [
        { icon: <FaLinkedin />, url: 'https://linkedin.com' },
        { icon: <FaGithub />, url: 'https://github.com' }
      ]
    }
  ];

  // Milestones data
  const milestones = [
    {
      year: '2022',
      title: 'IEEE Student Branch Established',
      description: 'Our journey began with just 20 founding members dedicated to fostering innovation.'
    },
    {
      year: '2023',
      title: 'First Annual Technical Symposium',
      description: 'Successfully launched our flagship event bringing together 300+ participants from various institutions.'
    },
    {
      year: '2024',
      title: 'Recognition Award',
      description: 'Received the "Outstanding Student Branch" award from IEEE Regional Council.'
    },
    {
      year: '2024',
      title: 'International Conference',
      description: 'Hosted our first international conference on emerging technologies with global participation.'
    },
    {
      year: '2025',
      title: 'National Hackathon Hosts',
      description: 'Organized a major 48-hour hackathon with participants from across the country.'
    },
  ];

  return (
    <Layout> {/* Wrap the entire content with Layout component */}
      <div className="bg-gray-50">
        <Head>
          <title>About Us | IEEE Club</title>
          <meta name="description" content="Learn more about the IEEE Student Branch, our mission, history, and team." />
        </Head>

        {/* Enhanced Hero Section */}
        <section className="relative min-h-[80vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-ieee-blue via-blue-800 to-blue-900"></div>
          
          {/* Abstract Particles Background */}
          <div className="absolute inset-0 opacity-20">
            <div className="relative w-full h-full">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-white rounded-full"
                  style={{
                    width: Math.random() * 10 + 5,
                    height: Math.random() * 10 + 5,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`
                  }}
                  animate={{
                    x: [0, Math.random() * 100 - 50],
                    y: [0, Math.random() * 100 - 50]
                  }}
                  transition={{
                    duration: Math.random() * 20 + 10,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "linear"
                  }}
                />
              ))}
            </div>
          </div>
          
          <div className="container relative z-10 px-4 mx-auto">
            <div className="max-w-4xl mx-auto">
              <motion.div 
                initial="hidden" 
                animate="visible" 
                variants={staggerContainer}
                className="text-center text-white"
              >
                <motion.div variants={fadeIn} className="mb-6">
                  <span className="px-4 py-1 text-xs font-semibold tracking-wider uppercase bg-white rounded-full bg-opacity-20">
                    Established 2022
                  </span>
                </motion.div>
                
                <motion.h1 
                  variants={fadeIn}
                  className="mb-6 text-4xl font-bold leading-tight md:text-6xl lg:text-7xl"
                >
                  About <span className="text-yellow-300">IEEE</span><br/>
                  Student Branch
                </motion.h1>
                
                <motion.p
                  variants={fadeIn}
                  className="max-w-2xl mx-auto mb-10 text-xl text-blue-100 md:text-2xl"
                >
                  Fostering innovation, technical excellence and leadership among the student community
                </motion.p>
                
                <motion.div variants={fadeIn}>
                  <motion.a
                    href="#mission"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center px-8 py-3 text-blue-900 transition-all bg-white rounded-full hover:bg-yellow-300"
                  >
                    Learn More
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </motion.a>
                </motion.div>
              </motion.div>
            </div>
          </div>
          
          {/* Wave Shapes */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="text-gray-50">
              <path fill="currentColor" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,218.7C672,235,768,245,864,234.7C960,224,1056,192,1152,186.7C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
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
                    href="/membership"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 font-medium text-white transition-all rounded-full shadow-lg bg-gradient-to-r from-ieee-blue to-blue-600 hover:from-blue-600 hover:to-blue-700"
                  >
                    Become a Member
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
