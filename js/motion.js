(function () {
  var root = document.documentElement;
  var hasIO = 'IntersectionObserver' in window;

  // Scroll-triggered reveals: one staggered entrance per list.
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
  if (revealEls.length) {
    if (hasIO) {
      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0, rootMargin: '0px 0px 15% 0px' });
      revealEls.forEach(function (el) { revealObserver.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    }
  }

  // Process diagrams draw in once, the first time each one is mostly in view.
  var diagrams = Array.prototype.slice.call(document.querySelectorAll('[data-diagram]'));
  if (diagrams.length) {
    if (hasIO) {
      var drawObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-drawn');
            drawObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.4 });
      diagrams.forEach(function (el) { drawObserver.observe(el); });
    } else {
      diagrams.forEach(function (el) { el.classList.add('is-drawn'); });
    }
  }

  // Keep scroll-padding equal to the floating header's real height, so
  // anchored entries and focused elements never land underneath it.
  var header = document.querySelector('.site-header');
  if (header) {
    var setHeaderHeight = function () {
      var floating = window.getComputedStyle(header).position === 'sticky';
      root.style.setProperty('--header-height', (floating ? header.offsetHeight : 0) + 'px');
    };
    setHeaderHeight();
    if ('ResizeObserver' in window) {
      new ResizeObserver(setHeaderHeight).observe(header);
    } else {
      window.addEventListener('resize', setHeaderHeight);
    }
  }
})();
