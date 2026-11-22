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

  // Nav: one filled pill that sits on the current page's link, slides to the
  // hovered or keyboard-focused link, and returns when the pointer or focus
  // leaves. With reduced motion it stays put (links change colour only).
  var nav = document.querySelector('.site-nav');
  var active = nav && nav.querySelector('[aria-current="page"]');
  if (nav && active) {
    var links = Array.prototype.slice.call(nav.querySelectorAll('.site-nav__link'));
    var indicator = document.createElement('span');
    indicator.className = 'site-nav__indicator';
    indicator.setAttribute('aria-hidden', 'true');
    nav.insertBefore(indicator, nav.firstChild);
    var current = active;
    var place = function (link) {
      current = link;
      // Measure against the nav itself (the list is its own positioned box).
      var n = nav.getBoundingClientRect(), r = link.getBoundingClientRect();
      indicator.style.setProperty('--x', (r.left - n.left - nav.clientLeft) + 'px');
      indicator.style.setProperty('--w', r.width + 'px');
      indicator.style.top = (r.top - n.top - nav.clientTop) + 'px';
      indicator.style.height = r.height + 'px';
      links.forEach(function (l) { l.classList.toggle('is-on', l === link); });
    };
    place(active);
    nav.classList.add('has-indicator');
    // Fonts can change link widths after first paint: re-measure, then allow sliding.
    var settle = function () {
      place(current);
      requestAnimationFrame(function () { indicator.classList.add('is-ready'); });
    };
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(settle); else settle();
    window.addEventListener('resize', function () { place(current); });

    var motionOK = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
    var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (motionOK) {
      if (canHover) {
        links.forEach(function (l) { l.addEventListener('pointerenter', function () { place(l); }); });
        nav.addEventListener('pointerleave', function () { place(active); });
      }
      links.forEach(function (l) {
        l.addEventListener('focus', function () { if (l.matches(':focus-visible')) place(l); });
      });
      nav.addEventListener('focusout', function (evt) {
        if (!nav.contains(evt.relatedTarget)) place(active);
      });
    }
  }
})();
