// Particle Background Animation
const canvas = document.getElementById('particle-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouse = { x: null, y: null, radius: 150 };

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  class Particle {
    constructor(x, y, size, speedX, speedY) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.speedX = speedX;
      this.speedY = speedY;
      this.baseX = x;
      this.baseY = y;
      this.density = Math.random() * 30 + 1;
    }

    draw() {
      ctx.fillStyle = 'rgba(71, 160, 184, 0.8)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }

    update() {
      // Mouse interaction
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < mouse.radius) {
        let forceX = dx / distance;
        let forceY = dy / distance;
        let force = (mouse.radius - distance) / mouse.radius;
        this.x -= forceX * force * this.density * 0.5;
        this.y -= forceY * force * this.density * 0.5;
      }

      // Float animation
      this.x += this.speedX;
      this.y += this.speedY;

      // Boundary check
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

      this.draw();
    }
  }

  function init() {
    particles = [];
    const numParticles = Math.floor((canvas.width * canvas.height) / 15000);
    
    for (let i = 0; i < numParticles; i++) {
      let size = Math.random() * 3 + 1;
      let x = Math.random() * canvas.width;
      let y = Math.random() * canvas.height;
      let speedX = (Math.random() - 0.5) * 0.5;
      let speedY = (Math.random() - 0.5) * 0.5;
      particles.push(new Particle(x, y, size, speedX, speedY));
    }
  }

  function connect() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a; b < particles.length; b++) {
        let dx = particles[a].x - particles[b].x;
        let dy = particles[a].y - particles[b].y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          ctx.strokeStyle = `rgba(71, 160, 184, ${0.3 - distance / 400})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let particle of particles) {
      particle.update();
    }
    connect();
    requestAnimationFrame(animate);
  }

  init();
  animate();
}
