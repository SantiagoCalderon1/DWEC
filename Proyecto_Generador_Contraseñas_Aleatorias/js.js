//Generador de Contraseñas Aleatorias Santiago Calderon Castaño

let contraseña = "";

let checkBoxNumeros = document.getElementById("op-1");
let checkBoxLetrasMayus = document.getElementById("op-2");
let checkBoxLetrasMin = document.getElementById("op-3");
let checkBoxCaracteres = document.getElementById("op-4");

function generadorContraseña() {
  if (checkBoxNumeros.checked) {
    for (let contador = 0; contador < 3; contador++) {
      let numero = Math.floor(Math.random() * 10);
      contraseña += numero;
      //contraseña += Math.floor(Math.random() * 10);
    }
    contraseña += "-";
  }
  if (checkBoxLetrasMayus.checked) {
    for (let contador = 0; contador < 3; contador++) {
      let LetraMayus = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
      contraseña += LetraMayus;
      // contraseña += String.fromCharCode(Math.floor(Math.random() * 26) + 97);

    }
    contraseña += "-";
  }
  if (checkBoxLetrasMin.checked) {
    for (let contador = 0; contador < 3; contador++) {
      let LetraMin = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
      contraseña += LetraMin;
      // contraseña += String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    }
    contraseña += "-";
  }
  if (checkBoxCaracteres.checked) {
    for (let contador = 0; contador < 3; contador++) {
      let caracter = String.fromCharCode(Math.floor(Math.random() * 16) + 32);
      contraseña += caracter;
      // contraseña += String.fromCharCode(Math.floor(Math.random() * 16) + 32);
    }
  }
}

function generatePassword() {
  if (!checkBoxCaracteres.checked && !checkBoxLetrasMayus.checked 
    && !checkBoxLetrasMin.checked && !checkBoxNumeros.checked) {
    alert("Debes seleccionar al menos una opción.")
  } else {
    generadorContraseña();
    // document.getElementById("display").value = contraseña;
    document.getElementById("display").innerHTML = contraseña;
  }
}

function clearDisplay() {
  contraseña = "";
  // document.getElementById("display").value = "";
  document.getElementById("display").innerHTML = "";
}


