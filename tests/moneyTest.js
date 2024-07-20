// importando funcion de archivo money.js para testeos

import {formatCurrency} from '../scripts/utils/money.js';

//a la variable se le da un parametro de 2095 para probar
// y se testea con un loop if
// esto es testeo manual. Hay 2 tipos, basic test y edge test
// este testeo se considera basic test = testea si funciona el codigo o no funciona con valores simples

console.log('test suite: formatCurrency');

console.log('converts cents into dollars');

if (formatCurrency(2095) === '20.95') {
  console.log('passed');
} else {
  console.log('failed');
}

// este testeo se considera edge test = testea con valores mas dificiles de manejar

console.log('works with 0');

if (formatCurrency(0) === '0.00') {
  console.log('passed');
} else {
  console.log('failed');
}

console.log('rounds up to the nearest cent');

if (formatCurrency(2000.5) === '20.01') {
  console.log('passed');
} else {
  console.log('failed');
}



