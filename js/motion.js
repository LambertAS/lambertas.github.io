(function () {
  // Scroll-triggered reveals
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
  if (revealEls.length) {
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0, rootMargin: '0px 0px 15% 0px' });
      revealEls.forEach(function (el) { observer.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    }
  }

  // Header compresses on scroll
  var header = document.querySelector('.site-header');
  if (header) {
    var ticking = false;
    var applyState = function () {
      header.classList.toggle('is-compact', window.scrollY > 8);
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(applyState);
        ticking = true;
      }
    }, { passive: true });
    applyState();
  }
})();
