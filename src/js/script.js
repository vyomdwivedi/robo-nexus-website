/* ===============================
   GLOBAL GSAP SETUP
================================ */

gsap.registerPlugin(ScrollTrigger);

// Prevent horizontal scroll caused by animations
document.documentElement.style.overflowX = "hidden";

/* ===============================
   NAVBAR ANIMATION
================================ */

gsap.from(".navbar", {
  y: -80,
  opacity: 0,
  duration: 1,
  ease: "power4.out"
});

/* ===============================
   HOME PAGE ANIMATION
================================ */

if (document.querySelector(".hero-section")) {

  gsap.from(".home-text-main", {
    y: 120,
    opacity: 0,
    duration: 1.2,
    ease: "power4.out"
  });

  gsap.from(".home-text-sub", {
    y: 100,
    opacity: 0,
    duration: 1,
    delay: 0.25,
    ease: "power4.out"
  });

  gsap.from(".home-logo-img", {
    scale: 0,
    rotate: 180,
    duration: 1.2,
    delay: 0.5,
    ease: "back.out(1.7)"
  });

  gsap.from(".socials div", {
    y: 30,
    opacity: 0,
    stagger: 0.15,
    delay: 0.8,
    ease: "power2.out"
  });
}

/* ===============================
   SCROLL REVEAL (ABOUT / CONTACT)
================================ */

gsap.utils.toArray([
  ".about-details",
  ".about-logo",
  ".contact-form-div",
  ".contact-info"
]).forEach(el => {
  if (!el) return;

  gsap.from(el, {
    scrollTrigger: {
      trigger: el,
      start: "top 80%",
    },
    y: 80,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  });
});

/* ===============================
   TEAM PAGE ANIMATION
================================ */

gsap.utils.toArray(".card").forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 85%",
    },
    y: 60,
    opacity: 0,
    duration: 0.8,
    delay: i * 0.08,
    ease: "power3.out"
  });
});
