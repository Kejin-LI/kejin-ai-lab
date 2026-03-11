
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useMotionValue, useSpring, useTransform, useVelocity } from 'framer-motion';

const Hero: React.FC = () => {
  const { t } = useTranslation();
  
  // Mouse interaction: Use VELOCITY to trigger temporary attraction
  const mouseY = useMotionValue(0);
  const mouseVelocityY = useVelocity(mouseY);
  
  // Smooth out the velocity to avoid jitter
  const smoothVelocityY = useSpring(mouseVelocityY, { 
    damping: 50, 
    stiffness: 400 
  });
  
  const topWaveY = useTransform(smoothVelocityY, [-2000, 2000], [-150, 150]);
  const bottomWaveY = useTransform(smoothVelocityY, [-2000, 2000], [5, -5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseY.set(e.clientY);
  };

  return (
    <section 
      id="home"
      className="relative min-h-[100dvh] w-full overflow-hidden bg-gradient-to-b from-white to-google-grey-100 flex flex-col items-center justify-center"
      onMouseMove={handleMouseMove}
    >
      {/* 0. Background Sphere Grid - Compact & Orbiting */}
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
        {/* Subtle animated gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,1)_0%,rgba(240,242,245,0.8)_50%,rgba(255,255,255,1)_100%)] opacity-80" />
        
        {/* Animated grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:50px_50px] md:bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black_40%,transparent_100%)] pointer-events-none" />

        {/* --- Fluid Aurora Effect (Option A) --- */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           {/* Pink Aurora */}
           <div
             className="absolute top-[10%] left-[10%] w-[80vw] h-[80vw] md:w-[500px] md:h-[500px] bg-labs-pink/40 rounded-full blur-[60px] md:blur-[80px] mix-blend-multiply animate-aurora origin-center"
             style={{ animationDelay: '0s', animationDuration: '25s' }}
           />
           
           {/* Blue Aurora */}
           <div
             className="absolute bottom-[20%] right-[10%] w-[90vw] h-[90vw] md:w-[600px] md:h-[600px] bg-labs-blue/20 rounded-full blur-[80px] md:blur-[100px] mix-blend-multiply animate-aurora origin-center"
             style={{ animationDelay: '-5s', animationDuration: '30s' }}
           />
           
           {/* Purple Aurora */}
           <div
             className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] md:w-[800px] md:h-[800px] bg-labs-purple/15 rounded-full blur-[100px] md:blur-[120px] mix-blend-multiply animate-aurora origin-center"
             style={{ animationDelay: '-10s', animationDuration: '35s' }}
           />
        </div>

        {/* Container for Relative Positioning around Center */}
        <div className="relative w-[300px] h-[300px] md:w-[800px] md:h-[800px] flex items-center justify-center">

            {/* MAIN CENTER SPHERE (The Hero) - Centered in this container */}
            <div className="relative z-10 flex items-center justify-center">
               {/* 0. Center Landscape Bubble (Mirror Sphere Effect) */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  y: [0, -10, 0]
                }}
                transition={{ 
                  opacity: { duration: 1.5 },
                  scale: { duration: 1.5, ease: "easeOut" },
                  y: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                }}
                className="relative flex items-center justify-center"
              >
                <div className="relative w-[60vw] h-[60vw] max-w-[280px] max-h-[280px] md:max-w-[420px] md:max-h-[420px] rounded-full overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.05)] md:shadow-[0_30px_60px_rgba(0,0,0,0.05)] bg-white border border-white/80">
                  {/* The Image - Abstract Hero Reflection (Light Version) */}
                  <img 
                    src="https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=holographic%20glass%20sphere%20iridescent%20rainbow%20gradient%20reflection%20abstract%20minimalist%20bright%20clean%20high%20key%20white%20background%20soft%20shadows%208k&image_size=square" 
                    alt="Abstract Mirror Reflection" 
                    className="w-full h-full object-cover scale-110 brightness-110 contrast-110 opacity-60"
                  />
                  
                  {/* Sphere Physics Simulation Layers */}
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-200/30 via-transparent to-blue-200/30 mix-blend-overlay"></div>
                  <div className="absolute inset-0 rounded-full shadow-[inset_0_0_60px_rgba(200,200,200,0.4)]"></div>

                  {/* Highlights */}
                  <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[60%] h-[30%] bg-gradient-to-b from-white via-white/80 to-transparent rounded-[100%] filter blur-xl opacity-90 mix-blend-screen"></div>
                  <div className="absolute top-[15%] left-[20%] w-[10%] h-[5%] bg-white rounded-[100%] rotate-[-45deg] filter blur-[2px] opacity-90"></div>

                  <motion.div 
                    animate={{ 
                      opacity: [0.4, 0.7, 0.4],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[20%] bg-gradient-to-t from-blue-100/50 via-purple-100/30 to-transparent rounded-[100%] filter blur-xl mix-blend-color-dodge"
                  ></motion.div>
                  
                  <motion.div 
                    animate={{ opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute inset-0 bg-gradient-to-tr from-blue-200/20 via-transparent to-pink-200/20 rounded-full opacity-60 mix-blend-overlay"
                  ></motion.div>
                  
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full"
                  >
                    <div className="absolute top-0 left-0 w-full h-full rounded-full border-[2px] border-transparent border-t-white/80 border-l-white/20 filter blur-[1px]"></div>
                  </motion.div>
                </div>
                
                {/* Outer Glow */}
                <div className="absolute inset-0 rounded-full shadow-[0_0_80px_rgba(255,255,255,0.8)] md:shadow-[0_0_120px_rgba(255,255,255,0.8)] -z-10"></div>
                <div className="absolute inset-0 rounded-full bg-white/30 blur-3xl -z-10 scale-110"></div>
              </motion.div>
            </div>
        </div>
      </div>

      {/* 1. Pink Wavy Band at the very top */}
      <motion.div 
        style={{ y: topWaveY }}
        className="absolute -top-20 md:-top-32 left-0 w-full h-48 md:h-96 overflow-hidden z-0 pointer-events-none"
      >
        <motion.div 
          animate={{ 
            x: ["0%", "-50%"],
            y: [0, 8, 0]
          }}
          transition={{ 
            x: { duration: 20, repeat: Infinity, ease: "linear" },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
          className="w-[200%] h-full absolute top-0 left-0" 
        >
           <svg viewBox="0 0 2880 320" className="w-full h-full" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFF0F5" />
                <stop offset="100%" stopColor="#FFD6F4" />
              </linearGradient>
            </defs>
            <path d="M0,0 L0,240 Q360,280 720,240 T1440,240 T2160,240 T2880,240 L2880,0 Z" fill="url(#pinkGradient)" />
          </svg>
        </motion.div>
      </motion.div>

      {/* 3. White Wavy Divider at the bottom */}
      <motion.div 
        style={{ y: bottomWaveY }}
        className="absolute -bottom-12 md:-bottom-16 left-0 w-full h-24 md:h-48 overflow-hidden z-20 pointer-events-none"
      >
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="w-[200%] h-full absolute bottom-0 left-0" 
        >
           <svg viewBox="0 0 2880 320" className="w-full h-full" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,320 L0,160 Q360,180 720,160 T1440,160 T2160,160 T2880,160 L2880,320 Z" fill="#FFFFFF" />
          </svg>
        </motion.div>
      </motion.div>
      
      <div className="absolute inset-0 bg-hero-blobs opacity-20 pointer-events-none mix-blend-multiply" />

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-4 md:px-6 max-w-5xl mx-auto pt-16 md:pt-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4"
        >
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold text-google-grey-900 tracking-tighter drop-shadow-sm mix-blend-multiply relative z-20">
            {t('hero.title')}
          </h1>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
        >
             <p className="text-xs md:text-sm font-medium tracking-wide text-google-grey-700 opacity-90 italic font-serif px-4">
                {t('hero.description')}
             </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a 
            href="#projects"
            className="group relative inline-flex items-center justify-center px-6 py-2.5 md:px-8 md:py-3 bg-google-grey-900 text-white text-sm md:text-base font-bold rounded-full shadow-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(32,33,36,0.3)] hover:-translate-y-1 hover:scale-105"
          >
            <span className="relative z-10">{t('hero.cta')}</span>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out z-0 skew-x-[-20deg]"></div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
