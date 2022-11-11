import { containerCard } from "./selectors.js";

// Function that renders the products.
export function setProductsInView(products) {
  const imgUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvJ0KuFQkvgeUpIMNpARRhuaoDoGQjMHrvSA&usqp=CAU";

  products.map((product, index) => {
    const cardContent = document.createElement("div");
    cardContent.classList.add("cardProduct");

    cardContent.innerHTML = ` 
      <div
        class="cardProduct__container w-full max-w-sm flex flex-col justify-between p-8 bg-white border-gray-200 border rounded-lg shadow-md dark:bg-gray-700 dark:border-gray-700"
      >
        <img
          class="rounded-t-lg mb-8"
          src=${ (product.url_image=="" || product.url_image == null)  ? imgUrl : product.url_image }
          alt="product image"
        />
        <div class="info-card">
          <h3
            class="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white mb-5"
          >
            ${product.name}
          </h3>
          <div class="price flex justify-between items-center">
            <span class="price text-3xl text-gray-900 dark:text-white"
              >${product.price}</span
            >
            <span class="price-discount text-3xl text-gray-900 dark:text-white"
              >${product.price-product.discount}</span
            >
            <button
              href="#"
              id="btnAddBasket"
              class="add-basket text-white text-center text-xl font-semibold font-medium px-5 py-2.5 bg-purple-900 hover:bg-purple-600 focus:ring-4 focus:outline-none focus:ring-purple-300  focus:shadow-outline rounded-lg dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
              data-id=${product.id}
              >Add to cart</button
            >
          </div>
        </div>
      </div>          
    `;

    // Add the created html to containerCard
    containerCard.appendChild(cardContent);
  });
}

