//Santiago Calderon Castaño

function mostrarDatos() {
  document.getElementById("row1").innerHTML = `<td colspan="2">Datos del Ciudadano</td>`;

  
  document.getElementById("row2").innerHTML = `<td>Nombre</td><td>${obtenerNombre()}</td>`;

  document.getElementById("row3").innerHTML = `<td>Edad</td><td>${obtenerEdad()}</td>`;

  document.getElementById("row4").innerHTML = `<td>Calle</td><td">${obtenerCalle()}</td>`;

  document.getElementById("row5").innerHTML = `<td>Patio</td><td">${obtenerPatio()}</td>`;

  document.getElementById("row6").innerHTML = `<td>Puerta</td><td">${obtenerPuerta()}</td>`;

  document.getElementById( "row7").innerHTML = `<td>Código Postal</td><td>${obtenerCodigoPostal()}</td>`;

  document.getElementById("row8").innerHTML = `<td>población</td><td>${obtenerPoblacion()}</td>`;

  document.getElementById("row9").innerHTML = `<td>Idiomas</td><td>${obtenerIdiomas()[0]}</td>`;

  document.getElementById("row10").innerHTML = `<td></td><td>${obtenerIdiomas()[1]}</td>`;

  document.getElementById("row11").innerHTML = `<td></td><td>${obtenerIdiomas()[2]}</td>`;

  document.getElementById("row12").innerHTML = `<td>Num. Hijos</td><td>${obtenerNumeroHijos()}</td>`;
}


function obtenerNombre() {
    return  document.getElementById("input-nombre").value;
}

function obtenerEdad() {
    return document.getElementById("input-edad").value;
}

function obtenerCalle() {
    return document.getElementById("input-calle").value;
}

function obtenerPatio() {
    return document.getElementById("input-patio").value;
}

function obtenerPuerta() {
    return document.getElementById("input-puerta").value;
}

function obtenerCodigoPostal() {
    return document.getElementById("input-codigo-postal").value;
}

function obtenerPoblacion() {
    return document.getElementById("input-poblacion").value;
}

function obtenerIdiomas() {
    let idioma1 = document.getElementById("input-idioma1").value;
    let idioma2 = document.getElementById("input-idioma2").value;
    let idioma3 = document.getElementById("input-idioma3").value;
    
    let idiomas =  [];

    (idioma1 !== null ? idiomas.pop(idioma1): "N/A");
    (idioma2 !== null ? idiomas.pop(idioma2): "N/A");
    (idioma3 !== null ? idiomas.pop(idioma3): "N/A");

    return idiomas;
}

function obtenerNumeroHijos() {
    return document.getElementById("input-numero-hijos").value;
}

