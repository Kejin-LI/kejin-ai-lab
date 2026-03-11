import React from 'react';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/50 py-8 mt-20 bg-white/30 backdrop-blur-sm relative z-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
        <p className="text-macaron-textLight text-sm font-medium order-2 md:order-1">
          © {new Date().getFullYear()} Kejin AI Lab. All rights reserved.
        </p>
        
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 order-1 md:order-2">
          <div className="flex items-center gap-2 text-sm text-macaron-textLight font-medium">
            <span>Designed & Coded by</span>
            <Heart className="w-4 h-4 text-macaron-pinkHover fill-macaron-pinkHover animate-pulse" />
            <span>AI & Human</span>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Trae Badge */}
            <div className="flex items-center h-5 rounded overflow-hidden text-[10px] font-bold shadow-sm hover:scale-105 transition-transform cursor-default">
              <div className="bg-[#444] text-white px-1.5 h-full flex items-center">IDE</div>
              <div className="bg-[#00E599] text-black px-1.5 h-full flex items-center">Trae</div>
            </div>
            
            {/* Gemini Badge */}
            <div className="flex items-center h-5 rounded overflow-hidden text-[10px] font-bold shadow-sm hover:scale-105 transition-transform cursor-default">
              <div className="bg-[#444] text-white px-1.5 h-full flex items-center">Model</div>
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-1.5 h-full flex items-center">Gemini-3-Pro</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
