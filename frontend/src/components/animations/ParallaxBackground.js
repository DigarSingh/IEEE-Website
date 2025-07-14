import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxBackground = ({ 
  children, 
  imageUrl, 
  overlayColor = "bg-black/40", 
  height = "h-[50vh]",
  strength = 0.2,
  className = "" 
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const { scrollY } = useScroll();
  
  // Transform values based on scroll position
  const y = useTransform(scrollY, [0, 1000], [0, strength * 300]);
  
  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className={`relative overflow-hidden ${height} ${className}`}>
      {/* Background image with parallax effect */}
      <motion.div 
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${imageUrl})`,
          y: isMobile ? 0 : y,
          scale: 1.1 // Slightly larger to prevent edges from showing during motion
        }}
      />
      
      {/* Overlay */}
      <div className={`absolute inset-0 ${overlayColor}`} />
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default ParallaxBackground;
