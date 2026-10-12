export function initProducts() {
  console.log('✅ Функция initProducts сработала!');

  const showAllButtons = document.querySelectorAll('.products__btn');
  console.log('Найдено кнопок:', showAllButtons.length);

  showAllButtons.forEach(button => {
    // Сохраняем изначальное состояние при загрузке
    const grid = document.getElementById(button.getAttribute('data-target'));
    if (!grid) return;

    // Находим карточки, которые были скрыты изначально (5-8 на десктопе, 3-8 на мобилках)
    const allCards = Array.from(grid.querySelectorAll('.product-card'));
    const initialHiddenCards = allCards.filter((card, index) => {
      // На десктопе скрываем с 5-й, на мобилках с 3-й
      const isMobile = window.innerWidth <= 768;
      return isMobile ? index >= 2 : index >= 4;
    });

    button.addEventListener('click', (e) => {
      console.log('🖱️ Клик по кнопке!');
      
      const isVisible = button.classList.contains('products__btn--active');

      if (isVisible) {
        // Скрываем карточки
        initialHiddenCards.forEach(card => {
          card.classList.remove('product-card--visible');
          card.classList.add('product-card--hidden');
        });
        button.textContent = 'Посмотреть всё';
        button.classList.remove('products__btn--active');
        
        // Прокрутка к началу блока
        const block = button.closest('.products__block');
        if (block) {
          block.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        // Показываем карточки
        initialHiddenCards.forEach(card => {
          card.classList.remove('product-card--hidden');
          card.classList.add('product-card--visible');
        });
        button.textContent = 'Скрыть';
        button.classList.add('products__btn--active');
      }
    });
  });
}