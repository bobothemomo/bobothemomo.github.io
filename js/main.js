(function () {
  'use strict';

  var root = document.documentElement;

  /* ---------- Language (TR / EN) ---------- */
  var TITLES = { tr: 'Barış Değirmenci', en: 'Barış Değirmenci' };

  function setLang(lang, save) {
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang);
    document.title = TITLES[lang];
    document.querySelectorAll('[data-alt-' + lang + ']').forEach(function (el) {
      el.setAttribute('alt', el.getAttribute('data-alt-' + lang));
    });
    if (save) { try { localStorage.setItem('bd-lang', lang); } catch (e) {} }
  }
  // initial language is decided in the <head> script (English while TR is hidden)
  setLang(root.getAttribute('data-lang') === 'tr' ? 'tr' : 'en', false);

  document.querySelectorAll('[data-set-lang]').forEach(function (btn) {
    btn.addEventListener('click', function () { setLang(btn.getAttribute('data-set-lang'), true); });
  });

  /* ---------- Theme (paper / night notebook) ---------- */
  var themeMeta = document.querySelector('meta[name="theme-color"]');
  function syncThemeColor() {
    // browser UI colour follows the current paper (theme + palette)
    var paper = getComputedStyle(root).getPropertyValue('--paper').trim();
    if (themeMeta && paper) themeMeta.setAttribute('content', paper);
  }
  function setTheme(theme, save) {
    root.setAttribute('data-theme', theme);
    syncThemeColor();
    if (save) { try { localStorage.setItem('bd-theme', theme); } catch (e) {} }
  }
  setTheme(root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light', false);

  /* ---------- Colour palette (leaf / wax / surf) ---------- */
  var PALETTES = ['leaf', 'wax', 'surf'];
  var paletteBtns = document.querySelectorAll('[data-set-palette]');
  var svgIcon = document.querySelector('link[rel="icon"][type="image/svg+xml"]');
  function setPalette(p, save) {
    if (PALETTES.indexOf(p) === -1) p = 'leaf';
    root.setAttribute('data-palette', p);
    paletteBtns.forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-set-palette') === p ? 'true' : 'false');
    });
    // the tab icon follows the palette too
    if (svgIcon) svgIcon.setAttribute('href', 'img/favicon-' + p + '.svg?v=3');
    syncThemeColor();
    if (save) { try { localStorage.setItem('bd-palette', p); } catch (e) {} }
  }
  setPalette(root.getAttribute('data-palette'), false);
  paletteBtns.forEach(function (btn) {
    btn.addEventListener('click', function () { setPalette(btn.getAttribute('data-set-palette'), true); });
  });


  var themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true);
    });
  }
  // follow the OS setting until the visitor picks one
  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var onChange = function (e) {
      var saved = null;
      try { saved = localStorage.getItem('bd-theme'); } catch (err) {}
      if (!saved) setTheme(e.matches ? 'dark' : 'light', false);
    };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
  }

  /* ---------- Header border + active nav ---------- */
  var header = document.querySelector('.site-header');
  function onScroll() { header.classList.toggle('is-scrolled', window.scrollY > 8); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav a'));
  if ('IntersectionObserver' in window && navLinks.length) {
    var navObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    navLinks.forEach(function (a) {
      var s = document.querySelector(a.getAttribute('href'));
      if (s) navObs.observe(s);
    });
  }

  /* ---------- Case dialog ---------- */
  var dialog = document.getElementById('case-dialog');
  var body = document.getElementById('case-body');
  var CASES = ['unipazar', 'games', 'brand', '3d'];
  var lastTrigger = null;

  function openCase(id, trigger) {
    var tpl = document.getElementById('tpl-' + id);
    if (!tpl || !dialog) return;
    lastTrigger = trigger || null;
    body.innerHTML = '';
    body.appendChild(tpl.content.cloneNode(true));
    body.scrollTop = 0;
    if (!dialog.open) dialog.showModal();
    document.body.style.overflow = 'hidden';
    lazyEmbeds();
    if (location.hash !== '#case-' + id) history.replaceState(null, '', '#case-' + id);
  }

  // Embeds (e.g. Figma) load only when scrolled into view at their real size
  var embedObs = null;
  function lazyEmbeds() {
    if (embedObs) embedObs.disconnect();
    var boxes = body.querySelectorAll('[data-embed]');
    if (!boxes.length) return;
    var load = function (box) {
      if (box.querySelector('iframe')) return;
      var f = document.createElement('iframe');
      f.src = box.getAttribute('data-embed');
      f.title = box.getAttribute('title') || 'Embed';
      f.allowFullscreen = true;
      box.appendChild(f);
    };
    if (!('IntersectionObserver' in window)) { boxes.forEach(load); return; }
    embedObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && e.boundingClientRect.width > 200) {
          load(e.target);
          embedObs.unobserve(e.target);
        }
      });
    }, { root: body, threshold: 0.25 });
    boxes.forEach(function (b) { embedObs.observe(b); });
  }

  if (dialog) {
    dialog.addEventListener('close', function () {
      // 'close' fires async; if another case was opened meanwhile, keep it
      if (dialog.open) return;
      document.body.style.overflow = '';
      body.innerHTML = ''; // stops any playing video
      if (location.hash.indexOf('#case-') === 0) history.replaceState(null, '', '#work');
      if (lastTrigger) lastTrigger.focus({ preventScroll: true });
    });
    dialog.addEventListener('click', function (e) {
      if (e.target === dialog) dialog.close();
    });
  }

  document.querySelectorAll('[data-case]').forEach(function (btn) {
    btn.addEventListener('click', function () { openCase(btn.getAttribute('data-case'), btn); });
  });

  document.querySelectorAll('[data-close]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var d = btn.closest('dialog');
      if (d) d.close();
    });
  });

  var m = location.hash.match(/^#case-([\w-]+)$/);
  if (m && CASES.indexOf(m[1]) !== -1) openCase(m[1]);

  /* ---------- Lightbox + YouTube ---------- */
  var lightbox = document.getElementById('lightbox');
  var lbImg = document.getElementById('lightbox-img');
  var lbCap = document.getElementById('lightbox-cap');

  function openLightbox(img) {
    if (!lightbox) return;
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt;
    var fig = img.closest('figure');
    var cap = fig && fig.querySelector('figcaption');
    // only the caption in the active language is visible
    lbCap.textContent = cap ? cap.innerText.trim() : '';
    lightbox.showModal();
  }

  document.addEventListener('click', function (e) {
    var yt = e.target.closest('.yt');
    if (yt && !yt.querySelector('iframe')) {
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + yt.getAttribute('data-yt') + '?autoplay=1&rel=0';
      iframe.title = yt.getAttribute('aria-label') || 'Video';
      iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      iframe.allowFullscreen = true;
      yt.innerHTML = '';
      yt.appendChild(iframe);
      return;
    }
    var img = e.target.closest('.gallery img, .screens img, .sketch img');
    if (img) openLightbox(img);
  });

  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target.tagName === 'FIGURE') lightbox.close();
    });
  }

  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
