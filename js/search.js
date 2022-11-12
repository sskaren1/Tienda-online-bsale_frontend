import { cleanHtml, enableButton, disableButton } from "./functions.js";
import { getSearchProduct } from "./services.js";
import { containerCard, inputSearch } from "./selectors.js";
import { setProductsInView } from "./products.js";

const inputObj = {
  name: "",
};

export function readInputSearch(e) {
  const input = e.target.value;
  //   console.log(input);

  if (input === "") {
    disableButton();
  } 
  else if (input !== "" && e.key === "Enter") {
    e.preventDefault();
    inputObj.name = input;    
    // console.log("inputObj.name", inputObj.name);
    inputSearch.value = "";
    getSearchProduct(inputObj.name);
  } else {
    enableButton();
    inputObj.name = input;
    // console.log("inputObj.name", inputObj.name);
  }
}

export function searchProduct(e) {
  e.preventDefault();
  inputSearch.value = "";
  getSearchProduct(inputObj.name);
}

// Show searched products
export function showSearchProduct(searchedProducts = []) {
  cleanHtml(containerCard);  
  setProductsInView(searchedProducts);
}
