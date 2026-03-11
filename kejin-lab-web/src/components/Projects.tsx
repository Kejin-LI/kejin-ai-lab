
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
// import { supabase } from '../lib/supabase'; // Temporarily disabled to force localized content

// Predefined themes to cycle through
const PROJECT_THEMES = [
  {
    category: 'AI Native APP',
    bgColor: 'bg-[#D4F976]', // Custom Lime
    accentColor: 'text-black',
    buttonBorder: 'border-black',
  },
  {
    category: 'IDE Skill',
    bgColor: 'bg-[#FFD6F4]', // Labs Pink
    accentColor: 'text-google-grey-900',
    buttonBorder: 'border-google-grey-900',
  },
  {
    category: 'Expert Matching',
    bgColor: 'bg-[#E0E7FF]', // Light Indigo
    accentColor: 'text-google-blue',
    buttonBorder: 'border-google-blue',
  }
];

interface ProjectData {
  id: string;
  title: string;
  description: string;
  image_url: string;
  link: string;
  // Derived fields for UI
  theme: typeof PROJECT_THEMES[0];
}

const Projects: React.FC = () => {
  const { t } = useTranslation();
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [loading, setLoading] = useState(true);

  // Use localized fallback projects directly to support language switching
  useEffect(() => {
    setProjects(getFallbackProjects());
    setLoading(false);
  }, [t]); 

  const getFallbackProjects = () => [
    {
      id: '1',
      title: t('projects.project1.title'),
      description: t('projects.project1.desc'),
      image_url: 'https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=futuristic%20ai%20native%20app%20interface%20neon%20lime%20green%20dark%20theme%20cyberpunk%20style%20data%20visualization&image_size=landscape_4_3',
      link: '#',
      theme: PROJECT_THEMES[0]
    },
    {
      id: '2',
      title: t('projects.project2.title'),
      description: t('projects.project2.desc'),
      image_url: 'https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=creative%20coding%20ide%20interface%20pastel%20pink%20soft%20lighting%20glassmorphism%20floating%20code%20snippets&image_size=landscape_4_3',
      link: '#',
      theme: PROJECT_THEMES[1]
    },
    {
      id: '3',
      title: t('projects.project3.title'),
      description: t('projects.project3.desc'),
      image_url: 'https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=professional%20expert%20matching%20platform%20clean%20blue%20white%20theme%20minimalist%20corporate%20style%20profile%20cards&image_size=landscape_4_3',
      link: '#',
      theme: PROJECT_THEMES[2]
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (projects.length <= 1) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 8000); 

    return () => clearInterval(timer);
  }, [projects.length]);

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  if (loading) return <div className="py-24 text-center">Loading projects...</div>;
  if (projects.length === 0) return null;

  const currentProject = projects[currentIndex];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    })
  };

  return (
    <section id="projects" className="relative py-20 px-4 md:px-8 bg-google-grey-100 overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-google-grey-700 mb-4 block">
            {t('projects.subtitle')}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-google-grey-900 tracking-tight">
            {t('projects.title')}
          </h2>
        </motion.div>

        {/* Carousel Container */}
        {/* Adjusted height for mobile: h-[650px] to accommodate vertical stacking */}
        <div className="relative w-full h-[650px] md:h-[500px] lg:h-[600px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                scale: { duration: 0.4 }
              }}
              className={cn(
                "absolute w-full h-full max-w-6xl rounded-[2rem] md:rounded-[3.5rem] overflow-hidden shadow-xl",
                currentProject.theme.bgColor
              )}
            >
              <div className="flex flex-col md:flex-row h-full">
                {/* Left Content Panel */}
                <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center relative z-10 order-2 md:order-1 h-[55%] md:h-full">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="flex flex-col h-full justify-center"
                  >
                    <span className="inline-block text-[10px] md:text-xs font-bold tracking-widest uppercase mb-4 md:mb-6 opacity-70">
                      {currentProject.theme.category}
                    </span>
                    
                    <h3 className={cn("text-3xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 tracking-tight leading-tight", currentProject.theme.accentColor)}>
                      {currentProject.title}
                    </h3>
                    
                    <div className="relative group/desc">
                      <p className="text-base md:text-xl font-medium opacity-80 mb-6 md:mb-10 max-w-md leading-relaxed line-clamp-3 transition-all duration-300">
                        {currentProject.description}
                      </p>
                      {/* Hover Popup for Full Text */}
                      <div className="absolute top-0 left-0 w-full bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-black/5 opacity-0 invisible group-hover/desc:opacity-100 group-hover/desc:visible transition-all duration-300 z-50 transform scale-95 group-hover/desc:scale-100 origin-top-left">
                        <p className="text-sm md:text-base font-medium text-google-grey-900 leading-relaxed">
                          {currentProject.description}
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <Link 
                        to={`/projects/${currentProject.id}`}
                        className={cn(
                          "inline-flex items-center justify-center px-6 py-2.5 md:px-8 md:py-3 rounded-full border-2 font-bold text-xs md:text-sm tracking-wide transition-all duration-300 hover:bg-black hover:text-white hover:border-black group",
                          currentProject.id === '3' ? "border-black text-black" : [currentProject.theme.buttonBorder, currentProject.theme.accentColor]
                        )}
                      >
                        {t('projects.viewDetails')}
                        <ArrowRight className="ml-2 w-3 h-3 md:w-4 md:h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </motion.div>
                </div>

                {/* Right Image Panel */}
                <div className="w-full md:w-1/2 relative h-[45%] md:h-full bg-black/5 overflow-hidden order-1 md:order-2">
                   {/* The "Preview" container */}
                   <motion.div 
                     initial={{ opacity: 0, x: 50, scale: 0.95 }}
                     animate={{ opacity: 1, x: 0, scale: 1 }}
                     transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                     className="absolute top-4 right-4 bottom-4 left-4 md:top-12 md:right-12 md:bottom-12 md:left-0 bg-google-grey-900 rounded-[1.5rem] md:rounded-[2rem] shadow-2xl overflow-hidden border border-white/10"
                   >
                      {/* UI Header Mockup */}
                      <div className="absolute top-0 left-0 w-full h-8 md:h-12 bg-white/5 border-b border-white/5 flex items-center px-4 md:px-6 gap-2 z-20 backdrop-blur-md">
                        <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500/80"></div>
                        <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-500/80"></div>
                        <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500/80"></div>
                        <div className="ml-auto flex items-center gap-2">
                           <div className="px-2 py-0.5 rounded-full bg-white/10 text-[8px] md:text-[10px] text-white/70 font-mono">
                             {currentProject.theme.category}
                           </div>
                        </div>
                      </div>

                      {/* Main UI Image */}
                      <div className="w-full h-full relative group">
                        <img 
                          src={currentProject.image_url}
                          alt="Project Preview" 
                          className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Overlay Gradient - Made much lighter/subtler */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>
                        
                        {/* Floating UI Elements (Decorative) */}
                        <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8">
                           <div className="flex items-center gap-3 md:gap-4 mb-2 md:mb-4">
                              <div className="w-8 h-8 md:w-12 md:h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                                <Sparkles className="w-4 h-4 md:w-6 md:h-6 text-white/80" />
                              </div>
                              <div className="flex-1 h-8 md:h-12 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center px-4">
                                <div className="w-2/3 h-1.5 md:h-2 bg-white/20 rounded-full animate-pulse"></div>
                              </div>
                           </div>
                        </div>
                      </div>
                   </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination Dots */}
        <div className="flex flex-col items-center mt-6 md:mt-8 gap-6">
          <div className="flex justify-center gap-3">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={cn(
                  "w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300",
                  index === currentIndex 
                    ? "bg-google-grey-900 w-6 md:w-8" 
                    : "bg-google-grey-900/20 hover:bg-google-grey-900/40"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          <Link 
            to="/projects"
            className="px-10 py-3 bg-transparent border-2 border-google-grey-900 text-google-grey-900 rounded-full font-bold transition-all hover:bg-google-grey-900 hover:text-white hover:shadow-lg"
          >
            {t('projects.viewAll', 'View All Projects')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;
