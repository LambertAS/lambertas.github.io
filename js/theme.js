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

  toggle.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    render();
  });

  render();
})();
