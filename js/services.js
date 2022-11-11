import { setProductsInView } from './products.js';
import { showCategories } from './filter.js';

// Function to get the data
export const getProducts = async () => {
  const url = 'http://localhost:4001/api/products';
  try {
    const response = await fetch(url);
    const data = await response.json();
  
    console.log(data);
    setProductsInView(data);
  } catch (error) {
    console.log(error);
  }
};

export const getCategories = async () => {
  const url = 'http://localhost:4001/api/categories';

  try {
    const response = await fetch(url);
    const data = await response.json();
  
    console.log(data);
    showCategories(data);
  } catch (error) {
    console.log(error);
  }
}

function seleccionarCategoria(e) {
  const categoria = e.target.value;
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`;
  fetch(url)
      .then(respuesta => respuesta.json())
      .then(resultado => showProductByCategorie(resultado.meals))
}


