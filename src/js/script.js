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
   NAVBAR ANIMATION
================================ */
gsap.from(".navbar", {
  y: -80,
  opacity: 0,
  duration: 1,
  ease: "power3.out"
});

/* ===============================
   HOME PAGE HERO
================================ */
if (document.querySelector(".hero-section")) {
  gsap.from(".home-text-main", {
    y: 120,
    opacity: 0,
    duration: 1.2,
    delay: 0.3,
    ease: "power4.out"
  });

  gsap.from(".home-text-sub", {
    y: 80,
    opacity: 0,
    duration: 1,
    delay: 0.6,
    ease: "power4.out"
  });

  gsap.from(".socials a", {
    y: 40,
    opacity: 0,
    duration: 0.8,
    delay: 0.9,
    stagger: 0.1,
    ease: "power3.out"
  });

  gsap.from(".home-logo-img", {
    scale: 0.85,
    opacity: 0,
    duration: 1,
    delay: 1,
    ease: "power4.out"
  });
}

/* ===============================
   SCROLL REVEAL
================================ */
gsap.utils.toArray(".reveal").forEach(el => {
  gsap.from(el, {
    scrollTrigger: {
      trigger: el,
      start: "top 85%"
    },
    y: 60,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
  });
});

/* ===============================
   TEAM CARDS
================================ */
const teamContainer = document.getElementById("team-container");

if (teamContainer) {
  fetch("../js/team.json")
    .then(res => res.json())
    .then(members => {
      teamContainer.innerHTML = members.map(member => `
        <div class="team-card reveal">
          <img src="../${member.image}" alt="${member.name}">
          <h2>${member.name}</h2>
          <p>${member.role}</p>
          <div class="social-links">
            ${member.links.github ? `<a href="${member.links.github}" target="_blank"><i class="fab fa-github"></i></a>` : ""}
            ${member.links.linkedin ? `<a href="${member.links.linkedin}" target="_blank"><i class="fab fa-linkedin"></i></a>` : ""}
            ${member.links.website ? `<a href="${member.links.website}" target="_blank"><i class="fas fa-globe"></i></a>` : ""}
          </div>
        </div>
      `).join("");
    });
}
