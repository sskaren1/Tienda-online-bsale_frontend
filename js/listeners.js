import {
  basket,
  btnEmptyBasket,
  containerCard,
  selectCategories,
  sortSelector,
  inputSearch,
  btnInputSearch,
} from "./selectors.js";
import { getFilterByCategory, getSortCategory } from "./services.js";
import { addProduct, removeProduct, removeBasket } from "./cart.js";
import { readInputSearch, searchProduct } from "./search.js";

// Listeners
export function loadEventListeners() {
  // Fires when "Add basket" is pressed
  containerCard.addEventListener("click", addProduct);
  // To remove the selected product from the basket
  basket.addEventListener("click", removeProduct);
  // To remove all items from the basket
  btnEmptyBasket.addEventListener("click", removeBasket);
  // To filter
  if (selectCategories) {
    selectCategories.addEventListener("change", getFilterByCategory);
  }
  // To sort
  if (sortSelector) {
    sortSelector.addEventListener("change", getSortCategory);
  }
  // To search
  inputSearch.addEventListener("keyup", readInputSearch);
  inputSearch.addEventListener("keydown", readInputSearch);
  inputSearch.addEventListener("blur", readInputSearch);
  btnInputSearch.addEventListener("click", searchProduct);
}
