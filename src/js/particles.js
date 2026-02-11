// Optimized Particle Background Animation
const canvas = document.getElementById('particle-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d', { 
    alpha: true,
    desynchronized: true, // Better performance
    willReadFrequently: false
  });
  
  let particles = [];
  let animationId = null;
  let mouse = { x: null, y: null, radius: 150 };
  let isResizing = false;

  // Optimized canvas sizing
  const setCanvasSize = () => {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.scale(dpr, dpr);
  };
  
  setCanvasSize();

  // Debounced resize handler
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    isResizing = true;
    resizeTimeout = setTimeout(() => {
      setCanvasSize();
      init();
      isResizing = false;
    }, 250);
  });

  // Throttled mouse move
  let mouseTimeout;
  window.addEventListener('mousemove', (e) => {
    if (!mouseTimeout) {
      mouseTimeout = setTimeout(() => {
        mouse.x = e.x;
        mouse.y = e.y;
        mouseTimeout = null;
      }, 16); // ~60fps
    }
  });

  // Clear mouse position when leaving window
  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor(x, y, size, speedX, speedY) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.speedX = speedX;
      this.speedY = speedY;
      this.density = Math.random() * 20 + 5; // Reduced density
    }

    draw() {
      ctx.fillStyle = 'rgba(71, 160, 184, 0.6)'; // Slightly transparent
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }

    update() {
      // Only apply mouse interaction if mouse is in window
      if (mouse.x !== null && mouse.y !== null) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = dx * dx + dy * dy; // Skip sqrt for performance

        if (distance < mouse.radius * mouse.radius) {
          distance = Math.sqrt(distance);
          let forceX = dx / distance;
          let forceY = dy / distance;
          let force = (mouse.radius - distance) / mouse.radius;
          this.x -= forceX * force * this.density * 0.3; // Reduced force
          this.y -= forceY * force * this.density * 0.3;
        }
      }

      // Float animation
      this.x += this.speedX;
      this.y += this.speedY;

      // Boundary check with bounce
      const maxWidth = window.innerWidth;
      const maxHeight = window.innerHeight;
      
      if (this.x < 0 || this.x > maxWidth) this.speedX *= -1;
      if (this.y < 0 || this.y > maxHeight) this.speedY *= -1;

      this.draw();
    }
  }

  function init() {
    particles = [];
    // Reduced particle count significantly
    const area = window.innerWidth * window.innerHeight;
    const numParticles = Math.min(Math.floor(area / 20000), 80); // Max 80 particles
    
    for (let i = 0; i < numParticles; i++) {
      let size = Math.random() * 2 + 1; // Smaller particles
      let x = Math.random() * window.innerWidth;
      let y = Math.random() * window.innerHeight;
      let speedX = (Math.random() - 0.5) * 0.3; // Slower movement
      let speedY = (Math.random() - 0.5) * 0.3;
      particles.push(new Particle(x, y, size, speedX, speedY));
    }
  }

  function connect() {
    const maxDistance = 100; // Reduced connection distance
    const maxDistanceSq = maxDistance * maxDistance;
    
    // Only check nearby particles (optimization)
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        let dx = particles[a].x - particles[b].x;
        let dy = particles[a].y - particles[b].y;
        let distanceSq = dx * dx + dy * dy;

        if (distanceSq < maxDistanceSq) {
          let distance = Math.sqrt(distanceSq);
          ctx.strokeStyle = `rgba(71, 160, 184, ${0.2 - distance / 500})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  let lastTime = 0;
  const fps = 60;
  const frameDelay = 1000 / fps;

  function animate(currentTime) {
    if (!isResizing) {
      // Throttle to 60fps max
      if (currentTime - lastTime >= frameDelay) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        
        for (let particle of particles) {
          particle.update();
        }
        connect();
        
        lastTime = currentTime;
      }
    }
    
    animationId = requestAnimationFrame(animate);
  }

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  });

  init();
  animate(0);
}

console.log('✨ Optimized particles loaded');
