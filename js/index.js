import fixedNavigation from './fixedNav.js';
import { cartFull } from './cart.js';
import getProducts from './service.js';


// Evento para la navegación fija
window.addEventListener("scroll", function(){
  fixedNavigation()
});

document.addEventListener('DOMContentLoaded', function() {
  // Renderizado de los cursos en base a dbCursos
  // setProductsInView();
  // Cart Full
  cartFull();

  // getProducts();
});


