
const faq = document.querySelector('.faq');

faq.addEventListener('click', (event) => {
    const trigger = event.target.closest('.faq__trigger');

    if (!trigger) {
        return;
    }

    const item = trigger.closest('.faq__item');

    item.classList.toggle('faq__item--open');

    const isOpen = item.classList.contains('faq__item--open');

    trigger.setAttribute('aria-expanded', isOpen);

});
item.classList.toggle('faq__item--open');