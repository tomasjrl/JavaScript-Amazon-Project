// importo la variable cart del archivo cart.js posterior a declarar type="module" este js en el html
// se declara al comienzo del archivo
// los modules declarados para probarlos funcionan solo con live-server (y no abriendo el archivo desde el explorador)
// usando {cart as myCart} se puede re-declarar la variable si fuese necesario para no causar conflictos

import { cart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";

// importo libreria externa de javascript ESM para usar en el codigo (calendario)
// se usa/emplea segun documentacion de la libreria
// sin {} se denomina como un import de un default export y puede haber 1 (default export) por archivo
// const y console log a modo de ejemplo

import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

// importo las opciones de recargo de precios en los productos por el envio en cantidad de dias
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import {renderPaymentSummary} from "./paymentSummary.js"

// se genera una funcion para su reutilizacion posterior

export function renderOrderSummary() {
  // se crea una variable para almacenar el texto html que se genera en el loop

  let cartSummaryHTML = "";

  // creo una loop forEach para recorrer los objetos del array de la variable cart importada
  // usa parametro cartItem
  // copio el modelo html de etiquetas y contenido, que sera modificado con javascript y luego enviado de nuevo al html

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

    // pone en una variable el valor obtenido de cartItem

    const deliveryOptionId = cartItem.deliveryOptionId;

    // crea un loop forEach para recorrer deliveryOptions
    // le da el parametro option que representa a cada uno de los resultados
    // dayjs() es segun la documentacion de la libreria importada para calcular dias
    // today.add es segun la documentacion de la libreria importada para calcular dias
    // deliveryDate.format('ddd, MMMM, D'); es segun la documentacion de la libreria importada para calcular dias
    // ejecuto la funcion que contiene el loop
    
    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("ddd, MMMM, D");

    cartSummaryHTML += `
  <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
          <div class="delivery-date">
            Delivery date: ${dateString}
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
                <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
                  matchingProduct.id
                }">
                  Delete
                </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
            </div>
          </div>
        </div>
  `;
  });

  // creamos funcion para recorrer en loop cada producto y generar le HTML con la opcion elegida para checkout
  // segun cantidad de dias a elegir hay recargo en cada producto
  // nombramos al parametro deliveryOption por representa a cada producto
  // dayjs() es segun la documentacion de la libreria importada para calcular dias
  // today.add es segun la documentacion de la libreria importada para calcular dias
  // deliveryDate.format('ddd, MMMM, D'); es segun la documentacion de la libreria importada para calcular dias
  // const xxx  === 0 ? : (forma abreviada de decir que: SI 0 es TRUE entonces (? = ...) y si no lo es entonces (: = ...)) y puede guardarse en una variable
  // isChecked es para que la opcion FREE sea chequeada (checked) por defecto si el producto existe

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = "";

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
      const dateString = deliveryDate.format("ddd, MMMM, D");
      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `$${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += ` 
    <div class="delivery-option js-delivery-option" data-product-id="${
      matchingProduct.id
    }" data-delivery-option-id="${deliveryOption.id}">
                <input type="radio" ${
                  isChecked ? "checked" : ""
                } class="delivery-option-input" name="${matchingProduct.id}">
                <div>
                  <div class="delivery-option-date">
                    ${dateString}
                  </div>
                  <div class="delivery-option-price">
                    ${priceString} Shipping
                  </div>
                </div>
              </div>`;
    });
    return html;
  }

  // llamo a la clase js-order-summary del html con querySelector
  // y le agrego el contenido de cartSummaryHTML con innerHTML

  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

  // llamo a la clase js-delete-link' del html con querySelectorAll
  // aplico un loop con forEach para cada para que sea removido al aplicar el boton remove
  // agrego addEventListener para escuchar el click en el boton remove desde el html
  // uso dataset que extrae la informacion de la etiqueta data del html (generado en javascript)
  // uso ` ` para llamar al id del producto de la clase js-cart-item-container
  // lo asigno a una variable const y lo elimino del html generado con la funcion .remove

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.remove();

      renderPaymentSummary();
    });
  });

  // llamo a la clase delivery-option y aplico loop para mantener la opcion elegida mas alla de refrescar la pagina en checkout

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);

      // recursion = la funcion puede volver a llamarse a si misma para ejecutarse
      // tecnica MVC = model view controller que interactuan en orden con un loop
      // 1) model que guarda la data
      // 2) view que toma la data y la muestra en la pagina regenerando el html
      // 3) controller corre el codigo cuando se interactua con la pagina
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}
