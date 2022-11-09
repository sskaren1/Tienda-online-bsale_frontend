import { basketContainer, emptyBasket, iconCart, containerCard } from "./selectors.js";

let productsInBasket = [];

// Listeners
cargarEventListeners();
function cargarEventListeners() {
  // Dispara cuando se presiona "Agregar Carrito"
  containerCard.addEventListener("click", agregarCurso);
  // Cuando se elimina un curso del carrito
  carrito.addEventListener('click', removeCourse);
  // Al Vaciar el carrito
  emptyBasket.addEventListener('click', removeBasket);  
}

// Functions
// Función que añade el curso al carrito
export function agregarCurso(e) {
  e.preventDefault();
  // console.log(e.target);

  // Delegation para agregar-carrito
  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    // Enviamos el curso seleccionado para tomar sus datos
    //  console.log(cursoSeleccionado);
    leerDatosCurso(cursoSeleccionado);
  }
}
// Función que muestra el curso seleccionado en el Carrito
export function renderBasket() {
  // Limpiar el html
  basketContainer.innerHTML = "";

  // Recorrer el carrito y renderizar el html
  productsInBasket.forEach((curso) => {
    const { imagen, titulo, precio, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
           <td>  
                <img src="${curso.imagen}" width=100>
           </td>
           <td>${curso.titulo}</td>
           <td class="text-center">${curso.precio}</td>
           <td class="text-center">${curso.cantidad} </td>
           <td class="text-center">
                <button  type="button" class="btn btn-danger rounded-circle borrar-curso" data-id="${curso.id}">X</button>
           </td>
      `;

    // Agrega el html del carrito en el body
    basketContainer.appendChild(row);
  });

  // Cart full
  cartFull();
}
// Función
export function cartFull() {
  // console.log('total cursos', productsInBasket.length);

  if (productsInBasket.length > 0) {
    iconCart.classList.add("icon-cart-full");
  } else {
    iconCart.classList.remove("icon-cart-full");
    // Limpiar el html
    basketContainer.innerHTML = "";
    const row = document.createElement("tr");
    row.innerHTML = `
           <td colspan="4" class="text-center pt-5">  
                <p class="fs-2 ">Carrito Vacío<p/>
           </td>
      `;
    // Agrega el html del carrito en el body
    basketContainer.appendChild(row);
  }
}
// Función para eliminar el curso seleccionado del carrito en el DOM
export function removeCourse(e) {
  e.preventDefault();

  if (e.target.classList.contains("borrar-curso")) {
    // e.target.parentElement.parentElement.remove();
    const cursoId = e.target.getAttribute("data-id");

    // Eliminar del arreglo productsInBasket
    productsInBasket = productsInBasket.filter((curso) => curso.id !== cursoId);

    renderBasket();
  }

  // Cart full
  cartFull();
}
// Función para eliminar todos los cursos del carrito en el DOM
export function removeBasket() {
  // forma lenta
  // basketContainer.innerHTML = '';

  // forma rapida
  while (basketContainer.firstChild) {
    basketContainer.removeChild(basketContainer.firstChild);
  }

  productsInBasket = [];

  // Cart full
  cartFull();
}
