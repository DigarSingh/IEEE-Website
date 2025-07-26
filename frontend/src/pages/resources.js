import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { FaBook, FaVideo, FaLink, FaDownload, FaSearch, FaFilter, FaTools, FaGraduationCap, FaNewspaper, FaCode, FaArrowRight, FaStar, FaExternalLinkAlt, FaRocket } from 'react-icons/fa';
import Layout from '@/components/Layout';

export default function Resources() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const categories = [
    { id: 'all', name: 'All Resources', icon: FaBook, color: 'from-blue-500 to-blue-600' },
    { id: 'ieee', name: 'IEEE Resources', icon: FaGraduationCap, color: 'from-purple-500 to-purple-600' },
    { id: 'learning', name: 'Learning Platforms', icon: FaVideo, color: 'from-green-500 to-green-600' },
    { id: 'tools', name: 'Tools & Software', icon: FaTools, color: 'from-orange-500 to-orange-600' },
    { id: 'courses', name: 'Free Courses', icon: FaCode, color: 'from-red-500 to-red-600' },
  ];

  const resources = [
    // IEEE Resources
    {
      id: 1,
      title: 'IEEE Xplore Digital Library',
      description: 'Access to IEEE journals, conference papers, standards, and educational courses',
      type: 'ieee',
      link: 'https://ieeexplore.ieee.org/',
      icon: FaBook,
      color: 'from-blue-500 to-blue-600',
      featured: true,
      rating: 4.9
    },
    {
      id: 2,
      title: 'IEEE Spectrum',
      description: 'Technology, engineering, and science news from the world\'s largest professional technology organization',
      type: 'ieee',
      link: 'https://spectrum.ieee.org/',
      icon: FaNewspaper,
      color: 'from-blue-500 to-blue-600',
      featured: false,
      rating: 4.7
    },
    {
      id: 3,
      title: 'IEEE Student Resources',
      description: 'Educational resources and development opportunities for student members',
      type: 'ieee',
      link: 'https://students.ieee.org/',
      icon: FaGraduationCap,
      color: 'from-blue-500 to-blue-600',
      featured: true,
      rating: 4.8
    },
    
    // Learning Platforms
    {
      id: 4,
      title: 'Coursera',
      description: 'Access thousands of courses from top universities and companies',
      type: 'learning',
      link: 'https://www.coursera.org/',
      icon: FaGraduationCap,
      color: 'from-purple-500 to-purple-600',
      featured: true,
      rating: 4.6
    },
    {
      id: 5,
      title: 'edX',
      description: 'Free online courses from Harvard, MIT, and more',
      type: 'learning',
      link: 'https://www.edx.org/',
      icon: FaGraduationCap,
      color: 'from-red-500 to-red-600',
      featured: false,
      rating: 4.5
    },
    {
      id: 6,
      title: 'Khan Academy',
      description: 'Free education for anyone, anywhere',
      type: 'learning',
      link: 'https://www.khanacademy.org/',
      icon: FaVideo,
      color: 'from-green-500 to-green-600',
      featured: true,
      rating: 4.8
    },
    
    // Tools & Software
    {
      id: 7,
      title: 'GitHub Student Developer Pack',
      description: 'Free access to the best developer tools for students',
      type: 'tools',
      link: 'https://education.github.com/pack',
      icon: FaCode,
      color: 'from-gray-600 to-gray-700',
      featured: true,
      rating: 4.9
    },
    {
      id: 8,
      title: 'MATLAB Online',
      description: 'Access MATLAB from your web browser for technical computing',
      type: 'tools',
      link: 'https://www.mathworks.com/products/matlab-online.html',
      icon: FaTools,
      color: 'from-orange-500 to-orange-600',
      featured: false,
      rating: 4.4
    },
    {
      id: 9,
      title: 'Autodesk Education Community',
      description: 'Free software for students and educators',
      type: 'tools',
      link: 'https://www.autodesk.com/education/edu-software/overview',
      icon: FaTools,
      color: 'from-blue-600 to-blue-700',
      featured: false,
      rating: 4.3
    },
    
    // Free Courses
    {
      id: 10,
      title: 'CS50: Introduction to Computer Science',
      description: 'Harvard University\'s introduction to computer science for beginners',
      type: 'courses',
      link: 'https://cs50.harvard.edu/x/',
      icon: FaVideo,
      color: 'from-red-500 to-red-600',
      featured: true,
      rating: 4.9
    },
    {
      id: 11,
      title: 'MIT OpenCourseWare',
      description: 'Free access to MIT course materials for self-learners',
      type: 'courses',
      link: 'https://ocw.mit.edu/',
      icon: FaGraduationCap,
      color: 'from-red-600 to-red-700',
      featured: true,
      rating: 4.7
    },
    {
      id: 12,
      title: 'freeCodeCamp',
      description: 'Learn to code for free with interactive tutorials',
      type: 'courses',
      link: 'https://www.freecodecamp.org/',
      icon: FaCode,
      color: 'from-green-500 to-green-600',
      featured: true,
      rating: 4.8
    },
  ];

  // Filter resources based on search term and active filter
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || resource.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  // Get featured resources
  const featuredResources = resources.filter(resource => resource.featured);

  return (
    <Layout>
      <Head>
        <title>Learning Resources | IEEE GEU Student Branch</title>
        <meta name="description" content="Access a comprehensive collection of learning resources curated by IEEE GEU Student Branch" />
      </Head>

      {/* Enhanced Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.2) 2%, transparent 0%), 
                             radial-gradient(circle at 75px 75px, rgba(255,255,255,0.1) 2%, transparent 0%)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>

        <div className="container relative z-10 px-4 mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center text-white"
          >
            <motion.div
              variants={fadeIn}
              className="inline-flex items-center px-4 py-2 mb-6 border rounded-full bg-white/10 backdrop-blur-sm border-white/20"
            >
              <FaRocket className="mr-2 text-purple-300" />
              <span className="text-sm font-medium">Knowledge Hub</span>
            </motion.div>

            <motion.h1 
              variants={fadeIn}
              className="mb-6 text-5xl font-bold leading-tight md:text-6xl"
            >
              Learning{' '}
              <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                Resources
              </span>
            </motion.h1>

            <motion.p 
              variants={fadeIn}
              className="mb-8 text-xl text-purple-100"
            >
              Explore our curated collection of resources to enhance your knowledge and accelerate your learning journey
            </motion.p>

            {/* Enhanced Search Bar */}
            <motion.div 
              variants={fadeIn}
              className="max-w-2xl mx-auto"
            >
              <div className="relative group">
                <div className="absolute inset-0 transition duration-300 rounded-full opacity-25 bg-gradient-to-r from-purple-500 to-pink-600 blur group-hover:opacity-40"></div>
                <div className="relative p-1 border rounded-full bg-white/10 backdrop-blur-lg border-white/20">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 p-3">
                      <FaSearch className="text-lg text-white/70" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search resources, courses, tools..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="flex-1 px-4 py-3 text-lg text-white bg-transparent placeholder-white/50 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          {/* Enhanced Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <motion.button
                    key={category.id}
                    onClick={() => setActiveFilter(category.id)}
                    className={`group relative overflow-hidden px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                      activeFilter === category.id
                        ? `bg-gradient-to-r ${category.color} text-white shadow-lg scale-105`
                        : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:shadow-md'
                    }`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="flex items-center space-x-2">
                      <IconComponent className={`text-lg ${activeFilter === category.id ? 'text-white' : 'text-gray-500'}`} />
                      <span>{category.name}</span>
                    </div>
                    {activeFilter === category.id && (
                      <div className="absolute inset-0 transition-opacity duration-300 opacity-20 bg-white/20 rounded-2xl"></div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Featured Resources Section */}
          {activeFilter === 'all' && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-16"
            >
              <div className="mb-8 text-center">
                <h2 className="mb-2 text-3xl font-bold text-gray-900">Featured Resources</h2>
                <p className="text-gray-600">Handpicked resources to jumpstart your learning</p>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {featuredResources.slice(0, 6).map((resource, index) => {
                  const IconComponent = resource.icon;
                  return (
                    <motion.div
                      key={resource.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -8 }}
                      className="relative overflow-hidden transition-all duration-500 bg-white shadow-lg group rounded-2xl hover:shadow-2xl"
                    >
                      {/* Featured Badge */}
                      <div className="absolute top-4 right-4 z-10">
                        <div className="flex items-center px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full">
                          <FaStar className="mr-1" />
                          Featured
                        </div>
                      </div>

                      {/* Gradient Header */}
                      <div className={`h-24 bg-gradient-to-r ${resource.color} relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-white/10"></div>
                        <div className="absolute bottom-4 left-6">
                          <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
                            <IconComponent className="text-2xl text-white" />
                          </div>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="mb-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full capitalize">
                              {resource.type.replace('-', ' ')}
                            </span>
                            <div className="flex items-center text-sm text-gray-500">
                              <FaStar className="mr-1 text-yellow-400" />
                              {resource.rating}
                            </div>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                            {resource.title}
                          </h3>
                        </div>
                        
                        <p className="mb-4 text-gray-600 line-clamp-2">{resource.description}</p>
                        
                        <a
                          href={resource.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white transition-all bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:from-purple-600 hover:to-pink-600 group"
                        >
                          Access Resource
                          <FaExternalLinkAlt className="ml-2 transition-transform group-hover:translate-x-1" />
                        </a>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>
          )}

          {/* All Resources Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="mb-8">
              <h2 className="mb-2 text-3xl font-bold text-gray-900">
                {activeFilter === 'all' ? 'All Resources' : `${categories.find(c => c.id === activeFilter)?.name || ''}`}
              </h2>
              <p className="text-gray-600">
                {filteredResources.length} {filteredResources.length === 1 ? 'resource' : 'resources'} found
              </p>
            </div>
            
            {filteredResources.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredResources.map((resource, index) => {
                  const IconComponent = resource.icon;
                  return (
                    <motion.div
                      key={resource.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="overflow-hidden transition-all duration-300 bg-white border border-gray-200 shadow-sm group rounded-xl hover:shadow-lg hover:border-gray-300"
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`p-3 rounded-xl bg-gradient-to-r ${resource.color}`}>
                            <IconComponent className="text-xl text-white" />
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <FaStar className="mr-1 text-yellow-400" />
                            {resource.rating}
                          </div>
                        </div>
                        
                        <div className="mb-2">
                          <span className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full capitalize">
                            {resource.type.replace('-', ' ')}
                          </span>
                        </div>
                        
                        <h3 className="mb-3 text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                          {resource.title}
                        </h3>
                        
                        <p className="mb-4 text-gray-600 text-sm leading-relaxed">{resource.description}</p>
                        
                        <a
                          href={resource.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium group"
                        >
                          Access Resource
                          <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                        </a>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-20 text-center bg-white shadow-lg rounded-2xl"
              >
                <div className="mb-6">
                  <FaSearch className="w-20 h-20 mx-auto text-gray-400" />
                </div>
                <h3 className="mb-2 text-2xl font-semibold text-gray-700">No resources found</h3>
                <p className="mb-8 text-gray-500">Try adjusting your search or filter criteria</p>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setActiveFilter('all');
                  }}
                  className="px-8 py-3 text-white transition-colors rounded-full shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  Reset Filters
                </button>
              </motion.div>
            )}
          </motion.section>

          {/* IEEE Member Exclusive Resources */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20"
          >
            <div className="relative p-8 overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 md:p-12 rounded-3xl">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.3) 2%, transparent 0%)`,
                  backgroundSize: '50px 50px'
                }}></div>
              </div>

              <div className="relative z-10 text-white">
                <div className="mb-8 text-center">
                  <h2 className="mb-4 text-3xl font-bold">IEEE Member Exclusive Resources</h2>
                  <p className="text-xl text-blue-100">
                    Unlock premium resources with IEEE membership
                  </p>
                </div>
                
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {[
                    { icon: FaBook, title: 'Full IEEE Xplore Access', desc: 'Access over 5 million technical documents' },
                    { icon: FaVideo, title: 'IEEE eLearning Courses', desc: 'Professional development courses' },
                    { icon: FaLink, title: 'IEEE Standards', desc: 'Industry standards and best practices' },
                    { icon: FaDownload, title: 'Member Discounts', desc: 'Software, books, and conference discounts' }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="p-6 transition-all bg-white/10 backdrop-blur-sm rounded-2xl hover:bg-white/20"
                    >
                      <item.icon className="mb-4 text-3xl text-white" />
                      <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                      <p className="text-sm text-blue-100">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-8 text-center">
                  <a
                    href="https://www.ieee.org/membership/join/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-8 py-4 font-semibold text-blue-600 transition-all bg-white rounded-full hover:bg-blue-50 hover:shadow-lg"
                  >
                    Join IEEE Today
                    <FaArrowRight className="ml-2" />
                  </a>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Submit Resource CTA */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16"
          >
            <div className="relative p-8 overflow-hidden bg-gradient-to-r from-purple-50 to-pink-50 md:p-12 rounded-3xl border border-purple-100">
              <div className="relative z-10 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
                  <FaRocket className="text-2xl text-white" />
                </div>
                <h2 className="mb-4 text-3xl font-bold text-gray-900">Have a Resource to Share?</h2>
                <p className="mb-8 text-xl text-gray-600 max-w-2xl mx-auto">
                  Help fellow students by sharing valuable resources you've discovered or created
                </p>
                <a
                  href="mailto:geu.ieee.studentbranch@gmail.com?subject=Resource Submission"
                  className="inline-flex items-center px-8 py-4 font-semibold text-white transition-all bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:from-purple-600 hover:to-pink-600 hover:shadow-lg"
                >
                  Submit a Resource
                  <FaArrowRight className="ml-2" />
                </a>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </Layout>
  );
}
