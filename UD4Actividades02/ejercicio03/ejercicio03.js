// Estructura de datos
// Array con el nombre de los doctores
const consultas = [
    "Dr. Ándres Rojas",
    "Dr. Camila Díaz",
    "Dr. Paula Martinez",
    "Dr. Antonio Montabes",
    "Dr. Manuel Valero"
];

// Array con el nombre de los pacientes
let pacientes = [];

// Array un fila por consulta y una columna por paciente citado
let citas = [];

// Inicializar citas como array bidimensional vacío
for (let index = 0; index < consultas.length; index++) {
    citas[index] = []; // una fila por consulta
}

// Funciones de manejo de datos
function obtenerDatosPaciente() {
    generarInputs();
    document.getElementById("btn-aceptar").addEventListener("click", registrarPaciente);
}

function registrarPaciente() {
    const nombrePaciente = document.getElementById("nombrePaciente").value;
    const numeroConsulta = parseInt(document.getElementById("numeroConsulta").value);

    if (nombrePaciente && numeroConsulta >= 0 && numeroConsulta < consultas.length) {
        citarPaciente(nombrePaciente, numeroConsulta);
    } else {
        alert("Datos inválidos, vuelva a intentarlo");
    }
}

function citarPaciente(nombrePaciente, numeroConsulta) {
    citas[numeroConsulta].push(nombrePaciente);
    actualizarTabla();
}

// Funciones de manejo de la tabla
function actualizarTabla() {
    const cuerpoTabla = document.getElementById("cuerpoTablaPacientes");
    cuerpoTabla.innerHTML = ""; // Limpiamos la tabla

    for (let index = 0; index < consultas.length; index++) {
        const fila = document.createElement('tr');

        const celdaConsulta = document.createElement('td');
        celdaConsulta.innerHTML = consultas[index];
        fila.appendChild(celdaConsulta);

        const celdaPaciente = document.createElement('td');
        celdaPaciente.innerHTML = citas[index].length > 0 ? citas[index].join(", ") : "Sin Pacientes";
        fila.appendChild(celdaPaciente);

        cuerpoTabla.appendChild(fila);
    }
}

// Funciones para la consulta de pacientes
function siguientePaciente(numeroConsulta) {
    if (citas[numeroConsulta].length > 0) {
        const pacienteLlamado = citas[numeroConsulta].shift();
        alert(`Siguiente paciente para ${consultas[numeroConsulta]}: ${pacienteLlamado}`);
        actualizarTabla();  // Actualizamos la tabla de pacientes
    } else {
        alert(`No hay pacientes en espera para ${consultas[numeroConsulta]}.`);
    }
}

// Generación de elementos en el DOM
function generarInputs() {
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

function generarBotonesConsultas() {
    const divConsultas = document.getElementById("div-consultas");

    consultas.forEach((doctor, index) => {
        const botonConsulta = document.createElement("button");
        botonConsulta.innerHTML = `Siguiente en consulta de ${doctor}`;

        botonConsulta.addEventListener("click", function () {
            siguientePaciente(index);
        });

        divConsultas.appendChild(botonConsulta);
    });
}

// Función de inicialización
function iniciar() {
    generarBotonesConsultas();
    actualizarTabla();
}

// Eventos
document.getElementById("btn-citarse").addEventListener("click", obtenerDatosPaciente);
window.onload = iniciar;
