   var swiper = new Swiper('.lum-sub-gallery', {
        enabled: false,
        spaceBetween: 12,
        slidesPerView: 5,
        freeMode: true,
        watchSlidesProgress: true,
        breakpoints: {
            1024: {
                enabled: true,
            },
        },
    });

    var swiper2 = new Swiper('.lum-main-gallery', {
        spaceBetween: 16,
        slidesPerView: 1.1,
        navigation: {
            enabled: false,
            nextEl: '.lum-slider-gallery__next',
            prevEl: '.lum-slider-gallery__prev',
        },
        thumbs: {
            swiper: swiper,
        },
        breakpoints: {
            1024: {
                slidesPerView: 1,
                navigation: {
                    enabled: true,
                },
            },
        },
    });

    const selects = document.querySelectorAll("[data-lum-select]");
    selects.forEach((select) => {
        const trigger = select.querySelector(".lum-select__trigger");
        const value = select.querySelector(".lum-select__value");
        const options = select.querySelectorAll(".lum-select__option");
        if (!trigger || !value) return;
        const closeSelect = () => {
            select.classList.remove("is-open");
            trigger.setAttribute("aria-expanded", "false");
        };
        const openSelect = () => {
            select.classList.add("is-open");
            trigger.setAttribute("aria-expanded", "true");
        };
        trigger.addEventListener("click", (event) => {
            event.stopPropagation();
            const isOpen = select.classList.contains("is-open");
            selects.forEach((otherSelect) => {
                if (otherSelect === select) return;
                otherSelect.classList.remove("is-open");
                const otherTrigger = otherSelect.querySelector(
                    ".lum-select__trigger"
                );
                otherTrigger?.setAttribute(
                    "aria-expanded",
                    "false"
                );
            });
            if (isOpen) {
                closeSelect();
            } else {
                openSelect();
            }
        });

        options.forEach((option) => {
            option.addEventListener("click", (event) => {
                event.stopPropagation();

                value.textContent = option.textContent.trim();

                options.forEach((item) => {
                    item.classList.remove("is-selected");
                });

                option.classList.add("is-selected");

                closeSelect();
            });
        });

        select.addEventListener("click", (event) => {
            event.stopPropagation();
        });
    });


    document.addEventListener("click", () => {
        selects.forEach((select) => {
            select.classList.remove("is-open");

            const trigger = select.querySelector(
                ".lum-select__trigger"
            );

            trigger?.setAttribute(
                "aria-expanded",
                "false"
            );
        });
    });


    const productTabs = document.querySelectorAll(
        "[data-product-tabs]"
    );

    productTabs.forEach((tabs) => {
        const links = tabs.querySelectorAll(
            ".lum-product-tabs__link"
        );

        const sections = tabs.querySelectorAll(
            "[data-tab-section]"
        );

        const setActiveLink = (id) => {
            links.forEach((link) => {
                const isActive =
                    link.getAttribute("href") === `#${id}`;

                link.classList.toggle(
                    "is-active",
                    isActive
                );
            });
        };

        links.forEach((link) => {
            link.addEventListener("click", (event) => {
                event.preventDefault();

                const targetId =
                    link.getAttribute("href");

                const targetSection =
                    document.querySelector(targetId);

                if (!targetSection) return;

                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });

                setActiveLink(
                    targetSection.id
                );
            });
        });

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveLink(
                            entry.target.id
                        );
                    }
                });
            },
            {
                rootMargin: "-25% 0px -65% 0px",
            }
        );

        sections.forEach((section) => {
            observer.observe(section);
        });
    });


    const desc = document.getElementById("text-blog");
    const btn = document.getElementById("show-more");
    const wrapper = document.getElementById("show-more-sec");

    if (desc && btn && wrapper) {
        wrapper.addEventListener("click", () => {
            const isCollapsed =
                desc.classList.toggle("is-collapsed");

            btn.textContent =
                isCollapsed
                    ? "Show more"
                    : "Show less";

            wrapper.classList.toggle(
                "is-expanded",
                !isCollapsed
            );
        });
    }


    const specificsBlocks =
        document.querySelectorAll("[data-specifics]");

    specificsBlocks.forEach((block) => {
        const rows =
            block.querySelectorAll(
                "[data-specifics-row]"
            );

        const toggle =
            block.querySelector(
                "[data-specifics-toggle]"
            );

        const label =
            block.querySelector(
                "[data-specifics-label]"
            );

        const visibleCount = 5;

        if (!toggle || !label) return;

        if (rows.length <= visibleCount) {
            toggle.classList.add("is-hidden");
            return;
        }

        rows.forEach((row, index) => {
            if (index >= visibleCount) {
                row.classList.add("is-hidden");
            }
        });

        let isExpanded = false;

        toggle.addEventListener("click", () => {
            isExpanded = !isExpanded;

            rows.forEach((row, index) => {
                if (index < visibleCount) return;

                row.classList.toggle(
                    "is-hidden",
                    !isExpanded
                );
            });

            label.textContent =
                isExpanded
                    ? "See less"
                    : "See more";

            toggle.classList.toggle(
                "is-expanded",
                isExpanded
            );
        });
    });

