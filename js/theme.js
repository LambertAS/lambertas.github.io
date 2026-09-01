(function () {
  var root = document.documentElement;
  var toggle = document.querySelector('[data-theme-toggle]');
  if (!toggle) return;

  var label = toggle.querySelector('[data-theme-label]');

  var render = function () {
    var current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    toggle.setAttribute('aria-pressed', current === 'dark' ? 'true' : 'false');
    if (label) label.textContent = current === 'dark' ? 'Dark' : 'Light';
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
      applyTheme(next);
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
