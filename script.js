/* ============================================================
   WEB FUENGIROLA — SCRIPT
============================================================ */

(function () {
  'use strict';

  /* ---- Smooth scroll for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      var headerH = document.getElementById('header').offsetHeight;
      var top = target.getBoundingClientRect().top + window.scrollY - headerH - 8;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ---- Header scroll class ---- */
  var header = document.getElementById('header');
  function onScroll() {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- Mobile menu ---- */
  var hamburger = document.getElementById('hamburger');
  var nav = document.getElementById('nav');

  hamburger.addEventListener('click', function () {
    var isOpen = nav.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  /* Close nav when a link is clicked */
  nav.querySelectorAll('.nav__link').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---- Footer year ---- */
  var yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Fade-in on scroll (Intersection Observer) ---- */
  var fadeEls = document.querySelectorAll(
    '.trust__block, .benefit__item, .service-card, .portfolio-card, .process__step, .maintenance__plan, .problem__stat-card'
  );

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    fadeEls.forEach(function (el, i) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity .5s ease ' + (i % 4) * 0.07 + 's, transform .5s ease ' + (i % 4) * 0.07 + 's';
      observer.observe(el);
    });

    document.addEventListener('DOMContentLoaded', function () {}, false);
  }

  /* ---- iframe preview scaling ---- */
  function scalePreviewIframes() {
    document.querySelectorAll('.portfolio-card__preview').forEach(function (wrapper) {
      var iframe = wrapper.querySelector('iframe');
      if (!iframe) return;
      var scale = wrapper.offsetWidth / 1280;
      iframe.style.transform = 'scale(' + scale + ')';
      wrapper.style.height = Math.round(wrapper.offsetWidth * 0.75) + 'px';
    });
  }
  scalePreviewIframes();
  window.addEventListener('resize', scalePreviewIframes, { passive: true });

  /* Toggle visible class */
  document.addEventListener('DOMContentLoaded', function () {
    var style = document.createElement('style');
    style.textContent = '.visible { opacity: 1 !important; transform: none !important; }';
    document.head.appendChild(style);
  });

})();
