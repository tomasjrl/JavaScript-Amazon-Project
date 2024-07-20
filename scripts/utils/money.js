
// creamos funcion para convertir decimales de precio 10.9$ a 10.90$
// exportamos la funcion para aplicarlo en otros archivos js

export function formatCurrency(priceCents) {
  return (Math.round(priceCents) / 100).toFixed(2);
}

export default formatCurrency;
