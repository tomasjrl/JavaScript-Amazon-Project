
// export permite llevar la variable declarada fuera del archivo js
// y se aplica declarando type="module" en la etiqueta script del html
// los modules declarados para probarlos funcionan solo con live-server (y no abriendo el archivo desde el explorador)
// llamo a localStorage con getItem dandole el parametro de la variable cart para que tome el contenido guardado
// uso JSON.parse para reconvertir en un array el string guardado previamente con JSON.stringify 
// si cart esta vacio de contenido (!cart) le dara un valor determinado 

export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
 cart = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
  },
];
}

// creamos funcion para guardar info localstorage
// al refrescar la pagina se debe mantener los cambios realizados
// el 1er parametro 'cart' es por la variable cart
// el 2do parametro, convierte en string el contenido de la variable cart con JSON.stringify

function saveToStorage(){
localStorage.setItem('cart', JSON.stringify(cart));
};

// compilando funciones para mejor lectura y aplicandolos (llamandolos) luego en el codigo
// se usa parametro productId para pasar el valor button.dataset.productId y llevarlo a la funcion
// agregamos cart.push para enviar a la variable cart del archivo cart.js el array con objetos
// usamos un loop con forEach para chequear si la carta ya existe
// le ponemos parametro item para que que contenga productId y quantity
// se usa con productId en vez de productName por si hay nombres repetidos que son productos distintos
// y le ejecutamos una funcion if para saber si ya existe un productId
// creamos una variable matchingItem indefinida fuera del scope para poder usarla posteriormente
// si ya existe el producto, se incrementa quantity +1
// si no existe (else) carga el producto a cart
// llamo al final a la funcion saveToStorage

export function addToCart(productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
    });
  }

  saveToStorage();
}

// creo funcion para remover un producto de checkout al apretar boton remove
// se crea un nuevo array con todos los productos menos los eliminados
// el loop contendra toda la lista de productos que NO coincidan con el productId (que son los eliminados)
// y creara un nuevo array con solo los productos restantes
// export la funcion para aplicarla en checkout.js
// llamo a la funcion saveToStorage

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}
