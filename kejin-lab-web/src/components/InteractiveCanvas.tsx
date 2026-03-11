import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const InteractiveCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking
  const mouseRef = useRef({ x: -1000, y: -1000 }); // Start off-screen
  const mouseMovingRef = useRef(false);
  const mouseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pointsRef = useRef<Point[]>([]);
  const heartsRef = useRef<Heart[]>([]); // Store active hearts

  interface Point {
    x: number;
    y: number;
    baseX: number;
    baseY: number;
    vx: number;
    vy: number;
    color: string;
    size: number;
    phase: number;
    assignedAngle: number; // For uniform distribution
  }

  interface Heart {
    x: number;
    y: number;
    size: number;
    opacity: number;
    color: string;
    scale: number;
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const colors = ['#4285F4', '#EA4335', '#FBBC05', '#34A853', '#FFD6F4', '#30FF8F'];
    const heartColors = ['#1967D2', '#D93025', '#F29900', '#188038', '#8E24AA', '#5F6368', '#1A73E8']; // Deeper, solid colors

    // Draw Heart Function (Symmetrical, Solid, Cute & Short)
    const drawHeart = (x: number, y: number, size: number, color: string, opacity: number) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.globalAlpha = opacity;
        ctx.fillStyle = color;
        ctx.beginPath();
        
        // Cuter Heart Shape Formula (Wider and shorter)
        const s = size;
        // Start from top center dip
        ctx.moveTo(0, -s * 0.2); 
        
        // Right hump (Curvier and wider)
        // Control points adjusted to make it less elongated
        ctx.bezierCurveTo(s * 0.5, -s * 0.8, s * 1.2, -s * 0.3, 0, s * 0.8); 
        
        // Left hump
        ctx.bezierCurveTo(-s * 1.2, -s * 0.3, -s * 0.5, -s * 0.8, 0, -s * 0.2);
        
        ctx.fill();
        ctx.restore();
    };

    // Initialize points
    const initPoints = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      const spacing = 100; // Decreased spacing -> More points (was 120)
      const cols = Math.ceil(width / spacing);
      const rows = Math.ceil(height / spacing);
      
      pointsRef.current = [];
      
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing + spacing / 2 + (Math.random() - 0.5) * 50; // More random spread
          const y = j * spacing + spacing / 2 + (Math.random() - 0.5) * 50;
          pointsRef.current.push({
            x,
            y,
            baseX: x,
            baseY: y,
            // Reduce initial velocity by 2x (from 0.01 to 0.005)
            // Visible drift but slow
            vx: (Math.random() - 0.5) * 0.2, 
            vy: (Math.random() - 0.5) * 0.2,
            color: colors[Math.floor(Math.random() * colors.length)],
            // Increase size by 1x (from 1.25-2.0 to 2.5-4.0)
            size: Math.random() * 1.5 + 2.5, 
            phase: Math.random() * Math.PI * 2,
            assignedAngle: Math.floor(Math.random() * 3) * (2 * Math.PI / 3) + (Math.random() - 0.5) * 0.5 // Triangle distribution
          });
        }
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // 1. Update and Draw Points (Network Effect)
      pointsRef.current.forEach(point => {
        // Natural movement - Keep it constant and slow
        point.x += point.vx;
        point.y += point.vy;

        // Bounce off edges
        if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
        if (point.y < 0 || point.y > canvas.height) point.vy *= -1;
        
        // Mouse interaction (Dynamic Polygon Formation)
        const dx = mouseRef.current.x - point.x;
        const dy = mouseRef.current.y - point.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const interactionRadius = 250;
        
        if (distance < interactionRadius) {
             if (mouseMovingRef.current) {
                 // SCATTER: Same force as Gather (0.0005) but repulsive
                 // This ensures the "Scatter" and "Gather" feel balanced and slow
                 point.vx += (Math.random() - 0.5) * 0.05; 
                 point.vy += (Math.random() - 0.5) * 0.05;
             } else {
                 // GATHER - Triangle Formation logic
                 // We pull points towards a specific geometric shape (Triangle).
                 // We use a pre-assigned random angle for each point to ensure uniform distribution around the shape.
                 
                 let angle = point.assignedAngle; 
                 
                 // Triangle shape formula
                 // We distribute points along 3 edges of an equilateral triangle
                 // Center is mouse position
                 // Side length = 200
                 
                 const sideLength = 200;
                 const height = sideLength * Math.sqrt(3) / 2;
                 
                 // 3 Vertices relative to center (0,0)
                 // Top vertex
                 const v1 = { x: 0, y: -height * 2/3 };
                 // Bottom right
                 const v2 = { x: sideLength / 2, y: height / 3 };
                 // Bottom left
                 const v3 = { x: -sideLength / 2, y: height / 3 };
                 
                 // Determine which edge this point belongs to based on assignedAngle
                 // assignedAngle is roughly 0, 2PI/3, 4PI/3 plus some jitter
                 // Normalize angle to 0-2PI
                 let normalizedAngle = (angle % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
                 
                 let start, end;
                 
                 // Divide into 3 segments
                 if (normalizedAngle < 2 * Math.PI / 3) {
                     // Edge 1: v1 -> v2 (Right edge)
                     start = v1;
                     end = v2;
                 } else if (normalizedAngle < 4 * Math.PI / 3) {
                     // Edge 2: v2 -> v3 (Bottom edge)
                     start = v2;
                     end = v3;
                 } else {
                     // Edge 3: v3 -> v1 (Left edge)
                     start = v3;
                     end = v1;
                 }
                 
                 // Interpolate along the edge
                 // Use the fractional part of the jitter to position along the line
                 const t = (angle * 10) % 1; // Pseudo-random position along edge
                 
                 // Dynamic balancing: slightly shift t based on point index to ensure even spread
                 // This is handled implicitly by random initialization, but we can add a small drift
                 // to "fill gaps" if we tracked density, but random is usually sufficient for visual "uniformity"
                 
                 let targetX = start.x + (end.x - start.x) * t;
                 let targetY = start.y + (end.y - start.y) * t;
                 
                 // Add mouse offset
                 const finalTargetX = mouseRef.current.x + targetX;
                 const finalTargetY = mouseRef.current.y + targetY;
                 
                 // Spring force - Sharper pull to maintain shape
                 const ax = (finalTargetX - point.x) * 0.001;
                 const ay = (finalTargetY - point.y) * 0.001;
                 
                 point.vx += ax;
                 point.vy += ay;
                 
                 // Stronger damping to freeze them in shape
                 point.vx *= 0.80;
                 point.vy *= 0.80;
             }
         } else {
             // Reset velocity to base slow speed if outside interaction zone
             // This prevents points from flying off too fast after scattering
             // We gently dampen them back to base speed limits
             // Set max speed to match initial drift (0.1)
             const maxSpeed = 0.1; 
             // Very gentle damping (0.99) instead of strong damping (0.95)
             // to keep the "drifting" feel after scatter
             if (Math.abs(point.vx) > maxSpeed) point.vx *= 0.99;
             if (Math.abs(point.vy) > maxSpeed) point.vy *= 0.99;
         }
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
        ctx.fillStyle = point.color;
        // Reduce opacity to make them more transparent (from 0.25 to 0.15)
        ctx.globalAlpha = 0.15; 
        ctx.fill();
        
        // Draw lines to nearby points
        pointsRef.current.forEach(other => {
          const d2 = (point.x - other.x) ** 2 + (point.y - other.y) ** 2;
          const connectDist = 15000; // Distance threshold for connection
          
          if (d2 < connectDist) { 
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(other.x, other.y);
            
            // Mouse Interaction Logic mimicking kejin-li.github.io
            // 1. Base connection: faint lines between all close points
            // 2. Mouse influence: lines become stronger/brighter near mouse
            
            const mouseDist = Math.sqrt((mouseRef.current.x - point.x)**2 + (mouseRef.current.y - point.y)**2);
            // Influence radius
            const activeAlpha = mouseDist < 300 ? (300 - mouseDist) / 300 : 0;
            
            // Base alpha is small (0.02), active adds up to 0.3
            const alpha = 0.02 + activeAlpha * 0.3;
            
            ctx.strokeStyle = `rgba(100, 100, 255, ${alpha})`; 
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
        
        // Mouse Line Connection (The "Spotlight" effect) - MOVED OUTSIDE OF LOOP
        // If the point is close to the mouse, draw a line directly to the mouse cursor
        const mouseDist = Math.sqrt((mouseRef.current.x - point.x)**2 + (mouseRef.current.y - point.y)**2);
        if (mouseDist < 150) {
           ctx.beginPath();
           ctx.moveTo(point.x, point.y);
           ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
           ctx.strokeStyle = `rgba(100, 100, 255, ${(150 - mouseDist) / 150 * 0.5})`; // Scaled down alpha
           ctx.lineWidth = 0.5;
           ctx.stroke();
        }
      });

      // 2. Update and Draw Hearts
      for (let i = heartsRef.current.length - 1; i >= 0; i--) {
        const heart = heartsRef.current[i];
        heart.y -= 1.5; // Float up faster
        heart.opacity -= 0.02; // Fade out slightly faster
        heart.scale += 0.01; // Grow slightly
        
        if (heart.opacity <= 0) {
            heartsRef.current.splice(i, 1);
        } else {
            drawHeart(heart.x, heart.y, heart.size * heart.scale, heart.color, heart.opacity);
        }
      }
      
      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      initPoints();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      mouseMovingRef.current = true;
      
      if (mouseTimeoutRef.current) clearTimeout(mouseTimeoutRef.current);
      
      mouseTimeoutRef.current = setTimeout(() => {
        mouseMovingRef.current = false;
      }, 100); // Consider stopped if no movement for 100ms
    };
    
    const handleClick = (e: MouseEvent) => {
       // Explosion effect on click (Points)
       pointsRef.current.forEach(point => {
        // Calculate vector from mouse to point (Direction to push AWAY)
        const dx = point.x - e.clientX;
        const dy = point.y - e.clientY;
        const dist = Math.sqrt(dx*dx + dy*dy);
        
        if(dist < 300) {
            // Strong push away (Repulsion)
            const force = (300 - dist) / 300;
            // Add velocity in the direction of the vector
            // Increased multiplier for visible explosion
            point.vx += dx * force * 0.15; 
            point.vy += dy * force * 0.15;
        }
       });

       // Heart Effect
       const heartColor = heartColors[Math.floor(Math.random() * heartColors.length)];
       heartsRef.current.push({
           x: e.clientX,
           y: e.clientY,
           size: 10, // Even smaller starting size (was 15)
           opacity: 1,
           color: heartColor,
           scale: 1
       });
    };

    const handleMouseLeave = () => {
        mouseRef.current = { x: -1000, y: -1000 };
        mouseMovingRef.current = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    document.addEventListener('mouseleave', handleMouseLeave); // Detect leaving window
    
    initPoints();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
};

export default InteractiveCanvas;
