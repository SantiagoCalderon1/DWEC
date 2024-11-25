// Santiago Calderon Castaño

// Estructura del Json
// cargo: "Gerente"
// contratado: 1
// created_at: "2024-11-13 13:57:18"
// edad: 34
// id: 261
// nombre: "Maura Cáceres"
// updated_at: "2024-11-13 18:16:33"

// =================================================================================================
// Variables globales
const btnCerrarSesion = document.getElementsByClassName("btn-cerrarSesion")[0];
const btnAñadirEmpleado =
  document.getElementsByClassName("btn-añadirEmpleado")[0];

const tableEmployeeBox =
  document.getElementsByClassName("tableEmployee-box")[0];
const addEmployeeFormBox = document.getElementsByClassName(
  "addEmployeeForm-box"
)[0];
const deleteEmployeeBox =
  document.getElementsByClassName("deleteEmployee-box")[0];
const editEmployeeBox = document.getElementsByClassName("editEmployee-box")[0];

const iconsEdit = document.getElementsByClassName("fa-pen-to-square");

const iconsDelete = document.getElementsByClassName("fa-trash-can");

// =================================================================================================
// Eventos generales

//Evento para el boton de cerrar la sesión
btnCerrarSesion.addEventListener("click", function () {
  let seguro = prompt("Esta seguro de cerrar sesión: si/no");
  if (seguro === "si") {
    console.log("Cerrando sesion.");
    //window.location.href = "../html/login.html";
  } else {
    console.log("Cerrando sesion cancelada.");
  }
});

//Evento para el boton de añadir empleado
btnAñadirEmpleado.addEventListener("click", function () {
  console.log("btn Añadir empleado click.");
  this.setAttribute("disabled", true);

  añadirClaseOcultar(tableEmployeeBox);
  eliminarClaseOcultar(addEmployeeFormBox);
});

// Evento para cada icono
for (const icon of iconsEdit) {
  icon.addEventListener('click', function () {
    const tr = icon.parentElement.closest('tr');   // Obtenemos el <tr> más cercano
    console.log('Clic en el ícono:', icon);
  });
}
// =================================================================================================
// Funciones para listar listar empleados

function listarEmpleados() {
  //eliminarClaseOcultar(tableEmployeeBox);

  let peticion = new XMLHttpRequest();

  peticion.onreadystatechange = function () {
    if (peticion.readyState == 4 && peticion.status == 200) {
      contruirTabla(JSON.parse(peticion.responseText));
    } else {
      console.log("Error al obtener datos de la peticion");
    }
  };
  peticion.open("GET", "http://test-api.jtarrega.es/api/empleados", true);
  peticion.send();
}

function contruirTabla(datosJson) {
  let table = document.createElement("table");
  let tr = document.createElement("tr");

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
    tr.dataset.idEmployee = datosJson[i].id;
    tr.append(
      crearTd(datosJson[i].id),
      crearTd(datosJson[i].nombre),
      crearTd(datosJson[i].edad),
      crearTd(datosJson[i].cargo),
      crearTd(datosJson[i].contratado),
      crearIcono('<i class="fa-solid fa-pen-to-square"></i>', datosJson[i].id),
      crearIcono('<i class="fa-solid fa-trash-can"></i>', datosJson[i].id)
    );
    table.appendChild(tr);
  }
  console.log(table);
  document.getElementsByClassName("tableEmployee-box")[0].appendChild(table);
}

function crearTh(contenido, colspan = 1) {
  let th = document.createElement("th");
  th.innerText = contenido;
  if (colspan > 1) {
    th.setAttribute("colspan", colspan);
  }
  return th;
}

function crearTd(contenido) {
  let td = document.createElement("td");
  td.innerText = contenido;
  return td;
}

function crearIcono(icono, idEmployee) {
  let td = document.createElement("td");
  td.innerHTML = icono;
  td.dataset.idEmployee = idEmployee;
  return td;
}

// =============================================================================================
//Funciones para insertar un empleado

function mostarFormularioAñadirEmpleado() {
  añadirClaseOcultar(tableEmployee);
  eliminarClaseOcultar(addEmployeeFormBox);
}

document
  .getElementById("addEmployeeForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const action = event.submitter.value;

    switch (action) {
      case "Aceptar":
        console.log("Formulario añadir empleado enviado"); // Verifica si el evento se captura correctamente

        let datosEmpleado = {
          nombre: document.getElementById("nombre").value,
          edad: document.getElementById("edad").value,
          cargo: document.getElementById("cargo").value,
          contratado: document.getElementById("contratado").checked ? 1 : 0,
        };

        añadirEmpleado(datosEmpleado);
        btnAñadirEmpleado.removeAttribute("disabled");
        this.reset();
        añadirClaseOcultar(addEmployeeFormBox);
        break;

      case "Cancelar":
        console.log("Formulario añadir empleado cancelado"); // Verifica si el evento se capturó
        eliminarClaseOcultar(
          document.getElementsByClassName("tableEmployee-box")[0]
        );
        añadirClaseOcultar(
          document.getElementsByClassName("addEmployeeForm-box")[0]
        );

        btnAñadirEmpleado.removeAttribute("disabled");
        console.log("Boton añadir empleado activado");
        break;

      default:
        break;
    }
  });

function añadirEmpleado(datosEmpleado) {
  let peticion = new XMLHttpRequest();

  peticion.open("POST", "http://test-api.jtarrega.es/api/empleados", true);

  peticion.onreadystatechange = function () {
    if (
      peticion.readyState == 4 &&
      (peticion.status == 200 || peticion.readyState == 201)
    ) {
      console.log(peticion.responseText);
      listarEmpleados();
    }
  };

  peticion.setRequestHeader("Content-Type", "application/json");
  peticion.send(JSON.stringify(datosEmpleado));
}

// =============================================================================================

function eliminarEmpleado() {
  let peticion = new XMLHttpRequest();




}

// =============================================================================================

function modificarEmpleado() {
  let peticion = new XMLHttpRequest();
}

// =============================================================================================

function cerrarSesion() {}

// =============================================================================================
//Funciones generales

function crearPeticion() {
  return new XMLHttpRequest();
}

// =============================================================================================
// Funciones para estilos CSS

function añadirClaseOcultar(elemento) {
  elemento.classList.add("ocultar");
}

function eliminarClaseOcultar(elemento) {
  elemento.classList.remove("ocultar");
}

window.onload = function () {
  listarEmpleados();
};
