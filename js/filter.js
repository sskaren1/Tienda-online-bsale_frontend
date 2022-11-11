import { selectCategories } from './selectors.js';

export function showCategories(categories = []) {
  categories.forEach((categorie) => {
    const { name } = categorie;
    const option = document.createElement("OPTION");
    option.value = name;
    option.textContent = name;
    selectCategories.appendChild(option);
  });
}
