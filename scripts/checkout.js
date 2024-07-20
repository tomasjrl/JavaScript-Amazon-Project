//importo funciones del archivo renderOrderSummary y renderPaymentSummary

import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";

//corre la funcion que actualiza la data y regenera el html instantaneamente con fechas asignadas
// tecnica MVC = model view controller que interactuan en orden con un loop

renderOrderSummary();
renderPaymentSummary();