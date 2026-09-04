(function () {
  'use strict';

  // Subraya en la barra superior la sección que se está leyendo.
  var links = document.querySelectorAll('.nav a');
  var sections = document.querySelectorAll('main section[id]');
  if (!links.length || !sections.length || !('IntersectionObserver' in window)) return;

  var visible = new Set();

  function paint() {
    // Si hay varias visibles, gana la que aparece antes en el documento.
    var current = null;
    sections.forEach(function (s) {
      if (current === null && visible.has(s.id)) current = s.id;
    });
    links.forEach(function (l) {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
  }

  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) visible.add(e.target.id);
      else visible.delete(e.target.id);
    });
    paint();
  }, { rootMargin: '-40% 0px -50% 0px' });

  sections.forEach(function (s) { spy.observe(s); });
})();
