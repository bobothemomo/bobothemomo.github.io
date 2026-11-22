/* ==========================================================================
   BARIŞ DEĞİRMENCİ — INTERACTIVE STUDIO ENGINE (main.js)
   Dual Theme (Light/Dark) · 3D Tilt & Spotlight · Stack Matrix · ⌘K
   ========================================================================== */

'use strict';

/* ─── 1. Light & Dark Theme Engine ──────────────── */
const getInitialTheme = () => {
  const attr = document.documentElement.getAttribute('data-theme');
  if (attr === 'light' || attr === 'dark') return attr;
  try {
    const saved = localStorage.getItem('bd-theme');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch { }
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};

const applyTheme = (theme) => {
  const next = theme === 'light' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  try {
    localStorage.setItem('bd-theme', next);
  } catch { }

  document.querySelectorAll('[data-set-theme]').forEach(btn => {
    const isActive = btn.dataset.setTheme === next;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', String(isActive));
  });
};

const toggleTheme = () => {
  const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  applyTheme(current === 'light' ? 'dark' : 'light');
};

applyTheme(getInitialTheme());

document.querySelectorAll('[data-set-theme]').forEach(btn => {
  btn.addEventListener('click', () => applyTheme(btn.dataset.setTheme));
});

/* ─── 2. Cursor Radial Spotlight & 3D Card Tilt ─── */
const hasFinePointer = window.matchMedia('(pointer: fine) and (min-width: 900px)').matches;

document.querySelectorAll('.portfolio-card, .spotlight-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mx', `${x}px`);
    card.style.setProperty('--my', `${y}px`);

    if (hasFinePointer && card.classList.contains('portfolio-card')) {
      const rx = ((y / rect.height) - 0.5) * -5;
      const ry = ((x / rect.width) - 0.5) * 5;
      card.style.transform = `perspective(1000px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-4px)`;
    }
  });

  card.addEventListener('mouseleave', () => {
    if (card.classList.contains('portfolio-card')) {
      card.style.transform = '';
    }
  });
});

/* ─── 4. Interactive Discipline -> Stack Matrix ─── */
const discBtns = Array.from(document.querySelectorAll('[data-disc]'));
const stackPills = Array.from(document.querySelectorAll('[data-stack]'));
const stackReset = document.getElementById('stack-reset');

if (discBtns.length && stackPills.length) {
  let lockedDisc = null;

  const highlightStack = (discKey) => {
    discBtns.forEach(b => b.classList.toggle('active', b.dataset.disc === discKey));

    if (!discKey) {
      stackPills.forEach(p => p.classList.remove('is-highlighted', 'is-dimmed'));
      if (stackReset) stackReset.style.opacity = '0.55';
      return;
    }

    if (stackReset) stackReset.style.opacity = '1';
    stackPills.forEach(pill => {
      const groups = (pill.dataset.stack || '').split(/\s+/);
      const match = groups.includes(discKey);
      pill.classList.toggle('is-highlighted', match);
      pill.classList.toggle('is-dimmed', !match);
    });
  };

  discBtns.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      if (!lockedDisc) highlightStack(btn.dataset.disc);
    });
    btn.addEventListener('mouseleave', () => {
      if (!lockedDisc) highlightStack(null);
    });
    btn.addEventListener('click', () => {
      const key = btn.dataset.disc;
      lockedDisc = lockedDisc === key ? null : key;
      highlightStack(lockedDisc);
    });
  });

  stackReset?.addEventListener('click', () => {
    lockedDisc = null;
    highlightStack(null);
  });
}

/* ─── 5. Smart Portfolio Bento Filter ───────────── */
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioBento = document.querySelector('.portfolio__bento');
const portfolioCards = document.querySelectorAll('.portfolio-card');

if (filterBtns.length && portfolioCards.length) {
  const pad = (n) => String(n).padStart(2, '0');

  filterBtns.forEach(btn => {
    const filter = btn.dataset.filter;
    const badge = btn.querySelector('.filter-btn__count');
    if (!badge) return;

    if (filter === 'all') {
      badge.textContent = pad(portfolioCards.length);
    } else {
      let matches = 0;
      portfolioCards.forEach(card => {
        if ((card.dataset.category || '').split(/\s+/).includes(filter)) matches++;
      });
      badge.textContent = pad(matches);
    }
  });

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      let visibleCount = 0;

      portfolioCards.forEach(card => {
        const show = filter === 'all' || (card.dataset.category || '').split(/\s+/).includes(filter);
        card.classList.toggle('hidden', !show);

        if (show) {
          visibleCount++;
          card.classList.add('visible');
          if (filter !== 'all') {
            card.style.animation = 'none';
            void card.offsetWidth;
            card.style.animation = '';
          }
        }
      });

      if (portfolioBento) {
        portfolioBento.classList.toggle('is-filtered', filter !== 'all');
        portfolioBento.classList.toggle('single-result', filter !== 'all' && visibleCount === 1);
      }
    });
  });
}

/* ─── 6. Floating App Dock Active State on Scroll ─ */
const updateActiveDockItem = () => {
  const sections = document.querySelectorAll('main section[id]');
  const dockLinks = document.querySelectorAll('.dock-item[href^="#"]');
  if (!sections.length || !dockLinks.length) return;

  const scrollY = window.scrollY + 220;
  let current = sections[0]?.id || '';

  sections.forEach(sec => {
    if (scrollY >= sec.offsetTop) current = sec.id;
  });

  dockLinks.forEach(link => {
    link.classList.toggle('active-link', link.getAttribute('href') === '#' + current);
  });
};

window.addEventListener('scroll', updateActiveDockItem, { passive: true });

/* ─── 7. Scroll Reveal ──────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ─── 8. One-Click Email Copy ───────────────────── */
document.querySelectorAll('[data-copy-email]').forEach(btn => {
  btn.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const email = btn.dataset.copyEmail;
    const orig = btn.textContent;

    try {
      await navigator.clipboard.writeText(email);
      btn.classList.add('copied');
      btn.textContent = 'Copied!';
      setTimeout(() => {
        btn.classList.remove('copied');
        btn.textContent = orig;
      }, 2000);
    } catch {
      window.location.href = 'mailto:' + email;
    }
  });
});

/* ─── 9. Global Command Palette (⌘K / Ctrl+K) ───── */
const cmdkCommands = [
  { title: '01 · UniPazar Campus Marketplace', cat: 'UX/UI Case Study', icon: 'uil-mobile-android', href: 'uxui-showcase.html', kw: 'figma mobile app onboarding auth ui ux' },
  { title: '02 · Unity Game Projects (Sergio, The Pearl, Googlewoods)', cat: 'Game Dev', icon: 'uil-game-structure', href: 'game-showcase.html', kw: 'unity c# platformer 3d puzzle rpg gameplay' },
  { title: '03 · Character Art & Concept Sketches', cat: 'Illustration', icon: 'uil-brush-alt', href: 'gallery-sketch.html', kw: 'drawing digital painting mockup t-shirt sketch' },
  { title: '04 · Community & Event Branding (Knights & BAM)', cat: 'Brand & Print', icon: 'uil-users-alt', href: 'gallery-community.html', kw: 'boardgame catan poster qr banner' },
  { title: '05 · 3D Modeling & Academic Publications', cat: 'Blender & CEIT', icon: 'uil-cube', href: 'gallery-school.html', kw: 'blender mega man phishing poster hacettepe stl' },
  { title: '06 · Screenplays, Catalogs & Activity Reports', cat: 'Publications', icon: 'uil-file-alt', href: 'documents.html', kw: 'pdf script visa vitaself agp report' },
  { title: 'Switch Theme (Light / Dark Mode)', cat: 'Appearance', icon: 'uil-brightness-half', action: 'toggle-theme', kw: 'dark light theme mode aydınlık karanlık' },
  { title: 'Home — Studio Overview', cat: 'Navigation', icon: 'uil-estate', href: 'index.html#home', kw: 'start hero stage overview' },
  { title: 'Capabilities & Interactive Toolkit', cat: 'Navigation', icon: 'uil-layer-group', href: 'index.html#about', kw: 'skills tools bio profile' },
  { title: 'Experience & Active R&D', cat: 'Navigation', icon: 'uil-briefcase-alt', href: 'index.html#qualification', kw: 'experience e12 bilten education' },
  { title: 'Download Curriculum Vitae (PDF)', cat: 'Document', icon: 'uil-download-alt', href: 'Baris_Degirmenci_CV.pdf', download: true, kw: 'resume cv pdf' },
  { title: 'Copy Email (barisdegirmenci35@gmail.com)', cat: 'Action', icon: 'uil-copy', action: 'copy-email', kw: 'contact mail message' },
  { title: 'Open LinkedIn Profile', cat: 'External', icon: 'uil-linkedin-alt', href: 'https://www.linkedin.com/in/barış-değirmenci-98559a21b/', external: true, kw: 'social network' },
  { title: 'Open GitHub (@bobothemomo)', cat: 'External', icon: 'uil-github-alt', href: 'https://github.com/bobothemomo', external: true, kw: 'code repos' }
];

const mountCommandPalette = () => {
  const backdrop = document.createElement('div');
  backdrop.className = 'cmdk-backdrop';
  backdrop.id = 'cmdk-backdrop';
  backdrop.innerHTML = `
    <div class="cmdk-dialog" role="dialog" aria-modal="true" aria-label="Quick Search">
      <div class="cmdk-search-wrap">
        <i class="uil uil-search"></i>
        <input type="text" class="cmdk-input" id="cmdk-input" placeholder="Search projects, PDFs, theme, or actions…" autocomplete="off">
        <button type="button" class="cmdk-esc" id="cmdk-close">ESC</button>
      </div>
      <div class="cmdk-list" id="cmdk-list"></div>
      <div class="cmdk-footer">
        <span>↑↓ Navigate · ↵ Select</span>
        <span>Barış Değirmenci · Quick Jump</span>
      </div>
    </div>
  `;
  document.body.appendChild(backdrop);

  const input = document.getElementById('cmdk-input');
  const list = document.getElementById('cmdk-list');
  const close = document.getElementById('cmdk-close');

  let filtered = [...cmdkCommands];
  let selIdx = 0;

  const closeCmdk = () => {
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  const execItem = async (item) => {
    if (!item) return;
    if (item.action === 'toggle-theme') {
      toggleTheme();
      closeCmdk();
      return;
    }
    if (item.action === 'copy-email') {
      try { await navigator.clipboard.writeText('barisdegirmenci35@gmail.com'); } catch { }
      closeCmdk();
      return;
    }
    closeCmdk();
    if (item.external) {
      window.open(item.href, '_blank', 'noopener');
    } else if (item.download) {
      const a = document.createElement('a');
      a.href = item.href;
      a.download = '';
      a.click();
    } else {
      window.location.href = item.href;
    }
  };

  const renderList = () => {
    list.innerHTML = '';
    if (!filtered.length) {
      list.innerHTML = `<div style="padding:1.25rem;text-align:center;color:var(--text-muted);font-size:0.86rem;">No matching item found.</div>`;
      return;
    }
    filtered.forEach((item, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'cmdk-item' + (idx === selIdx ? ' selected' : '');
      btn.innerHTML = `
        <span class="cmdk-item__left">
          <i class="uil ${item.icon}"></i>
          <span class="cmdk-item__title">${item.title}</span>
        </span>
        <span class="cmdk-item__cat">${item.cat}</span>
      `;
      btn.addEventListener('mouseenter', () => {
        selIdx = idx;
        Array.from(list.children).forEach((el, i) => el.classList.toggle('selected', i === selIdx));
      });
      btn.addEventListener('click', () => execItem(item));
      list.appendChild(btn);
    });
  };

  const openCmdk = () => {
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
    input.value = '';
    filtered = [...cmdkCommands];
    selIdx = 0;
    renderList();
    setTimeout(() => input.focus(), 20);
  };

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    filtered = cmdkCommands.filter(c =>
      c.title.toLowerCase().includes(q) ||
      c.cat.toLowerCase().includes(q) ||
      c.kw.includes(q)
    );
    selIdx = 0;
    renderList();
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (filtered.length) selIdx = (selIdx + 1) % filtered.length;
      renderList();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (filtered.length) selIdx = (selIdx - 1 + filtered.length) % filtered.length;
      renderList();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      execItem(filtered[selIdx]);
    }
  });

  close.addEventListener('click', closeCmdk);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeCmdk();
  });

  document.querySelectorAll('[data-open-cmdk]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      openCmdk();
    });
  });

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      backdrop.classList.contains('active') ? closeCmdk() : openCmdk();
    } else if (e.key === 'Escape' && backdrop.classList.contains('active')) {
      closeCmdk();
    }
  });
};

/* ─── 10. Unified Lightbox ──────────────────────── */
const lightbox = document.getElementById('lightbox');
const lightboxItems = Array.from(document.querySelectorAll('[data-lightbox-item]'));

if (lightbox && lightboxItems.length) {
  const lbImg = document.getElementById('lightbox-img');
  const lbTitle = document.getElementById('lightbox-title');
  const lbDesc = document.getElementById('lightbox-desc');
  const lbCounter = document.getElementById('lightbox-counter');
  const lbPrev = lightbox.querySelector('.lightbox-prev');
  const lbNext = lightbox.querySelector('.lightbox-next');
  const lbClose = lightbox.querySelector('.lightbox-close');

  let currentIdx = 0;
  let touchStartX = 0;

  const renderLightbox = (idx) => {
    currentIdx = (idx + lightboxItems.length) % lightboxItems.length;
    const item = lightboxItems[currentIdx];
    const src = item.dataset.src || item.querySelector('img')?.getAttribute('src') || '';
    const title = item.dataset.title || item.querySelector('img')?.getAttribute('alt') || '';
    const desc = item.dataset.desc || '';

    if (lbImg) { lbImg.src = src; lbImg.alt = title; }
    if (lbTitle) lbTitle.textContent = title;
    if (lbDesc) { lbDesc.textContent = desc; lbDesc.style.display = desc ? 'block' : 'none'; }
    if (lbCounter) lbCounter.textContent = `${String(currentIdx + 1).padStart(2, '0')} / ${String(lightboxItems.length).padStart(2, '0')}`;
  };

  const openLightbox = (idx) => {
    renderLightbox(idx);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  lightboxItems.forEach((item, idx) => {
    item.addEventListener('click', () => openLightbox(idx));
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(idx);
      }
    });
  });

  lbPrev?.addEventListener('click', (e) => { e.stopPropagation(); renderLightbox(currentIdx - 1); });
  lbNext?.addEventListener('click', (e) => { e.stopPropagation(); renderLightbox(currentIdx + 1); });
  lbClose?.addEventListener('click', (e) => { e.stopPropagation(); closeLightbox(); });
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'ArrowLeft') renderLightbox(currentIdx - 1);
    if (e.key === 'ArrowRight') renderLightbox(currentIdx + 1);
    if (e.key === 'Escape') closeLightbox();
  });

  lightbox.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
  lightbox.addEventListener('touchend', (e) => {
    const delta = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(delta) > 45) delta > 0 ? renderLightbox(currentIdx - 1) : renderLightbox(currentIdx + 1);
  }, { passive: true });
}

/* ─── 11. Embed Modal (YouTube & PDF) ───────────── */
const embedModal = document.getElementById('embed-modal');
if (embedModal) {
  const modalTitle = document.getElementById('embed-modal-title');
  const modalBody = document.getElementById('embed-modal-body');
  const modalFrame = document.getElementById('embed-modal-iframe');
  const modalClose = document.getElementById('embed-modal-close');
  const modalExtBtn = document.getElementById('embed-modal-external');

  const closeEmbedModal = () => {
    embedModal.classList.remove('active');
    if (modalFrame) modalFrame.src = '';
    document.body.style.overflow = '';
  };

  document.querySelectorAll('[data-embed-url]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      if (modalTitle) modalTitle.textContent = trigger.dataset.embedTitle || 'Preview';
      if (modalBody) modalBody.classList.toggle('embed-modal__body--pdf', trigger.dataset.embedType === 'pdf');
      if (modalFrame) modalFrame.src = trigger.dataset.embedUrl;
      if (modalExtBtn) modalExtBtn.href = trigger.dataset.externalUrl || trigger.dataset.embedUrl;
      embedModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  modalClose?.addEventListener('click', closeEmbedModal);
  embedModal.addEventListener('click', (e) => { if (e.target === embedModal) closeEmbedModal(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && embedModal.classList.contains('active')) closeEmbedModal();
  });
}

/* ─── Init ──────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(getInitialTheme());
  mountCommandPalette();
  updateActiveDockItem();

  document.querySelectorAll('.reveal').forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight) {
      el.classList.add('visible');
    }
  });
});
