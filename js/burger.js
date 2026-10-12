export function initBurger() { 

    const burgerBtn = document.getElementById('burgerBtn');
    const headerNav = document.getElementById('headerNav');

    if (burgerBtn && headerNav) {
    burgerBtn.addEventListener('click', () => {
        headerNav.classList.toggle('header__nav--open');
        document.body.style.overflow = headerNav.classList.contains('header__nav--open') ? 'hidden' : '';
    });

    headerNav.querySelectorAll('.header__nav-link').forEach(link => {
        link.addEventListener('click', () => {
        headerNav.classList.remove('header__nav--open');
        document.body.style.overflow = '';
        });
    });
    }

}