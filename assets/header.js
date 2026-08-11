
    (function () {
    'use strict';
    var root = document.querySelector('[data-lum-mobile-menu]');
    var body = root.querySelector('.lum-mobile-menu__body');
    var stack = ['0'];

    function panelByKey(key) {
    return key === '0'
    ? body.querySelector('[data-level="0"]')
    : body.querySelector('[data-panel="' + key + '"]');
}
    function showOnly(key) {
    body.querySelectorAll('.lum-mobile-panel').forEach(function (p) { p.removeAttribute('data-active'); });
    var p = panelByKey(key);
    if (p) p.setAttribute('data-active', '');
}
    document.querySelectorAll('[data-lum-open-menu]').forEach(function (btn) {
    btn.addEventListener('click', function () { root.setAttribute('data-drawer-open', ''); stack = ['0']; showOnly('0'); });
});
    root.querySelectorAll('[data-lum-close-menu]').forEach(function (btn) {
    btn.addEventListener('click', function () { root.removeAttribute('data-drawer-open'); });
});
    body.addEventListener('click', function (e) {
    var open = e.target.closest('[data-open]');
    if (open) {
    var key = open.getAttribute('data-open');
    if (panelByKey(key)) { stack.push(key); showOnly(key); }
    return;
}
    if (e.target.closest('[data-back]') && stack.length > 1) {
    stack.pop(); showOnly(stack[stack.length - 1]);
}
});
})();

    /* ---------- Mobile full-screen search: open/close + 3 states ---------- */
    (function () {
    'use strict';
    var box = document.querySelector('[data-msearch]');
    if (!box) return;
    var input = box.querySelector('[data-msearch-input]');
    var clear = box.querySelector('[data-msearch-clear]');
    var term  = box.querySelector('[data-msearch-term]');
    var timer = null;

    function setState(s) { box.setAttribute('data-state', s); }

    document.querySelectorAll('[data-lum-open-search]').forEach(function (btn) {
    btn.addEventListener('click', function () {
    box.setAttribute('data-open', '');
    setState(input.value.trim() ? 'results' : 'empty');
    input.focus();
});
});
    box.querySelectorAll('[data-msearch-close]').forEach(function (btn) {
    btn.addEventListener('click', function () { box.removeAttribute('data-open'); });
});
    input.addEventListener('input', function () {
    clearTimeout(timer);
    var v = input.value.trim();
    if (!v) { setState('empty'); return; }
    setState('loading');
    timer = setTimeout(function () {
    if (term) term.textContent = v;   /* real Shopify search wires in here */
    setState('results');
}, 600);
});
    clear.addEventListener('click', function () { input.value = ''; setState('empty'); input.focus(); });
})();

    /* ---------- Search: empty -> loading -> results (fake delay for static phase) ---------- */
    (function () {
    'use strict';
    var wrap  = document.querySelector('[data-search]');
    if (!wrap) return;
    var input = wrap.querySelector('[data-search-input]');
    var clear = wrap.querySelector('[data-search-clear]');
    var term  = wrap.querySelector('[data-search-term]');
    var timer = null;
    function setState(s) { wrap.setAttribute('data-state', s); }

    input.addEventListener('focus', function () { setState(input.value.trim() ? 'results' : 'empty'); });
    input.addEventListener('input', function () {
    clearTimeout(timer);
    var v = input.value.trim();
    if (!v) { setState('empty'); return; }
    setState('loading');
    timer = setTimeout(function () {
    if (term) term.textContent = v;   /* real Shopify search wires in here */
    setState('results');
}, 600);
});
    clear.addEventListener('click', function () { input.value = ''; setState('empty'); input.focus(); });
    document.addEventListener('click', function (e) { if (!wrap.contains(e.target)) wrap.removeAttribute('data-state'); });
})();