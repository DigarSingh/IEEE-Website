import Head from 'next/head';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaImage, FaCalendar, FaEye, FaTimes, FaChevronLeft, FaChevronRight, FaDownload, FaShare, FaHeart } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // Gallery categories
  const categories = [
    { id: 'all', name: 'All Photos', count: 24 },
    { id: 'events', name: 'Events', count: 12 },
    { id: 'workshops', name: 'Workshops', count: 8 },
    { id: 'competitions', name: 'Competitions', count: 4 }
  ];

  // Gallery images data
  const galleryImages = [
    {
      id: 1,
      src: '/images/events/hackathon.jpg',
      title: 'IEEE Hackathon 2024',
      category: 'events',
      date: '2024-03-15',
      description: 'Annual IEEE Hackathon bringing together innovative minds to solve real-world problems.',
      photographer: 'IEEE Team',
      views: 1250
    },
    {
      id: 2,
      src: '/images/events/ai-workshop.jpg',
      title: 'AI & Machine Learning Workshop',
      category: 'workshops',
      date: '2024-02-20',
      description: 'Hands-on workshop on artificial intelligence and machine learning fundamentals.',
      photographer: 'IEEE Team',
      views: 890
    },
    {
      id: 3,
      src: '/images/events/cyber.jpg',
      title: 'Cybersecurity Conference',
      category: 'events',
      date: '2024-01-10',
      description: 'Industry experts sharing insights on the latest cybersecurity trends and threats.',
      photographer: 'IEEE Team',
      views: 1100
    },
    {
      id: 4,
      src: '/images/events/drone.jpg',
      title: 'Drone Technology Showcase',
      category: 'events',
      date: '2024-04-05',
      description: 'Demonstration of cutting-edge drone technology and applications.',
      photographer: 'IEEE Team',
      views: 750
    },
    {
      id: 5,
      src: '/images/events/webdev.jpg',
      title: 'Web Development Bootcamp',
      category: 'workshops',
      date: '2024-02-28',
      description: 'Intensive workshop covering modern web development technologies and frameworks.',
      photographer: 'IEEE Team',
      views: 980
    },
    {
      id: 6,
      src: '/images/events/aws.jpg',
      title: 'AWS Cloud Computing Workshop',
      category: 'workshops',
      date: '2024-03-08',
      description: 'Comprehensive training on Amazon Web Services cloud computing platform.',
      photographer: 'IEEE Team',
      views: 1050
    },
    {
      id: 7,
      src: '/images/events/devops.jpg',
      title: 'DevOps & CI/CD Workshop',
      category: 'workshops',
      date: '2024-03-22',
      description: 'Learn about DevOps practices and continuous integration/deployment workflows.',
      photographer: 'IEEE Team',
      views: 820
    },
    {
      id: 8,
      src: '/images/events/project.jpg',
      title: 'Student Project Exhibition',
      category: 'competitions',
      date: '2024-04-12',
      description: 'Showcase of innovative student projects and research work.',
      photographer: 'IEEE Team',
      views: 1300
    }
  ];

  // Filter images based on category
  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  // Handle image selection for modal
  const openImageModal = (image) => {
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  // Navigate through images in modal
  const navigateImage = (direction) => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    } else {
      newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedImage(filteredImages[newIndex]);
  };

  // Handle favorites
  const toggleFavorite = (imageId) => {
    setFavorites(prev => 
      prev.includes(imageId) 
        ? prev.filter(id => id !== imageId)
        : [...prev, imageId]
    );
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (selectedImage) {
        if (e.key === 'ArrowLeft') navigateImage('prev');
        if (e.key === 'ArrowRight') navigateImage('next');
        if (e.key === 'Escape') closeImageModal();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage]);

  return (
    <Layout>
      <div className="bg-white">
        <Head>
          <title>Gallery - IEEE Club</title>
          <meta name="description" content="Explore our gallery of events, workshops, and memorable moments from IEEE Club activities." />
        </Head>

        {/* Enhanced Hero Section */}
        <section className="relative flex items-center min-h-screen overflow-hidden">
          {/* Multi-layer Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-purple-900/30"></div>
          
          {/* Animated Background Elements */}
          <motion.div className="absolute inset-0">
            <div className="absolute w-32 h-32 rounded-full top-20 left-10 bg-purple-500/10 blur-xl animate-pulse"></div>
            <div className="absolute w-48 h-48 delay-1000 rounded-full top-40 right-20 bg-blue-500/10 blur-2xl animate-pulse"></div>
            <div className="absolute w-40 h-40 rounded-full bottom-40 left-20 bg-pink-500/10 blur-xl animate-pulse delay-2000"></div>
            <div className="absolute delay-500 rounded-full bottom-20 right-10 w-36 h-36 bg-cyan-500/10 blur-xl animate-pulse"></div>
          </motion.div>
          
          {/* Circuit Pattern Overlay */}
          {/* <div className="absolute inset-0 bg-[url('/images/hero/circuit-pattern.png')] opacity-5"></div> */}
          
          <div className="container relative z-10 px-6 mx-auto">
            <motion.div 
              className="max-w-5xl mx-auto text-center text-white"
              initial="hidden"
              animate="visible"
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
                className="inline-flex items-center px-4 py-2 mb-6 border rounded-full bg-white/10 backdrop-blur-sm border-white/20"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <FaImage className="mr-2 text-purple-400" />
                <span className="text-sm font-medium">Visual Memories</span>
              </motion.div>
              
              {/* Main Title */}
              <motion.h1 
                className="mb-6 text-5xl font-bold leading-tight md:text-6xl lg:text-7xl"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <span className="text-white">IEEE</span>
                <br />
                <span className="text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text">
                  Gallery
                </span>
                <br />
                <span className="text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text">
                  Collection
                </span>
              </motion.h1>
              
              {/* Subtitle */}
              <motion.p 
                className="max-w-3xl mx-auto mb-10 text-xl leading-relaxed text-gray-300 md:text-2xl"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                Discover moments of innovation, learning, and community through our curated collection of events, workshops, and achievements.
              </motion.p>
              
              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-col justify-center gap-4 sm:flex-row"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <a href="#gallery-grid">
                  <motion.div
                    className="relative px-8 py-4 overflow-hidden font-semibold text-white rounded-full cursor-pointer group bg-gradient-to-r from-purple-500 to-pink-600"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-pink-600 to-purple-500 group-hover:opacity-100"></div>
                    <span className="relative z-10 flex items-center">
                      Explore Gallery <FaEye className="ml-2 transition-transform group-hover:translate-x-1" />
                    </span>
                  </motion.div>
                </a>
                
                <Link href="/events">
                  <motion.div
                    className="px-8 py-4 font-semibold text-white transition-all duration-300 border rounded-full cursor-pointer bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="flex items-center">
                      View Events <FaCalendar className="ml-2" />
                    </span>
                  </motion.div>
                </Link>
              </motion.div>

              {/* Gallery Stats */}
              <motion.div 
                className="grid max-w-2xl grid-cols-3 gap-6 pt-8 mx-auto mt-8 border-t border-white/20"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">24+</div>
                  <div className="text-sm text-gray-400">Photos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-400">50+</div>
                  <div className="text-sm text-gray-400">Events</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400">15k+</div>
                  <div className="text-sm text-gray-400">Views</div>
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
            <span className="mb-2 text-sm font-medium">Browse Photos</span>
            <div className="flex justify-center w-6 h-10 border-2 rounded-full border-white/30">
              <motion.div
                className="w-1 h-3 mt-2 bg-white rounded-full"
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
            </div>
          </motion.div>
        </section>

        {/* Category Filter Section */}
        <section className="py-16 bg-gray-50">
          <div className="container px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900">Browse Categories</h2>
              <p className="text-lg text-gray-600">Filter photos by event type to find exactly what you're looking for</p>
            </motion.div>

            <motion.div 
              className="flex flex-wrap justify-center gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {categories.map((category, index) => (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-purple-300 hover:text-purple-600'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {category.name} ({category.count})
                </motion.button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Gallery Grid Section */}
        <section id="gallery-grid" className="py-20 bg-white">
          <div className="container px-6 mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {filteredImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    className="relative overflow-hidden shadow-lg cursor-pointer group rounded-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => openImageModal(image)}
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={image.src}
                        alt={image.title}
                        className="object-cover w-full h-64 transition-transform duration-500 group-hover:scale-110"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/80 via-transparent to-transparent group-hover:opacity-100">
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="mb-2 text-lg font-bold text-white line-clamp-2">{image.title}</h3>
                          <div className="flex items-center justify-between text-sm text-white/80">
                            <span>{new Date(image.date).toLocaleDateString()}</span>
                            <div className="flex items-center">
                              <FaEye className="mr-1" />
                              {image.views}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Favorite Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(image.id);
                        }}
                        className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 ${
                          favorites.includes(image.id)
                            ? 'bg-red-500 text-white'
                            : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
                        }`}
                      >
                        <FaHeart />
                      </button>

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 text-xs font-medium text-white bg-purple-500 rounded-full">
                          {categories.find(cat => cat.id === image.category)?.name}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* No Results Message */}
            {filteredImages.length === 0 && (
              <motion.div
                className="py-20 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <FaImage className="mx-auto mb-4 text-6xl text-gray-300" />
                <h3 className="mb-2 text-2xl font-bold text-gray-900">No Photos Found</h3>
                <p className="text-gray-600">Try selecting a different category or check back later for new uploads.</p>
              </motion.div>
            )}
          </div>
        </section>

        {/* Image Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeImageModal}
            >
              <motion.div
                className="relative max-w-6xl max-h-full overflow-hidden bg-white shadow-2xl rounded-2xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Image */}
                <div className="relative">
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.title}
                    className="w-full max-h-[70vh] object-contain"
                  />
                  
                  {/* Navigation Buttons */}
                  <button
                    onClick={() => navigateImage('prev')}
                    className="absolute p-3 text-white transition-colors transform -translate-y-1/2 rounded-full left-4 top-1/2 bg-black/50 hover:bg-black/70"
                  >
                    <FaChevronLeft />
                  </button>
                  
                  <button
                    onClick={() => navigateImage('next')}
                    className="absolute p-3 text-white transition-colors transform -translate-y-1/2 rounded-full right-4 top-1/2 bg-black/50 hover:bg-black/70"
                  >
                    <FaChevronRight />
                  </button>

                  {/* Close Button */}
                  <button
                    onClick={closeImageModal}
                    className="absolute p-3 text-white transition-colors rounded-full top-4 right-4 bg-black/50 hover:bg-black/70"
                  >
                    <FaTimes />
                  </button>
                </div>

                {/* Image Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="mb-2 text-2xl font-bold text-gray-900">{selectedImage.title}</h2>
                      <p className="mb-3 text-gray-600">{selectedImage.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>📅 {new Date(selectedImage.date).toLocaleDateString()}</span>
                        <span>📷 {selectedImage.photographer}</span>
                        <span>👁️ {selectedImage.views} views</span>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <button
                        onClick={() => toggleFavorite(selectedImage.id)}
                        className={`p-2 rounded-full transition-colors ${
                          favorites.includes(selectedImage.id)
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <FaHeart />
                      </button>
                      <button className="p-2 text-gray-600 transition-colors bg-gray-100 rounded-full hover:bg-gray-200">
                        <FaShare />
                      </button>
                      <button className="p-2 text-gray-600 transition-colors bg-gray-100 rounded-full hover:bg-gray-200">
                        <FaDownload />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}
