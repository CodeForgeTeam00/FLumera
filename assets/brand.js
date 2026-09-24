const alphabetItems = document.querySelectorAll('.lum-brand-alphabet__item');

alphabetItems.forEach((item) => {
    item.addEventListener('click', () => {

        alphabetItems.forEach((button) => {
            button.classList.remove('lum-brand-alphabet__item--active');
        });

        item.classList.add('lum-brand-alphabet__item--active');
    });
});

const searchInput = document.querySelector('.lum-search-field__input');
const brandGrid = document.querySelector('.lum-brand-directory__grid');

searchInput.addEventListener('input', function () {
    const searchValue = this.value.trim().toLowerCase();
    const cards = brandGrid.querySelectorAll('.lum-brand-card');

    cards.forEach(card => {
        const brandName = card
            .querySelector('.lum-brand-card__name')
            ?.textContent
            .trim()
            .toLowerCase() || '';

        // اگر input خالی باشد همه کارت‌ها نمایش داده شوند
        if (searchValue === '') {
            card.style.display = '';
            return;
        }

        // فقط کارت‌هایی که اسمشان با عبارت سرچ شروع می‌شود
        card.style.display = brandName.startsWith(searchValue) ? '' : 'none';
    });
});
