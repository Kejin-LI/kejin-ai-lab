import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Language } from './locales';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Load from local storage
  useEffect(() => {
    const storedLang = localStorage.getItem('kejin_language') as Language;
    if (storedLang && (storedLang === 'en' || storedLang === 'zh')) {
      setLanguage(storedLang);
    } else {
      // Auto-detect browser language
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('zh')) {
        setLanguage('zh');
      }
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('kejin_language', lang);
  };

  const toggleLanguage = () => {
    handleSetLanguage(language === 'en' ? 'zh' : 'en');
  };

  // Helper function to get nested object value by string path (e.g., "hero.title")
  const t = (path: string): string => {
    const keys = path.split('.');
    let current: any = translations[language];
    
    for (const key of keys) {
      if (current[key] === undefined) {
        console.warn(`Translation missing for key: ${path} in language: ${language}`);
        return path;
      }
      current = current[key];
    }
    
    return typeof current === 'string' ? current : path;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};