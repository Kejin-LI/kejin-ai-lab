
import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface GlitchTextProps {
  text: string;
  className?: string;
}

export const GlitchText: React.FC<GlitchTextProps> = ({ text, className = "" }) => {
  return (
    <div 
      className={`w-full text-center font-bold tracking-tighter text-black leading-none select-none whitespace-nowrap relative flex origin-bottom ${className}`}
    >
      {text.split("").map((char, i) => (
        <GlitchChar key={i} char={char} />
      ))}
    </div>
  );
};

const GlitchChar: React.FC<{ char: string }> = ({ char }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const isHovered = useMotionValue(0); // 0 = false, 1 = true

  // Spring physics for smooth hover entry/exit
  const hoverSpring = useSpring(isHovered, { stiffness: 800, damping: 15 });
  
  // Transform values based on hover state
  const x = useSpring(mouseX, { stiffness: 1200, damping: 10 });
  const y = useSpring(mouseY, { stiffness: 1200, damping: 10 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      
      // Check if mouse is close to this character
      const charX = rect.left + rect.width / 2;
      const charY = rect.top + rect.height / 2;
      const dist = Math.hypot(e.clientX - charX, e.clientY - charY);
      
      // Reduced hover radius for tighter interaction
      if (dist < 100) { 
        isHovered.set(1);
        // Calculate relative mouse position for displacement direction
        mouseX.set((e.clientX - charX) * 0.1);
        mouseY.set((e.clientY - charY) * 0.1);
      } else {
        isHovered.set(0);
        mouseX.set(0);
        mouseY.set(0);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (char === " ") return <span className="inline-block w-[0.3em]">&nbsp;</span>;

  return (
    <span ref={ref} className="relative inline-block group">
      {/* Base Character (always visible) */}
      <motion.span className="relative z-10 block">
        {char}
      </motion.span>

      {/* Glitch Layers - Only visible on hover via opacity animation */}
      {[...Array(3)].map((_, i) => (
        <GlitchLayer 
          key={i} 
          char={char} 
          index={i} 
          hoverProgress={hoverSpring} 
        />
      ))}
    </span>
  );
};

const GlitchLayer: React.FC<{ 
  char: string; 
  index: number; 
  hoverProgress: any;
}> = ({ char, index, hoverProgress }) => {
  // Random slice parameters for this layer
  const sliceTop = 20 + index * 25; // 20%, 45%, 70%
  const sliceHeight = 15; // 15% height slices
  
  // Shift amount increases with hover
  const shiftX = useTransform(hoverProgress, [0, 1], [0, (index % 2 === 0 ? 10 : -10) * (index + 1)]);
  const opacity = useTransform(hoverProgress, [0, 0.1], [0, 1]);
  
  return (
    <motion.span
      className="absolute top-0 left-0 text-black pointer-events-none z-20"
      style={{
        clipPath: `polygon(0% ${sliceTop}%, 100% ${sliceTop}%, 100% ${sliceTop + sliceHeight}%, 0% ${sliceTop + sliceHeight}%)`,
        x: shiftX,
        opacity: opacity,
        filter: 'blur(0.5px)',
        // Chromatic aberration using site theme colors (Labs Pink & Labs Blue)
        textShadow: '4px 0 0 rgba(255, 214, 244, 0.9), -4px 0 0 rgba(79, 157, 255, 0.9)' 
      }}
    >
      {char}
    </motion.span>
  );
};
