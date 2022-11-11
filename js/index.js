import fixedNavigation from './fixedNav.js';
import { cartFull } from './cart.js';
import { getProducts, getCategories } from './services.js';
import { loadEventListeners } from "./cart.js"

// Evento para la navegación fija
window.addEventListener("scroll", function(){
  fixedNavigation()
});

document.addEventListener('DOMContentLoaded', function() {
  // Rendering of the products
  getProducts();
  // Rendering of categories in filter
  getCategories();
  // Render Basket
  cartFull();
  // Listeners
  loadEventListeners();
});


