(function() {
  let animationFrameId;
  let resizeHandler;
  let mouseMoveHandler;
  let observer;

  const initCustomWave = () => {
    stopCustomWave();

    const hero = document.getElementById('page-header');
    if (!hero) return;
    
    const isHome = document.getElementById('site-title') || hero.classList.contains('full_page');
    if (!isHome) return;

    const canvas = document.createElement('canvas');
    canvas.id = 'wave-canvas';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%'; 
    canvas.style.zIndex = '5';
    canvas.style.pointerEvents = 'none';
    hero.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let width, height;
    let time = 0;
    let isVisible = true;

    // Config
    const step = 10; 
    let pointsTop = [];
    let pointsBottom = [];

    // Wave Settings
    const colorTop = '#FFD6F4';
    const colorBottom = '#FFFFFF'; 
    const waveSpeed = 0.02;
    const waveFrequency = 0.006;
    const baseAmplitude = 20;
    
    // Physics
    const spring = 0.05; 
    const friction = 0.90; 
    const mouseInfluenceRadius = 5000; 
    const mouseForce = 0.3; 

    function resize() {
      width = canvas.width = hero.offsetWidth;
      height = canvas.height = hero.offsetHeight;
      
      pointsTop = [];
      pointsBottom = [];
      
      for (let x = 0; x <= width; x += step) {
        pointsTop.push({ x: x, y: 0, vy: 0 });
        pointsBottom.push({ x: x, y: 0, vy: 0 });
      }
    }

    function updatePoints(points) {
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const force = -spring * p.y;
        p.vy += force;
        p.vy *= friction;
        p.y += p.vy;
      }
    }

    function drawWave(points, baseline, color, fillTop, phaseOffset, freqMultiplier) {
      ctx.fillStyle = color;
      ctx.beginPath();
      
      if (fillTop) {
        ctx.moveTo(0, 0);
      } else {
        ctx.moveTo(0, height);
      }

      // Trace wave
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        // Apply phase offset and frequency multiplier
        const sineY = Math.sin(p.x * waveFrequency * freqMultiplier + time + phaseOffset) * baseAmplitude;
        const finalY = baseline + sineY + p.y;
        if (i === 0) {
            ctx.lineTo(p.x, finalY);
        } else {
            ctx.lineTo(p.x, finalY);
        }
      }

      if (fillTop) {
        ctx.lineTo(width, 0);
        ctx.lineTo(0, 0);
      } else {
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
      }
      
      ctx.closePath();
      ctx.fill();
    }

    function animate() {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      updatePoints(pointsTop);
      updatePoints(pointsBottom);

      // Top Wave: No phase shift, normal freq
      drawWave(pointsTop, 200, colorTop, true, 0, 1.0);

      // Bottom Wave: Phase shift PI (inverse), slightly different freq (1.2)
      // This creates a nice "out of sync" flowing effect
      drawWave(pointsBottom, height - 30, colorBottom, false, Math.PI, 1.2);

      time += waveSpeed;
      animationFrameId = requestAnimationFrame(animate);
    }

    // Handlers
    resizeHandler = resize;
    
    let lastMoveTime = 0;
    mouseMoveHandler = (e) => {
      const now = Date.now();
      if (now - lastMoveTime < 16) return; 
      lastMoveTime = now;

      if (!isVisible) return;
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      
      const dy = e.movementY || 0;
      if (Math.abs(dy) < 1) return; 

      // Apply force to Top (Down with mouse)
      for (let i = 0; i < pointsTop.length; i++) {
        const p = pointsTop[i];
        const dist = Math.abs(p.x - mouseX);
        if (dist < mouseInfluenceRadius) {
          const influence = 0.5 * (1 + Math.cos(Math.PI * dist / mouseInfluenceRadius));
          p.vy += dy * influence * mouseForce;
        }
      }
      
      // Apply force to Bottom (Up against mouse)
      for (let i = 0; i < pointsBottom.length; i++) {
        const p = pointsBottom[i];
        const dist = Math.abs(p.x - mouseX);
        if (dist < mouseInfluenceRadius) {
          const influence = 0.5 * (1 + Math.cos(Math.PI * dist / mouseInfluenceRadius));
          p.vy -= dy * influence * mouseForce; 
        }
      }
    };

    window.addEventListener('resize', resizeHandler);
    document.addEventListener('mousemove', mouseMoveHandler);

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          isVisible = entry.isIntersecting;
        });
      });
      observer.observe(hero);
    }

    resize();
    animate();
  };

  const stopCustomWave = () => {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    if (resizeHandler) window.removeEventListener('resize', resizeHandler);
    if (mouseMoveHandler) document.removeEventListener('mousemove', mouseMoveHandler);
    if (observer) observer.disconnect();
    
    const canvas = document.getElementById('wave-canvas');
    if (canvas) canvas.remove();
  };

  document.addEventListener('DOMContentLoaded', initCustomWave);
  document.addEventListener('pjax:complete', initCustomWave);
  document.addEventListener('pjax:send', stopCustomWave);
})();
