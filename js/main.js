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

  // --- Back to top button ---
  (function () {
    const SCROLL_THRESHOLD = 200; // px

    const backToTop = document.createElement("button");
    backToTop.className = "back-to-top";
    backToTop.type = "button";
    backToTop.setAttribute("aria-label", "Back to top");
    backToTop.textContent = "back to top";
    document.body.appendChild(backToTop);

    const toggleBackToTop = () => {
      if (window.scrollY > SCROLL_THRESHOLD) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }
    };

    window.addEventListener("scroll", toggleBackToTop, { passive: true });
    // initial check
    toggleBackToTop();

    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  })();
});
