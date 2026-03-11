
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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

const ProjectsPage: React.FC = () => {
  const { t } = useTranslation();
  const [projects, setProjects] = useState<ProjectData[]>([]);
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
      image_url: 'https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=minimalist%20ui%20design%20dashboard%20dark%20mode%20lime%20green%20accents%20abstract%20shapes%20clean%20modern%20interface&image_size=landscape_4_3',
      link: '#',
      theme: PROJECT_THEMES[0]
    },
    {
      id: '2',
      title: t('projects.project2.title'),
      description: t('projects.project2.desc'),
      image_url: 'https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=chat%20interface%20llm%20ai%20assistant%20pink%20glowing%20accents%20dark%20mode%20glassmorphism%20minimalist&image_size=landscape_4_3',
      link: '#',
      theme: PROJECT_THEMES[1]
    },
    {
      id: '3',
      title: t('projects.project3.title'),
      description: t('projects.project3.desc'),
      image_url: 'https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=computer%20vision%20object%20detection%20interface%20bounding%20boxes%20futuristic%20hud%20dark%20mode%20blue%20accents&image_size=landscape_4_3',
      link: '#',
      theme: PROJECT_THEMES[2]
    }
  ];

  if (loading) return <div className="min-h-screen pt-32 text-center">Loading projects...</div>;

  return (
    <div className="min-h-screen bg-google-grey-50 pt-32 pb-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-google-grey-700 mb-4 block">
            {t('projects.subtitle', 'EXPERIMENTS & PROTOTYPES')}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-google-grey-900 tracking-tight mb-6">
            {t('projects.title', 'Selected Projects')}
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-google-grey-600">
            {t('projects.description')}
          </p>
        </motion.div>

        <div className="space-y-12 md:space-y-24">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={cn(
                "group relative w-full rounded-[2rem] md:rounded-[3.5rem] overflow-hidden shadow-xl transition-transform duration-500 hover:scale-[1.01]",
                project.theme.bgColor
              )}
            >
              <div className={cn(
                "flex flex-col md:flex-row h-full min-h-[500px] lg:min-h-[600px]",
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              )}>
                {/* Content Panel */}
                <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center relative z-10">
                  <div>
                    <span className="inline-block text-[10px] md:text-xs font-bold tracking-widest uppercase mb-4 md:mb-6 opacity-70">
                      {project.theme.category}
                    </span>
                    
                    <h3 className={cn("text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 tracking-tight leading-tight", project.theme.accentColor)}>
                      {project.title}
                    </h3>
                    
                    <p className="text-base md:text-xl font-medium opacity-80 mb-6 md:mb-10 max-w-md leading-relaxed">
                      {project.description}
                    </p>
                    
                    <Link 
                      to={`/projects/${project.id}`}
                      className={cn(
                        "inline-flex items-center justify-center px-6 py-2.5 md:px-8 md:py-3 rounded-full border-2 font-bold text-xs md:text-sm tracking-wide transition-all duration-300 hover:bg-black hover:text-white hover:border-black group/btn",
                        project.theme.buttonBorder,
                        project.theme.accentColor
                      )}
                    >
                      {t('projects.viewDetails')}
                      <ArrowRight className="ml-2 w-3 h-3 md:w-4 md:h-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>

                {/* Image Panel */}
                <div className="w-full md:w-1/2 relative h-[300px] md:h-auto bg-black/5 overflow-hidden">
                   <div className="absolute inset-4 md:inset-8 lg:inset-12 bg-google-grey-900 rounded-[1.5rem] md:rounded-[2rem] shadow-2xl overflow-hidden border border-white/10 group-hover:scale-[1.02] transition-transform duration-700">
                      {/* UI Header Mockup */}
                      <div className="absolute top-0 left-0 w-full h-8 md:h-12 bg-white/5 border-b border-white/5 flex items-center px-4 md:px-6 gap-2 z-20 backdrop-blur-md">
                        <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500/80"></div>
                        <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-500/80"></div>
                        <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500/80"></div>
                      </div>

                      {/* Main UI Image */}
                      <div className="w-full h-full relative">
                        <img 
                          src={project.image_url}
                          alt="Project Preview" 
                          className="w-full h-full object-cover opacity-80 mix-blend-overlay"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                        
                        {/* Floating Decorative Elements */}
                        <div className="absolute bottom-6 left-6 right-6 flex items-center gap-4">
                           <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                             <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-white/80" />
                           </div>
                        </div>
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
