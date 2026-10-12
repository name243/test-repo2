import { initBanner } from '../banner.js';
import { initBurger } from '../burger.js';
import { initProducts } from '../products.js';
import { initReviews } from '../reviews.js';

document.addEventListener('DOMContentLoaded', () => {
  initBanner();
  initBurger();
  initProducts();
  initReviews();
});