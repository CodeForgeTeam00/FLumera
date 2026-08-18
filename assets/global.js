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