/**
 * hero.js — Hero section GSAP entrance + typewriter
 */
import gsap from 'gsap';

const ROLES = [
  'Tech Enthusiast',
  'Community Builder',
  'Marketing Intern',
  'CS Student',
  'Problem Solver',
];

export function initHero() {
  // ── Entrance timeline ──────────────────────────────
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

  tl.to('#hero-badge', {
    opacity: 1, y: 0, duration: 0.8, delay: 0.2
  })
  .to('.hero-name-line', {
    opacity: 1, y: 0, duration: 1, stagger: 0.15
  }, '-=0.4')
  .to('#hero-role', {
    opacity: 1, y: 0, duration: 0.8
  }, '-=0.5')
  .to('#hero-tagline', {
    opacity: 1, y: 0, duration: 0.8
  }, '-=0.5')
  .to('#hero-actions', {
    opacity: 1, y: 0, duration: 0.8
  }, '-=0.5')
  .to('#hero-stats', {
    opacity: 1, y: 0, duration: 0.8
  }, '-=0.4');

  // ── Typewriter ─────────────────────────────────────
  const el = document.getElementById('typewriter');
  if (!el) return;

  // Add blinking cursor
  const cursorSpan = document.createElement('span');
  cursorSpan.className = 'typewriter-cursor';
  el.parentElement.appendChild(cursorSpan);

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeTimer;

  function type() {
    const currentRole = ROLES[roleIndex];

    if (!isDeleting) {
      el.textContent = currentRole.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentRole.length) {
        isDeleting = true;
        typeTimer = setTimeout(type, 2000);
        return;
      }
    } else {
      el.textContent = currentRole.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % ROLES.length;
        typeTimer = setTimeout(type, 400);
        return;
      }
    }

    const speed = isDeleting ? 60 : 90;
    typeTimer = setTimeout(type, speed);
  }

  // Start after entrance animation
  setTimeout(type, 2000);

  // ── Animated stat counters ─────────────────────────
  const statNums = document.querySelectorAll('.stat-num');
  statNums.forEach(num => {
    const target = parseInt(num.dataset.target, 10);
    const duration = target > 100 ? 2000 : 1000;
    const start = Date.now();

    function updateNum() {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      num.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(updateNum);
    }

    // Delay to after entrance
    setTimeout(() => requestAnimationFrame(updateNum), 2200);
  });

  return () => clearTimeout(typeTimer);
}
