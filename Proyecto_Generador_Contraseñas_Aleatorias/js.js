//Generador de Contraseñas Aleatorias

const contraseña = "";

const checkBoxNumeros = document.getElementById("op-1");
const checkBoxLetrasMayus = document.getElementById("op-2");
const checkBoxLetrasMin = document.getElementById("op-3");
const checkBoxCaracteres = document.getElementById("op-4");

function generadorContraseña() {
  if (checkBoxNumeros.checked) {
    for (let contador = 0; contador < 3; contador++) {
      contraseña += Math.floor(Math.random() * 10);
    }
    contraseña += "-";
  }
  if (checkBoxLetrasMayus.checked) {
    for (let contador = 0; contador < 3; contador++) {
      let letra = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    }
    contraseña += "-";
  }
  if (checkBoxLetrasMin.checked) {
    for (let contador = 0; contador < 3; contador++) {
      let letra = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    }
    contraseña += "-";
  }
  if (checkBoxCaracteres.checked) {
    for (let contador = 0; contador < 3; contador++) {
      let letra = String.fromCharCode(Math.floor(Math.random() * 16) + 32);
    }
  }
}
