// =======================================================================================
// 	Author:	Santiago Calderon Castaño
// =======================================================================================
/**
 * Datos extras: 
 * - Usaré muchos console.log para ir monitorizando el flujo de la aplicación.
 * 
 * - peticion.setRequestHeader('Content-Type', 'application/json');
 *   informa al servidor que el cuerpo de la solicitud HTTP contiene datos en formato JSON.
 *   se usa cuando se envian solicitudes POST o PUT
  
 * - peticion.onreadystatechange = function () {}
 *   onreadystatechange es un evento y se produce cada vez que se haya producido un cambio en el atributo "ready"
 */
// =======================================================================================
// Estructura del JSON:
// cargo: "Gerente"
// contratado: 1
// created_at: "2024-11-13 13:57:18"
// edad: 34
// id: 261
// nombre: "Maura Cáceres"
// updated_at: "2024-11-13 18:16:33"
// =======================================================================================
// Se usarán estos terminos.
// insertar   = add
// eliminar   = delete
// actualizar = update
// listar     = list
// =======================================================================================
// Variables globales

// Boton
const btnAñadirEmpleado = document.getElementById("iconAddEmployee");

// Contenedores
const tableEmployeeBox = document.getElementById("tableEmployeeBox");
const EmployeeFormBox = document.getElementById("EmployeeFormBox");

// sección del id del formulario 
const sectionEmployeeFormId = document.getElementById('sectionEmployeeFormId');

// El formulario
const EmployeeForm = document.getElementById('EmployeeForm');
const subtitle = document.getElementById('subtitle');

// Inputs del formulario
const id = document.getElementById('id');
const nombre = document.getElementById('nombre');
const edad = document.getElementById('edad');
const cargo = document.getElementById('cargo');

// =======================================================================================
// Funciones para el formulario
function desactivarFormulario() {
  // Desactivamos todo el formulario, lo uso en deleteEmployee
  console.log("En desactivarFormulario");
  id.setAttribute('disabled', true);
  nombre.setAttribute('disabled', true);
  edad.setAttribute('disabled', true);
  cargo.setAttribute('disabled', true);
}

function refrescarLista() {
  // Despues de cada función de la app volvemos a activar todas las opciones
  id.removeAttribute('disabled');
  nombre.removeAttribute('disabled');
  edad.removeAttribute('disabled');
  cargo.removeAttribute('disabled');
  sectionEmployeeFormId.classList.remove('ocultar');
  btnAñadirEmpleado.removeAttribute("disabled");
  // listamos de nuevo los empleados
  listarEmpleados();
  // Mostramos la lista
  alternarVisibilidad(EmployeeFormBox, tableEmployeeBox);
}

function formAddEmployee() {
  console.log("En formAddEmployee.");
  subtitle.innerText = 'Añadiendo Empleado';
  // configuramos el formulario
  EmployeeForm.dataset.funcionalidad = "";  // limpiamos el dataset
  EmployeeForm.dataset.funcionalidad = "insertar";

  sectionEmployeeFormId.classList.add("ocultar");
  btnAñadirEmpleado.setAttribute('disabled', true);
  // Alternamos visibilidad 
  alternarVisibilidad(tableEmployeeBox, EmployeeFormBox);
}

function formUpdateEmployee(elemento) {
  console.log("actualizando empleado con id = " + elemento.closest('tr').dataset.IdEmployee);
  subtitle.innerText = 'Actualizando Empleado';
  // Alternamos visibilidad y configuramos el formulario
  EmployeeForm.dataset.funcionalidad = "";
  EmployeeForm.dataset.funcionalidad = "actualizar";

  sectionEmployeeFormId.classList.remove("ocultar");
  id.setAttribute('disabled', true);
  rellenarDatosFormulario(elemento);
  alternarVisibilidad(tableEmployeeBox, EmployeeFormBox);
}

function formDeleteEmployee(elemento) {
  if (document.getElementsByTagName('tr').length > 1) {
    console.log("eliminado empleado con id = " + elemento.closest('tr').dataset.IdEmployee);
    subtitle.innerText = 'Eliminando Empleado';
    // Alternamos visibilidad y configuramos el formulario
    EmployeeForm.dataset.funcionalidad = "";
    EmployeeForm.dataset.funcionalidad = "eliminar";
    // Alternamos visibilidad y configuramos el formulario
    sectionEmployeeFormId.classList.remove("ocultar");
    desactivarFormulario();
    rellenarDatosFormulario(elemento);
    alternarVisibilidad(tableEmployeeBox, EmployeeFormBox);
  } else {
    alert("No se pueden eliminar más empleados");
  }
}

// Manejador único del evento submit del formulario
EmployeeForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Evita el comportamiento predeterminado de envío
  const action = event.submitter.value; // Captura el botón que se presionó
  const funcionalidad = EmployeeForm.dataset.funcionalidad; // Recupera la funcionalidad asignada
  // Esto me sirve para depurar
  console.log(`Funcionalidad = ${funcionalidad}, Acción = ${action}, Evento submit capturado`);
  // Casos posibles
  if (action === "Aceptar") {
    switch (funcionalidad) {
      case "insertar":
        insertarEmpleado(obtenerDatosFormulario(funcionalidad));
        this.reset(); // Reiniciamos el formulario
        break;
      case "actualizar":
        console.log("actualizar empleado");
        actualizarEmpleado(obtenerDatosFormulario(funcionalidad))
        this.reset(); // Reiniciamos el formulario
        refrescarLista();
        break;
      case "eliminar":
        console.log("Eliminar empleado");
        deleteEmployee();
        this.reset(); // Reiniciamos el formulario
        refrescarLista();
        break;
    }
  } else if (action === "Cancelar") {
    this.reset();
    refrescarLista();
  }
});


//Funcion que obtene los datos del formulario y los convierne en un objero JSON
function obtenerDatosFormulario(funcionalidad) {
  console.log("en función obtenerDatosFormulario");
  let datosEmpleado = {};
  if (funcionalidad !== 'insertar') { // para insertar no nos interesa el id
    datosEmpleado = {
      id: id.value
    }
  }
  datosEmpleado = {
    nombre: nombre.value,
    edad: edad.value,
    cargo: cargo.value,
    contratado: contratado.checked ? 1 : 0,
  }
  return JSON.stringify(datosEmpleado);
}

function rellenarDatosFormulario(elemento) {
  console.log("en función rellenarDatosFormulario");
  let IdEmployee = elemento.closest('tr').dataset.IdEmployee;
  console.log("Rellenando formulario con datos del empleado con id = " + IdEmployee);

  let peticion = new XMLHttpRequest();
  // Abrimos la petición
  peticion.open("GET", "http://test-api.jtarrega.es/api/empleados/" + IdEmployee, true);
  console.log("Peticion rellenarDatosFormulario abierta");
  // Verificamos que la petición esté ready
  peticion.onreadystatechange = function () {
    if (peticion.readyState == 4 && peticion.status == 200) {
      let Json = JSON.parse(peticion.responseText);
      console.log("Peticion rellenarDatosFormulario realizada");
      if (EmployeeForm.dataset.funcionalidad !== 'insertar') { // cuando sea insertar omitimos el id
        id.value = Json[0].id;
      }
      nombre.value = Json[0].nombre;
      edad.value = Json[0].edad;
      cargo.value = Json[0].cargo;
      contratado.checked = (Json[0].contratado === 1) ? true : false;
    }
  };
  // Enviamos la petición
  peticion.send();
  console.log("Peticion rellenarDatosFormulario enviada");
}
// =======================================================================================
// FUNCIONES ESPECIFICAS
// =======================================================================================
// Listar Empleados = Funciona correctamente
function listarEmpleados() {
  console.log("En función listarEmpleado.");
  let peticion = new XMLHttpRequest(); // Instaciamos el objeto de la petición XHR
  // Hacemos la petición GET a la API, true indica que la petición se hace de manera asíncrona
  peticion.open("GET", "http://test-api.jtarrega.es/api/empleados", true);
  console.log("Petición listar empleado abierta.");

  peticion.onreadystatechange = function () {
    if (peticion.readyState == 4 && peticion.status == 200) {
      console.log("Petición listar empleado realizada.");
      construirTabla(JSON.parse(peticion.responseText));
    }
  };
  peticion.send();
  console.log("Petición listar empleado enviada.")
}

// Funcion que crea una tabla dinamicamente con los datos del JSON
function construirTabla(datosJson) {
  console.log("En función construirTabla");
  let table = document.createElement("table");
  let tr = document.createElement("tr");
  // Insertamos los td al tr
  tr.append(
    crearTh("ID"),
    crearTh("Nombre"),
    crearTh("Edad"),
    crearTh("Cargo"),
    crearTh("Contratado"),
    crearTh("Opciones", 2)
  );
  table.appendChild(tr);

  for (let i = 0; i < datosJson.length; i++) {
    let tr = document.createElement("tr");
    tr.dataset.IdEmployee = datosJson[i].id;
    // a cada tr que sería la fila le añadimos el atributo con id del empleado
    tr.append(
      crearTd(datosJson[i].id),
      crearTd(datosJson[i].nombre),
      crearTd(datosJson[i].edad),
      crearTd(datosJson[i].cargo),
      crearTd(datosJson[i].contratado),
      crearIcono('<i class="fa-solid fa-pen-to-square" onclick="formUpdateEmployee(this)" title="Editar Empleado"></i>'),
      crearIcono('<i class="fa-solid fa-trash-can" onclick="formDeleteEmployee(this)" title="Eliminar Empleado"></i>')
      //Al crear el icono también creamos un evento onclick para cada icono
    );
    table.appendChild(tr);
  }
  console.log(table); // asi consultamos la tabla en código
  tableEmployeeBox.innerHTML = ''; // limpiamos la tabla para no escribirla 2 veces
  tableEmployeeBox.append(table);
  console.log("Tabla contruida e insertada.")
}

// Funcion que crea un th
function crearTh(contenido, colspan = 1) {
  let th = document.createElement("th");
  th.innerText = contenido;
  if (colspan > 1) {
    th.setAttribute("colspan", colspan);
  }
  return th;
}

// Funcion que crea un td
function crearTd(contenido) {
  let td = document.createElement("td");
  td.innerText = contenido;
  return td;
}

// Funcion que crea un icono
function crearIcono(icono) {
  let td = document.createElement("td");
  td.innerHTML = icono; // insertamos el td el código de icono
  return td;
}
// =======================================================================================
// Añadir Empleado
// función para añadir un nuevo empleado a la base de datos
function insertarEmpleado(datosEmpleado) {
  console.log("En función añadirEmpleado");
  let peticion = new XMLHttpRequest(); // Instaciamos el objeto de la petición XHR
  // Abrimos la petición
  peticion.open("POST", 'http://test-api.jtarrega.es/api/empleados', true);
  console.log("Petición añadir empleado abierta.");
  // onreadystatechange es un evento y se produce cada vez que se haya producido un cambio en el atributo "ready"
  peticion.onreadystatechange = function () {
    if (peticion.readyState == 4 && (peticion.status == 200 || peticion.status == 201)) {
      console.log("Petición añadir empleado realizada.");
    }
  }
  peticion.setRequestHeader('Content-Type', 'application/json');
  peticion.send(datosEmpleado);
  console.log("Petición añadir empleado enviada.");
}

// =======================================================================================
// Actualizar Empleado
function actualizarEmpleado(datosEmpleado) {
  let peticion = new XMLHttpRequest();
  // Abrimos la petición
  peticion.open("PUT", "http://test-api.jtarrega.es/api/empleados/" + id.value, false)
  console.log("Peticion actualizarEmpleado abierta");
  peticion.onreadystatechange = function () {
    if (peticion.readyState == 4 && (peticion.status == 200 || peticion.status == 201)) {
      console.log("Peticion actualizarEmpleado realizada");
    }
  };
  peticion.setRequestHeader('Content-Type', 'application/json');
  // informa al servidor que el cuerpo de la solicitud HTTP contiene datos en formato JSON.
  // se usa cuando se envian solicitudes POST o PUT
  peticion.send(datosEmpleado); // Eviamos la petición
  console.log("Peticion actualizarEmpleado enviada");
}
// =======================================================================================
// Eliminar Empleado
function deleteEmployee() {
  let peticion = new XMLHttpRequest(); // Instaciamos el objeto de la petición XHR

  peticion.open("DELETE", "http://test-api.jtarrega.es/api/empleados/" + id.value, false); // abrimos peticon con el id del empleado
  console.log("Peticion eliminar empleado abierta");

  peticion.onreadystatechange = function () {
    if (peticion.readyState == 4 && (peticion.status == 200 || peticion.status == 201 || peticion.status == 204)) {
      console.log("Peticion realizada");
    }
  };
  peticion.send();
}
// =======================================================================================
// Funciones generales
// Metodo que alterna la visibilidad de los contenedores, ocultando el primero y mostrando el segundo.
function alternarVisibilidad(ocultar, mostrar) {
  ocultar.classList.add("ocultar");
  mostrar.classList.remove("ocultar");
}

// Función que nos redirecciona a la página de login
function logout() {
  window.location.href = '../html/login.html';
}
// =======================================================================================
// Función que lo primero que hace cuando se carga la página es listar los empleados
window.onload = function () {
  listarEmpleados();
}