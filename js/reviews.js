export function initReviews() {
  console.log('✅ Слайдер отзывов запущен!');

  const slider = document.querySelector('.reviews__slider');
  const track = document.querySelector('.reviews__track');
  const prevBtn = document.querySelector('.reviews__btn--prev');
  const nextBtn = document.querySelector('.reviews__btn--next');

  if (!slider || !track || !prevBtn || !nextBtn) {
    console.error('❌ Элементы слайдера не найдены!');
    return;
  }

  // Клонируем карточки для бесконечной прокрутки
  const originalCards = Array.from(track.querySelectorAll('.review-card'));
  const cloneCount = 3; // количество клонов с каждой стороны

  // Клонируем в конец
  originalCards.forEach(card => {
    const clone = card.cloneNode(true);
    clone.classList.add('review-card--clone');
    track.appendChild(clone);
  });

  // Клонируем в начало (в обратном порядке)
  for (let i = originalCards.length - 1; i >= 0; i--) {
    const clone = originalCards[i].cloneNode(true);
    clone.classList.add('review-card--clone');
    track.insertBefore(clone, track.firstChild);
  }

  const allCards = track.querySelectorAll('.review-card');
  const totalOriginal = originalCards.length;
  const startIndex = cloneCount; // начинаем с первого оригинала

  let currentIndex = startIndex;
  let isDragging = false;
  let startX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;

  // Определяем количество видимых карточек
  function getVisibleCards() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }

  // Получаем шаг (ширина карточки + gap)
  function getCardStep() {
    const card = allCards[0];
    const style = window.getComputedStyle(track);
    const gap = parseInt(style.gap) || 20;
    return card.offsetWidth + gap;
  }

  // Вычисляем смещение по индексу
  function getTranslateByIndex(index) {
    return -index * getCardStep();
  }

  // Обновляем позицию слайдера
  function updateSlider(animate = true) {
    const targetTranslate = getTranslateByIndex(currentIndex);
    
    if (animate) {
      track.classList.remove('reviews__track--dragging', 'reviews__track--instant');
      track.style.transform = `translateX(${targetTranslate}px)`;
    } else {
      track.classList.add('reviews__track--instant');
      track.style.transform = `translateX(${targetTranslate}px)`;
      setTimeout(() => {
        track.classList.remove('reviews__track--instant');
      }, 50);
    }
  }

  // Проверка на клон и прыжок (без анимации)
  function checkClone() {
    const endIndex = cloneCount + totalOriginal;

    if (currentIndex >= endIndex) {
      currentIndex = currentIndex - totalOriginal;
      updateSlider(false);
    } else if (currentIndex < cloneCount) {
      currentIndex = currentIndex + totalOriginal;
      updateSlider(false);
    }
  }

  // ===== DRAG (мышь) =====
  function dragStart(e) {
    isDragging = true;
    startX = getPositionX(e);
    prevTranslate = getTranslateByIndex(currentIndex);
    track.classList.add('reviews__track--dragging');
    slider.style.cursor = 'grabbing';
  }

  function dragMove(e) {
    if (!isDragging) return;
    e.preventDefault();
    const currentPosition = getPositionX(e);
    const diff = currentPosition - startX;
    currentTranslate = prevTranslate + diff;
    track.style.transform = `translateX(${currentTranslate}px)`;
  }

  function dragEnd() {
    if (!isDragging) return;
    isDragging = false;
    slider.style.cursor = 'grab';
    
    const movedBy = currentTranslate - prevTranslate;
    const cardStep = getCardStep();
    
    if (movedBy < -cardStep / 4) {
      currentIndex++;
    } else if (movedBy > cardStep / 4) {
      currentIndex--;
    }
    
    updateSlider(true);
    setTimeout(checkClone, 400);
  }

  function getPositionX(e) {
    return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
  }

  // ===== События мыши =====
  slider.addEventListener('mousedown', dragStart);
  window.addEventListener('mousemove', dragMove);
  window.addEventListener('mouseup', dragEnd);

  // ===== События touch =====
  slider.addEventListener('touchstart', dragStart, { passive: true });
  slider.addEventListener('touchmove', dragMove, { passive: false });
  slider.addEventListener('touchend', dragEnd);

  // ===== Кнопки =====
  prevBtn.addEventListener('click', () => {
    currentIndex--;
    updateSlider(true);
    setTimeout(checkClone, 400);
  });

  nextBtn.addEventListener('click', () => {
    currentIndex++;
    updateSlider(true);
    setTimeout(checkClone, 400);
  });

  // ===== Изменение размера окна =====
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      updateSlider(false);
    }, 100);
  });

  slider.addEventListener('dragstart', (e) => e.preventDefault());

  // Инициализация
  updateSlider(false);
}