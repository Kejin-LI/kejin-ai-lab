import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { WaveCanvas } from './WaveCanvas';
import { FloatingBubbles } from './FloatingBubbles';
import { useLanguage } from '../../i18n/LanguageContext';

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();
  
  // Parallax effects
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  
  // Mouse movement effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX / innerWidth - 0.5);
    mouseY.set(clientY / innerHeight - 0.5);
  };
  
  const springConfig = { damping: 5, stiffness: 1200 };
  const moveX1 = useSpring(useTransform(mouseX, [-0.5, 0.5], [-120, 120]), springConfig);
  const moveY1 = useSpring(useTransform(mouseY, [-0.5, 0.5], [-120, 120]), springConfig);
  const moveX2 = useSpring(useTransform(mouseX, [-0.5, 0.5], [120, -120]), springConfig);
  const moveY2 = useSpring(useTransform(mouseY, [-0.5, 0.5], [120, -120]), springConfig);

  const [displayText, setDisplayText] = React.useState("");
  // const fullText = "Turning wild ideas into reality using AI.";
  
  React.useEffect(() => {
    const fullText = language === 'en' 
      ? "Turning wild ideas into reality using AI." 
      : "用 AI Agents 将狂野的想法变为现实";
      
    let isDeleting = false;
    let currentIndex = 0;
    let pauseCounter = 0;
    
    // Reset when language changes
    setDisplayText("");
    
    const interval = setInterval(() => {
      // Pause handling at ends
      if (!isDeleting && currentIndex === fullText.length) {
        pauseCounter++;
        if (pauseCounter > 62) { // Pause for ~5s (62 * 80ms is roughly 5s)
          isDeleting = true;
          pauseCounter = 0;
        }
        return;
      }
      
      if (isDeleting && currentIndex === 0) {
        pauseCounter++;
        if (pauseCounter > 10) { // Pause for ~0.5s before re-typing
          isDeleting = false;
          pauseCounter = 0;
        }
        return;
      }

      // Typing/Deleting logic
      if (isDeleting) {
        setDisplayText(fullText.slice(0, currentIndex - 1));
        currentIndex--;
      } else {
        setDisplayText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      }
    }, isDeleting ? 50 : 80); // 50ms deleting, 80ms typing

    return () => clearInterval(interval);
  }, [language]);

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 bg-transparent"
    >
      {/* Ambient Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[15%] w-96 h-96 bg-macaron-purple/30 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob-slow" />
        <div className="absolute top-[20%] right-[15%] w-96 h-96 bg-macaron-yellow/30 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob-medium" />
        <div className="absolute -bottom-[10%] left-[30%] w-96 h-96 bg-macaron-pink/30 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob-fast" />
      </div>

      {/* Floating Bubbles Background */}
      <FloatingBubbles />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          style={{ y: y1 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-macaron-pink text-sm text-macaron-text mb-8 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-macaron-pinkHover" />
            <span className="font-medium">{t('hero.role')}</span>
          </motion.div>
          
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-playful font-bold mb-8 tracking-tight leading-tight min-h-[1.5em] cursor-default flex justify-center items-center overflow-visible">
            <span className="flex flex-wrap justify-center gap-[2px]">
              {(language === 'en' ? "Whimsical Ideas" : "奇思妙想").split("").map((char, index) => (
                <motion.span 
                  key={index}
                  whileHover={{ 
                    scale: 1.2,
                    y: -15,
                    rotate: index % 2 === 0 ? 8 : -8,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 12 }}
                  className={`inline-block ${char === " " ? "w-4" : ""} text-transparent bg-clip-text bg-gradient-to-br from-macaron-pinkHover via-macaron-purple to-macaron-blue`}
                  style={{ 
                    display: "inline-block",
                    backgroundSize: "200% 200%", // Make gradient larger so each letter captures a slice of color
                    backgroundPosition: `${(index / 15) * 100}% 50%` // Approximate continuous gradient
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </span>
          </h1>
          
          <p className="text-macaron-textLight text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed min-h-[1.5em]">
          {displayText}
          <span className="animate-pulse inline-block w-1 h-5 bg-macaron-text ml-1 align-middle"></span>
        </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.a 
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-macaron-text text-white rounded-full font-medium hover:bg-gradient-to-r hover:from-macaron-pinkHover hover:to-macaron-purple transition-all duration-100 shadow-lg hover:shadow-xl hover:shadow-macaron-pinkHover/30 flex items-center gap-2"
            >
              {t('projects.viewProject')}
              <ArrowRight className="w-4 h-4" />
            </motion.a>
            <motion.a 
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/50 text-macaron-text border border-white rounded-full font-medium transition-all shadow-sm hover:shadow-md backdrop-blur-sm hover:backdrop-blur-none hover:bg-transparent hover:text-macaron-pinkHover hover:border-macaron-pinkHover duration-300"
            >
              {t('hero.contact')}
            </motion.a>
          </div>
        </motion.div>
      </div>


      
      {/* Wave Animation */}
      <div className="absolute bottom-0 left-0 w-full h-64 z-0 pointer-events-none">
        <WaveCanvas />
      </div>
    </section>
  );
};
