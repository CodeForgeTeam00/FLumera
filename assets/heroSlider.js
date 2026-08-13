new Swiper('.lum-hero__swiper', {
    loop: true,
    speed: 500,
    autoplay: {delay: 5000, disableOnInteraction: false},
    navigation: {
        prevEl: '.lum-hero__arrow--prev',
        nextEl: '.lum-hero__arrow--next',
    },
    pagination: {
        el: '.lum-hero__dots',
        clickable: true,
    },
});

(function () {
    var swipers = [];

    document.querySelectorAll('.lum-pswiper').forEach(function (el) {
        var sw = new Swiper(el, {
            slidesPerView: 1.4,
            spaceBetween: 16,
            watchOverflow: true,
            navigation: {
                prevEl: el.querySelector('.lum-pswiper__arrow--prev'),
                nextEl: el.querySelector('.lum-pswiper__arrow--next'),
            },
            breakpoints: {

                540: {slidesPerView: 2.3},
                768: {slidesPerView: 2.6},
                1024: {slidesPerView: 3.6},
                1280: {slidesPerView: 4.1},
            },
        });
        swipers.push(sw);
    });

    document.addEventListener('click', function (e) {
        var tab = e.target.closest('.lum-brand-tab');
        if (!tab) return;

        var brand = tab.dataset.brand;
        var section = tab.closest('.lum-brands');

        section.querySelectorAll('.lum-brand-tab').forEach(function (t) {
            t.classList.toggle('is-active', t === tab);
        });

        section.querySelectorAll('[data-brand-panel]').forEach(function (p) {
            p.classList.toggle('is-active', p.dataset.brandPanel === brand);
        });

        // پنل مخفی عرض ندارد، پس بعد از نمایش باید update شود
        swipers.forEach(function (sw) {
            sw.update();
        });
    });
})();