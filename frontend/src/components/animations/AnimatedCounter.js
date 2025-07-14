import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const AnimatedCounter = ({ 
  value = 0, 
  prefix = '', 
  suffix = '', 
  duration = 2,
  delay = 0,
  className = "" 
}) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  useEffect(() => {
    let start = 0;
    let animationFrameId;
    const totalFrames = Math.max(1, Math.floor(60 * duration));
    const incrementPerFrame = value / totalFrames;
    
    // If in view and haven't counted yet
    if (inView && count !== value) {
      // Wait for the delay
      const timer = setTimeout(() => {
        const animate = () => {
          start += incrementPerFrame;
          if (start < value) {
            setCount(Math.floor(start));
            animationFrameId = requestAnimationFrame(animate);
          } else {
            setCount(value);
          }
        };
        
        animate();
      }, delay * 1000);
      
      return () => {
        clearTimeout(timer);
        cancelAnimationFrame(animationFrameId);
      };
    }
  }, [inView, value, duration, count, delay]);
  
  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      <span className="font-bold">{prefix}{count.toLocaleString()}{suffix}</span>
    </motion.div>
  );
};

export default AnimatedCounter;
