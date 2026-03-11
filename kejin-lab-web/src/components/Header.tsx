import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLang = (lang: string) => {
    i18n.changeLanguage(lang);
    setIsLangOpen(false);
  };

  const navLinks = [
    { key: 'home', label: t('nav.home'), path: '/' },
    { key: 'projects', label: t('nav.projects'), path: '/projects' },
    { key: 'thoughts', label: t('nav.thoughts'), path: '/thoughts' },
    { key: 'contact', label: t('nav.contact'), path: '/community' },
  ];

  const isCurrentPath = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleNavClick = (path: string, e: React.MouseEvent) => {
    // If clicking Home link while already on Home, prevent default and scroll to top
    if (path === '/' && location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-labs-pink/80 backdrop-blur-xl border-b border-white/20 shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand */}
        <Link 
          to="/" 
          onClick={(e) => handleNavClick('/', e)}
          className="text-2xl font-bold tracking-tight text-google-grey-900 flex items-center gap-3"
        >
          <motion.div 
            className="w-8 h-8 relative flex items-center justify-center origin-bottom"
            whileHover={{ rotate: [0, -10, 10, -5, 5, 0] }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill="#202124" d="M32 12L14 48H50L32 12ZM32 18L44 42H20L32 18Z"/>
              <path d="M48 24L58 18M50 30L60 30M48 36L58 42" stroke="#202124" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </motion.div>
          <span>{t('brand.name')}</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-2">
          {navLinks.map((link) => (
            <Link 
              key={link.key} 
              to={link.path} 
              onClick={(e) => handleNavClick(link.path, e)}
              className={`px-4 py-2 rounded-full font-normal transition-all duration-200 ${
                isCurrentPath(link.path)
                  ? 'bg-google-grey-900 text-white' 
                  : 'text-google-grey-700 hover:text-google-grey-900 hover:bg-google-grey-100'
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Language Switcher */}
          <div className="relative ml-4">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center space-x-1 px-3 py-2 rounded-full text-google-grey-700 hover:text-google-grey-900 hover:bg-google-grey-100 font-normal transition-all duration-200"
            >
              <Globe className="w-4 h-4" />
              <span>{i18n.language === 'zh' ? '中文' : 'English'}</span>
              <ChevronDown className="w-4 h-4 ml-1 opacity-50" />
            </button>
            
            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-40 bg-labs-pink/90 backdrop-blur-xl rounded-3xl shadow-glass border border-white/40 overflow-hidden p-2"
                >
                  <button 
                    onClick={() => toggleLang('en')}
                    className={`w-full text-left px-4 py-2 rounded-xl transition-colors ${i18n.language === 'en' ? 'bg-white/40 text-google-grey-900 font-bold' : 'text-google-grey-700 hover:bg-white/20'}`}
                  >
                    English
                  </button>
                  <button 
                    onClick={() => toggleLang('zh')}
                    className={`w-full text-left px-4 py-2 rounded-xl transition-colors ${i18n.language === 'zh' ? 'bg-white/40 text-google-grey-900 font-bold' : 'text-google-grey-700 hover:bg-white/20'}`}
                  >
                    中文
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-google-grey-900 hover:bg-google-grey-100 rounded-full transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-labs-pink/95 backdrop-blur-xl border-b border-white/20"
          >
            <div className="flex flex-col p-6 space-y-2">
              {navLinks.map((link) => (
                <Link 
                  key={link.key} 
                  to={link.path} 
                  className="text-lg font-medium text-google-grey-900 px-4 py-3 rounded-2xl hover:bg-white/20 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="h-px bg-white/20 my-2 mx-4" />
              <div className="grid grid-cols-2 gap-2 p-2">
                <button 
                  onClick={() => { toggleLang('en'); setIsMobileMenuOpen(false); }} 
                  className={`px-4 py-3 rounded-2xl font-medium text-center ${i18n.language === 'en' ? 'bg-white/40 text-google-grey-900' : 'bg-white/10 text-google-grey-700'}`}
                >
                  English
                </button>
                <button 
                  onClick={() => { toggleLang('zh'); setIsMobileMenuOpen(false); }} 
                  className={`px-4 py-3 rounded-2xl font-medium text-center ${i18n.language === 'zh' ? 'bg-white/40 text-google-grey-900' : 'bg-white/10 text-google-grey-700'}`}
                >
                  中文
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
