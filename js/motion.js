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

  // Header compresses on scroll; the header's bottom edge also carries a
  // direct, unsmoothed readout of scroll progress (see .site-header::after
  // in css/style.css) -- a state reflection, not new motion, so it isn't
  // gated behind prefers-reduced-motion, same as the compress behavior.
  var header = document.querySelector('.site-header');
  var root = document.documentElement;
  if (header) {
    var ticking = false;
    var applyState = function () {
      header.classList.toggle('is-compact', window.scrollY > 8);
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      root.style.setProperty('--scroll-progress', progress);
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

  // Magnetic hover on nav links and the theme toggle -- desktop, fine
  // pointer only. Sets --mx/--my (consumed by [data-magnetic]'s transform
  // in css/style.css) scaled down from the pointer's offset from the
  // element's center, clamped to a small max; resets to 0 on pointerleave.
  // Listeners are never attached at all when the gate fails, not attached-
  // then-ignored.
  var canHover = window.matchMedia('(pointer: fine) and (hover: hover)').matches;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (canHover && !reduceMotion) {
    var magneticEls = Array.prototype.slice.call(document.querySelectorAll('[data-magnetic]'));
    var maxPull = 7;
    magneticEls.forEach(function (el) {
      el.addEventListener('pointermove', function (evt) {
        var rect = el.getBoundingClientRect();
        var offsetX = evt.clientX - (rect.left + rect.width / 2);
        var offsetY = evt.clientY - (rect.top + rect.height / 2);
        var mx = Math.max(-maxPull, Math.min(maxPull, offsetX * 0.3));
        var my = Math.max(-maxPull, Math.min(maxPull, offsetY * 0.3));
        el.style.setProperty('--mx', mx + 'px');
        el.style.setProperty('--my', my + 'px');
      });
      el.addEventListener('pointerleave', function () {
        el.style.setProperty('--mx', '0px');
        el.style.setProperty('--my', '0px');
      });
    });
  }
})();
