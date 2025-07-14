import React from 'react';
import { motion } from 'framer-motion';

const AnimatedHeading = ({ 
  children, 
  className = "", 
  highlight = null, 
  delay = 0,
  highlightColor = "text-blue-600"
}) => {
  // Split by highlight text if provided
  if (highlight && typeof children === 'string') {
    const parts = children.split(highlight);
    
    return (
      <h2 className={className}>
        {parts.map((part, i) => (
          <React.Fragment key={i}>
            <AnimatedText text={part} delay={delay} />
            {i < parts.length - 1 && (
              <span className={highlightColor}>
                <AnimatedText text={highlight} delay={delay + 0.1} />
              </span>
            )}
          </React.Fragment>
        ))}
      </h2>
    );
  }
  
  // If no highlight, animate the entire text
  return (
    <h2 className={className}>
      <AnimatedText text={children} delay={delay} />
    </h2>
  );
};

// Text animation component
const AnimatedText = ({ text, delay = 0 }) => {
  // Animation variants for each character
  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: i * 0.03 + delay,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }
    })
  };

  return (
    <span className="inline-block">
      {Array.from(text).map((char, index) => (
        <motion.span
          key={index}
          custom={index}
          variants={letterVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="inline-block"
          style={{ 
            display: char === " " ? "inline-block" : undefined,
            width: char === " " ? "0.3em" : undefined
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

export default AnimatedHeading;
