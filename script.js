document.addEventListener('DOMContentLoaded', function () {

  /* ── Year ── */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* ── Header scroll shadow ── */
  var header = document.getElementById('siteHeader');
  window.addEventListener('scroll', function () {
    if (header) header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  /* ── Nav toggle (mobile) ── */
  var nav = document.getElementById('mainNav');
  var toggle = document.getElementById('navToggle');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
  }

  /* ── Smooth scroll + close mobile nav ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = this.getAttribute('href');
      if (target.length > 1) {
        var el = document.querySelector(target);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          if (nav) nav.classList.remove('open');
          if (toggle) toggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  /* ── Scroll reveal ── */
  var revealEls = document.querySelectorAll('.reveal, .reveal-right');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ── Gallery lightbox ── */
  var galleryItems = document.querySelectorAll('.gallery-item');
  var lightbox = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImage');
  var lbClose = document.getElementById('lbClose');

  function openLB(src, alt) {
    if (!lightbox || !lbImg) return;
    lbImg.src = src;
    lbImg.alt = alt || '';
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeLB() {
    if (!lightbox || !lbImg) return;
    lightbox.setAttribute('aria-hidden', 'true');
    lbImg.src = '';
    document.body.style.overflow = '';
  }

  galleryItems.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var src = btn.dataset.src || (btn.querySelector('img') && btn.querySelector('img').src);
      var alt = (btn.querySelector('img') && btn.querySelector('img').alt) || '';
      if (src) openLB(src, alt);
    });
  });

  if (lbClose) lbClose.addEventListener('click', closeLB);
  if (lightbox) lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLB(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLB(); });

});
