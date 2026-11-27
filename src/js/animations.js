// Interactions & Animations
import { prefersReducedMotion } from './utils.js';

/**
 * Initialize interactions (hover effects, smooth scroll, etc.)
 */
export function initInteractions() {
  // Smooth scroll behavior for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Add stagger animation to elements
  addStaggerAnimation();

  // Intersection Observer for scroll animations
  observeScrollElements();

  // Custom cursor (optional, can be disabled on mobile)
  if (window.matchMedia('(pointer: fine)').matches) {
    initCustomCursor();
  }
}

/**
 * Add stagger animation to multiple elements
 */
function addStaggerAnimation() {
  const elements = document.querySelectorAll('.stagger-item');
  elements.forEach((el, index) => {
    el.style.setProperty('--stagger-index', index);
  });
}

/**
 * Observe elements for scroll animations with premium effects
 */
function observeScrollElements() {
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Apply premium animations based on element type
        if (entry.target.classList.contains('project-card')) {
          entry.target.classList.add('animate-float-up');
        } else if (entry.target.classList.contains('skill-category')) {
          entry.target.classList.add('animate-rotate-bounce');
        } else if (entry.target.classList.contains('timeline-item')) {
          entry.target.classList.add('animate-smooth-flow');
        } else if (entry.target.classList.contains('scroll-reveal')) {
          entry.target.classList.add('in-view');
        } else {
          entry.target.classList.add('animate-fade-in-up');
        }
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
  });

  document.querySelectorAll('.project-card, .skill-category, .timeline-item, .scroll-reveal').forEach(el => {
    observer.observe(el);
  });
}

/**
 * Initialize custom cursor (subtle follow effect)
 */
function initCustomCursor() {
  if (prefersReducedMotion()) return;

  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid rgba(0, 123, 255, 0.5);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    display: none;
  `;
  document.body.appendChild(cursor);

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.display = 'block';
  });

  document.addEventListener('mouseleave', () => {
    cursor.style.display = 'none';
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;

    cursor.style.left = (cursorX - 10) + 'px';
    cursor.style.top = (cursorY - 10) + 'px';

    requestAnimationFrame(animateCursor);
  }

  animateCursor();
}

/**
 * Initialize GSAP animations (lazy loaded)
 */
export async function initGSAPAnimations() {
  if (prefersReducedMotion()) return;

  try {
    const gsap = (await import('gsap')).default;
    const ScrollTrigger = (await import('gsap/ScrollTrigger')).default;

    gsap.registerPlugin(ScrollTrigger);

    // Animate section titles
    gsap.utils.toArray('.section-title').forEach(title => {
      gsap.from(title, {
        scrollTrigger: {
          trigger: title,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        duration: 0.8,
        y: 30,
        opacity: 0,
        ease: 'power2.out'
      });
    });

    // Animate project cards with stagger
    gsap.utils.toArray('.project-card').forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        duration: 0.6,
        y: 40,
        opacity: 0,
        delay: index * 0.1,
        ease: 'power2.out'
      });
    });

    // Animate skill categories
    gsap.utils.toArray('.skill-category').forEach((skill, index) => {
      gsap.from(skill, {
        scrollTrigger: {
          trigger: skill,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        duration: 0.6,
        y: 30,
        opacity: 0,
        delay: index * 0.08,
        ease: 'power2.out'
      });
    });

    // Animate timeline items
    gsap.utils.toArray('.timeline-item').forEach((item, index) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        duration: 0.6,
        x: index % 2 === 0 ? -40 : 40,
        opacity: 0,
        delay: index * 0.1,
        ease: 'power2.out'
      });
    });

    // Parallax effect for about section
    const aboutContent = document.querySelector('.about-content');
    if (aboutContent) {
      gsap.from(aboutContent, {
        scrollTrigger: {
          trigger: aboutContent,
          start: 'top 60%',
          toggleActions: 'play none none none'
        },
        duration: 1,
        y: 60,
        opacity: 0,
        ease: 'power2.out'
      });
    }

  } catch (error) {
    console.warn('GSAP not loaded, skipping animations', error);
  }
}

/**
 * Initialize stat counters with animation
 */
export async function initCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length === 0) return;

  if (prefersReducedMotion()) return;

  try {
    const gsap = (await import('gsap')).default;
    const ScrollTrigger = (await import('gsap/ScrollTrigger')).default;

    gsap.registerPlugin(ScrollTrigger);

    statNumbers.forEach(stat => {
      const finalValue = parseInt(stat.textContent);
      if (isNaN(finalValue)) return;

      gsap.from(stat, {
        scrollTrigger: {
          trigger: stat,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        duration: 2,
        textContent: 0,
        ease: 'power2.out',
        onUpdate() {
          stat.textContent = Math.ceil(gsap.getProperty(stat, 'textContent')) + '+';
        }
      });
    });

  } catch (error) {
    console.warn('Counter animation skipped', error);
  }
}

export default {
  initInteractions,
  initGSAPAnimations,
  initCounters
};
