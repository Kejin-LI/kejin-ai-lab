import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Github, Twitter, Menu, X, BrainCircuit, Sparkles, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../i18n/LanguageContext';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: targetId } });
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-4 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-300`}
      >
        <div className={`
          flex items-center justify-between px-6 py-3 rounded-full 
          ${isScrolled 
            ? 'bg-white/80 backdrop-blur-md shadow-lg border border-white/50 w-full max-w-5xl' 
            : 'bg-transparent border-transparent w-full max-w-6xl'}
          transition-all duration-300
        `}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 font-bold text-xl text-macaron-text group">
            <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-br from-macaron-purple to-macaron-pink rounded-xl shadow-lg group-hover:rotate-6 transition-transform duration-300">
              <BrainCircuit className="w-6 h-6 text-white absolute" />
              <Sparkles className="w-3 h-3 text-macaron-pinkHover absolute -top-1 -right-1 animate-pulse" />
            </div>
            <span className="font-bold text-xl text-macaron-text tracking-tight font-logo">Kejin AI Lab</span>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#projects" onClick={(e) => handleNavigation(e, 'projects')} className="relative text-sm font-medium text-macaron-text hover:text-macaron-pink group py-1 transition-colors duration-200">
              {t('nav.projects')}
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-macaron-pink transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></span>
            </a>
            <a href="#thoughts" onClick={(e) => handleNavigation(e, 'thoughts')} className="relative text-sm font-medium text-macaron-text hover:text-macaron-pink group py-1 transition-colors duration-200">
              {t('nav.thoughts')}
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-macaron-pink transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></span>
            </a>
            <a href="#contact" onClick={(e) => handleNavigation(e, 'contact')} className="relative text-sm font-medium text-macaron-text hover:text-macaron-pink group py-1 transition-colors duration-200">
              {t('nav.contact')}
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-macaron-pink transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></span>
            </a>
          </nav>

          {/* Right Icons */}
          <div className="hidden md:flex items-center gap-3">
            <button 
              onClick={toggleLanguage}
              className="p-2 text-macaron-text hover:text-macaron-pink transition-colors flex items-center gap-1 font-medium text-xs"
              title={language === 'en' ? 'Switch to Chinese' : 'Switch to English'}
            >
              <Globe className="w-4 h-4" />
              <span>{language === 'en' ? '中' : 'EN'}</span>
            </button>
            <a href="#contact" onClick={(e) => handleNavigation(e, 'contact')} className="px-5 py-2 bg-macaron-text text-white rounded-full text-sm font-medium hover:bg-gradient-to-r hover:from-macaron-pinkHover hover:to-macaron-purple transition-all duration-100 shadow-md hover:shadow-lg hover:shadow-macaron-pinkHover/30 transform hover:-translate-y-0.5">
              {t('hero.contact')}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-macaron-text flex items-center gap-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="text-xs font-bold" onClick={(e) => { e.stopPropagation(); toggleLanguage(); }}>
              {language === 'en' ? '中' : 'EN'}
            </span>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-macaron-cream/95 backdrop-blur-lg pt-24 px-6 md:hidden"
          >
            <nav className="flex flex-col gap-4 text-center">
              {[
                { id: 'projects', label: t('nav.projects') },
                { id: 'thoughts', label: t('nav.thoughts') },
                { id: 'contact', label: t('nav.contact') }
              ].map((item) => (
                <a 
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavigation(e, item.id)}
                  className="text-2xl font-bold text-macaron-text py-4 hover:text-macaron-pink transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
