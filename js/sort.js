import { setProductsInView } from "./products.js";
import { cleanHtml } from "./functions.js";
import { containerCard } from "./selectors.js";

export function showSortedProduct(sortedProducts = []) {
  cleanHtml(containerCard);
  setProductsInView(sortedProducts);
}
