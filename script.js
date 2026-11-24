(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function ready() {
    document.body.classList.add('is-ready');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
  } else {
    ready();
  }

  var revealItems = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach(function (item) { item.classList.add('in-view'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });

  revealItems.forEach(function (item) { observer.observe(item); });
})();
