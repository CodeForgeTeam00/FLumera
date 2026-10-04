const timelines = document.querySelectorAll(
    '.lum-credit-process__timeline'
);

function updateTimeline() {

    const trigger = window.innerHeight * 0.6;

    timelines.forEach((timeline) => {


        if (timeline.offsetParent === null) return;

        const numbers = [
            ...timeline.querySelectorAll(
                '.lum-credit-process__number'
            )
        ];

        const line = timeline.querySelector(
            '.lum-credit-process__line, .lum-credit-process__mobile-line'
        );

        const progress = line?.querySelector(
            '.lum-credit-process__progress'
        );

        if (!line || !progress || numbers.length < 2) {
            return;
        }

        const timelineRect =
            timeline.getBoundingClientRect();

        const centers = numbers.map((number) => {

            const rect =
                number.getBoundingClientRect();

            return rect.top + rect.height / 2;

        });

        const firstCenter = centers[0];

        const lastCenter =
            centers[centers.length - 1];

        const lineTop =
            firstCenter - timelineRect.top;

        const lineHeight =
            lastCenter - firstCenter;

        line.style.top =
            `${lineTop}px`;

        line.style.height =
            `${Math.max(0, lineHeight)}px`;


        const progressValue = Math.max(
            0,
            Math.min(
                1,
                (trigger - firstCenter) /
                (lastCenter - firstCenter)
            )
        );

        progress.style.height =
            `${progressValue * 100}%`;

        numbers.forEach((number, index) => {

            number.classList.toggle(
                'lum-credit-process__number--active',
                trigger >= centers[index]
            );

        });

    });

}
let ticking = false;

function requestTimelineUpdate() {

    if (ticking) return;

    ticking = true;

    requestAnimationFrame(() => {

        updateTimeline();

        ticking = false;

    });

}
window.addEventListener(
    'scroll',
    requestTimelineUpdate,
    { passive: true }
);

window.addEventListener(
    'resize',
    requestTimelineUpdate
);

window.addEventListener(
    'load',
    updateTimeline
);

updateTimeline();