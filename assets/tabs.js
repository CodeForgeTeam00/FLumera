(function () {
    'use strict';
    function init(root) {
        var list = root.querySelector('.lum-tabs__list');
        if (!list) return;
        var tabs = Array.prototype.slice.call(root.querySelectorAll('.lum-tabs__tab'));
        var panels = Array.prototype.slice.call(root.querySelectorAll('.lum-tabs__panel'));

        function activate(tab) {
            tabs.forEach(function (t) {
                var on = t === tab;
                t.classList.toggle('is-active', on);
                t.setAttribute('aria-selected', on ? 'true' : 'false');
                t.tabIndex = on ? 0 : -1;
            });
            panels.forEach(function (p) {
                p.hidden = p.id !== tab.getAttribute('aria-controls');
            });
        }
        list.addEventListener('click', function (e) {
            var t = e.target.closest('.lum-tabs__tab');
            if (t) activate(t);
        });
        list.addEventListener('keydown', function (e) {
            var i = tabs.indexOf(document.activeElement);
            if (i === -1) return;
            var next = null;
            if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
            if (e.key === 'ArrowLeft')  next = tabs[(i - 1 + tabs.length) % tabs.length];
            if (e.key === 'Home')       next = tabs[0];
            if (e.key === 'End')        next = tabs[tabs.length - 1];
            if (next) { e.preventDefault(); next.focus(); activate(next); }
        });
    }
    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('[data-tabs]').forEach(init);
    });
})();