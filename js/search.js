import { cleanHtml, enableButton, disableButton } from "./functions.js";
import { getSearchProduct } from "./services.js";
import { containerCard, inputSearch } from "./selectors.js";
import { setProductsInView } from "./products.js";

const inputObj = {
  name: "",
};

export function readInputSearch(e) {
  const input = e.target.value;

  if (input === "") {
    disableButton();
  } 
  else if (input !== "" && e.key === "Enter") {
    e.preventDefault();
    inputObj.name = input; 

    // Cleaning html of the seeker
    inputSearch.value = "";

    getSearchProduct(inputObj.name);
  } else {
    enableButton();
    inputObj.name = input;
  }
}

export function searchProduct(e) {
  e.preventDefault();

  // Cleaning html of the seeker
  inputSearch.value = "";

  getSearchProduct(inputObj.name);
}

// Show searched products
export function showSearchProduct(searchedProducts = []) {
  cleanHtml(containerCard);  
  setProductsInView(searchedProducts);
}
