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

let productsLocalStorage = [];
export const productDataLocalStorage = {
  search: "",
  category: "",
};

// Function to get the data
export const getProducts = async () => {
  const url = getProductsUrl;
  try {
    const response = await fetch(url);
    const data = await response.json();

    // Sending products to local storage
    productsLocalStorage = data;
    productsLS();

    // Se limpia el nombre del producto buscado, categoria buscada del local storage al renderizarlo por recargar la página
    productDataLocalStorage.search = "";
    searchedProductsLS();
    productDataLocalStorage.category = "";
    categoryProductLS();

    setProductsInView(data);
  } catch (error) {
    console.log(error);
  }
};

// Function to get the categories
export const getCategories = async () => {
  const url = getCategoriesUrl;

  try {
    const response = await fetch(url);
    const data = await response.json();

    showCategories(data);
  } catch (error) {
    console.log(error);
  }
};

// Function to filter
export const getFilterByCategory = async (e) => {
  productDataLocalStorage.category = e.target.value;
  categoryProductLS();

  const url = `${filterProductsUrl}/${productDataLocalStorage.category}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (productDataLocalStorage.search === "") {
      // Sending the filtered to local storage
      productsLocalStorage = data;
      productsLS();

      showProductByCategorie(productsLocalStorage);
    } else {
      // Enviando los productos intersectados de los productos del local storage con los productos filtrados de la categoria seleccionada
      productsLocalStorage = productsLocalStorage.filter((array1) => {
        let res = data.find((array2) => {
          return array2.id == array1.id;
        });
        return res !== undefined;
      });

      productDataLocalStorage.search = "";
      searchedProductsLS();

      showProductByCategorie(productsLocalStorage);
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
  productDataLocalStorage.search = input;
  searchedProductsLS();

  const url = `${searchProductsUrl}/${productDataLocalStorage.search}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    let category =
      JSON.parse(localStorage.getItem("category product LS")) || [];

    if (category === "all" || category === "") {
      // Sending searched products to local storage
      productsLocalStorage = data;
      productsLS();

      showSearchProduct(data);
    } else {
      // Enviando los productos intersectados de los productos del local storage con los productos filtrados de la categoria seleccionada
      productsLocalStorage = productsLocalStorage.filter((array1) => {
        let res = data.find((array2) => {
          return array2.id == array1.id;
        });
        return res !== undefined;
      });
      productsLS();

      productDataLocalStorage.category = "";
      categoryProductLS();

      showProductByCategorie(productsLocalStorage);
    }
  } catch (error) {
    console.log(error);
  }
};

export function cleanFilters(e) {
  e.preventDefault();
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
