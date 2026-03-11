import React, { useEffect, useRef } from 'react';

interface GooeyTextProps {
  text: string;
}

export const GooeyText: React.FC<GooeyTextProps> = ({ text }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      charsRef.current.forEach((char) => {
        if (!char) return;
        const rect = char.getBoundingClientRect();
        const charX = rect.left + rect.width / 2;
        const charY = rect.top + rect.height / 2;
        
        const dist = Math.hypot(e.clientX - charX, e.clientY - charY);
        const maxDist = 150; // Influence radius

        if (dist < maxDist) {
          // Calculate attraction force (pull towards mouse)
          const strength = (1 - dist / maxDist) * 1.5; // Stronger pull when closer
          const pullX = (e.clientX - charX) * strength * 0.3; // 0.3 dampening
          const pullY = (e.clientY - charY) * strength * 0.3;

          char.style.transform = `translate(${pullX}px, ${pullY}px) scale(${1 + strength * 0.1})`;
          char.style.color = `rgba(255, 255, 255, ${0.8 + strength * 0.2})`; // Brighter when active
          char.style.textShadow = `0 0 ${strength * 20}px rgba(255,255,255,0.8)`; // Ink glow
        } else {
          // Reset
          char.style.transform = 'translate(0, 0) scale(1)';
          char.style.color = 'white';
          char.style.textShadow = 'none';
        }
      });
    };

    const handleMouseLeave = () => {
        charsRef.current.forEach(char => {
            if (char) {
                char.style.transform = 'translate(0, 0) scale(1)';
                char.style.color = 'white';
                char.style.textShadow = 'none';
            }
        });
    }

    window.addEventListener('mousemove', handleMouseMove);
    // Add leave listener to reset when mouse leaves window
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full text-center font-black tracking-tighter text-white leading-none select-none translate-y-4 px-4 whitespace-nowrap"
      style={{ fontSize: 'clamp(3rem, 18vw, 200px)' }}
    >
      {text.split("").map((char, i) => (
        <span
          key={i}
          ref={el => charsRef.current[i] = el}
          className="inline-block transition-all duration-300 ease-out will-change-transform"
          style={{ transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)' }} // Smooth gooey return
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
};
