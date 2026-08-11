/* ---------- Footer accordion (mobile only; desktop forced open via CSS) ---------- */
(function () {
    'use strict';
    document.querySelectorAll('[data-accordion]').forEach(function (col) {
        var toggle = col.querySelector('[data-accordion-toggle]');
        toggle.addEventListener('click', function () {
            if (window.matchMedia('(min-width: 1024px)').matches) return; // desktop stays open
            col.toggleAttribute('data-open');
        });
    });
})();