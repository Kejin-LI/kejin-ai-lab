import React, { useEffect, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface Star {
  id: number;
  x: number;
  y: number;
}

export const ClickSparkles: React.FC = () => {
  const [stars, setStars] = useState<Star[]>([]);

  const removeStar = useCallback((id: number) => {
    setStars(prev => prev.filter(star => star.id !== id));
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const id = Date.now();
      setStars(prev => [...prev, { id, x: e.clientX, y: e.clientY }]);
      
      // Auto remove after animation
      setTimeout(() => {
        removeStar(id);
      }, 1000);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [removeStar]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <AnimatePresence>
        {stars.map(star => (
          <StarBurst key={star.id} x={star.x} y={star.y} />
        ))}
      </AnimatePresence>
    </div>
  );
};

const StarBurst: React.FC<{ x: number; y: number }> = ({ x, y }) => {
  // Generate MORE particles (from 8 to 12)
  const particles = Array.from({ length: 12 }).map((_, i) => ({
    angle: (i * 360) / 12, 
    distance: 40 + Math.random() * 40, 
    size: 8 + Math.random() * 8,       // Increased size (was 4+6 -> 8+8)
    color: ['#FFC8DD', '#A2D2FF', '#FDFD96', '#CDB4DB', '#B5EAD7'][Math.floor(Math.random() * 5)] 
  }));

  return (
    <div 
      className="absolute top-0 left-0"
      style={{ transform: `translate(${x}px, ${y}px)` }}
    >
      {particles.map((p, i) => (
        <motion.div
          key={i}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0.5 }}
          animate={{ 
            x: Math.cos(p.angle * Math.PI / 180) * p.distance,
            y: Math.sin(p.angle * Math.PI / 180) * p.distance,
            opacity: 0,
            scale: 0
          }}
          transition={{ duration: 1.2, ease: "easeOut" }} // Slower duration (was 0.8)
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 8px ${p.color}, 0 0 12px rgba(255,255,255,0.8)` 
          }}
        />
      ))}
      
      {/* Central Flash - Bigger and brighter */}
      <motion.div
        initial={{ scale: 0.5, opacity: 1 }}
        animate={{ scale: 3, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute w-4 h-4 bg-white rounded-full blur-[2px] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_20px_rgba(255,255,255,0.8)]"
      />
    </div>
  );
};
