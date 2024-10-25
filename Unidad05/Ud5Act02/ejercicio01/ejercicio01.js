document.addEventListener("input", function (event) {
    document.getElementById("indicacionMetros").innerHTML = document.getElementById("inputProxPlaya").value;
});

document.getElementById("formInmobiliaria").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita el envío normal del formulario
    let tablaResultados = crearTabla(obtenerDatos());
    document.getElementById("resultados").innerHTML = ''; // Limpiamos resultados previos
    document.getElementById("resultados").appendChild(tablaResultados); // Añadir la tabla al contenedor
});

function crearTabla(datosFormulario) {
    let tabla = document.createElement("table");

    Object.entries(datosFormulario).forEach(([key, value]) => {
        let fila = document.createElement("tr");

        // Crear las celdas
        let celdaKey = document.createElement("td");
        celdaKey.textContent = key; // Asignar el texto de la celda
        fila.appendChild(celdaKey); // Añadir la celda a la fila

        let celdaValue = document.createElement("td");
        celdaValue.textContent = value; // Asignar el texto de la celda
        fila.appendChild(celdaValue); // Añadir la celda a la fila

        // Añadir la fila a la tabla
        tabla.appendChild(fila);
    });
    
    return tabla; // Devolver la tabla completa
}

function asignarFecha() {
    let fecha = new Date();
    document.getElementById("campoOculto").value = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;
}

function obtenerDatos() {
    asignarFecha();

    let mueble = document.getElementById("selectInmueble").value;
    let provincia = document.getElementById("datalistProvincia").value;

    let ubicacionesSeleccionadas = Array.from(document.getElementById("selectUbicacion").selectedOptions).map(option => option.value); 

    let precioMax = document.getElementById("inputPrecioMax").value;
    let metrosMin = document.getElementById("inputMetrosMin").value;
    let alturaMin = document.getElementById("inputAlturaMin").value;
    let minHabitaciones = document.getElementById("inputMinHabitaciones").value;
    let minBaños = document.getElementById("inputMinBaños").value;;

    let caracteristica = Array.from(document.querySelectorAll("input[type='checkbox']")).filter(element => element.checked).map(element => element.value);   // Obtener los checkbox seleccionados

    let metrosPlaya = document.getElementById("inputProxPlaya").value;
    let estadoSeleccionado = document.querySelector('input[name="inputBtnIndiferente"]:checked').value;

    // Obtener los valores de los campos de texto
    let nombre = document.getElementById("inputNombre").value;
    let apellido = document.getElementById("inputApellido").value;
    let correo = document.getElementById("inputCorreo").value;
    let fechaNacimiento = document.getElementById("inputFechaNacimiento").value;
    let dni = document.getElementById("inputDni").value;
    let comentario = document.getElementById("textareaComentario").value;
    let fecha = document.getElementById("campoOculto").value;

    return {
        mueble: mueble,
        provincia,
        ubicaciones: ubicacionesSeleccionadas, // Usa el array de ubicaciones seleccionadas
        precioMax,
        metrosMin,
        alturaMin,
        minHabitaciones,
        minBaños,
        caracteristica,
        metrosPlaya,
        estadoSeleccionado,
        nombre,
        apellido,
        correo,
        fechaNacimiento,
        dni,
        comentario,
        fecha
    };
}
