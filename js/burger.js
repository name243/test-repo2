export function initBurger() {
  const burgerBtn = document.getElementById('burgerBtn');
  const headerNav = document.getElementById('headerNav');
  const closeBtn = document.getElementById('closeNavBtn');

  if (burgerBtn && headerNav) {
    const closeMenu = () => {
      headerNav.classList.remove('header__nav--open');
      document.body.style.overflow = '';
    };

    const openMenu = () => {
      headerNav.classList.add('header__nav--open');
      document.body.style.overflow = 'hidden';
    };

    // бургер открывает/закрывает
    burgerBtn.addEventListener('click', () => {
      headerNav.classList.contains('header__nav--open') ? closeMenu() : openMenu();
    });

    // крестик закрывает
    if (closeBtn) {
      closeBtn.addEventListener('click', closeMenu);
    }

    // ссылки меню тоже закрывают его при клике
    headerNav.querySelectorAll('.header__nav-link').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }
}