import {
  basketContainer,
  btnEmptyBasket,
  iconCart,
} from "./selectors.js";
import { cleanHtml } from './functions.js';

let productsInBasket = [];

// Functions
// Function basket rendering
export function cartFull() {

  if (productsInBasket.length > 0) {
    iconCart.classList.add("icon-cart-full");
    btnEmptyBasket.classList.remove("hidden");
    btnEmptyBasket.classList.add("block");
  } else {
    iconCart.classList.remove("icon-cart-full");
    btnEmptyBasket.classList.add("hidden");
    btnEmptyBasket.classList.remove("block");

    // clean basketContainer
    basketContainer.innerHTML = "";

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td colspan="5" class="alertBasketEmpty text-center w-full">  
        <p class="text-white">Basket empty<p/>
      </td>
    `;
    // Add basket in body
    basketContainer.appendChild(tr);
  }
}

// Function that shows the selected product in the basket
export function renderBasket() {
  // Clean html
  basketContainer.innerHTML = "";

  // Loop through the cart and render the html
  productsInBasket.forEach((product) => {
    const { image, name, price, priceWithDiscount, count, id } = product;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>  
          <img src="${image}" width=100>
      </td>
      <td>${name}</td>
      <td class="text-center">${priceWithDiscount}</td>
      <td class="text-center">${count} </td>
      <td class="text-center">
        <button type="button">
          <i data-id="${id}" class=" delete-product fa-solid fa-trash"></i>
        </button>
      </td>
    `;

    // Agrega el html del carrito en el body
    basketContainer.appendChild(row);
  });

  // Cart full
  cartFull();
}

// Function to  Reads the contents of the card we clicked on and pulls the product information.
export function readProductsData(prdto) {
  // Create an object with the content of the selected product
  let infoProduct = {
    image: prdto.querySelector("img").src,
    name: prdto.querySelector("h3").textContent,
    price: prdto.querySelector(".price").textContent,
    priceWithDisco4unt: prdto.querySelector(".priceDiscount").textContent,
    count: 1,
    id: prdto.querySelector("button").getAttribute("data-id"),
  };

  // Check if an item already exists in the cart
  if (productsInBasket.some((productBasket) => productBasket.id === infoProduct.id)) {
    const products = productsInBasket.map((product) => {
      if (product.id === infoProduct.id) {
        product.count++;
        return product;
      } else {
        return product;
      }
    });
    productsInBasket = [...products];
  } else {
    productsInBasket = [...productsInBasket, infoProduct];
  }

  // console.log("productsInBasket",productsInBasket);
  renderBasket();
}

// Function that adds the products to the cart
export function addProduct(e) {
  e.preventDefault();
  // console.log(e.target);

  // Delegation to add-basket
  if (e.target.classList.contains("add-basket")) {
    const selectedProducts = e.target.parentElement.parentElement.parentElement;
    // Send the selected product to collect its data
    readProductsData(selectedProducts);
  }
}

// Function to remove the selected product from the cart in the DOM
export function removeProduct(e) {
  e.preventDefault();

  if (e.target.classList.contains("delete-product")) {
    const productId = e.target.getAttribute("data-id");
    // console.log("productId", productId);
    // Remove products in the basket from array
    productsInBasket = productsInBasket.filter(
      (product) => product.id !== productId
    );

    renderBasket();
  }

  // Cart full
  cartFull();
}

// Function to remove all products from the cart in the DOM
export function removeBasket() {
  cleanHtml(basketContainer);

  productsInBasket = [];

  // Cart full
  cartFull();
}




