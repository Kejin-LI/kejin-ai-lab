import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GlitchText } from './GlitchText';
import InteractiveCanvas from './InteractiveCanvas';

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [clickCount, setClickCount] = React.useState(0);
  const clickTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleHiddenEntrance = () => {
    setClickCount(prev => prev + 1);
    
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }

    clickTimeoutRef.current = setTimeout(() => {
      setClickCount(0);
    }, 2000); // Reset after 2 seconds of inactivity

    if (clickCount + 1 >= 5) {
      navigate('/admin');
      setClickCount(0);
    }
  };

  return (
    <footer className="w-full bg-white text-black overflow-hidden relative">
      {/* Interactive Background Effect for Footer */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-50">
        <InteractiveCanvas />
      </div>

      {/* Separator Line Above Everything */}
      <div className="w-full h-px bg-gray-200 relative z-10" />

      <div className="w-full max-w-[1920px] mx-auto relative z-10">
        
        {/* Top Navigation Area */}
        <div className="w-full px-6 md:px-12 py-12 flex flex-col md:flex-row justify-between items-start gap-12 relative z-10">
           {/* Left Side - Mission Statement */}
           <div className="hidden md:flex flex-col gap-4 max-w-sm">
              <h4 className="text-xl font-bold leading-tight">
                {t('footer.mission.title')}
              </h4>
              <p className="text-gray-500 text-sm">
                {t('footer.mission.desc')}
              </p>
           </div>

           {/* Right Side - Navigation Links */}
           <div className="flex gap-12 md:gap-24 text-sm">
              <div className="flex flex-col gap-4">
                 <h4 className="font-bold">{t('footer.nav.title')}</h4>
                 <ul className="flex flex-col gap-2 text-gray-600">
                    <li><a href="/" className="hover:text-black transition-colors">{t('footer.nav.home')}</a></li>
                    <li><a href="/projects" className="hover:text-black transition-colors">{t('footer.nav.projects')}</a></li>
                    <li><a href="/thoughts" className="hover:text-black transition-colors">{t('footer.nav.thoughts')}</a></li>
                    <li><a href="/#contact" className="hover:text-black transition-colors">{t('footer.nav.contact')}</a></li>
                 </ul>
              </div>
              
              <div className="flex flex-col gap-4">
                 <h4 className="font-bold">{t('footer.connect.title')}</h4>
                 <ul className="flex flex-col gap-2 text-gray-600">
                    <li><a href="mailto:likejin2019@gmail.com" className="hover:text-black transition-colors">{t('footer.connect.email')}</a></li>
                    <li><a href="https://www.linkedin.com/in/kejin-li/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">{t('footer.connect.linkedin')}</a></li>
                    <li><a href="https://kejin-li.github.io/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">{t('footer.connect.website')}</a></li>
                 </ul>
              </div>
           </div>
        </div>

        {/* Giant Logo Text - Edge to Edge */}
        {/* Added pb-4 to leave a small gap before the bottom separator */}
        <div className="w-full px-6 md:px-12 flex items-center justify-center overflow-hidden pb-2 md:pb-4 mt-12 md:mt-0">
          <GlitchText text="Kejin AI Lab" className="text-[12.5vw] md:text-[13vw] w-full flex justify-between" />
        </div>
      </div>

      {/* Separator Line Below Logo */}
      <div className="w-full h-px bg-gray-200 relative z-10" />

      <div className="w-full px-4 md:px-8 relative z-10">
        {/* Bottom Content - Mimicking the legal/links bar */}
        <div className="w-full py-4 md:py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] md:text-xs font-medium uppercase tracking-widest text-gray-500">
          
          {/* Left: Credits with Hidden Entrance */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-4">
            <span className="text-gray-400 font-normal normal-case">{t('footer.copyright')}</span>
            <div className="hidden md:block w-px h-3 bg-gray-300"></div>
            <div className="flex items-center gap-1">
              <span>{t('footer.credits.designed')}</span>
              <style>{`
                @keyframes heartBeat {
                  0%, 100% { transform: scale(1); }
                  50% { transform: scale(1.3); }
                }
              `}</style>
              <span 
                className="inline-block text-[#e60023] cursor-pointer select-none mx-1 text-sm" 
                style={{ animation: 'heartBeat 1s infinite ease-in-out' }}
                onClick={handleHiddenEntrance}
                title="Love"
              >
                ❤
              </span> 
              <span>{t('footer.credits.ai_human')}</span>
            </div>
          </div>

          {/* Right: Tech Badges (Styled to fit minimal look) */}
          <div className="flex items-center gap-6 flex-wrap justify-center md:justify-end">
            
            {/* Source Link */}
            <a href="https://github.com/likejin/kejin-ai-lab" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors flex items-center gap-1">
               <span>{t('footer.badges.source')}</span>
            </a>

            {/* IDE Badge */}
            <div className="flex items-center gap-1 cursor-default hover:text-black transition-colors">
               <span>{t('footer.badges.ide')}</span>
            </div>
            
            {/* Model Badge */}
            <div className="flex items-center gap-1 cursor-default hover:text-black transition-colors">
               <span>{t('footer.badges.model')}</span>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
