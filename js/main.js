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
   Floating petals
   ============================================================ */
const PETAL_SETS = [
  { p1: '#C94A3F', p2: '#d4736a', center: '#fde8e6' },
  { p1: '#5BB8D4', p2: '#87cce0', center: '#e6f6fb' },
  { p1: '#F4833A', p2: '#f7a673', center: '#fef0e6' },
  { p1: '#6DB84B', p2: '#95cc7a', center: '#edf7e8' },
];

function makePetalSVG(set, size) {
  const rx = size * 0.28;
  const ry = size * 0.46;
  const cx = size / 2;
  const cr = size * 0.18;
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="${cx}" cy="${cx * 0.42}" rx="${rx}" ry="${ry}" fill="${set.p1}" opacity="0.75" transform="rotate(0 ${cx} ${cx})"/>
    <ellipse cx="${cx}" cy="${cx * 0.42}" rx="${rx}" ry="${ry}" fill="${set.p2}" opacity="0.65" transform="rotate(90 ${cx} ${cx})"/>
    <ellipse cx="${cx}" cy="${cx * 0.42}" rx="${rx}" ry="${ry}" fill="${set.p1}" opacity="0.75" transform="rotate(180 ${cx} ${cx})"/>
    <ellipse cx="${cx}" cy="${cx * 0.42}" rx="${rx}" ry="${ry}" fill="${set.p2}" opacity="0.65" transform="rotate(270 ${cx} ${cx})"/>
    <circle cx="${cx}" cy="${cx}" r="${cr}" fill="${set.center}"/>
  </svg>`;
}

function startFloatingParticles() {
  const container = document.getElementById('js-floats');
  if (!container) return;
  for (let i = 0; i < 18; i++) {
    spawnParticle(container, i * 500);
  }
}

function spawnParticle(container, initialDelay) {
  const el = document.createElement('div');
  el.classList.add('float-particle');

  const size = Math.floor(Math.random() * 14 + 16);  // 16–30px
  const left = Math.random() * 94 + 3;
  const dur  = (Math.random() * 7 + 9).toFixed(1);
  const set  = PETAL_SETS[Math.floor(Math.random() * PETAL_SETS.length)];

  el.style.cssText = `left:${left}%;--dur:${dur}s;--delay:${(Math.random()*5).toFixed(1)}s;`;
  el.innerHTML = makePetalSVG(set, size);

  container.appendChild(el);

  setTimeout(() => {
    el.style.animationName = 'floatUp';
    el.addEventListener('animationiteration', () => {
      el.style.left = `${Math.random() * 94 + 3}%`;
      const newSize = Math.floor(Math.random() * 14 + 16);
      const newSet  = PETAL_SETS[Math.floor(Math.random() * PETAL_SETS.length)];
      el.innerHTML  = makePetalSVG(newSet, newSize);
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
