import React from 'react';
import { Github, Twitter, Mail, MapPin, Link as LinkIcon, Hash, FolderOpen, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { MOCK_PROJECTS } from '../home/ProjectsGrid';
import { thoughts } from '../home/ThoughtsSection';
import profileImg from '../../assets/profile.jpg';
import { useLanguage } from '../../i18n/LanguageContext';

export const Sidebar: React.FC = () => {
  const { t } = useLanguage();
  return (
    <aside className="w-full lg:w-[280px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
      {/* Profile Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/40 backdrop-blur-md rounded-3xl p-6 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-white/50 text-center"
      >
        <div className="relative w-32 h-32 mx-auto mb-4">
          <div className="absolute inset-0 rounded-full bg-macaron-blue blur-xl opacity-60 animate-pulse"></div>
          <img 
            src="https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=3D%20pixar%20style%20cute%20cartoon%20girl%20upper%20body%20portrait%20long%20brown%20hair%20no%20bangs%20exposed%20forehead%20bright%20smile%20wearing%20plain%20beige%20scarf%20grey%20top%20background%20sea%20horizon%20above%20head%20distant%20small%20mountains%20across%20the%20sea%20soft%20lighting&image_size=square" 
            alt="Profile" 
            className="w-full h-full rounded-full object-cover border-4 border-white/50 relative z-10"
          />
          <div className="absolute bottom-2 right-2 w-4 h-4 bg-macaron-green rounded-full z-20 shadow-sm"></div>
        </div>
        
        <h2 className="text-2xl font-bold text-macaron-text mb-2">Kejin.AI</h2>
        <p className="text-macaron-textLight text-sm mb-6">{t('sidebar.role')}</p>
        
        <div className="flex justify-around mb-6 text-center">
          <div>
            <div className="font-bold text-lg text-macaron-text">{MOCK_PROJECTS.length}</div>
            <div className="text-xs text-macaron-textLight uppercase tracking-wider">{t('sidebar.projects')}</div>
          </div>
          <div>
            <div className="font-bold text-lg text-macaron-text">{thoughts.length}+</div>
            <div className="text-xs text-macaron-textLight uppercase tracking-wider">{t('sidebar.insights')}</div>
          </div>
          <div>
            <div className="font-bold text-lg text-macaron-text">∞</div>
            <div className="text-xs text-macaron-textLight uppercase tracking-wider">{t('sidebar.tea')}</div>
          </div>
        </div>
        
        <button 
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          className="block w-full py-3 rounded-full bg-macaron-text text-white font-medium hover:bg-gradient-to-r hover:from-macaron-pinkHover hover:to-macaron-purple transition-all duration-100 flex items-center justify-center gap-2 mb-4 shadow-md hover:shadow-lg hover:shadow-macaron-pinkHover/30"
        >
          <MessageCircle className="w-4 h-4" />
          <span>{t('sidebar.talk')}</span>
        </button>
        
        <div className="flex justify-center gap-4 text-macaron-textLight">
        </div>
      </motion.div>

      {/* Info Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/40 backdrop-blur-md rounded-3xl p-6 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-white/50"
      >
        <h3 className="flex items-center gap-2 font-bold text-macaron-text mb-4">
          <MapPin className="w-4 h-4 text-macaron-blue" />
          <span>{t('sidebar.location')}</span>
        </h3>
        <p className="text-macaron-textLight text-sm mb-4">{t('sidebar.locationText')}</p>
        
        <h3 className="flex items-center gap-2 font-bold text-macaron-text mb-4 border-t border-white/30 pt-4">
          <LinkIcon className="w-4 h-4 text-macaron-blue" />
          <span>{t('sidebar.links')}</span>
        </h3>
        <ul className="space-y-2 text-sm text-macaron-textLight">
          <li>
            <a 
              href="https://www.linkedin.com/in/kejin-li/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-macaron-pinkHover transition-colors"
            >
              {t('sidebar.myLinkedin')}
            </a>
          </li>
        </ul>
      </motion.div>

      {/* Tags/Skills Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/40 backdrop-blur-md rounded-3xl p-6 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-white/50"
      >
        <h3 className="flex items-center gap-2 font-bold text-macaron-text mb-4">
          <Hash className="w-4 h-4 text-macaron-yellow" />
          <span>{t('sidebar.skills')}</span>
        </h3>
        <div className="flex flex-wrap gap-2">
          {[t('sidebar.skillProduct'), t('sidebar.skillAICoding')].map((skill, index) => (
            <span key={index} className="px-3 py-1 bg-macaron-cream rounded-lg text-xs text-macaron-textLight border border-macaron-yellow/50 hover:bg-macaron-yellow hover:text-macaron-text transition-colors cursor-pointer">
              {skill}
            </span>
          ))}
        </div>
      </motion.div>
    </aside>
  );
};
