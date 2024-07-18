// importo la variable cart del archivo cart.js posterior a declarar type="module" este js en el html
// se declara al comienzo del archivo
// los modules declarados para probarlos funcionan solo con live-server (y no abriendo el archivo desde el explorador)
// usando {cart as myCart} se puede re-declarar la variable si fuese necesario para no causar conflictos

import { cart, removeFromCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

// se crea una variable para almacenar el texto html que se genera en el loop
let cartSummaryHTML = "";

// creo una loop forEach para recorrer los objetos del array de la variable cart importada
// usa parametro cartItem
// copio el modelo html de etiquetas y contenido, que sera modificado con javascript y luego enviado de nuevo al html

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  cartSummaryHTML += `
  <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
          <div class="delivery-date">
            Delivery date: Tuesday, June 21
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image" src="${matchingProduct.image}">

            <div class="cart-item-details">
              <div class="product-name">
              ${matchingProduct.name}
              </div>
              <div class="product-price">
                $${formatCurrency(matchingProduct.priceCents)}
              </div>
              <div class="product-quantity">
                <span>
                  Quantity: <span class="quantity-label">${
                    cartItem.quantity
                  }</span>
                </span>
                <span class="update-quantity-link link-primary">
                  Update
                </span>
                <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                  Delete
                </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              <div class="delivery-option">
                <input type="radio" checked class="delivery-option-input" name="${matchingProduct.id}">
                <div>
                  <div class="delivery-option-date">
                    Tuesday, June 21
                  </div>
                  <div class="delivery-option-price">
                    FREE Shipping
                  </div>
                </div>
              </div>
              <div class="delivery-option">
                <input type="radio" class="delivery-option-input" name="${matchingProduct.id}">
                <div>
                  <div class="delivery-option-date">
                    Wednesday, June 15
                  </div>
                  <div class="delivery-option-price">
                    $4.99 - Shipping
                  </div>
                </div>
              </div>
              <div class="delivery-option">
                <input type="radio" class="delivery-option-input" name="${matchingProduct.id}">
                <div>
                  <div class="delivery-option-date">
                    Monday, June 13
                  </div>
                  <div class="delivery-option-price">
                    $9.99 - Shipping
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  `;
});

// llamo a la clase js-order-summary del html con querySelector
// y le agrego el contenido de cartSummaryHTML con innerHTML

document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

// llamo a la clase js-delete-link' del html con querySelectorAll
// aplico un loop con forEach para cada para que sea removido al aplicar el boton remove
// agrego addEventListener para escuchar el click en el boton remove desde el html
// uso dataset que extrae la informacion de la etiqueta data del html (generado en javascript)
// uso ` ` para llamar al id del producto de la clase js-cart-item-container
// lo asigno a una variable const y lo elimino del html generado con la funcion .remove

document.querySelectorAll('.js-delete-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);

    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.remove();
  })
});
