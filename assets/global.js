(function () {
    document.querySelectorAll('.lum-showmore').forEach(function (el) {
        var btn = el.querySelector('[data-toggle]');
        if (!btn) return;
        btn.addEventListener('click', function () {
            var open = el.toggleAttribute('data-expanded');
            btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
    });
})();



(function () {
    document.querySelectorAll('[data-range]').forEach(function (root) {
        var MIN = +root.dataset.min, MAX = +root.dataset.max;
        var sMin = root.querySelector('[data-range-min]');
        var sMax = root.querySelector('[data-range-max]');
        var fFrom = root.querySelector('[data-range-from]');
        var fTo = root.querySelector('[data-range-to]');
        var fill = root.querySelector('[data-range-fill]');

        function pct(v) { return ((v - MIN) / (MAX - MIN)) * 100; }

        function draw() {
            var lo = +sMin.value, hi = +sMax.value;
            fill.style.insetInlineStart = pct(lo) + '%';
            fill.style.inlineSize = (pct(hi) - pct(lo)) + '%';
        }
        function fromSliders() {
            var lo = +sMin.value, hi = +sMax.value;
            if (lo > hi) { /* keep thumbs from crossing */
                if (document.activeElement === sMin) { lo = hi; sMin.value = lo; }
                else { hi = lo; sMax.value = hi; }
            }
            fFrom.value = lo; fTo.value = hi; draw();
        }
        function fromFields() {
            var lo = Math.max(MIN, Math.min(+fFrom.value || MIN, MAX));
            var hi = Math.max(MIN, Math.min(+fTo.value || MAX, MAX));
            if (lo > hi) lo = hi;
            sMin.value = lo; sMax.value = hi; draw();
        }
        sMin.addEventListener('input', fromSliders);
        sMax.addEventListener('input', fromSliders);
        fFrom.addEventListener('change', fromFields);
        fTo.addEventListener('change', fromFields);
        draw();
    });
})();
(function () {
    document.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-accordion-toggle]');
        if (!btn) return;
        var item = btn.closest('[data-accordion-item]');
        if (!item) return;
        var open = item.toggleAttribute('data-open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
})();

(function () {
    'use strict';
    /* single-select demo; swap toggle logic for multi-select if needed */
    document.querySelectorAll('.lum-swatches').forEach(function (group) {
        group.addEventListener('click', function (e) {
            var btn = e.target.closest('.lum-swatch');
            if (!btn) return;
            group.querySelectorAll('.lum-swatch').forEach(function (s) { s.classList.toggle('is-selected', s === btn); });
        });
    });
})();


(function () {
    document.querySelectorAll('[data-fsearch]').forEach(function (group) {
        var input = group.querySelector('[data-fsearch-input]');
        var items = Array.prototype.slice.call(group.querySelectorAll('[data-fsearch-item]'));
        var empty = group.querySelector('[data-fsearch-empty]');
        input.addEventListener('input', function () {
            var q = input.value.trim().toLowerCase();
            var shown = 0;
            items.forEach(function (item) {
                var match = item.textContent.trim().toLowerCase().indexOf(q) !== -1;
                item.hidden = !match;
                if (match) shown++;
            });
            if (empty) empty.hidden = shown !== 0;
        });
    });
})();


(function () {
    document.querySelectorAll('[data-pswiper]').forEach(function (el) {
        new Swiper(el.querySelector('.swiper'), {
            slidesPerView: 1.15,
            spaceBetween: 12,
            watchOverflow: true,
            navigation: {
                prevEl: el.querySelector('.lum-pswiper__arrow--prev'),
                nextEl: el.querySelector('.lum-pswiper__arrow--next'),
            },
            breakpoints: {
                520:  { slidesPerView: 1.6 },
                768:  { slidesPerView: 2.1 },
                1024: { slidesPerView: 1.6 },
                1280: { slidesPerView: 1.8 },
            },
        });
    });
})();