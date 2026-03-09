/* ==========================================================================
   Portfolio — JavaScript
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // --- Mobile nav toggle ---
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
      });
    });
  }
  // --- Fade-in on scroll (runs once per element) ---
  const fadeTargets = document.querySelectorAll(".fade-in");

  if (fadeTargets.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target); // animate only once
          }
        });
      },
      { threshold: 0.15 }
    );

    fadeTargets.forEach((el) => observer.observe(el));
  } else {
    // Fallback: show everything immediately
    fadeTargets.forEach((el) => el.classList.add("visible"));
  }
});
