/**
 * main.js — Entry point. Bootstraps all modules.
 */
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initCursor }     from './modules/cursor.js';
import { initNavbar }     from './modules/navbar.js';
import { initHero }       from './modules/hero.js';
import { initAnimations } from './modules/animations.js';
import { initParticles }  from './modules/particles.js';

gsap.registerPlugin(ScrollTrigger);

// ── Smooth scroll (Lenis) ───────────────────────────
const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

// Sync Lenis with GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);

// ── Init all modules ────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initCursor();
  initNavbar(lenis);
  initHero();
  initAnimations();

  // Refresh ScrollTrigger after fonts load
  document.fonts.ready.then(() => ScrollTrigger.refresh());
});
