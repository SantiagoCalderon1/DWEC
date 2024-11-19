// Santiago Calderon Castaño

// Estructura del Json
// cargo: "Gerente"
// contratado: 1
// created_at: "2024-11-13 13:57:18"
// edad: 34
// id: 261
// nombre: "Maura Cáceres"
// updated_at: "2024-11-13 18:16:33"

// Usuarios
const usuario1 = 'admin';
const password1 = 'admin';

// Variables globales
const peticion = new XMLHttpRequest(); // Creamos el objeto para la petición

// Funcionamiento del formulario y la autenticación ficticia
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    console.log('Formulario enviado');  // Verifica si el evento se captura correctamente
    // Verificar las credenciales
    if (verificarUsuario()) {
        // Ocultar el formulario si las credenciales son correctas
        // document.getElementsByClassName('login-box')[0].style.display = 'none';
        añadirClaseOcultar(document.getElementsByClassName('login-box')[0]);

        // aqui debe ser el código bueno
        peticion.onreadystatechange = function () {
            if (conexionPeticionEstabecida()) {
                contruirTabla(obtenerDatosPeticion());
            }
        }

        establecerComunicacion();
        enviarPeticion();
    } else {
        // Mostrar un mensaje de error si las credenciales son incorrectas
        alert("Usuario o contraseña incorrectos.");
    }

});

// Función para verificar si las credenciales son correctas
function verificarUsuario() {
    const usuarioIngresado = document.getElementById('user').value;
    const passwordIngresada = document.getElementById('password').value;

    // Comparar los valores ingresados con las credenciales predefinidas
    return usuarioIngresado === usuario1 && passwordIngresada === password1;
}

function establecerComunicacion() {
    // Establecemos la comunicación
    peticion.open('GET', 'http://test-api.jtarrega.es/api/empleados', true);
}

function enviarPeticion() {
    // Enviamos la peticion
    peticion.send();
}

function conexionPeticionEstabecida() {
    return peticion.readyState == 4 && peticion.status == 200;
}

function obtenerDatosPeticion() {
    return JSON.parse(peticion.responseText);
}

function contruirTabla(datosJson) {
    let table = document.createElement('table');
    let tr = document.createElement('tr');

    tr.append(
        crearTh('ID'),
        crearTh('Nombre'),
        crearTh('Edad'),
        crearTh('Cargo'),
        crearTh('Contratado'),
        crearTh('Opciones',2)
    );
    table.appendChild(tr);

    for (let i = 0; i < datosJson.length; i++) {
        let tr = document.createElement('tr');
        tr.append(
            crearTd(datosJson[i].id),
            crearTd(datosJson[i].nombre),
            crearTd(datosJson[i].edad),
            crearTd(datosJson[i].cargo),
            crearTd(datosJson[i].contratado),
            crearIcono('<i class="fa-solid fa-pen-to-square"></i>'),
            crearIcono('<i class="fa-solid fa-trash-can"></i>')
        );
        table.appendChild(tr);
    }
    console.log(table);
    document.getElementsByClassName('contendorTablaEmpleados')[0].appendChild(table);
}

function crearTh(contenido, colspan = 1) {
    let th = document.createElement('th');
    th.innerText = contenido;
    if (colspan > 1) {
        th.setAttribute('colspan', colspan);
    }
    return th;
}

function crearTd(contenido) {
    let td = document.createElement('td');
    td.innerText = contenido;
    return td;
}

function crearIcono(icono) {
    let td = document.createElement('td');
    td.innerHTML = icono;
    return td;
}

function añadirClaseOcultar(elemento) {
    elemento.classList.add('ocultar');
}

function eliminarClaseOcultar(elemento) {
    elemento.classList.remove('ocultar');
}


