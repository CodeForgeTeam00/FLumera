
    const timelines = document.querySelectorAll('.lum-credit-process__timeline');

    function updateTimeline() {
    const trigger = window.innerHeight * 0.6;

    timelines.forEach((timeline) => {
    if (timeline.offsetParent === null) return;

    const markers = [...timeline.querySelectorAll('.lum-credit-process__marker')];
    const progress = timeline.querySelector('.lum-credit-process__progress');

    const centers = markers.map((marker) => {
    const rect = marker.getBoundingClientRect();
    return rect.top + rect.height / 2;
});

    const progressValue = Math.max(
    0,
    Math.min(1, (trigger - centers[0]) / (centers.at(-1) - centers[0]))
    );

    progress.style.height = `${progressValue * 100}%`;

    markers.forEach((marker, index) => {
    marker.querySelector('.lum-credit-process__number')
    .classList.toggle(
    'lum-credit-process__number--active',
    trigger >= centers[index]
    );
});
});
}

    window.addEventListener('scroll', updateTimeline);
    window.addEventListener('resize', updateTimeline);

    updateTimeline();
