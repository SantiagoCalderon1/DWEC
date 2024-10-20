//Santiago Calderon Castaño

// Estructura de datos

//Array con el nombre de los doctores
const consultas = [
    "Dr. Ándres Rojas",
    "Dr. Camila Díaz",
    "Dr. Paula Martinez",
    "Dr. Antonio Montabes",
    "Dr. Manuel Valero"
];

//Array con el nombre de los pacientes
let pacientes = [];

//Array un fila por consulta y una columna por paciente citado
let citas = [];

//Inicializamos citas como array bidimensional vacío
for (let index = 0; index < consultas.length; index++) {
    citas[index] = []; // una fila por consulta
}

//Funciones de manejo de datos

//Función para obtener los datos
function obtenerDatosPaciente() {
    //Llamamos a la función que construye los inputs para la obtención de datos
    generarInputs();
    
    //Creamos un evento para el elemento "btn-aceptar" que espere un click y llame a la función registrarPaciente
    document.getElementById("btn-aceptar").addEventListener("click", registrarPaciente);
}

//Función para registar un paciente
function registrarPaciente() {
    //obtenemos el valor del elemento "nombrePaciente"
    const nombrePaciente = document.getElementById("nombrePaciente").value;
    //obtenemos el valor del elemento "numeroConsulta"
    const numeroConsulta = parseInt(document.getElementById("numeroConsulta").value);

    /**
     * nombrePaciente = "" --> false || nombrePaciente = "Juan" --> true
     * El numeroConsulta debe ser mayor a 0 y menor al tamaño del array de consultas
     *  */ 
    if (nombrePaciente && numeroConsulta >= 0 && numeroConsulta < consultas.length) {
        citarPaciente(nombrePaciente, numeroConsulta);
    } else {
        alert("Datos inválidos, vuelva a intentarlo");
    }
}

//Función para citar a un paciente
function citarPaciente(nombrePaciente, numeroConsulta) {
    //Añadimos el paciente al array de pacientes
    citas[numeroConsulta].push(nombrePaciente);
    
    //Actualizamos la tabla
    actualizarTabla();

}

// Funciones de manejo de la tabla
function actualizarTabla() {
    //Obtenemos el elemento tbody llamado "cuerpoTablaPacientes"
    let cuerpoTabla = document.getElementById("cuerpoTablaPacientes");
    cuerpoTabla.innerHTML = ""; // Limpiamos la tabla

    //Recorremos el array de consultas
    for (let index = 0; index < consultas.length; index++) {
        //Creamos una fila
        let fila = document.createElement('tr');

        //Creamos una celda para la consulta
        let celdaConsulta = document.createElement('td');
        //Insertamos los doctores a la lista
        celdaConsulta.innerHTML = consultas[index];
        //Insertamos la celda en la fila
        fila.appendChild(celdaConsulta);

        //Creamos una celda para los pacientes
        let celdaPaciente = document.createElement('td');
        //Insertamos los pacientes a la lista  
        celdaPaciente.innerHTML = citas[index].length > 0 ? citas[index].join(", ") : "Sin Pacientes";
        //Insertar la celda en la fila
        fila.appendChild(celdaPaciente);

        //insertamos la fila en la tabla
        cuerpoTabla.appendChild(fila);
    }
}

// Funcion para la consulta de pacientes
function siguientePaciente(numeroConsulta) {
    // si hay al menos un paciente lo anuncia
    if (citas[numeroConsulta].length > 0) {
        //Obtenemos y eliminamos al pociente al mismo tiempo
        let pacienteLlamado = citas[numeroConsulta].shift();
        alert(`Siguiente paciente para ${consultas[numeroConsulta]}: ${pacienteLlamado}`);
        actualizarTabla();  // Actualizamos la tabla de pacientes
    } else {
        //si no ha pacientes lo anunciamos
        alert(`No hay pacientes en espera para ${consultas[numeroConsulta]}.`);
    }
}

// Generamos los inputs y lo inyectamos en el DOM
function generarInputs() {
//Obtenemos el elemento "inputs" y inyectamos el código que queremos
    document.getElementById("inputs").innerHTML = `
        <label for="nombrePaciente">Nombre:</label>
        <input type="text" name="nombrePaciente" id="nombrePaciente" placeholder="Nombre y apellidos" required />
        <br />
        <label for="numeroConsulta">Número de Consulta: </label>
        <input type="number" name="numeroConsulta" id="numeroConsulta" required />
        <br>
        <button id="btn-aceptar">Aceptar</button>
        <br />`;
}

//Función para crear dinamicamente los botones de las consultas
function generarBotonesConsultas() {
    //Obtenemos el elemento "div-consultas" que es donde pondremos más adelante los botones
    let divConsultas = document.getElementById("div-consultas");
    //Iteramos a consultas que es quien contiene los doctores
    consultas.forEach((doctor, index) => {
        //Creamos un botón
        let botonConsulta = document.createElement("button");
        //Insertamos el texto del botón
        botonConsulta.innerHTML = `Siguiente en consulta de ${doctor}`;
        //Creamos un evento que esté pendiente de un click para ejecutar una función
        botonConsulta.addEventListener("click", function () {
            //Cuando el evento ocurra ejecutamos la función siguientePaciente
            siguientePaciente(index);
        });
        //Inyectamos el botón en el div
        divConsultas.appendChild(botonConsulta);
    });
}

// Función de inicialización
function iniciar() {
    generarBotonesConsultas();
    actualizarTabla();
}

// Creeamos unos eventos, para ejecutar el script
document.getElementById("btn-citarse").addEventListener("click", obtenerDatosPaciente);
window.onload = iniciar; //Cuando la página se cargue ejecuta iniciar
