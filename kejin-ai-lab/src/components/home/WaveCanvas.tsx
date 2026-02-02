import React, { useEffect, useRef } from 'react';

export const WaveCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -100, y: 0 }); // Start off-screen
  const duckRef = useRef({ x: -100, y: 0, rotation: 0, direction: 1 });
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        // Set actual canvas size to match display size for sharp rendering
        const dpr = window.devicePixelRatio || 1;
        canvas.width = parent.clientWidth * dpr;
        canvas.height = parent.clientHeight * dpr;
        ctx.scale(dpr, dpr);
        canvas.style.width = `${parent.clientWidth}px`;
        canvas.style.height = `${parent.clientHeight}px`;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    // Initial resize
    handleResize();

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      if (!ctx || !canvas) return;
      
      // Use CSS width/height for logic calculations to match mouse coordinates
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      timeRef.current += 0.05;
      
      // Wave Parameters
      const baseHeight = height * 0.75; // Lower the water level to give more headroom for the duck
      const waveAmplitude1 = 20; // Slightly larger waves for the larger canvas
      const waveAmplitude2 = 10;
      const waveFrequency1 = 0.008;
      const waveFrequency2 = 0.015;
      const interactionRadius = 250; // Wider, smoother interaction
      const interactionStrength = 50; // Height of the mouse bulge

      // Helper to calculate wave height at any X
      const getWaveY = (x: number) => {
        // Natural sine waves
        const wave1 = Math.sin(x * waveFrequency1 + timeRef.current) * waveAmplitude1;
        const wave2 = Math.sin(x * waveFrequency2 - timeRef.current * 0.5) * waveAmplitude2;
        
        // Mouse Interaction (Gaussian Bell Curve for smoothness)
        let mouseEffect = 0;
        const dist = x - mouseRef.current.x; // Signed distance
        
        // Gaussian function: a * exp(-(x-b)^2 / (2c^2))
        // This ensures infinite smoothness (no sharp points)
        if (Math.abs(dist) < interactionRadius * 2) { // Optimization: cut off far away
           mouseEffect = -interactionStrength * Math.exp(-(dist * dist) / (2 * (interactionRadius/2) * (interactionRadius/2)));
        }

        return baseHeight + wave1 + wave2 + mouseEffect;
      };
      
      // Style
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#FFAFCC'; // macaron-pinkHover
      ctx.fillStyle = 'rgba(255, 175, 204, 0.4)'; // macaron-pinkHover with higher opacity for visibility
      
      // 1. Draw Wave
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(0, getWaveY(0));

      const segmentWidth = 2; // High resolution
      for (let x = 0; x <= width; x += segmentWidth) {
        ctx.lineTo(x, getWaveY(x));
      }
      
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();
      
      // 2. Update Duck Position
      // Lerp X for smooth "chasing" effect
      // If mouse is off-screen (initial), duck stays off-screen or goes to center
      let targetX = mouseRef.current.x;
      
      // Initial state handling
      if (mouseRef.current.x === -100) {
          targetX = width / 2;
      }
      
      // Determine direction based on movement target
      // Add a small threshold to prevent jitter when stopped
      if (Math.abs(targetX - duckRef.current.x) > 2) {
        duckRef.current.direction = targetX > duckRef.current.x ? 1 : -1;
      }

      // Smooth lerp: current + (target - current) * factor
      duckRef.current.x += (targetX - duckRef.current.x) * 0.08;
      
      // Get Y on the wave
      const duckY = getWaveY(duckRef.current.x);
      
      // Calculate Slope for Rotation
      const delta = 5; // Sampling distance for derivative
      const yLeft = getWaveY(duckRef.current.x - delta);
      const yRight = getWaveY(duckRef.current.x + delta);
      const slope = (yRight - yLeft) / (delta * 2);
      const targetRotation = Math.atan(slope);
      
      // Lerp rotation as well for extra smoothness
      duckRef.current.rotation += (targetRotation - duckRef.current.rotation) * 0.1;

      // 3. Draw Custom Cute Duck
      ctx.save();
      ctx.translate(duckRef.current.x, duckY - 12); // Move up to float ON water
      ctx.rotate(duckRef.current.rotation);
      ctx.scale(duckRef.current.direction, 1); // Flip based on direction
      
      // Body (Rubber Yellow)
      ctx.fillStyle = "#FFD166"; 
      ctx.beginPath();
      ctx.ellipse(0, 4, 18, 13, 0, 0, Math.PI * 2);
      ctx.fill();

      // Wing (Darker Yellow)
      ctx.fillStyle = "#FFC040"; 
      ctx.beginPath();
      ctx.ellipse(-2, 4, 9, 5, 0.2, 0, Math.PI * 2);
      ctx.fill();

      // Head (Yellow)
      ctx.fillStyle = "#FFD166";
      ctx.beginPath();
      ctx.arc(10, -8, 10, 0, Math.PI * 2);
      ctx.fill();

      // Eye (Black + Shine)
      ctx.fillStyle = "#2D3436";
      ctx.beginPath();
      ctx.arc(12, -10, 1.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.arc(12.5, -10.5, 0.5, 0, Math.PI * 2);
      ctx.fill();
      
      // Beak (Orange)
      ctx.fillStyle = "#FF8A5B"; 
      ctx.beginPath();
      ctx.ellipse(19, -6, 3.5, 2, 0.2, 0, Math.PI * 2);
      ctx.fill();

      // Cheek (Pink Blush) - KAWAII factor
      ctx.fillStyle = "rgba(255, 175, 204, 0.6)"; 
      ctx.beginPath();
      ctx.arc(8, -5, 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full pointer-events-none"
      style={{ touchAction: 'none' }}
    />
  );
};
