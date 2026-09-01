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
    document.querySelectorAll('.lum-swatches').forEach(function (group) {

        group.addEventListener('click', function (e) {
            var btn = e.target.closest('.lum-swatch');
            if (!btn) return;

            if (btn.classList.contains('disabled')) return;
            group.querySelectorAll('.lum-swatch').forEach(function (s) {
                s.querySelector('.lum-swatch__chip').classList.toggle('is-selected', s === btn);
            });
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

(function () {

    var openBtns = document.querySelectorAll('[data-filter-open]');


    function updateBodyScroll() {
        var hasOpenDrawer = document.querySelector(
            '[data-filter-drawer][data-open]'
        );

        document.body.style.overflow = hasOpenDrawer ? 'hidden' : '';
    }


    function open(openBtn) {

        var drawerId = openBtn.getAttribute('aria-controls');
        var drawer = document.getElementById(drawerId);

        if (!drawer) return;


        drawer.setAttribute('data-open', '');
        drawer.setAttribute('aria-hidden', 'false');

        openBtn.setAttribute('aria-expanded', 'true');

        updateBodyScroll();
    }


    function close(drawer) {

        if (!drawer) return;


        drawer.removeAttribute('data-open');
        drawer.setAttribute('aria-hidden', 'true');


        var drawerId = drawer.getAttribute('id');

        var openBtn = document.querySelector(
            '[data-filter-open][aria-controls="' + drawerId + '"]'
        );

        if (openBtn) {
            openBtn.setAttribute('aria-expanded', 'false');
        }

        updateBodyScroll();
    }


    openBtns.forEach(function (openBtn) {

        openBtn.addEventListener('click', function () {
            open(openBtn);
        });

    });


    document.querySelectorAll('[data-filter-close]').forEach(function (closeBtn) {

        closeBtn.addEventListener('click', function () {

            var drawer = closeBtn.closest('[data-filter-drawer]');

            close(drawer);

        });

    });


    document.addEventListener('keydown', function (e) {

        if (e.key !== 'Escape') return;


        document
            .querySelectorAll('[data-filter-drawer][data-open]')
            .forEach(function (drawer) {
                close(drawer);
            });

    });

})();


(function () {
    function openModal(id) {
        var modal = document.getElementById('modal-' + id);
        if (!modal) return;
        modal.setAttribute('data-open', '');
        document.body.style.overflow = 'hidden';
    }
    function closeModal(modal) {
        modal.removeAttribute('data-open');
        if (!document.querySelector('.lum-modal[data-open]')) document.body.style.overflow = '';
    }
    document.addEventListener('click', function (e) {
        var opener = e.target.closest('[data-modal-open]');
        if (opener) {
            openModal(opener.getAttribute('data-modal-open'));
            return;
        }
        var closer = e.target.closest('[data-modal-close]');
        if (closer) {
            closeModal(closer.closest('.lum-modal'));
        }
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            var open = document.querySelector('.lum-modal[data-open]');
            if (open) closeModal(open);
        }
    });
})();
// copy link
(function () {
    document.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-copy-link]');
        if (!btn) return;
        e.preventDefault();
        var link = document.getElementById('productLink');
        if (!link) return;
        navigator.clipboard.writeText(link.textContent.trim());
        var box = document.getElementById('linkBox');
        if (box) box.classList.add('is-copied');
        var label = document.querySelector('.lum-modal__actions .text__lum-button');
        var original = label ? label.textContent : null;
        if (label) label.textContent = 'Copied!';
        setTimeout(function () {
            if (box) box.classList.remove('is-copied');
            if (label && original !== null) label.textContent = original;
        }, 1500);
    });
})();


/* OTP inputs: auto-advance, backspace-back, paste-to-fill.
Works for any number of inputs in a [data-otp] group. */
(function () {
    'use strict';
    document.querySelectorAll('[data-otp]').forEach(function (group) {
        var inputs = Array.prototype.slice.call(group.querySelectorAll('input'));

        function onlyDigits(str) { return (str || '').replace(/\D/g, ''); }

        inputs.forEach(function (input, i) {
            // typing a digit -> keep 1 char, move to next
            input.addEventListener('input', function () {
                var v = onlyDigits(input.value);
                input.value = v.slice(-1);            // keep last digit only
                if (input.value && i < inputs.length - 1) inputs[i + 1].focus();
            });

            // backspace on empty -> go back
            input.addEventListener('keydown', function (e) {
                if (e.key === 'Backspace' && !input.value && i > 0) {
                    inputs[i - 1].focus();
                    inputs[i - 1].value = '';
                    e.preventDefault();
                }
                // arrow keys move between boxes
                if (e.key === 'ArrowLeft'  && i > 0) { inputs[i - 1].focus(); e.preventDefault(); }
                if (e.key === 'ArrowRight' && i < inputs.length - 1) { inputs[i + 1].focus(); e.preventDefault(); }
            });

            // paste a full code -> spread across boxes
            input.addEventListener('paste', function (e) {
                e.preventDefault();
                var digits = onlyDigits((e.clipboardData || window.clipboardData).getData('text'));
                if (!digits) return;
                for (var k = 0; k < inputs.length; k++) {
                    inputs[k].value = digits[k] || '';
                }
                // focus the next empty box, or the last one
                var next = inputs.findIndex(function (inp) { return !inp.value; });
                (next === -1 ? inputs[inputs.length - 1] : inputs[next]).focus();
            });
        });
    });
})();

/* generic modal open/close (shared controller) */
(function () {
    'use strict';
    document.addEventListener('click', function (e) {
        var o = e.target.closest('[data-modal-open]');
        if (o) { var m = document.getElementById('modal-' + o.getAttribute('data-modal-open')); if (m){ m.setAttribute('data-open',''); document.body.style.overflow='hidden'; } return; }
        var c = e.target.closest('[data-modal-close]');
        if (c) { var mm = c.closest('.lum-modal'); mm.removeAttribute('data-open'); if(!document.querySelector('.lum-modal[data-open]')) document.body.style.overflow=''; }
    });
    document.addEventListener('keydown', function(e){ if(e.key==='Escape'){ var m=document.querySelector('.lum-modal[data-open]'); if(m){ m.removeAttribute('data-open'); document.body.style.overflow=''; } } });
})();

/* step switching — specific to this modal */
(function () {
    'use strict';
    function goTo(modal, n) {
        modal.querySelectorAll('.lum-step').forEach(function (s) {
            s.classList.toggle('is-active', s.getAttribute('data-step') === n);
        });
    }
    document.addEventListener('click', function (e) {
        var next = e.target.closest('[data-step-next]');
        var back = e.target.closest('[data-step-back]');
        var trigger = next || back;
        if (!trigger) return;
        var modal = trigger.closest('.lum-modal');
        if (!modal) return;
        goTo(modal, trigger.getAttribute(next ? 'data-step-next' : 'data-step-back'));
    });
})();