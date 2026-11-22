(function () {
  var root = document.documentElement;
  var toggle = document.querySelector('[data-theme-toggle]');
  if (!toggle) return;

  // The button's name stays "Dark"; aria-pressed alone carries whether dark mode is on.
  var render = function () {
    toggle.setAttribute('aria-pressed', root.getAttribute('data-theme') === 'dark' ? 'true' : 'false');
  };

  var applyTheme = function (next) {
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    render();
  };

  toggle.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!document.startViewTransition || reduceMotion) {
      // Swap in a single frame so color transitions don't all fire at once.
      root.classList.add('theme-instant');
      applyTheme(next);
      window.getComputedStyle(root).color;
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { root.classList.remove('theme-instant'); });
      });
      return;
    }

    var rect = toggle.getBoundingClientRect();
    root.style.setProperty('--reveal-x', (rect.left + rect.width / 2) + 'px');
    root.style.setProperty('--reveal-y', (rect.top + rect.height / 2) + 'px');
    root.classList.add('theme-transition');

    var transition = document.startViewTransition(function () { applyTheme(next); });
    transition.finished.finally(function () {
      root.classList.remove('theme-transition');
    });
  });

  render();
})();
