//Ejercicio sobre Array - Santiago Calderon Castaño
let arrayLibros = [
  [
    "1",
    "Access para Windows",
    "Charles Siagel",
    "Anaya",
    "Informatica",
    "85-7614-759-7",
    "450",
    45.67,
  ],
  [
    "2",
    "Salud",
    "Eduardo Almansa",
    "Deusto",
    "Medicina",
    "24-3547590-1",
    "153",
    23.18,
  ],
  [
    "3",
    "Redes de Computadores",
    "Luis Cárcel",
    "Parainfo",
    "Informática",
    "47-8829-435-7",
    "215",
    32.86,
  ],
];

function buscarLibro() {
  //let codigoLibro = prompt("Introduce el código del libro");

  let codigoLibro = document.getElementById("input").value;

  if (codigoLibro !== "" && codigoLibro !== null) {
    let libro = arrayLibros.find((libro) => libro[0] === codigoLibro);

    /*.find((libro) => libro[0] == codigoLibro)
          es un metodo de los arrays que busca el primer elemento del array que cumple con la 
          condición especificada en la función de devolución de llamada (callback) que se le pasa.
          */

    //((libro) => libro[0] == codigoLibro) --> callback
    /* el operador => indica un función anónima (sin nombre) que recibe un argumento (libro)
        y devuelve el resultado de la expreción a la derecha del operador =>
        
        es igual que esto:
          function(libro) {
            return libro[0] === codigoLibro;
          }
  
        En Resumen ahorra un for y un if, ya que itera y busca al tiempo, devuelve undefined si no
        se cumple la condición.
        */

    if (libro) {
      // seria igual a libro != undefined
      document.getElementById("codigo").innerHTML = libro[0];
      document.getElementById("titulo").innerHTML = libro[1];
      document.getElementById("autor").innerHTML = libro[2];
      document.getElementById("editorial").innerHTML = libro[3];
      document.getElementById("tema").innerHTML = libro[4];
      document.getElementById("isbn").innerHTML = libro[5];
      document.getElementById("paginas").innerHTML = libro[6];
      document.getElementById("precio").innerHTML = libro[7];
    } else {
      alert("El libro no existe");
    }
  } else {
    alert("No has introducido el código del libro");
  }
}

function limpiarBusqueda() {
  document.getElementById("input").value = ""; // Limpio el input
  document.getElementById("codigo").innerHTML = ""; // Se limpian los datos de la tabla
  document.getElementById("titulo").innerHTML = "";
  document.getElementById("autor").innerHTML = "";
  document.getElementById("editorial").innerHTML = "";
  document.getElementById("tema").innerHTML = "";
  document.getElementById("isbn").innerHTML = "";
  document.getElementById("paginas").innerHTML = "";
  document.getElementById("precio").innerHTML = "";
}

window.onload = buscarLibro;

/*
function buscarLibro() {
  let codigoLibro = prompt("Introduce el código del libro");

  if (codigoLibro !== "" && codigoLibro !== null) {
    let libroEncontrado = null; // Variable para almacenar el libro encontrado

    for (let i = 0; i < arrayLibros.length; i++) {
      if (arrayLibros[i][0] === codigoLibro) {
        libroEncontrado = arrayLibros[i]; // Guarda el libro encontrado
        break; // Sale del bucle si encuentra el libro
      }
    }

    if (libroEncontrado) {
      document.getElementById("codigo").innerHTML = libroEncontrado[0];
      document.getElementById("titulo").innerHTML = libroEncontrado[1];
      document.getElementById("autor").innerHTML = libroEncontrado[2];
      document.getElementById("editorial").innerHTML = libroEncontrado[3];
      document.getElementById("tema").innerHTML = libroEncontrado[4];
      document.getElementById("isbn").innerHTML = libroEncontrado[5];
      document.getElementById("paginas").innerHTML = libroEncontrado[6];
      document.getElementById("precio").innerHTML = libroEncontrado[7];
    } else {
      alert("El libro no existe");
    }
  } else {
    alert("No has introducido el código del libro");
  }
}

function inicializar() {
  buscarLibro();
}

window.onload = inicializar;
*/
