/* lum-hotspots.js — tabs + hotspots, vanilla, no deps */
(function () {
    'use strict';

    function init(root) {
        var tablist = root.querySelector('.lum-hotspots__tabs');
        var tabs = Array.prototype.slice.call(root.querySelectorAll('.lum-hotspots__tab'));
        var panels = Array.prototype.slice.call(root.querySelectorAll('.lum-hotspots__panel'));

        function activate(tab) {
            tabs.forEach(function (t) {
                var on = t === tab;
                t.classList.toggle('is-active', on);
                t.setAttribute('aria-selected', on ? 'true' : 'false');
                t.tabIndex = on ? 0 : -1;
            });
            panels.forEach(function (p) {
                var on = p.id === tab.getAttribute('aria-controls');
                p.hidden = !on;
                p.classList.toggle('is-active', on);
            });
            closeAll(root); /* switching tabs closes any open card */
        }

        if (tablist) {
            tablist.addEventListener('click', function (e) {
                var t = e.target.closest('.lum-hotspots__tab');
                if (t) activate(t);
            });
            tablist.addEventListener('keydown', function (e) {
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

        /* delegation: one listener for all spots in the section */
        root.addEventListener('click', function (e) {
            var dot = e.target.closest('.lum-spot__dot');
            if (dot) {
                toggle(dot.closest('.lum-spot'), root);
                e.preventDefault();
                e.stopPropagation();
            }
        });
    }

    function toggle(spot, root) {
        var wasOpen = spot.classList.contains('is-open');
        closeAll(root);
        if (wasOpen) return;
        place(spot);
        spot.classList.add('is-open');
        spot.querySelector('.lum-spot__dot').setAttribute('aria-expanded', 'true');
        spot.querySelector('.lum-spot__card').hidden = false;
    }

    function place(spot) {
        /* manual direction chosen by admin via data-direction: up | down | left | right.
           default = right. */
        var dir = spot.getAttribute('data-direction') || 'right';
        spot.classList.remove('dir-up', 'dir-down', 'dir-left', 'dir-right');
        spot.classList.add('dir-' + dir);
    }

    function closeAll(scope) {
        (scope || document).querySelectorAll('.lum-spot.is-open').forEach(function (sp) {
            sp.classList.remove('is-open');
            sp.querySelector('.lum-spot__dot').setAttribute('aria-expanded', 'false');
            sp.querySelector('.lum-spot__card').hidden = true;
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('.lum-hotspots').forEach(init);
        document.addEventListener('click', function (e) {
            if (!e.target.closest('.lum-spot')) closeAll(document);
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeAll(document);
        });
        window.addEventListener('resize', function () { closeAll(document); });
    });
})();