(function () {
  'use strict';

  var tocLinks = document.querySelectorAll('.docs-toc a');
  if (!tocLinks.length) return;

  var headings = [];
  for (var i = 0; i < tocLinks.length; i++) {
    var href = tocLinks[i].getAttribute('href');
    if (href && href.charAt(0) === '#') {
      var el = document.getElementById(href.slice(1));
      if (el) headings.push({ link: tocLinks[i], el: el });
    }
  }

  function updateActive() {
    var scrollY = window.scrollY + 120;
    var current = null;

    for (var i = headings.length - 1; i >= 0; i--) {
      if (headings[i].el.offsetTop <= scrollY) {
        current = headings[i];
        break;
      }
    }

    for (var j = 0; j < tocLinks.length; j++) {
      tocLinks[j].classList.remove('active');
    }

    if (current) {
      current.link.classList.add('active');
    }
  }

  window.addEventListener('scroll', updateActive);
  updateActive();
})();
