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



var PRESETS = {
    default: { base: 1.4, 540: 2.3, 768: 2.6, 1024: 3.6, 1280: 4.1 },
    full:    { base: 1.2, 540: 2,   768: 3,   1024: 4,   1280: 5.2   },
};

document.querySelectorAll('.lum-pswiper').forEach(function (el) {
    var preset = PRESETS[el.dataset.slide] || PRESETS.default;
    new Swiper(el, {
        slidesPerView: preset.base,
        spaceBetween: 12,
        watchOverflow: true,
        navigation: {
            prevEl: el.querySelector('.lum-pswiper__arrow--prev'),
            nextEl: el.querySelector('.lum-pswiper__arrow--next'),
        },
        breakpoints: {
            540:  { slidesPerView: preset[540] },
            768:  { slidesPerView: preset[768] },
            1024: { slidesPerView: preset[1024] },
            1280: { slidesPerView: preset[1280] },
        },
    });
});