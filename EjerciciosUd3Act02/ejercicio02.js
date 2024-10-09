//Santiago Calderon Castaño
//Evento para el envio del formulario
document.getElementById("formularioDatosCiudadanos").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita que la página se recargue
    if (this.checkValidity()) {
        mostrarDatos();
    } else {
        alert("Por favor introduce todos los datos obligatorios");
    }
});

//Evento para la limpieza del fomulario y tabla
document.getElementById("limpiar-datos").addEventListener("click", function () {
    //limpiamos el formulario
    document.getElementById("formularioDatosCiudadanos").reset();
    document.getElementsByTagName("table")[0].getElementsByTagName("thead")[0].innerHTML = "";
    document.getElementsByTagName("table")[0].getElementsByTagName("tbody")[0].innerHTML = "";
});

//Funcion para imprimir los datos, que en mi caso uso una tabla constuida por filas y columnas
function mostrarDatos() {
    //Título tabla
    construirCabecera("Datos del Ciudadano");
    //Nombre
    construirCeldas(["Nombre", obtenerNombre()]);
    //Edad
    construirCeldas(["Edad", calcularEdad() + " años"]); //hasta aquí bien
    //Calle
    construirCeldas(["Calle", obtenerCalle()]);
    //Patio
    construirCeldas(["Patio", obtenerPatio()]);
    //Puerta
    construirCeldas(["Puerta", obtenerPuerta()]);
    //Codigo postal
    construirCeldas(["Código Postal", obtenerCodigoPostal()]);
    //Poblacion
    construirCeldas(["Población", obtenerPoblacion()]);

    //Idiomas, esta parte es iterativa con respecto al número de idiomas que introduzca el usuario
    let idiomas = obtenerIdiomas();
    if (idiomas !== "N/A") {
        for (let index = 0; index < idiomas.length; index++) {
            if (index === 0) {
                //Aquí en la primer celda pone Idiomas, y ya en las demás no.
                construirCeldas(["Idiomas", idiomas[index]]);
            } else {
                construirCeldas(["", idiomas[index]]);
            }
        }
    } else {
        //En este caso idimas sería = "N/A"
        construirCeldas(["Idiomas", idiomas]);
    }
    //Nombre hijos
    construirCeldas(["Nombre de los hijos", obtenerNombreHijos()]);
    //Numero hijos
    construirCeldas(["Numero de hijos", obtenerNumeroHijos()]);
}

//Funcion para construir las celdas de la tabla, construye X celdas con respecto al tamaño del paramtro, que sería un array
function construirCeldas(celdas) {
    let tbody = document.getElementsByTagName("table")[0].getElementsByTagName("tbody")[0];

    let fila = tbody.insertRow(-1);
    for (let index = 0; index < celdas.length; index++) {
        let celda = fila.insertCell(index);
        celda.textContent = celdas[index];
    }
}

//Funcion para construir la cabeza de la tabla
function construirCabecera(text) {
    let thead = document.getElementsByTagName("table")[0].getElementsByTagName("thead")[0];
    let fila = thead.insertRow(-1);
    let celda = fila.insertCell(0);
    celda.colSpan = 2; // hago que la celda ocupe el espacio de 2.
    celda.textContent = text;
}

/**Función que retorna el nombre del usuario al reves y en mayúsculas.
 * Eje: "Santiago Calderon" --> retorno: "CALDERON, SANTIAGO"
 */
function obtenerNombre() {
    return document.getElementById("input-nombre").value.toUpperCase().split(' ').reverse().join(',');
}

//Función que retorna la fecha de nacimiento ya construida (aaaa/mm/dd)
function obtenerFecha() {
    return new Date(document.getElementById("input-fecha-nacimiento").value);
}

/**Funcion para calcular la edad, tiene en cuenta si el dia de tu cumpleaños ya pasó.
 * 
 * Ejemplo: hoy 08/10/2024
 *          Nacimiento 20/10/2003
 * 
 * 2024 -2003 = 21, pero yo aún no es 20 de octubre, así que en teoría no tengo 21 todavía,
 * entonces también tiene en cuenta si es tu dia de cumpleaños no ha pasado, y si no ha pasado
 * se resta 1 a años.
 * 
 * */
function calcularEdad() {
    let fechaActual = new Date();
    let fechaNacimiento = obtenerFecha();

    let edad = ((fechaActual.getFullYear() - fechaNacimiento.getFullYear())) > 0 ?
        (fechaActual.getMonth() > fechaNacimiento.getMonth() ||
            (fechaActual.getMonth() === fechaNacimiento.getMonth() && fechaActual.getDate() > fechaNacimiento.getDate())
            ? fechaActual.getFullYear() - fechaNacimiento.getFullYear()
            : fechaActual.getFullYear() - fechaNacimiento.getFullYear() - 1)
        : 0;
    return edad;
}

//Función que retorna un array con la dirección
function obtenerDireccion() {
    return document.getElementById("input-direccion").value.split(' ');
}

/** Función que retorna una cadena del nombre de la calle.
 * Ejemplo: "Duque de mandas n37 pta15" --> "Duque de mandas n37"
 * 
 * */
function obtenerCalle() {
    let calle = obtenerDireccion();
     // Unir todos menos el último elemento
    return (calle.length > 1 ? calle.slice(0, -1).join(' ') : "N/A");
}
//Funcion para obtener el numero de la calle, (/\d+/) siginica cualquier numero
function obtenerNumeroCalle() {
    let numeroCalle = obtenerDireccion();
    if (numeroCalle.length > 0) {
        let numeroCompleto = numeroCalle[numeroCalle.length - 1];
        numeroCalle = numeroCompleto.substring(1);
    return numeroCalle.match(/\d+/) ? numeroCalle.match(/\d+/)[0] : "N/A";
    }
    return "N/A";
}
//Funcion para obtener el número de la puerta
function obtenerPuerta() {
    let puerta = obtenerDireccion();
    if (puerta.length > 0) {
        puerta = puerta[puerta.length - 1];
    return puerta.toLowerCase().startsWith("pta") ? puerta.substring(3) : "N/A";
    }
    return "N/A";
}
//Funcion para obtener el patio, si no está se usa N/A
function obtenerPatio() {
    let patio = obtenerDireccion();
    if (patio.length > 0) {
        patio = patio[patio.length - 2];
        return patio.startsWith("pati") ? patio.substring(4) : "N/A";
    }
    return "N/A";
}

//Funcion para obtener la direccion postal con la poblacion, los datos de poblacion los guardamos en mayusculas
function obtenerDireccionPostal() {
    return document.getElementById("input-codigo-postal").value.toUpperCase().split('-');
}
//Funcion para obtener el código postal
function obtenerCodigoPostal() {
    let codigo = obtenerDireccionPostal();
    return (codigo.length > 0 ? codigo[0] : "N/A");
}
//Funcion para obtener la población
function obtenerPoblacion() {
    let poblacion = obtenerDireccionPostal();
    return (poblacion.length > 0 ? poblacion[1] : "N/A");
}

//Funcion para obtener el listado de idiomas, los almacenamos en un array en minúsculas
function obtenerIdiomas() {
    let idiomas = document.getElementById("input-idiomas").value.toLowerCase().split("-");
    return (idiomas.length > 0 ? idiomas : []);
}

//Función que calcula el numero de hijos
function obtenerNumeroHijos() {
    let nombreHijos = obtenerNombreHijos();
    return (nombreHijos !== "N/A" ? nombreHijos.length : "N/A");
}

//Funcion para obtener el nombre de los hijos, los almacena en un array
function obtenerNombreHijos() {
    let nombreHijos = document.getElementById("input-nombre-hijos").value;
    return (nombreHijos.length > 0 ? nombreHijos.split("-") : "N/A");
}

