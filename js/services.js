import { setProductsInView } from "./products.js";
import { showCategories, showProductByCategorie } from "./filter.js";
import { showSortedProduct } from "./sort.js";
import { showSearchProduct } from "./search.js";
import {
  getProductsUrl,
  searchProductsUrl,
  filterProductsUrl,
  sortProductsUrl,
  getCategoriesUrl,
} from "./endpoints.js";
import { selectCategories } from "./selectors.js";

let productsLocalStorage = [];
export const productDataLocalStorage = {
  search: "",
  category: "",
};

// Function to get the data
export const getProducts = async () => {
  const url = getProductsUrl;

  try {
    // Get data from api rest
    const response = await fetch(url);
    const data = await response.json();

    // Sending products to local storage
    productsLocalStorage = data;
    productsLS();

    // Searched product name, searched category from local storage is cleared on rendering by page reload
    cleanOnlyFilters();

    // Rendering
    setProductsInView(data);
  } catch (error) {
    console.log(error);
  }
};

// Function to get the categories
export const getCategories = async () => {
  const url = getCategoriesUrl;

  try {
    // Get categories from api rest
    const response = await fetch(url);
    const data = await response.json();

    // Rendering
    showCategories(data);
  } catch (error) {
    console.log(error);
  }
};

// Function to filter
export const getFilterByCategory = async (e) => {
  // Get values from local storage
  let category = JSON.parse(localStorage.getItem("category product LS")) || "";
  let search = JSON.parse(localStorage.getItem("searched products LS")) || "";

  // Reading input and sending it to local storage
  productDataLocalStorage.category = e.target.value;
  categoryProductLS();

  const url = `${filterProductsUrl}/${productDataLocalStorage.category}`;

  // Putting selected the chosen option
  const indice = selectCategories.selectedIndex;
  const opcionSeleccionada = selectCategories.options[indice];
  opcionSeleccionada.setAttribute("selected", "");

  try {
    // Get filtered data from api rest
    const response = await fetch(url);
    const data = await response.json();

    if ((category === "" && search === "") || (category !== "" && search === "")) {
      // Sending filtered products to local storage
      productsLocalStorage = data;
      productsLS();

      // Rendering
      showProductByCategorie(productsLocalStorage);

      // Deselecting the chosen option
      opcionSeleccionada.removeAttribute("selected", "");
    } else if (category == "" && search !== "") {
      // Enviando los productos intersectados de los productos del local storage con los productos filtrados de la categoria seleccionada
      productsLocalStorage = productsLocalStorage.filter((array1) => {
        let res = data.find((array2) => {
          return array2.id == array1.id;
        });
        return res !== undefined;
      });    

      // Rendering
      showProductByCategorie(productsLocalStorage);

      // Deselecting the chosen option
      opcionSeleccionada.removeAttribute("selected", "");
    } else if((category !== "" && search !== "")){
      // Sending the filtered to local storage
      productsLocalStorage = data;
      productsLS();

      // Clean only filter, search
      cleanOnlyFilters();

      // Rendering
      showProductByCategorie(productsLocalStorage);

      // Deselecting the chosen option
      opcionSeleccionada.removeAttribute("selected", "");
    }
  } catch (error) {
    console.log(error);
  }
};

// Function to sort
export const getSortCategory = async (e) => {
  const type = e.target.value;
  // console.log(type);
  let arr = type.split(" ");
  // console.log(arr[0],arr[1]);
  const url = `${sortProductsUrl}/${arr[0]}/${arr[1]}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // console.log(data);
    showSortedProduct(data);
  } catch (error) {
    console.log(error);
  }
};

// Function to search
export const getSearchProduct = async (input) => {
  // Get values from local storage
  let category = JSON.parse(localStorage.getItem("category product LS")) || "";
  let search = JSON.parse(localStorage.getItem("searched products LS")) || "";

  // Reading input and sending it to local storage
  productDataLocalStorage.search = input;
  searchedProductsLS();

  const url = `${searchProductsUrl}/${productDataLocalStorage.search}`;

  try {
    // Get searched data from api rest
    const response = await fetch(url);
    const data = await response.json();

    if ((category !== "all" || category !== "") && search !== "") {
      // Putting selected the "all" option 
      selectCategories.options[1].setAttribute("selected", "");

      // Sending searched products to local storage
      productsLocalStorage = data;
      productsLS();

      // Clean only filter, search
      cleanOnlyFilters();

      // Rendering
      showSearchProduct(data);

      // Deselecting the "all" option 
      selectCategories.options[1].removeAttribute("selected", "");
    } 
    else if ((category === "all" || category === "") && search !== "") {
      // Putting selected the "all" option 
      selectCategories.options[1].setAttribute("selected", "");

      // Sending searched products to local storage
      productsLocalStorage = data;
      productsLS();

      // Rendering
      showSearchProduct(data);

      // Deselecting the "all" option 
      selectCategories.options[1].removeAttribute("selected", "");
    } 
    else if ((category === "all" || category === "") && search === "") {
      // Putting selected the "all" option 
      selectCategories.options[1].setAttribute("selected", "");

      // Sending searched products to local storage
      productsLocalStorage = data;
      productsLS();

      // Rendering
      showSearchProduct(data);

       // Deselecting the "all" option 
      selectCategories.options[1].removeAttribute("selected", "");
    } else {
      // Enviando los productos intersectados de los productos del local storage con los productos buscados de la categoria seleccionada
      productsLocalStorage = productsLocalStorage.filter((array1) => {
        let res = data.find((array2) => {
          return array2.id == array1.id;
        });
        return res !== undefined;
      });
      productsLS();

      // Clean only filter, search
      cleanOnlyFilters();

      // Rendering
      showSearchProduct(productsLocalStorage);
    }
  } catch (error) {
    console.log(error);
  }
};

// Clean filters
function cleanOnlyFilters() {
  productDataLocalStorage.category = "";
  categoryProductLS();
  productDataLocalStorage.search = "";
  searchedProductsLS();
}
export function cleanFilters(e) {
  e.preventDefault();

  // Deselecting the "all" option 
  selectCategories.options[1].setAttribute("selected", "");

  // Get all products
  getProducts();
}

// Local storage
function productsLS() {
  localStorage.setItem("products LS", JSON.stringify(productsLocalStorage));
}
function searchedProductsLS() {
  localStorage.setItem(
    "searched products LS",
    JSON.stringify(productDataLocalStorage.search)
  );
}
function categoryProductLS() {
  localStorage.setItem(
    "category product LS",
    JSON.stringify(productDataLocalStorage.category)
  );
}
