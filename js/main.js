(function () {
  'use strict';

  // === Hamburger ===
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () { navLinks.classList.toggle('open'); });
    document.addEventListener('click', function (e) {
      if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) navLinks.classList.remove('open');
    });
  }

  // === Scroll Reveal ===
  var revealEls = document.querySelectorAll('.reveal');
  var observer = new IntersectionObserver(function (entries) {
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) {
        entries[i].target.classList.add('visible');
      }
    }
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  for (var i = 0; i < revealEls.length; i++) { observer.observe(revealEls[i]); }

  // === Nav Active on Scroll (single page sections) ===
  var sections = document.querySelectorAll('section[id]');
  if (sections.length > 0) {
    var navLinks2 = document.querySelectorAll('.navbar-links a');
    window.addEventListener('scroll', function () {
      var scrollPos = window.scrollY + 120;
      var current = '';
      for (var i = sections.length - 1; i >= 0; i--) {
        if (sections[i].offsetTop <= scrollPos) { current = sections[i].id; break; }
      }
      for (var j = 0; j < navLinks2.length; j++) {
        var href = navLinks2[j].getAttribute('href');
        navLinks2[j].classList.toggle('active', href === '#' + current);
      }
    });
  }

  // === Smooth scroll for anchor links ===
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var t = document.querySelector(this.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    });
  });
})();