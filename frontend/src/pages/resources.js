import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { FaBook, FaVideo, FaLink, FaDownload, FaSearch, FaFilter, FaTools, FaGraduationCap, FaNewspaper, FaCode } from 'react-icons/fa';
import Layout from '../components/Layout';

export default function Resources() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All Resources' },
    { id: 'ieee', name: 'IEEE Resources' },
    { id: 'learning', name: 'Learning Platforms' },
    { id: 'tools', name: 'Tools & Software' },
    { id: 'courses', name: 'Free Courses' },
  ];

  const resources = [
    // IEEE Resources
    {
      id: 1,
      title: 'IEEE Xplore Digital Library',
      description: 'Access to IEEE journals, conference papers, standards, and educational courses',
      type: 'ieee',
      link: 'https://ieeexplore.ieee.org/',
      image: 'https://ieeexplore.ieee.org/assets/img/xplore_logo_full.svg',
      icon: <FaBook className="text-blue-600" />,
    },
    {
      id: 2,
      title: 'IEEE Spectrum',
      description: 'Technology, engineering, and science news from the world\'s largest professional technology organization',
      type: 'ieee',
      link: 'https://spectrum.ieee.org/',
      image: 'https://spectrum.ieee.org/assets/icons/spectrum-favicon-192x192.png',
      icon: <FaNewspaper className="text-blue-600" />,
    },
    {
      id: 3,
      title: 'IEEE Student Resources',
      description: 'Educational resources and development opportunities for student members',
      type: 'ieee',
      link: 'https://students.ieee.org/',
      image: 'https://students.ieee.org/wp-content/uploads/2021/04/ieee-students-fb-sh.png',
      icon: <FaGraduationCap className="text-blue-600" />,
    },
    
    // Learning Platforms
    {
      id: 4,
      title: 'Coursera',
      description: 'Access thousands of courses from top universities and companies',
      type: 'learning',
      link: 'https://www.coursera.org/',
      image: 'https://d3njjcbhbojbot.cloudfront.net/web/images/favicons/apple-touch-icon-120x120.png',
      icon: <FaGraduationCap className="text-purple-600" />,
    },
    {
      id: 5,
      title: 'edX',
      description: 'Free online courses from Harvard, MIT, and more',
      type: 'learning',
      link: 'https://www.edx.org/',
      image: 'https://www.edx.org/images/logos/edx-logo-elm.svg',
      icon: <FaGraduationCap className="text-red-600" />,
    },
    {
      id: 6,
      title: 'Khan Academy',
      description: 'Free education for anyone, anywhere',
      type: 'learning',
      link: 'https://www.khanacademy.org/',
      image: 'https://cdn.kastatic.org/images/khan-logo-dark-background.new.png',
      icon: <FaVideo className="text-green-600" />,
    },
    
    // Tools & Software
    {
      id: 7,
      title: 'GitHub Student Developer Pack',
      description: 'Free access to the best developer tools for students',
      type: 'tools',
      link: 'https://education.github.com/pack',
      image: 'https://education.github.com/assets/pack/logo-ghep-8a1931dc7f91.svg',
      icon: <FaCode className="text-gray-800" />,
    },
    {
      id: 8,
      title: 'MATLAB Online',
      description: 'Access MATLAB from your web browser for technical computing',
      type: 'tools',
      link: 'https://www.mathworks.com/products/matlab-online.html',
      image: 'https://www.mathworks.com/etc.clientlibs/mathworks/clientlibs/customer-ui/templates/common/resources/images/pic-header-mathworks-logo.svg',
      icon: <FaTools className="text-orange-600" />,
    },
    {
      id: 9,
      title: 'Autodesk Education Community',
      description: 'Free software for students and educators',
      type: 'tools',
      link: 'https://www.autodesk.com/education/edu-software/overview',
      image: 'https://damassets.autodesk.net/content/dam/autodesk/www/products/responsive-imagery/responsive-badges-compare/2023/autocad-2023-badge-75x75.png',
      icon: <FaTools className="text-blue-700" />,
    },
    
    // Free Courses
    {
      id: 10,
      title: 'CS50: Introduction to Computer Science',
      description: 'Harvard University\'s introduction to computer science for beginners',
      type: 'courses',
      link: 'https://cs50.harvard.edu/x/',
      image: 'https://cs50.harvard.edu/x/2023/assets/favicon.ico',
      icon: <FaVideo className="text-red-600" />,
    },
    {
      id: 11,
      title: 'MIT OpenCourseWare',
      description: 'Free access to MIT course materials for self-learners',
      type: 'courses',
      link: 'https://ocw.mit.edu/',
      image: 'https://ocw.mit.edu/images/ocw_mast.jpg',
      icon: <FaGraduationCap className="text-red-700" />,
    },
    {
      id: 12,
      title: 'freeCodeCamp',
      description: 'Learn to code for free with interactive tutorials',
      type: 'courses',
      link: 'https://www.freecodecamp.org/',
      image: 'https://www.freecodecamp.org/favicon-32x32.png',
      icon: <FaCode className="text-green-600" />,
    },
  ];

  // Filter resources based on search term and active filter
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || resource.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <Layout>
      <Head>
        <title>Learning Resources | IEEE GEU</title>
        <meta name="description" content="Access a wide range of learning resources curated by IEEE GEU" />
      </Head>

      <div className="min-h-screen py-12 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 text-4xl font-bold text-gray-900"
            >
              Learning Resources
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-600"
            >
              Explore our curated collection of resources to enhance your knowledge and skills
            </motion.p>

            {/* Search and Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8"
            >
              <div className="relative max-w-md mx-auto mb-8">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveFilter(category.id)}
                    className={`px-4 py-2 text-sm font-medium rounded-full ${
                      activeFilter === category.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Resources Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredResources.length > 0 ? (
              filteredResources.map((resource, index) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="overflow-hidden transition-shadow bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center justify-center h-40 overflow-hidden bg-gray-100">
                    <img
                      src={resource.image}
                      alt={resource.title}
                      className="object-contain w-3/4 h-3/4"
                      onError={(e) => {
                        e.target.src = 'https://placehold.co/400x200?text=Resource';
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      <span className="mr-2">{resource.icon}</span>
                      <span className="text-sm font-medium text-gray-500 capitalize">{resource.type.replace('-', ' ')}</span>
                    </div>
                    <h2 className="mb-2 text-xl font-bold text-gray-900">{resource.title}</h2>
                    <p className="mb-4 text-gray-600">{resource.description}</p>
                    <a
                      href={resource.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800"
                    >
                      Access Resource
                      <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                      </svg>
                    </a>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 py-8 text-center">
                <p className="text-xl text-gray-600">No resources found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setActiveFilter('all');
                  }}
                  className="px-4 py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>

          {/* IEEE Specific Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl p-8 mx-auto mt-16 border border-blue-100 rounded-lg bg-blue-50"
          >
            <h2 className="mb-4 text-2xl font-bold text-center text-gray-900">IEEE Member Exclusive Resources</h2>
            <p className="mb-6 text-center text-gray-700">
              IEEE members get access to these additional premium resources:
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <a 
                href="https://ieeexplore.ieee.org/Xplore/home.jsp" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center p-4 transition-colors bg-white rounded-lg hover:bg-blue-50"
              >
                <FaBook className="flex-shrink-0 mr-3 text-xl text-blue-600" />
                <div>
                  <h3 className="font-medium text-gray-900">Full IEEE Xplore Access</h3>
                  <p className="text-sm text-gray-600">Access over 5 million technical documents</p>
                </div>
              </a>
              <a 
                href="https://innovationatwork.ieee.org/courses/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center p-4 transition-colors bg-white rounded-lg hover:bg-blue-50"
              >
                <FaVideo className="flex-shrink-0 mr-3 text-xl text-blue-600" />
                <div>
                  <h3 className="font-medium text-gray-900">IEEE eLearning Courses</h3>
                  <p className="text-sm text-gray-600">Professional development courses</p>
                </div>
              </a>
              <a 
                href="https://standards.ieee.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center p-4 transition-colors bg-white rounded-lg hover:bg-blue-50"
              >
                <FaLink className="flex-shrink-0 mr-3 text-xl text-blue-600" />
                <div>
                  <h3 className="font-medium text-gray-900">IEEE Standards</h3>
                  <p className="text-sm text-gray-600">Industry standards and best practices</p>
                </div>
              </a>
              <a 
                href="https://www.ieee.org/membership/discounts/index.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center p-4 transition-colors bg-white rounded-lg hover:bg-blue-50"
              >
                <FaDownload className="flex-shrink-0 mr-3 text-xl text-blue-600" />
                <div>
                  <h3 className="font-medium text-gray-900">Member Discounts</h3>
                  <p className="text-sm text-gray-600">Software, books, and conference discounts</p>
                </div>
              </a>
            </div>
            <div className="mt-6 text-center">
              <a
                href="https://www.ieee.org/membership/join/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700"
              >
                Join IEEE Today
              </a>
            </div>
          </motion.div>

          {/* Submit Resource CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl p-8 mx-auto mt-16 text-center bg-blue-600 rounded-lg shadow-md"
          >
            <h2 className="mb-4 text-2xl font-bold text-white">Have a resource to share?</h2>
            <p className="mb-6 text-blue-100">
              If you've found or created a resource that could benefit the IEEE community, we'd love to feature it here.
            </p>
            <a
              href="mailto:geu.ieee.studenbranch@gmail.com?subject=Resource Submission"
              className="inline-flex items-center px-6 py-3 font-medium text-blue-600 bg-white rounded-full hover:bg-blue-50"
            >
              Submit a Resource
            </a>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
