import React, { useState } from 'react';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { Sidebar } from '../components/common/Sidebar';
import { HeroSection } from '../components/home/HeroSection';
import { ProjectsGrid } from '../components/home/ProjectsGrid';
import { ThoughtsSection } from '../components/home/ThoughtsSection';
import { ContactSection } from '../components/home/ContactSection';
import { CommentSection } from '../components/home/CommentSection';
import { AnimatePresence, motion } from 'framer-motion';

const DEFAULT_BG = "https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=minimalist%20landscape%20soft%20pastel%20colors%20dreamy%20sky%20mountains%20clean%20composition&image_size=landscape_16_9";

import { GlitchText } from '../components/common/GlitchText';
import { FloatingBubbles } from '../components/home/FloatingBubbles';

const Home: React.FC = () => {
  const [currentBg, setCurrentBg] = useState<string>(DEFAULT_BG);

  return (
    <div className="min-h-screen">
      {/* Fixed Trae-style Big Text Footer (Fixed at bottom, visible when content scrolls away) */}
      <div className="fixed bottom-0 left-0 w-full h-[240px] bg-gradient-to-r from-macaron-pink via-macaron-purple to-macaron-blue flex items-center justify-center overflow-hidden z-0">
        <FloatingBubbles idPrefix="home-footer-bubbles" count={3} minRadius={50} maxRadius={80} speed={0.8} />
        <GlitchText text="Kejin AI Lab" />
      </div>

      {/* Main Content Wrapper (Scrolls over the fixed footer) */}
      <div className="relative z-10 mb-[240px]">
        {/* Background Layer - Moves with content but image stays fixed (Parallax) */}
        <div className="absolute inset-0 z-[-1] overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentBg}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed transition-all duration-700 ease-in-out"
              style={{ backgroundImage: `url('${currentBg}')` }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]" />
        </div>

        <Header />
        <HeroSection />
        
        <main className="container mx-auto px-6 py-12 relative z-10 max-w-[1400px]">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Main Content (Left) */}
            <div className="flex-1 min-w-0 space-y-16">
              <ProjectsGrid onProjectHover={setCurrentBg} defaultBg={DEFAULT_BG} />
              <ThoughtsSection />
              <ContactSection />
            </div>

            {/* Right Sidebar */}
            <div className="lg:w-[320px] xl:w-[360px] flex-shrink-0">
              <div className="sticky top-28 space-y-8">
                <Sidebar />
              </div>
            </div>

          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Home;
