import React, { useEffect, useRef, useState } from 'react';

interface BubblePhysics {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

interface BubbleVisual {
  id: number;
  radius: number;
  colorClass: string;
  hexColor: string;
  borderColorClass: string;
}

interface FloatingBubblesProps {
  idPrefix?: string;
  count?: number;
  minRadius?: number;
  maxRadius?: number;
  speed?: number;
  enableMouseInteraction?: boolean;
  variant?: 'default' | 'rainbow';
}

export const FloatingBubbles: React.FC<FloatingBubblesProps> = ({
  idPrefix = 'bubble',
  count = 3,
  minRadius = 120,
  maxRadius = 180,
  speed = 1.2,
  enableMouseInteraction = true,
  variant = 'default',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const physicsRef = useRef<BubblePhysics[]>([]);
  const frameRef = useRef<number>();
  const [bubbles, setBubbles] = useState<BubbleVisual[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const { width, height } = containerRef.current.getBoundingClientRect();

    // Mouse position state for physics loop
    const mouseRef = { 
      x: -1000, 
      y: -1000,
      lastTime: 0 // Track last interaction time
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouseRef.x = e.clientX - rect.left;
        mouseRef.y = e.clientY - rect.top;
        mouseRef.lastTime = Date.now(); // Update timestamp
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Define colors (bg and border)
    const defaultThemes = [
      { bg: 'bg-macaron-blue', hex: '#A2D2FF' },
      { bg: 'bg-macaron-green', hex: '#B5EAD7' },
      { bg: 'bg-macaron-yellow', hex: '#FDFD96' },
    ];

    const rainbowThemes = [
      { bg: 'bg-macaron-blue', hex: '#A2D2FF' },
      { bg: 'bg-macaron-pink', hex: '#FFC8DD' },
      { bg: 'bg-macaron-yellow', hex: '#FDFD96' },
      { bg: 'bg-macaron-green', hex: '#B5EAD7' },
      { bg: 'bg-macaron-orange', hex: '#FFD6A5' },
      { bg: 'bg-macaron-red', hex: '#FFADAD' },
      { bg: 'bg-macaron-cyan', hex: '#9BF6FF' },
      { bg: 'bg-macaron-purple', hex: '#CDB4DB' },
    ];

    const themes = variant === 'rainbow' ? rainbowThemes : defaultThemes;

    const newPhysics: BubblePhysics[] = [];
    const newVisuals: BubbleVisual[] = [];

    for (let i = 0; i < count; i++) {
      const radius = minRadius + Math.random() * (maxRadius - minRadius);
      // Ensure we spawn inside
      const x = radius + Math.random() * (width - 2 * radius);
      const y = radius + Math.random() * (height - 2 * radius);
      
      const angle = Math.random() * 2 * Math.PI;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      const theme = themes[i % themes.length];

      newPhysics.push({ x, y, vx, vy, radius });
      newVisuals.push({
        id: i,
        radius,
        colorClass: theme.bg,
        hexColor: theme.hex,
        borderColorClass: '', // Not used anymore
      });
    }

    physicsRef.current = newPhysics;
    setBubbles(newVisuals);

    const update = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const phys = physicsRef.current;
      
      const now = Date.now();
      const isMouseActive = (now - mouseRef.lastTime) < 5000;

      // 1. Move & Wall Bounce & Mouse Attraction
      phys.forEach(p => {
        // Mouse Attraction (only if active recently)
        if (isMouseActive && mouseRef.x > -500 && mouseRef.y > -500) {
          const dx = mouseRef.x - p.x;
          const dy = mouseRef.y - p.y;
          
          // Gentle attraction force
          p.vx += dx * 0.00015;
          p.vy += dy * 0.00015;

          // Apply damping (friction) so they don't accelerate infinitely
          p.vx *= 0.99;
          p.vy *= 0.99;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wall Collision
        if (p.x - p.radius < 0) {
          p.x = p.radius;
          p.vx *= -1;
        } else if (p.x + p.radius > w) {
          p.x = w - p.radius;
          p.vx *= -1;
        }

        if (p.y - p.radius < 0) {
          p.y = p.radius;
          p.vy *= -1;
        } else if (p.y + p.radius > h) {
          p.y = h - p.radius;
          p.vy *= -1;
        }
      });

      // 2. Bubble-Bubble Collision
      for (let i = 0; i < phys.length; i++) {
        for (let j = i + 1; j < phys.length; j++) {
          const p1 = phys[i];
          const p2 = phys[j];

          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const distSq = dx * dx + dy * dy;
          const minDist = p1.radius + p2.radius;

          if (distSq < minDist * minDist) {
            const dist = Math.sqrt(distSq);
            // Normal vector
            const nx = dx / dist;
            const ny = dy / dist;

            // Separate
            const overlap = minDist - dist;
            const moveX = (overlap * nx) * 0.5;
            const moveY = (overlap * ny) * 0.5;

            p1.x -= moveX;
            p1.y -= moveY;
            p2.x += moveX;
            p2.y += moveY;

            // Swap velocity components along normal (elastic)
            // v1_new = v1 - dot(v1-v2, n) * n
            const dvx = p1.vx - p2.vx;
            const dvy = p1.vy - p2.vy;
            const dot = dvx * nx + dvy * ny;

            if (dot > 0) {
              p1.vx -= dot * nx;
              p1.vy -= dot * ny;
              p2.vx += dot * nx;
              p2.vy += dot * ny;
            }
          }
        }
      }

      // 3. Update DOM
      phys.forEach((p, i) => {
        const el = document.getElementById(`${idPrefix}-${i}`);
        if (el) {
          el.style.transform = `translate3d(${p.x - p.radius}px, ${p.y - p.radius}px, 0)`;
        }
      });

      frameRef.current = requestAnimationFrame(update);
    };

    frameRef.current = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {bubbles.map((b) => (
        <div
          key={b.id}
          id={`${idPrefix}-${b.id}`}
          className={`absolute top-0 left-0 rounded-full
            ${b.colorClass}
            bg-opacity-10 backdrop-blur-[3px] shadow-sm transition-colors duration-1000`}
          style={{
            width: b.radius * 2,
            height: b.radius * 2,
            willChange: 'transform',
            background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(255,255,255,0.05) 25%, transparent 60%)`,
            boxShadow: `inset 0 0 20px rgba(255,255,255,0.3), 0 0 0 1px rgba(255,255,255,0.1)` // Very subtle border hint without a solid line
          }}
        >
          {/* Moving Glow Halo - Strengthened */}
          <div className={`absolute -inset-2 rounded-full ${b.colorClass} opacity-60 blur-xl -z-10`} />
          
          {/* Inner color gradient: Deep center to light edges */}
          <div 
            className="w-full h-full rounded-full opacity-40 mix-blend-overlay"
            style={{
              background: `radial-gradient(circle, ${b.hexColor} 0%, transparent 70%)`
            }}
          />
        </div>
      ))}
    </div>
  );
};
