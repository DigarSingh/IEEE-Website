import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEye, FaTimes, FaFilter, FaFolder, FaImage, FaChevronLeft, FaChevronRight, FaArrowRight } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import ParticleBackground from '@/components/ParticleBackground';

export default function Gallery({ images }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const heroRef = useRef(null);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  // Extract folder names for category filtering
  const categories = images ? images.reduce((acc, src) => {
    const pathParts = src.split('/');
    if (pathParts.length > 3) {
      const category = pathParts[3]; // /images/gallery/CATEGORY/...
      if (!acc.includes(category)) {
        acc.push(category);
      }
    }
    return acc;
  }, ['all']) : ['all'];
  
  // Filter images by category
  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images?.filter(src => src.includes(`/gallery/${selectedCategory}/`));
    
  // Lightbox navigation
  const navigateImage = (direction) => {
    if (!filteredImages?.length) return;
    
    let newIndex;
    if (direction === 'prev') {
      newIndex = lightboxIndex > 0 ? lightboxIndex - 1 : filteredImages.length - 1;
    } else {
      newIndex = lightboxIndex < filteredImages.length - 1 ? lightboxIndex + 1 : 0;
    }
    
    setLightboxIndex(newIndex);
    setSelectedImage({
      src: filteredImages[newIndex],
      alt: getImageAlt(filteredImages[newIndex])
    });
  };
  
  // Helper to extract alt text from file path
  const getImageAlt = (src) => {
    const fileName = src.split('/').pop() || 'Gallery Image';
    return decodeURIComponent(fileName.replace(/[-_]+/g, ' ').replace(/\.[^.]+$/, ''));
  };
  
  // Animation variants
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
  return (
    <Layout>
      <Head>
        <title>Gallery | IEEE</title>
        <meta
          name="description"
          content="Explore moments from our IEEE events, workshops, and activities."
        />
      </Head>

      {/* Enhanced Hero Section with Particles */}
      <section ref={heroRef} className="relative flex items-center overflow-hidden min-h-[70vh]">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-purple-900/30"></div>
        <motion.div className="absolute inset-0">
          <div className="absolute w-32 h-32 rounded-full top-20 left-10 bg-blue-500/10 blur-xl animate-pulse"></div>
          <div className="absolute w-48 h-48 delay-1000 rounded-full top-40 right-20 bg-purple-500/10 blur-2xl animate-pulse"></div>
          <div className="absolute w-40 h-40 rounded-full bottom-40 left-20 bg-cyan-500/10 blur-xl animate-pulse delay-2000"></div>
        </motion.div>
        <div className="absolute inset-0">
          <ParticleBackground />
        </div>
        <div className="container relative z-10 px-6 mx-auto">
          <motion.div
            className="max-w-3xl mx-auto text-center text-white md:max-w-4xl"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            <motion.div 
              className="inline-flex items-center px-4 py-2 mb-5 border rounded-full bg-white/10 backdrop-blur-sm border-white/20"
              variants={itemVariants}
            >
              <FaImage className="mr-2 text-purple-400" />
              <span className="text-sm font-medium">Visual Memories</span>
            </motion.div>
            <motion.h1 
              className="mb-4 text-5xl font-bold leading-tight md:text-6xl lg:text-7xl"
              variants={itemVariants}
            >
              <span className="text-white">IEEE </span>
              <span className="text-transparent bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-600 bg-clip-text">
                Gallery
              </span>
            </motion.h1>
            <motion.p 
              className="max-w-2xl mx-auto mb-8 text-xl leading-relaxed text-blue-100 md:text-2xl"
              variants={itemVariants}
            >
              Discover moments of innovation, learning, and community from our events and workshops.
            </motion.p>
            
            {categories.length > 1 && (
              <motion.div 
                className="flex flex-wrap justify-center gap-3 mt-8"
                variants={itemVariants}
              >
                <span className="pt-2 mr-2 text-white/80">Browse:</span>
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white font-medium'
                        : 'bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category === 'all' ? 'All Photos' : category.replace(/_/g, ' ')}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
        
        {/* Enhanced Scroll Indicator */}
        <motion.div 
          className="absolute flex flex-col items-center transform -translate-x-1/2 bottom-8 left-1/2 text-white/70"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="mb-2 text-sm font-medium">View Gallery</span>
          <div className="flex justify-center w-6 h-10 border-2 rounded-full border-white/30">
            <motion.div
              className="w-1 h-3 mt-2 bg-white rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </div>
        </motion.div>
      </section>

      {/* Enhanced Gallery Grid */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container px-6 mx-auto">
          {(!images || images.length === 0) ? (
            <div className="max-w-2xl p-6 mx-auto text-center bg-white border border-gray-100 shadow-sm rounded-2xl">
              <p className="text-gray-600">No images found. Please add images under <code className="px-1 py-0.5 text-sm text-blue-600 bg-blue-50 rounded">public/images/gallery</code>.</p>
            </div>
          ) : filteredImages && filteredImages.length === 0 ? (
            <div className="max-w-2xl p-6 mx-auto text-center bg-white border border-gray-100 shadow-sm rounded-2xl">
              <p className="text-gray-600">No images found in the selected category. Try another category or add images to this folder.</p>
            </div>
          ) : (
            <div>
              {/* Gallery Stats */}
              <div className="flex flex-col items-center justify-between gap-4 mb-10 md:flex-row">
                <div className="inline-flex items-center px-4 py-2 border border-purple-100 rounded-full bg-purple-50">
                  <FaFolder className="mr-2 text-purple-500" /> 
                  <span className="text-sm font-medium text-gray-700">
                    {selectedCategory === 'all' ? 'All Categories' : selectedCategory.replace(/_/g, ' ')}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4">
                  <div className="inline-flex items-center p-3 bg-white border border-gray-100 shadow-sm rounded-xl">
                    <div className="p-2 mr-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500">
                      <FaImage className="text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{filteredImages?.length || 0}</div>
                      <div className="text-xs text-gray-500">Photos</div>
                    </div>
                  </div>
                  {categories.length > 1 && (
                    <div className="inline-flex items-center p-3 bg-white border border-gray-100 shadow-sm rounded-xl">
                      <div className="p-2 mr-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500">
                        <FaFolder className="text-white" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">{categories.length - 1}</div>
                        <div className="text-xs text-gray-500">Categories</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6 lg:gap-8"
              >
                {filteredImages.map((src, index) => {
                  const fileName = src.split('/').pop() || 'Gallery Image';
                  const alt = decodeURIComponent(fileName.replace(/[-_]+/g, ' ').replace(/\.[^.]+$/, ''));
                  
                  // Extract category from path for badge display
                  const pathParts = src.split('/');
                  const category = pathParts.length > 3 ? pathParts[3] : '';
                  
                  return (
                    <motion.div
                      key={src}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.5) }}
                      className="relative overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-sm rounded-xl group hover:shadow-md"
                      onClick={() => {
                        setSelectedImage({ src, alt });
                        setLightboxIndex(index);
                      }}
                      whileHover={{ y: -5 }}
                    >
                      <div className="relative w-full h-40 overflow-hidden sm:h-48 md:h-56 lg:h-64">
                        <Image
                          src={src}
                          alt={alt}
                          title={alt}
                          fill
                          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                          loading="lazy"
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:opacity-100" />
                        
                        {/* Bottom Info Panel */}
                        <div className="absolute inset-x-0 bottom-0 p-3 transition-all duration-300 translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
                          <div className="flex items-center justify-between text-sm text-white">
                            <span className="font-medium line-clamp-1">{alt}</span>
                            <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-white/20 backdrop-blur-sm">
                              <FaEye className="mr-1" /> View
                            </span>
                          </div>
                        </div>
                        
                        {/* Category Badge - If category available */}
                        {category && selectedCategory === 'all' && (
                          <div className="absolute px-2 py-1 text-xs font-medium text-white rounded-lg top-3 left-3 bg-purple-500/70 backdrop-blur-sm">
                            {category.replace(/_/g, ' ')}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && filteredImages && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative w-full max-w-6xl max-h-[90vh]"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                aria-label="Close"
                className="absolute z-10 p-2 text-white transition-colors rounded-full top-2 right-2 bg-black/50 hover:bg-black/70"
                onClick={() => setSelectedImage(null)}
              >
                <FaTimes />
              </button>
              
              <div className="relative w-full h-[65vh] bg-black/30 rounded-lg overflow-hidden">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="object-contain w-full h-full"
                  loading="eager"
                />
                
                {/* Navigation Buttons */}
                {filteredImages.length > 1 && (
                  <>
                    <button 
                      className="absolute p-3 text-white transition-colors -translate-y-1/2 rounded-full top-1/2 left-4 bg-black/40 hover:bg-black/60"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateImage('prev');
                      }}
                    >
                      <FaChevronLeft />
                    </button>
                    <button 
                      className="absolute p-3 text-white transition-colors -translate-y-1/2 rounded-full top-1/2 right-4 bg-black/40 hover:bg-black/60"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateImage('next');
                      }}
                    >
                      <FaChevronRight />
                    </button>
                  </>
                )}
              </div>
              
              {/* Image Info */}
              <div className="p-4 mt-2 text-white rounded-lg bg-black/30 backdrop-blur-sm">
                <h3 className="text-lg font-medium">{selectedImage.alt}</h3>
                <div className="flex items-center justify-between mt-2">
                  <div className="text-sm text-white/80">
                    {lightboxIndex + 1} of {filteredImages.length}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* CTA Section */}
      <section className="py-16 text-center bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
        <div className="container px-6 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-white"
          >
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">Join Us at Our Next Event</h2>
            <p className="mb-8 text-lg text-blue-100">
              Become part of our vibrant community and create memories that last a lifetime.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link 
                href="/events" 
                className="inline-flex items-center px-8 py-4 text-lg font-bold text-purple-600 transition-all bg-white rounded-full shadow-lg hover:bg-gray-50"
              >
                Upcoming Events <FaArrowRight className="ml-2" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

export async function getServerSideProps() {
  // Import Node.js modules at request time to keep them out of the client bundle
  const fs = await import('fs');
  const path = await import('path');

  const galleryRoot = path.join(process.cwd(), 'public', 'images', 'gallery');
  const validExt = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.svg']);

  async function walk(dir, baseUrl) {
    const items = await fs.promises.readdir(dir, { withFileTypes: true });
    const results = [];
    for (const item of items) {
      const absPath = path.join(dir, item.name);
      const urlPath = `${baseUrl}/${item.name}`.replace(/\\/g, '/');
      if (item.isDirectory()) {
        results.push(...(await walk(absPath, urlPath)));
      } else {
        const ext = path.extname(item.name).toLowerCase();
        if (validExt.has(ext)) {
          results.push(urlPath);
        }
      }
    }
    return results;
  }

  let images = [];
  try {
    // Ensure the directory exists; if not, return empty list gracefully
    const stat = await fs.promises.stat(galleryRoot).catch(() => null);
    if (stat && stat.isDirectory()) {
      images = await walk(galleryRoot, '/images/gallery');
      // Sort for stable ordering (by path)
      images.sort((a, b) => a.localeCompare(b));
    }
  } catch (e) {
    // Log on server, but do not break the page
    console.error('Failed to read gallery images:', e);
  }

  return {
    props: {
      images,
    },
  };
}
