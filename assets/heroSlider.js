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
            spaceBetween: 12,
            watchOverflow: true,
            navigation: {
                prevEl: el.querySelector('.lum-pswiper__arrow--prev'),
                nextEl: el.querySelector('.lum-pswiper__arrow--next'),
            },
            breakpoints: {
                540:  { slidesPerView: 2.3 },
                768:  { slidesPerView: 2.6 },
                1024: { slidesPerView: 3.6 },
                1280: { slidesPerView: 4.1 },
            },
        });
        swipers.push(sw);
    });
    document.addEventListener('lum-tabs:change', function () {
        swipers.forEach(function (sw) { sw.update(); });
    });
})();



function test(){
    const elements = document.querySelectorAll('.lum-ordered__grid');
    elements.forEach(function (element) {
        console.log(element);

    })

}

test()