(function () {
  if (!window.gsap || !window.SplitText) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  gsap.registerPlugin(SplitText);

  var heroName = document.querySelector('.hero__name');
  var svg = document.querySelector('.hero__calibration-svg');

  var tl = gsap.timeline();

  // --- Hero name: split-word reveal, replacing the CSS fallback keyframe
  // (hero-name-in) so exactly one system ever animates the name. No markup
  // change needed -- SplitText wraps at runtime, so the no-JS state (plain
  // text, CSS keyframe) is untouched.
  if (heroName) {
    heroName.style.animation = 'none';
    var split = new SplitText(heroName, { type: 'words', mask: 'words' });
    tl.from(split.words, {
      yPercent: 110,
      opacity: 0,
      duration: 0.6,
      ease: 'power4.out',
      stagger: 0.06
    }, 0);
  }

  // --- Calibration field: self-contained entrance, plays on load every
  // time regardless of scroll position -- fixes the previous ScrollTrigger
  // version, which never resolved for a visitor landing mid-page or one who
  // never scrolled at all.
  if (svg) {
    var dots = Array.prototype.slice.call(svg.querySelectorAll('.cal-dot'));
    var outlier = svg.querySelector('.cal-dot--outlier');
    var line = svg.querySelector('.cal-line');

    // Capture the authored (correct) resting position of every dot before
    // touching anything -- this is the same data the static HTML already
    // shows, so no-JS and reduced-motion visitors see exactly this.
    var rest = dots.map(function (dot) {
      return {
        cx: parseFloat(dot.getAttribute('cx')),
        cy: parseFloat(dot.getAttribute('cy'))
      };
    });

    // Scatter every dot except the outlier to a starting offset read from
    // its own --sx/--sy custom properties (authored per-dot in the HTML).
    dots.forEach(function (dot, i) {
      if (dot === outlier) return;
      var style = getComputedStyle(dot);
      var sx = parseFloat(style.getPropertyValue('--sx')) || 0;
      var sy = parseFloat(style.getPropertyValue('--sy')) || 0;
      gsap.set(dot, { attr: { cx: rest[i].cx + sx, cy: rest[i].cy + sy } });
    });

    var lineLength = line && line.getTotalLength ? line.getTotalLength() : 1000;
    if (line) gsap.set(line, { strokeDasharray: lineLength, strokeDashoffset: lineLength });

    // Starts shortly after the name begins revealing, so the two don't
    // compete for attention at the same instant.
    var fieldStart = 0.35;

    if (line) tl.to(line, { strokeDashoffset: 0, duration: 0.7, ease: 'power1.out' }, fieldStart);

    dots.forEach(function (dot, i) {
      if (dot === outlier) return;
      tl.to(dot, { attr: { cx: rest[i].cx, cy: rest[i].cy }, duration: 0.7, ease: 'power1.out' }, fieldStart);
    });

    // The outlier never scatters and never resolves in sync with the rest
    // of the field -- it holds its flagged position, then gets a brief
    // elastic emphasis once everything else has already settled.
    if (outlier) {
      tl.fromTo(
        outlier,
        { scale: 1, transformOrigin: '50% 50%' },
        { scale: 1.1, ease: 'elastic.out(1, 0.35)', duration: 0.5 },
        fieldStart + 0.75
      );
    }

    // --- Pointer reactivity, layered on top once the field has settled.
    // Structural rest position (the cx/cy attributes above) is never
    // touched by this -- it only ever adds a temporary CSS transform on
    // top via GSAP's quickTo, eased back to (0,0) when the pointer moves
    // away. Desktop, fine-pointer only; the outlier holds through this too.
    tl.eventCallback('onComplete', function () {
      var canHover = window.matchMedia('(pointer: fine) and (hover: hover)').matches;
      if (!canHover) return;

      var reactive = [];
      dots.forEach(function (dot, i) {
        if (dot === outlier) return;
        reactive.push({
          dot: dot,
          rest: rest[i],
          x: gsap.quickTo(dot, 'x', { duration: 0.4, ease: 'power3' }),
          y: gsap.quickTo(dot, 'y', { duration: 0.4, ease: 'power3' })
        });
      });

      var radius = 110;
      var strength = 26;
      var mouse = { x: -9999, y: -9999, active: false };

      var updateMouse = function (evt) {
        var rect = svg.getBoundingClientRect();
        var scaleX = 1000 / rect.width;
        var scaleY = 420 / rect.height;
        mouse.x = (evt.clientX - rect.left) * scaleX;
        mouse.y = (evt.clientY - rect.top) * scaleY;
        mouse.active = true;
      };

      svg.addEventListener('pointermove', updateMouse);
      svg.addEventListener('pointerleave', function () {
        mouse.active = false;
      });

      gsap.ticker.add(function () {
        reactive.forEach(function (entry) {
          if (!mouse.active) {
            entry.x(0);
            entry.y(0);
            return;
          }
          var dx = entry.rest.cx - mouse.x;
          var dy = entry.rest.cy - mouse.y;
          var dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
          if (dist < radius) {
            var force = (1 - dist / radius) * strength;
            entry.x((dx / dist) * force);
            entry.y((dy / dist) * force);
          } else {
            entry.x(0);
            entry.y(0);
          }
        });
      });
    });
  }
})();
