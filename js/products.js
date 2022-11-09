// Importing selectors
import { containerCard } from "./selectors.js";

// Función que renderiza los cursos
export function setProductsInView(products) {
  const imgUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvJ0KuFQkvgeUpIMNpARRhuaoDoGQjMHrvSA&usqp=CAU";

  products.map((product, index) => {
    const cardContent = document.createElement("div");
    cardContent.classList.add("card");

    cardContent.innerHTML = `  
      <div class="card"> 
        <img
          src=${product.url_image}
          class="imagen-curso w-full"
        />
        <div class="info-card">
          <h3>${product.name}</h3>
          <div class="flex justify-between items-center" >
            <p class="precio">${product.price}</p>
            <p class="precio-span">${product.price}</p>
          </div>
          <button
            href="#"
            type="button" class="btn btn-warning agregar-carrito text-white w-100 mx-auto"
            data-id=${product.id}>
            Agregar Al Carrito
          </button>
        </div>  
      </div>       
    `;

    // Agregar el html creado al containerCard
    containerCard.appendChild(cardContent);
  });
}
// Función para leer los datos del curso
// Lee el contenido del card al que le dimos click y extrae la información del curso
export function leerDatosCurso(curso) {
  // Crear un objeto con el contenido del curso seleccionado
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio-span").textContent,
    id: curso.querySelector("button").getAttribute("data-id"),
    cantidad: 1,
  };

  // Revisa si un elemento ya existe en el carrito
  if (coursesInBasket.some((curso) => curso.id === infoCurso.id)) {
    const cursos = coursesInBasket.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso;
      } else {
        return curso;
      }
    });
    coursesInBasket = [...cursos];
  } else {
    coursesInBasket = [...coursesInBasket, infoCurso];
  }

  // console.log(coursesInBasket)
  renderBasket();
}
