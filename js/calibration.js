(function () {
  if (!window.gsap || !window.ScrollTrigger) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var svg = document.querySelector('.hero__calibration-svg');
  if (!svg) return;

  gsap.registerPlugin(ScrollTrigger);

  var dots = Array.prototype.slice.call(svg.querySelectorAll('.cal-dot'));
  var outlier = svg.querySelector('.cal-dot--outlier');
  var line = svg.querySelector('.cal-line');
  var label = document.querySelector('.cal-label');

  // Capture the authored (correct) resting position of every dot before
  // touching anything -- this is the same data the static HTML already
  // shows, so no-JS and reduced-motion visitors see exactly this.
  var rest = dots.map(function (dot) {
    return {
      cx: parseFloat(dot.getAttribute('cx')),
      cy: parseFloat(dot.getAttribute('cy'))
    };
  });

  // Scatter every dot except the outlier to a starting offset read from its
  // own --sx/--sy custom properties (authored per-dot in the HTML).
  dots.forEach(function (dot, i) {
    if (dot === outlier) return;
    var style = getComputedStyle(dot);
    var sx = parseFloat(style.getPropertyValue('--sx')) || 0;
    var sy = parseFloat(style.getPropertyValue('--sy')) || 0;
    gsap.set(dot, { attr: { cx: rest[i].cx + sx, cy: rest[i].cy + sy } });
  });

  // Reference line draws in from nothing.
  var lineLength = line && line.getTotalLength ? line.getTotalLength() : 1000;
  if (line) gsap.set(line, { strokeDasharray: lineLength, strokeDashoffset: lineLength });

  // The outlier's label starts hidden; revealed once the others have settled.
  if (label) gsap.set(label, { opacity: 0, x: -6 });

  // Tied to absolute scroll distance from page load (not to when the
  // element enters the viewport, since it's already visible on load for
  // most screens) -- progress 0 at scrollY 0, progress 1 by 420px down.
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: '+=420',
      scrub: 0.6
    }
  });

  if (line) tl.to(line, { strokeDashoffset: 0, ease: 'none' }, 0);

  dots.forEach(function (dot, i) {
    if (dot === outlier) return;
    tl.to(dot, { attr: { cx: rest[i].cx, cy: rest[i].cy }, ease: 'power1.out' }, 0);
  });

  // The outlier never moves -- it holds its flagged position throughout.
  // Instead it gets a brief elastic emphasis and its label, once the rest
  // of the field has resolved, rather than arriving in sync with them.
  if (outlier) {
    tl.fromTo(
      outlier,
      { scale: 1, transformOrigin: '50% 50%' },
      { scale: 1.1, ease: 'elastic.out(1, 0.35)', duration: 0.5 },
      0.78
    );
  }
  if (label) {
    tl.to(label, { opacity: 1, x: 0, ease: 'power1.out' }, 0.85);
  }
})();
