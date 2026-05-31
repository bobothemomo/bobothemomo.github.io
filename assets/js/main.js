/* ==============================================
   BARIŞDEĞIRMENCI PORTFOLIO — MAIN JAVASCRIPT
   Custom Cursor · Typewriter · Scroll Reveal
   Portfolio Filter · Nav · Skill Bars
   ============================================== */

'use strict';

/* ─── Custom Cursor ─────────────────────────── */
const cursor         = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');

if (cursor && cursorFollower) {
  // Add class to body indicating custom cursor is active
  document.body.classList.add('has-custom-cursor');

  let mx = -100, my = -100;
  let fx = -100, fy = -100;
  let raf;

  const onMouseMove = (e) => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  };

  const animateFollower = () => {
    fx += (mx - fx) * 0.13;
    fy += (my - fy) * 0.13;
    cursorFollower.style.left = fx + 'px';
    cursorFollower.style.top  = fy + 'px';
    raf = requestAnimationFrame(animateFollower);
  };

  document.addEventListener('mousemove', onMouseMove);
  animateFollower();

  // Hover expand on interactive elements
  const hoverTargets = 'a, button, .filter-btn, .portfolio-card, .service-card, .skill-card, .working-card, input, textarea, .nav__toggle';
  document.querySelectorAll(hoverTargets).forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  // Hide when leaving window
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorFollower.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    cursorFollower.style.opacity = '0.7';
  });

  // Show default cursor and hide custom cursor when hovering over iframes (e.g. Figma embeds)
  document.querySelectorAll('iframe').forEach(iframe => {
    iframe.addEventListener('mouseenter', () => {
      document.body.classList.remove('has-custom-cursor');
      cursor.style.opacity = '0';
      cursorFollower.style.opacity = '0';
    });
    iframe.addEventListener('mouseleave', () => {
      document.body.classList.add('has-custom-cursor');
      cursor.style.opacity = '1';
      cursorFollower.style.opacity = '0.7';
    });
  });
}

/* ─── Typewriter Effect ─────────────────────── */
const typewriterEl = document.querySelector('.hero__typewriter');
const cursorEl     = document.querySelector('.hero__cursor');

if (typewriterEl) {
  const words = [
    'Creative Technologist',
    'Instructional Designer',
    'UX/UI Designer',
    'Game Developer',
    'Graphic Designer'
  ];

  let wordIndex   = 0;
  let charIndex   = 0;
  let isDeleting  = false;
  let typeTimeout;

  const type = () => {
    const currentWord = words[wordIndex];
    const speed = isDeleting ? 60 : 100;

    if (!isDeleting) {
      charIndex++;
    } else {
      charIndex--;
    }

    typewriterEl.textContent = currentWord.substring(0, charIndex);

    if (!isDeleting && charIndex === currentWord.length) {
      // Pause at end
      typeTimeout = setTimeout(() => { isDeleting = true; type(); }, 2200);
      return;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex  = (wordIndex + 1) % words.length;
      typeTimeout = setTimeout(type, 400);
      return;
    }

    typeTimeout = setTimeout(type, speed);
  };

  setTimeout(type, 1200);
}

/* ─── Hero Particles ────────────────────────── */
const particlesContainer = document.querySelector('.hero__particles');
if (particlesContainer) {
  const count = 24;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'hero__particle';

    const left     = Math.random() * 100;
    const duration = 7 + Math.random() * 8;
    const delay    = Math.random() * 10;
    const drift    = (Math.random() - 0.5) * 120;
    const size     = 2 + Math.random() * 3;

    p.style.cssText = `
      left: ${left}%;
      width: ${size}px;
      height: ${size}px;
      --duration: ${duration}s;
      --delay: ${delay}s;
      --drift: ${drift}px;
      opacity: 0;
    `;

    p.style.animationDuration  = duration + 's';
    p.style.animationDelay     = delay + 's';
    p.style.setProperty('--drift', drift + 'px');

    particlesContainer.appendChild(p);
  }
}

/* ─── Navigation ────────────────────────────── */
const header     = document.getElementById('header');
const navMenu    = document.getElementById('nav-menu');
const navToggle  = document.getElementById('nav-toggle');
const navOverlay = document.getElementById('nav-overlay');
const navClose   = document.getElementById('nav-close');

// Sticky header on scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header?.classList.add('scrolled');
  } else {
    header?.classList.remove('scrolled');
  }
  updateActiveNavLink();
  handleScrollTop();
}, { passive: true });

// Mobile menu toggle
const openMenu = () => {
  navMenu?.classList.add('show-menu');
  navOverlay?.classList.add('show');
  navToggle?.classList.add('open');
  document.body.style.overflow = 'hidden';
};

const closeMenu = () => {
  navMenu?.classList.remove('show-menu');
  navOverlay?.classList.remove('show');
  navToggle?.classList.remove('open');
  document.body.style.overflow = '';
};

navToggle?.addEventListener('click', () => {
  navMenu?.classList.contains('show-menu') ? closeMenu() : openMenu();
});

navClose?.addEventListener('click', closeMenu);
navOverlay?.addEventListener('click', closeMenu);

// Close on nav link click
document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', closeMenu);
});

/* ─── Active Nav Link on Scroll ─────────────── */
const updateActiveNavLink = () => {
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav__link');
  const scrollY   = window.scrollY + 120;

  let current = '';
  sections.forEach(section => {
    if (scrollY >= section.offsetTop) {
      current = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active-link');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active-link');
    }
  });
};

/* ─── Scroll-Reveal (IntersectionObserver) ──── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ─── Skill Bar Animations ──────────────────── */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.skill-card__fill');
      fills.forEach(fill => {
        const target = fill.dataset.width;
        setTimeout(() => { fill.style.width = target; }, 200);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

const skillsSection = document.getElementById('skills');
if (skillsSection) skillObserver.observe(skillsSection);

/* ─── Progress Bar Animations ───────────────── */
const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.progress-fill-bar').forEach(bar => {
        const w = bar.dataset.width;
        setTimeout(() => { bar.style.width = w; }, 300);
      });
      progressObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.working-card').forEach(c => progressObserver.observe(c));

/* ─── Portfolio Filter ──────────────────────── */
const filterBtns  = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active state
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    portfolioCards.forEach(card => {
      const category = card.dataset.category || '';
      const show = filter === 'all' || category.includes(filter);
      card.classList.toggle('hidden', !show);
    });
  });
});

/* ─── Qualification Tabs ────────────────────── */
const qualTabs    = document.querySelectorAll('.qualification__tab-btn');
const qualContents= document.querySelectorAll('.qualification__content');

qualTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    qualTabs.forEach(t => t.classList.remove('active'));
    qualContents.forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    const target = document.getElementById(tab.dataset.target);
    target?.classList.add('active');
  });
});

/* ─── Services Modal ────────────────────────── */
const serviceButtons = document.querySelectorAll('.service-card__btn');
const serviceModals  = document.querySelectorAll('.services__modal');

serviceButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const modalId = btn.dataset.modal;
    const modal = document.getElementById(modalId);
    modal?.classList.add('active-modal');
    document.body.style.overflow = 'hidden';
  });
});

document.querySelectorAll('.services__modal-close').forEach(close => {
  close.addEventListener('click', () => {
    serviceModals.forEach(m => m.classList.remove('active-modal'));
    document.body.style.overflow = '';
  });
});

serviceModals.forEach(modal => {
  modal.addEventListener('click', e => {
    if (e.target === modal) {
      modal.classList.remove('active-modal');
      document.body.style.overflow = '';
    }
  });
});

/* ─── Scroll Top Button ─────────────────────── */
const scrollTopBtn = document.querySelector('.scrollup');

const handleScrollTop = () => {
  if (window.scrollY > 400) {
    scrollTopBtn?.classList.add('show');
  } else {
    scrollTopBtn?.classList.remove('show');
  }
};

scrollTopBtn?.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ─── Hero Parallax ─────────────────────────── */
window.addEventListener('scroll', () => {
  const heroData = document.querySelector('.hero__data');
  const heroImg  = document.querySelector('.hero__img-wrap');
  if (!heroData || !heroImg) return;

  const scrolled = window.scrollY;
  if (scrolled < window.innerHeight) {
    heroData.style.transform = `translateY(${scrolled * 0.12}px)`;
    heroImg.style.transform  = `translateY(${scrolled * 0.08}px)`;
  }
}, { passive: true });

/* ─── Init ──────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  updateActiveNavLink();
  handleScrollTop();

  // Trigger reveal for elements already in view
  document.querySelectorAll('.reveal').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add('visible');
    }
  });
});
