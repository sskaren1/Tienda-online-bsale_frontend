import { setProductsInView } from './products.js';
import { showCategories, showProductByCategorie } from './filter.js';
import { showSortedProduct } from './sort.js';
import { showSearchProduct } from './search.js';

// Function to get the data
export const getProducts = async () => {
  const url = 'http://localhost:4001/api/products';
  try {
    const response = await fetch(url);
    const data = await response.json();
  
    // console.log(data);
    setProductsInView(data);
  } catch (error) {
    console.log(error);
  }
};

// Function to get the categories
export const getCategories = async () => {
  const url = 'http://localhost:4001/api/categories';

  try {
    const response = await fetch(url);
    const data = await response.json();
  
    // console.log(data);
    showCategories(data);
  } catch (error) {
    console.log(error);
  }
}

// Function to filter
export const getFilterByCategory = async (e) =>  {
  const category = e.target.value;
  const url = `http://localhost:4001/api/products/filter/categories/${category}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
  
    // console.log(data);
    showProductByCategorie(data);
  } catch (error) {
    console.log(error);
  }
}

// Function to sort
export const getSortCategory = async (e) =>  {
  const type = e.target.value;
  // console.log(type);
  let arr = type.split(' ');
  // console.log(arr[0],arr[1]);
  const url = `http://localhost:4001/api/products/order/${arr[0]}/${arr[1]}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
  
    // console.log(data);
    showSortedProduct(data);
  } catch (error) {
    console.log(error);
  }
}

// Function to sort
export const getSearchProduct = async (input) =>  {  
  const name = input;
  // console.log(name);
  const url = `http://localhost:4001/api/products/${name}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
  
    // console.log(data);
    showSearchProduct(data);
    // console.log("inputObj.name 2", input);
  } catch (error) {
    console.log(error);
  }
}