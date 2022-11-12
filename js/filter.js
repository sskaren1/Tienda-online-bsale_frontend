import { containerCard, selectCategories } from "./selectors.js";
import { setProductsInView } from "./products.js";
import { cleanHtml } from "./functions.js";

export function showCategories(categories = []) {
  categories.forEach((categorie) => {
    const { name } = categorie;
    const option = document.createElement("OPTION");
    option.value = name;
    option.textContent = name;
    option.classList.add("text-left");
    selectCategories.appendChild(option);
  });
}

export function showProductByCategorie(filteredProducts = []) {
  cleanHtml(containerCard);
  setProductsInView(filteredProducts);
}
