(() => {
  "use strict";

  /* ---------- language switching ---------- */
  const LANG_KEY = "bma-portfolio-lang";
  const html = document.documentElement;
  const langButtons = document.querySelectorAll("[data-set-lang]");

  const typewriterPhrases = {
    en: [
      "Cryptography & PKI Engineer",
      "HSM Specialist",
      "Full-Stack Developer",
    ],
    id: [
      "Cryptography & PKI Engineer",
      "Spesialis HSM",
      "Full-Stack Developer",
    ],
  };

  function applyLang(lang) {
    html.setAttribute("data-lang", lang);
    html.setAttribute("lang", lang);
    langButtons.forEach((btn) => {
      const isActive = btn.dataset.setLang === lang;
      btn.setAttribute("aria-pressed", String(isActive));
    });
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
    restartTypewriter(lang);
  }

  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => applyLang(btn.dataset.setLang));
  });

  let initialLang = "en";
  try {
    const stored = localStorage.getItem(LANG_KEY);
    if (stored === "en" || stored === "id") {
      initialLang = stored;
    } else if (navigator.language && navigator.language.toLowerCase().startsWith("id")) {
      initialLang = "id";
    }
  } catch (e) {}

  /* ---------- typewriter ---------- */
  const twEl = document.getElementById("typewriter");
  let twTimer = null;

  function restartTypewriter(lang) {
    if (!twEl) return;
    if (twTimer) clearTimeout(twTimer);
    const phrases = typewriterPhrases[lang] || typewriterPhrases.en;
    let phraseIdx = 0;
    let charIdx = 0;
    let deleting = false;

    const TYPE_SPEED = 55;
    const DELETE_SPEED = 30;
    const HOLD = 1600;
    const GAP = 400;

    function tick() {
      const current = phrases[phraseIdx];
      if (!deleting) {
        charIdx++;
        twEl.textContent = current.slice(0, charIdx);
        if (charIdx === current.length) {
          deleting = true;
          twTimer = setTimeout(tick, HOLD);
          return;
        }
        twTimer = setTimeout(tick, TYPE_SPEED);
      } else {
        charIdx--;
        twEl.textContent = current.slice(0, charIdx);
        if (charIdx === 0) {
          deleting = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
          twTimer = setTimeout(tick, GAP);
          return;
        }
        twTimer = setTimeout(tick, DELETE_SPEED);
      }
    }
    tick();
  }

  applyLang(initialLang);

  /* ---------- nav scroll state + mobile toggle ---------- */
  const nav = document.getElementById("nav");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  window.addEventListener(
    "scroll",
    () => {
      nav.classList.toggle("scrolled", window.scrollY > 8);
      toTopBtn.classList.toggle("visible", window.scrollY > 500);
    },
    { passive: true }
  );

  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("menu-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      nav.classList.remove("menu-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- timeline detail toggle ---------- */
  document.querySelectorAll(".detail-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      const wrap = document.getElementById(btn.getAttribute("aria-controls"));
      btn.setAttribute("aria-expanded", String(!expanded));
      if (wrap) wrap.classList.toggle("open", !expanded);
    });
  });

  /* ---------- scroll reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in-view"));
  }

  /* ---------- back to top ---------- */
  const toTopBtn = document.getElementById("toTop");
  toTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
