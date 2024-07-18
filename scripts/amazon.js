// importo la variable cart y la funcion addtoCart del archivo cart.js posterior a declarar type="module" este js en el html
// se declara al comienzo del archivo
// los modules declarados para probarlos funcionan solo con live-server (y no abriendo el archivo desde el explorador)
// usando {cart as myCart} se puede re-declarar la variable si fuese necesario para no causar conflictos

import { cart, addToCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

// Toda la lista de productos esta en data/products.js
// Queda mencionada la variable const products como ejemplo

// variable con un array de objectos (EJEMPLO REDUCIDO)
/*
const products = [
  {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    rating: {
      stars: 4.5,
      count: 87,
    },
    priceCents: 1090,
  },
  {
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    image: "images/products/intermediate-composite-basketball.jpg",
    name: "Intermediate Size Basketball",
    rating: {
      stars: 4,
      count: 127,
    },
    priceCents: 2095,
  },
  {
    id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
    name: "Adults Plain Cotton T-Shirt - 2 Pack",
    rating: {
      stars: 4.5,
      count: 56,
    },
    priceCents: 799,
  },
];
*/

// variable con string vacio
// para inyectar al html el resultado del loop products forEach

let productsHTML = "";

// loop para recorrer la variable productos con forEach
// por cada objeto lo guarda en un parametro llamado producto
// y por cada producto correra una funcion declarada
// la funcion genera todo el codigo html para luego insertarlo en productsHTML
// $${(product.priceCents / 100).toFixed(2)} es para mostrar decimales en precio

products.forEach((product) => {
  productsHTML += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
            ${product.rating.count}
            </div>
          </div>
          <div class="product-price">
            $${formatCurrency(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${
            product.id
          }">
            Add to Cart
          </button>
        </div>`;
});

// Usando el DOM traemos el class del html a javascript
// con querySelector y la clase traemos la etiqueta html
// con innerHTML inyectamos al html el resultado de la variable

document.querySelector(".js-products-grid").innerHTML = productsHTML;

// para calcular la cantidad  total de quantity usamos un loop for each con el parametro item y una funcion declarada
// creamos una variable cartQuantity para almacenar la cantidad total de quantity almacenada en parametro item
// usamos DOM para ponerlo en el html

function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  // llamamos con querySelector a la etiqueta del html para poder usarla en javascript
  // y le agregamos innerHTML para poder llevarla ya modificada de nuevo al html

  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
}

// con querySelectorAll y la clase traemos todas las etiquetas (en cantidad) html generadas
// se usa loop forEach para recorrer cada uno, un parametro button (coincide con etiqueta) y un escuchador de clicks para agregarles una funcion
// escuchamos el click con addEventListener cuando lo realice el usuario en el boton
// y le insertamos la funcion para cuando el click suceda
// declarada una variable productId para facilitar el uso
// se usa dataset para leer el data de la etiqueta button
// se usa productId para leer el data-product-id=

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;

    // llamando a function addToCart
    // se usa parametro productId para pasar el valor button.dataset.productId y llevarlo a la funcion

    addToCart(productId);
    updateCartQuantity();
  });
});
