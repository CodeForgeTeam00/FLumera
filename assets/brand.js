document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.lum-search-field__input');
    const searchKey = document.querySelector('.lum-search-field__key');
    const brandIndex = document.querySelector('.lum-brand-index');

    function getBrandName(card) {
        return card
            .querySelector('.lum-brand-card__name')
            ?.textContent
            .trim()
            .toLowerCase() || '';
    }

    if (searchInput && searchKey) {
        function getCards() {
            return Array.from(
                document.querySelectorAll(
                    '.lum-brand-directory__grid .lum-brand-card'
                )
            );
        }

        function updateSearchAction() {
            const hasValue = searchInput.value.trim() !== '';

            if (hasValue) {
                searchKey.innerHTML = `
                    <span class="lum-search-field__clear-icon">×</span>
                    <span>Clear</span>
                `;

                searchKey.classList.add('is-clear');
                searchKey.setAttribute('role', 'button');
                searchKey.setAttribute('tabindex', '0');
                searchKey.setAttribute('aria-label', 'Clear search');
            } else {
                searchKey.textContent = 'Enter';
                searchKey.classList.remove('is-clear');
                searchKey.removeAttribute('role');
                searchKey.removeAttribute('tabindex');
                searchKey.removeAttribute('aria-label');
            }
        }

        function showAllCards() {
            const cards = getCards();

            cards.forEach(card => {
                card.style.display = '';
            });
        }

        function searchCards() {
            const cards = getCards();

            const searchValue = searchInput.value
                .trim()
                .toLowerCase();

            updateSearchAction();

            if (searchValue === '') {
                showAllCards();
                return;
            }

            cards.forEach(card => {
                const brandName = getBrandName(card);

                card.style.display =
                    brandName.startsWith(searchValue)
                        ? ''
                        : 'none';
            });
        }

        searchInput.addEventListener('input', searchCards);

        searchKey.addEventListener('click', () => {
            if (!searchKey.classList.contains('is-clear')) {
                return;
            }

            searchInput.value = '';
            searchCards();
            searchInput.focus();
        });

        searchKey.addEventListener('keydown', event => {
            if (!searchKey.classList.contains('is-clear')) {
                return;
            }

            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                searchKey.click();
            }
        });

        updateSearchAction();
    }

    if (brandIndex) {
        const letterButtons = brandIndex.querySelectorAll(
            '.lum-brand-alphabet__item'
        );

        const cards = brandIndex.querySelectorAll(
            '.lum-brand-index__grid .lum-brand-card'
        );

        function filterCards(letter) {
            const selectedLetter = letter
                .trim()
                .toLowerCase();

            cards.forEach(card => {
                const brandName = getBrandName(card);

                card.style.display =
                    brandName.startsWith(selectedLetter)
                        ? ''
                        : 'none';
            });
        }

        letterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const letter = button.textContent.trim();

                letterButtons.forEach(item => {
                    item.classList.remove(
                        'lum-brand-alphabet__item--active'
                    );
                });

                button.classList.add(
                    'lum-brand-alphabet__item--active'
                );

                filterCards(letter);
            });
        });

        const activeButton = brandIndex.querySelector(
            '.lum-brand-alphabet__item--active'
        );

        if (activeButton) {
            filterCards(activeButton.textContent);
        }
    }
});