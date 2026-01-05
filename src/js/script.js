gsap.registerPlugin(ScrollTrigger);

/* ===============================
   PAGE TRANSITION
================================ */
const pageTransition = document.querySelector(".page-transition");

if (pageTransition) {
  gsap.set(pageTransition, { opacity: 1 });

  gsap.to(pageTransition, {
    opacity: 0,
    duration: 0.6,
    ease: "power2.out"
  });

  document.querySelectorAll("a[href]").forEach(link => {
    const href = link.getAttribute("href");

    if (
      href.startsWith("http") ||
      href.startsWith("#") ||
      href.startsWith("mailto")
    ) return;

    link.addEventListener("click", e => {
      e.preventDefault();

      gsap.to(pageTransition, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          window.location.href = href;
        }
      });
    });
  });
}

/* ===============================
   HAMBURGER MENU
================================ */
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links-ul');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close menu when clicking a link
  document.querySelectorAll('.nav-links').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

/* ===============================
   NAVBAR ANIMATION
================================ */
gsap.set(".navbar, .nav-links, .nav-logo img", { opacity: 1 });

gsap.from(".navbar", {
  y: -50,
  opacity: 0,
  duration: 0.8,
  ease: "power3.out"
});

// Navbar links stagger animation
gsap.from(".nav-links", {
  y: -20,
  opacity: 0,
  duration: 0.5,
  stagger: 0.05,
  delay: 0.3,
  ease: "power3.out"
});

// Logo animation
gsap.from(".nav-logo img", {
  scale: 0.5,
  opacity: 0,
  duration: 0.6,
  delay: 0.2,
  ease: "power3.out"
});

/* ===============================
   HOME PAGE HERO
================================ */
if (document.querySelector(".hero-section")) {
  // Make sure elements are visible first
  gsap.set(".home-text-main, .home-text-sub, .socials a, .home-logo-img", { opacity: 1 });
  
  // Main text animation
  gsap.from(".home-text-main", {
    y: 100,
    opacity: 0,
    duration: 1,
    delay: 0.3,
    ease: "power4.out"
  });

  // Sub text animation
  gsap.from(".home-text-sub", {
    y: 80,
    opacity: 0,
    duration: 1,
    delay: 0.5,
    ease: "power4.out"
  });

  // Social icons stagger
  gsap.from(".socials a", {
    y: 30,
    opacity: 0,
    duration: 0.5,
    delay: 0.7,
    stagger: 0.1,
    ease: "power3.out"
  });

  // Logo animation
  gsap.from(".home-logo-img", {
    scale: 0.8,
    opacity: 0,
    duration: 1,
    delay: 0.5,
    ease: "power3.out"
  });
}

/* ===============================
   PAGE HERO ANIMATIONS
================================ */
if (document.querySelector(".page-hero")) {
  gsap.set(".glitch-text, .hero-subtitle", { opacity: 1 });
  
  gsap.from(".glitch-text", {
    scale: 0.8,
    opacity: 0,
    duration: 0.8,
    delay: 0.2,
    ease: "power3.out"
  });

  gsap.from(".hero-subtitle", {
    y: 20,
    opacity: 0,
    duration: 0.6,
    delay: 0.4,
    ease: "power3.out"
  });
}

/* ===============================
   SCROLL REVEAL
================================ */
const revealElements = document.querySelectorAll('.reveal');

revealElements.forEach(el => {
  gsap.set(el, { opacity: 0, y: 40 });
  
  gsap.to(el, {
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      toggleActions: "play none none none"
    },
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power3.out"
  });
});

/* ===============================
   ABOUT SECTION
================================ */
if (document.querySelector(".about-section")) {
  gsap.set(".about-details", { opacity: 1, x: 0 });
  gsap.set(".about-logo", { opacity: 1, x: 0 });
  
  gsap.from(".about-details", {
    scrollTrigger: {
      trigger: ".about-section",
      start: "top 80%"
    },
    x: -80,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  });

  gsap.from(".about-logo", {
    scrollTrigger: {
      trigger: ".about-section",
      start: "top 80%"
    },
    x: 80,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  });
}

/* ===============================
   TEAM CARDS
================================ */
const teamContainer = document.getElementById("team-container");

if (teamContainer) {
  fetch("../js/team.json")
    .then(res => {
      if (!res.ok) throw new Error('Failed to load team data');
      return res.json();
    })
    .then(members => {
      teamContainer.innerHTML = members.map((member, index) => `
        <div class="team-card ${member.leavingSoon ? 'leaving-soon' : ''}">
          ${member.leavingSoon ? '<span class="leaving-badge"><i class="fas fa-crown"></i> Leaving Us Soon</span>' : ''}
          <img src="../${member.image}" alt="${member.name}" onerror="this.src='../assets/images/Robo_Nexus_Logo.png'">
          <h2>${member.name}</h2>
          <p>${member.role}</p>
          <div class="social-links">
            ${member.links.github ? `<a href="${member.links.github}" target="_blank"><i class="fab fa-github"></i></a>` : ""}
            ${member.links.linkedin ? `<a href="${member.links.linkedin}" target="_blank"><i class="fab fa-linkedin"></i></a>` : ""}
            ${member.links.website ? `<a href="${member.links.website}" target="_blank"><i class="fas fa-globe"></i></a>` : ""}
            ${member.links.discord ? `<a href="${member.links.discord}" target="_blank"><i class="fab fa-discord"></i></a>` : ""}
          </div>
        </div>
      `).join("");
    })
    .catch(err => {
      console.error('Team loading error:', err);
      teamContainer.innerHTML = '<p style="text-align:center; color: #47a0b8;">Team data loading...</p>';
    });
}

/* ===============================
   STATS COUNTER
================================ */
const statCards = document.querySelectorAll('.stat-card');

if (statCards.length > 0) {
  gsap.set(".stat-card", { opacity: 1 });
  
  gsap.from(".stat-card", {
    scrollTrigger: {
      trigger: ".stats-section",
      start: "top 85%"
    },
    y: 40,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: "power3.out"
  });
}

/* ===============================
   MAGNETIC BUTTONS
================================ */
document.querySelectorAll('.register-btn, .view-project-btn, .contact-send-button').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(btn, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: "power2.out"
    });
  });

  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)"
    });
  });
});

/* ===============================
   PARALLAX EFFECT
================================ */
document.addEventListener('mousemove', (e) => {
  const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
  const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

  gsap.to('.home-logo-img', {
    x: moveX * 2,
    y: moveY * 2,
    duration: 0.5,
    ease: "power2.out"
  });
});

/* ===============================
   SMOOTH SCROLL
================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      gsap.to(window, {
        scrollTo: target,
        duration: 1,
        ease: "power3.inOut"
      });
    }
  });
});

/* ===============================
   CURSOR GLOW EFFECT
================================ */
const cursorGlow = document.createElement('div');
cursorGlow.className = 'cursor-glow';
cursorGlow.style.cssText = `
  position: fixed;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(71, 160, 184, 0.15) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  transform: translate(-50%, -50%);
  transition: opacity 0.3s ease;
`;
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top = e.clientY + 'px';
});

/* ===============================
   ALUMNI SECTION
================================ */
const alumniContainer = document.getElementById("alumni-container");

if (alumniContainer) {
  fetch("../js/alumni.json")
    .then(res => {
      if (!res.ok) throw new Error('Failed to load alumni data');
      return res.json();
    })
    .then(alumni => {
      if (alumni.length === 0) {
        alumniContainer.innerHTML = '<p class="no-alumni">No alumni yet - our journey continues!</p>';
        return;
      }
      
      alumniContainer.innerHTML = alumni.map((member, index) => `
        <div class="alumni-card ${member.upcoming ? 'upcoming-alumni' : ''}">
          <div class="alumni-badge">
            <i class="fas fa-medal"></i>
          </div>
          ${member.upcoming ? '<span class="upcoming-badge"><i class="fas fa-hourglass-half"></i> Coming Soon</span>' : ''}
          <img src="../${member.image}" alt="${member.name}" onerror="this.src='../assets/images/Robo_Nexus_Logo.png'">
          <div class="alumni-info">
            <h2>${member.name}</h2>
            <p class="alumni-role">${member.role}</p>
            <p class="alumni-batch"><i class="fas fa-graduation-cap"></i> Batch ${member.batch}</p>
            ${member.contribution ? `<p class="alumni-contribution">"${member.contribution}"</p>` : ''}
            <div class="social-links">
              ${member.links.github ? `<a href="${member.links.github}" target="_blank"><i class="fab fa-github"></i></a>` : ""}
              ${member.links.linkedin ? `<a href="${member.links.linkedin}" target="_blank"><i class="fab fa-linkedin"></i></a>` : ""}
              ${member.links.website ? `<a href="${member.links.website}" target="_blank"><i class="fas fa-globe"></i></a>` : ""}
            </div>
          </div>
        </div>
      `).join("");
    })
    .catch(err => {
      console.error('Alumni loading error:', err);
      alumniContainer.innerHTML = '<p style="text-align:center; color: #47a0b8;">Alumni data loading...</p>';
    });
}

console.log('🤖 Robo Nexus - Website Loaded Successfully!');
