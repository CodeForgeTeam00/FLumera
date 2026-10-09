
    document.querySelectorAll(".lum-journey").forEach((section) => {
    const yearsElement = section.querySelector(".lum-journey__years");
    const contentElement = section.querySelector(".lum-journey__slider");

    if (!yearsElement || !contentElement) return;
    if (contentElement.swiper) return;

    const yearButtons = yearsElement.querySelectorAll(".lum-journey__year");

    const contentSlides = contentElement.querySelectorAll(
    ".lum-journey__slide"
    );

    if (yearButtons.length !== contentSlides.length) {
    console.warn("Journey: years and content slides must have equal counts.");
    return;
}

    if (!contentSlides.length) return;

    const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
    ).matches;

    const speed = reduceMotion ? 0 : 450;

    // Index 2 = 2015 in this example.
    const initialSlide = Math.min(2, contentSlides.length - 1);

    /* Years slider */
    const yearsSwiper = new Swiper(yearsElement, {
    initialSlide,
    speed,

    slidesPerView: 3,
    slidesPerGroup: 1,
    centeredSlides: true,

    // Years are selected using the buttons.
    allowTouchMove: false,

    // Keep centering available even when all five years fit.
    watchOverflow: false,

    // Native buttons already provide keyboard interaction.
    a11y: {
    enabled: false,
},

    breakpoints: {
    1024: {
    slidesPerView: 5,
},
},
});

    /* Move the selected year to the center */
    function updateYears(swiper) {
    yearsSwiper.slideTo(swiper.activeIndex);

    yearButtons.forEach((button, index) => {
    button.setAttribute(
    "aria-pressed",
    String(index === swiper.activeIndex)
    );
});
}

    /* Text + image slider */
    const contentSwiper = new Swiper(contentElement, {
    initialSlide,
    speed,

    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 24,

    autoHeight: true,
    watchOverflow: true,
    loop: false,

    navigation: {
    prevEl: section.querySelector(".lum-journey__prev"),
    nextEl: section.querySelector(".lum-journey__next"),
    addIcons: false,
},

    on: {
    init: updateYears,
    slideChange: updateYears,
},
});

    /* Clicking a year changes the content */
    yearButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
    contentSwiper.slideTo(index);
});
});
});
