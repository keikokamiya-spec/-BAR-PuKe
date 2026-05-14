'use strict';

/* ============================================================
   Loading
   ============================================================ */
const loading = document.getElementById('loading');

window.addEventListener('load', () => {
  document.body.classList.add('is-loading');
  setTimeout(() => {
    loading.classList.add('is-hidden');
    document.body.classList.remove('is-loading');
    startFloatingParticles();
  }, 2000);
});

/* ============================================================
   Hero panel slideshows — staggered per panel
   ============================================================ */
document.querySelectorAll('.hero-mv__panel').forEach((panel, panelIndex) => {
  const slides = panel.querySelectorAll('.hero-mv__slide');
  if (!slides.length) return;

  let current = 0;
  slides[0].classList.add('is-active');

  const interval = 4000;
  const offset   = panelIndex * 1000;

  setTimeout(() => {
    setInterval(() => {
      slides[current].classList.remove('is-active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('is-active');
    }, interval);
  }, offset);
});

/* ============================================================
   Header scroll effect
   ============================================================ */
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  header.classList.toggle('is-scrolled', window.scrollY > 60);
}, { passive: true });

/* ============================================================
   Hamburger / Drawer
   ============================================================ */
const hamburger = document.getElementById('js-hamburger');
const drawer    = document.getElementById('js-drawer');

// Create overlay element
const overlay = document.createElement('div');
overlay.classList.add('drawer-overlay');
document.body.appendChild(overlay);

function openDrawer() {
  hamburger.classList.add('is-active');
  drawer.classList.add('is-open');
  overlay.classList.add('is-visible');
  document.body.style.overflow = 'hidden';
  hamburger.setAttribute('aria-label', 'メニューを閉じる');
}

function closeDrawer() {
  hamburger.classList.remove('is-active');
  drawer.classList.remove('is-open');
  overlay.classList.remove('is-visible');
  document.body.style.overflow = '';
  hamburger.setAttribute('aria-label', 'メニューを開く');
}

hamburger.addEventListener('click', () => {
  drawer.classList.contains('is-open') ? closeDrawer() : openDrawer();
});

overlay.addEventListener('click', closeDrawer);

document.querySelectorAll('.js-drawer-link').forEach(link => {
  link.addEventListener('click', closeDrawer);
});

/* ============================================================
   Floating fruit particles
   ============================================================ */
const COLORS = ['#C94A3F', '#5BB8D4', '#F4833A', '#6DB84B', '#c77dff'];

function startFloatingParticles() {
  const container = document.getElementById('js-floats');
  if (!container) return;

  for (let i = 0; i < 18; i++) {
    spawnParticle(container, i * 600);
  }
}

function spawnParticle(container, initialDelay) {
  const el = document.createElement('div');
  el.classList.add('float-particle');

  const size  = Math.random() * 10 + 6;   // 6–16px
  const left  = Math.random() * 96 + 2;   // 2–98 %
  const dur   = Math.random() * 8  + 7;   // 7–15s
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];

  el.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    left: ${left}%;
    background: ${color};
    --dur: ${dur}s;
    --delay: ${(Math.random() * 4).toFixed(2)}s;
    opacity: 0;
  `;

  container.appendChild(el);

  setTimeout(() => {
    el.style.animationName = 'floatUp';

    // Re-spawn after each cycle
    el.addEventListener('animationiteration', () => {
      el.style.left = `${Math.random() * 96 + 2}%`;
      const newSize = Math.random() * 10 + 6;
      el.style.width  = `${newSize}px`;
      el.style.height = `${newSize}px`;
      el.style.background = COLORS[Math.floor(Math.random() * COLORS.length)];
    });
  }, initialDelay);
}

/* ============================================================
   AOS
   ============================================================ */
AOS.init({
  duration: 800,
  easing:   'ease-out-quad',
  once:     true,
  offset:   60,
});

/* ============================================================
   Smooth scroll for anchor links
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
