import { setProductsInView } from './products.js';

// Function to get the data
const getProducts = async () => {
  try {
    const response = await fetch("http://localhost:4001/api/products");
    const data = await response.json();
  
    console.log(data);
    setProductsInView(data);
  } catch (error) {
    console.log(error);
  }
};

export default getProducts;
