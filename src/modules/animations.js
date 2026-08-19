/**
 * animations.js — GSAP ScrollTrigger reveal animations + skill bars
 * Strategy: GSAP sets initial states (not CSS), so items are visible
 * until GSAP runs — then GSAP animates them in.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initAnimations() {
  // ── Step 1: Set initial hidden state via GSAP (not CSS) ──────
  const revealEls = gsap.utils.toArray('.reveal-item');
  gsap.set(revealEls, { opacity: 0, y: 30 });

  // ── Step 2: Animate each one on scroll ───────────────────────
  revealEls.forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
        });
      },
    });
  });

  // ── Timeline items: slide in from left ───────────────────────
  document.querySelectorAll('.timeline-item').forEach((item) => {
    gsap.set(item, { opacity: 0, x: -30 });
    ScrollTrigger.create({
      trigger: item,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.to(item, {
          opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
        });
      },
    });
  });

  // ── Skill categories: staggered pop ──────────────────────────
  const skillCats = gsap.utils.toArray('.skill-category');
  gsap.set(skillCats, { opacity: 0, y: 40 });
  ScrollTrigger.create({
    trigger: '.skills-grid',
    start: 'top 90%',
    once: true,
    onEnter: () => {
      gsap.to(skillCats, {
        opacity: 1, y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12,
      });
    },
  });



  // ── Education progress bar ────────────────────────────────────
  const eduFill = document.querySelector('.edu-progress-fill');
  if (eduFill) {
    const targetWidth = getComputedStyle(eduFill).getPropertyValue('--target-width').trim() || '12%';
    ScrollTrigger.create({
      trigger: eduFill,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.to(eduFill, { width: targetWidth, duration: 1.6, ease: 'power2.out' });
      },
    });
  }

  // ── Edu float cards stagger ───────────────────────────────────
  const floatCards = gsap.utils.toArray('.edu-float-card');
  gsap.set(floatCards, { opacity: 0, x: 24 });
  ScrollTrigger.create({
    trigger: '.edu-floating-cards',
    start: 'top 90%',
    once: true,
    onEnter: () => {
      gsap.to(floatCards, {
        opacity: 1, x: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1,
      });
    },
  });

  // ── Skill pills stagger ───────────────────────────────────────
  const pills = gsap.utils.toArray('.skills-tags .pill');
  gsap.set(pills, { opacity: 0, y: 14, scale: 0.9 });
  ScrollTrigger.create({
    trigger: '.skills-tags',
    start: 'top 92%',
    once: true,
    onEnter: () => {
      gsap.to(pills, {
        opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out', stagger: 0.05,
      });
    },
  });

  // ── Contact cards pop ─────────────────────────────────────────
  const contactCards = gsap.utils.toArray('.contact-card');
  gsap.set(contactCards, { opacity: 0, y: 28, scale: 0.96 });
  ScrollTrigger.create({
    trigger: '.contact-links',
    start: 'top 92%',
    once: true,
    onEnter: () => {
      gsap.to(contactCards, {
        opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out', stagger: 0.12,
      });
    },
  });

  // ── Parallax on hero grid ─────────────────────────────────────
  gsap.to('.hero-bg-grid', {
    yPercent: 30,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    },
  });

  // ── Refresh after layout is complete ─────────────────────────
  ScrollTrigger.refresh();
}
