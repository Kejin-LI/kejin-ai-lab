
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        // Random increment for realistic feel
        const increment = Math.random() * 15;
        return Math.min(prev + increment, 100);
      });
    }, 200);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="relative w-32 h-32 mb-8">
        {/* Avatar Container */}
        <motion.div 
          className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl relative z-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <img 
            src="https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=3D%20pixar%20style%20cute%20cartoon%20girl%20upper%20body%20portrait%20long%20brown%20hair%20no%20bangs%20exposed%20forehead%20bright%20smile%20wearing%20plain%20beige%20scarf%20grey%20top%20background%20sea%20horizon%20above%20head%20distant%20small%20mountains%20across%20the%20sea%20soft%20lighting&image_size=square" 
            alt="Kejin Avatar" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        {/* Pulsing Ring Effect */}
        <motion.div 
          className="absolute -inset-4 rounded-full border-2 border-labs-purple/20"
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute -inset-8 rounded-full border-2 border-labs-blue/10"
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        />
      </div>

      <motion.h2 
        className="text-2xl font-bold text-google-grey-900 mb-8 tracking-wide flex items-center gap-1"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Loading
        <span className="flex gap-1 ml-1">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-1.5 h-1.5 bg-google-grey-900 rounded-full"
              animate={{ y: [0, -4, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </span>
      </motion.h2>

      {/* Progress Bar Container */}
      <motion.div 
        className="w-64 h-1.5 bg-google-grey-100 rounded-full overflow-hidden relative"
        initial={{ opacity: 0, scaleX: 0.8 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 0.4 }}
      >
        {/* Progress Fill */}
        <motion.div 
          className="h-full bg-gradient-to-r from-labs-purple via-labs-pink to-labs-blue rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        />
      </motion.div>
      
      <motion.p 
        className="mt-3 text-xs text-google-grey-400 font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {Math.round(progress)}%
      </motion.p>
    </motion.div>
  );
};

export default Loader;
