import { motion } from 'framer-motion';
import { useMemo } from 'react';

// This component will only render on the client-side
const AnimatedBackground = ({ type }) => {
  // Generate deterministic positions for animation elements
  const particles = useMemo(() => {
    if (type === 'success') {
      return Array.from({ length: 25 }).map((_, i) => ({
        left: `${(i * 4) % 100}%`,
        delay: (i % 5) * 0.4,
        duration: (i % 5) + 2,
        colorClass: ['bg-green-400', 'bg-green-500', 'bg-teal-400', 'bg-emerald-500'][i % 4]
      }));
    } else {
      return [];
    }
  }, [type]);

  const codeSymbols = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      left: `${(i * 3) % 100}%`,
      top: `${(i * 3.3) % 100}%`,
      fontSize: `${8 + (i % 8)}px`,
      content: ['{ }', '[ ]', '( )', '//', '/* */', '&&', '||', '<=>', '=>', '==='][i % 10],
      delay: i * 0.3,
      duration: 3 + (i % 5)
    }));
  }, []);

  // Render appropriate background elements based on type
  if (type === 'success') {
    return (
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {particles.map((particle, i) => (
          <motion.div
            key={`particle-${i}`}
            className={`absolute w-2 h-2 rounded-full ${particle.colorClass}`}
            initial={{ 
              x: particle.left, 
              y: -20,
              opacity: 0
            }}
            animate={{ 
              y: '120%',
              opacity: [0, 1, 0],
              rotate: i * 14
            }}
            transition={{ 
              duration: particle.duration,
              repeat: Infinity,
              repeatType: 'loop',
              delay: particle.delay
            }}
            style={{ left: particle.left }}
          />
        ))}
      </div>
    );
  }

  // Default animation
  return (
    <div className="absolute inset-0 flex flex-wrap opacity-10">
      {codeSymbols.map((symbol, i) => (
        <motion.div 
          key={`symbol-${i}`}
          className="font-mono text-xs text-blue-400"
          style={{ 
            position: 'absolute', 
            left: symbol.left,
            top: symbol.top,
            fontSize: symbol.fontSize
          }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ 
            duration: symbol.duration,
            repeat: Infinity, 
            delay: symbol.delay
          }}
        >
          {symbol.content}
        </motion.div>
      ))}
    </div>
  );
};

export default AnimatedBackground;
