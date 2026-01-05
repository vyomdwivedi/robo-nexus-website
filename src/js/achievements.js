// Achievements Data
const achievements = [
  {
    year: "2025",
    title: "Inter-School Robotics Championship",
    description: "First place in the autonomous robot category",
    icon: "fa-trophy",
    type: "gold"
  },
  {
    year: "2025",
    title: "Tech Innovation Award",
    description: "Recognized for innovative IoT solutions",
    icon: "fa-lightbulb",
    type: "special"
  },
  {
    year: "2024",
    title: "National Robotics Olympiad",
    description: "Qualified for nationals with top 10 ranking",
    icon: "fa-medal",
    type: "silver"
  },
  {
    year: "2024",
    title: "Club Establishment",
    description: "Robo Nexus officially founded at Amity International School",
    icon: "fa-flag",
    type: "milestone"
  },
  {
    year: "2024",
    title: "First Project Completion",
    description: "Successfully built our first autonomous line follower",
    icon: "fa-robot",
    type: "milestone"
  },
  {
    year: "2024",
    title: "Hackathon Winners",
    description: "Won the school-level hackathon with smart home project",
    icon: "fa-code",
    type: "gold"
  }
];

const certifications = [
  {
    title: "Arduino Certified",
    issuer: "Arduino Foundation",
    icon: "fa-microchip"
  },
  {
    title: "Python Programming",
    issuer: "Coursera",
    icon: "fa-python"
  },
  {
    title: "IoT Fundamentals",
    issuer: "Cisco",
    icon: "fa-wifi"
  },
  {
    title: "Machine Learning Basics",
    issuer: "Google",
    icon: "fa-brain"
  }
];

// Render Timeline
const timeline = document.getElementById('timeline');
if (timeline) {
  timeline.innerHTML = achievements.map((item, index) => `
    <div class="timeline-item ${index % 2 === 0 ? 'left' : 'right'} reveal">
      <div class="timeline-content ${item.type}">
        <div class="timeline-icon">
          <i class="fas ${item.icon}"></i>
        </div>
        <span class="timeline-year">${item.year}</span>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </div>
    </div>
  `).join('');
}

// Render Certifications
const certGrid = document.getElementById('cert-grid');
if (certGrid) {
  certGrid.innerHTML = certifications.map((cert, index) => `
    <div class="cert-card reveal" style="animation-delay: ${index * 0.15}s">
      <div class="cert-icon">
        <i class="fas ${cert.icon}"></i>
      </div>
      <h3>${cert.title}</h3>
      <p>${cert.issuer}</p>
    </div>
  `).join('');
}

// Stats Counter Animation
const statNumbers = document.querySelectorAll('.stat-number');

const animateCounter = (el) => {
  const target = parseInt(el.dataset.target);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const updateCounter = () => {
    current += step;
    if (current < target) {
      el.textContent = Math.floor(current);
      requestAnimationFrame(updateCounter);
    } else {
      el.textContent = target + '+';
    }
  };

  updateCounter();
};

// Intersection Observer for stats
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      statNumbers.forEach(num => animateCounter(num));
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
  statsObserver.observe(statsSection);
}

// Timeline Animation
gsap.utils.toArray('.timeline-item').forEach((item, i) => {
  gsap.from(item, {
    scrollTrigger: {
      trigger: item,
      start: 'top 80%'
    },
    x: i % 2 === 0 ? -100 : 100,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  });
});
