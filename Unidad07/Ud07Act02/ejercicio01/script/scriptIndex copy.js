// =======================================================================================
// 	Author:	Santiago Calderon Castaño
// =======================================================================================
// Estructura del Json
// cargo: "Gerente"
// contratado: 1
// created_at: "2024-11-13 13:57:18"
// edad: 34
// id: 261
// nombre: "Maura Cáceres"
// updated_at: "2024-11-13 18:16:33"
// =======================================================================================

// =======================================================================================
// Variables globales
// Botones
const btnCerrarSesion = document.getElementById("btnCerrarSesion");
const btnAñadirEmpleado =
  document.getElementById("btnAñadirEmpleado");

// Contenedores
const tableEmployeeBox = document.getElementById("tableEmployeeBox");
const addEmployeeBox = document.getElementById("addEmployeeBox");
const deleteEmployeeBox = document.getElementById("deleteEmployeeBox");
const updateEmployeeBox = document.getElementById("updateEmployeeBox");

// =======================================================================================
// Eventos

// Creamos el evento para el boton de añadir empleado.
btnAñadirEmpleado.addEventListener('click', function () {
  añadirClaseOcultar(tableEmployeeBox);
  eliminarClaseOcultar(addEmployeeBox);
  console.log("Boton añadir empleado desactivado");
  btnAñadirEmpleado.setAttribute('disabled', true);
});

//Creamos el evento para el cerrar sesión
btnCerrarSesion.addEventListener("click", function () {
  // Eliminamos la clase que oculta todo y solo mostrar el iniciar sesion
  window.location.href = '../html/login.html';
});

// Evento para el formulario de añadir un nuevo empleado
document
  .getElementById("addEmployeeForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    formularioAddEmployee(event.submitter.value, this);
    // event.submitter.value = es el aceptar o cancelar del formulario
    // this = es el propio formulario
  });

// Evento para el formulario de eliminar un nuevo empleado
document
  .getElementById("deleteEmployeeForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    formularioDeleteEmployee(event.submitter.value, this);
    // event.submitter.value = es el aceptar o cancelar del formulario
    // this = es el propio formulario
  });

// Evento para el formulario de añadir un nuevo empleado
document
  .getElementById("updateEmployeeForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    formularioUpdateEmployee(event.submitter.value, this);
    // event.submitter.value = es el aceptar o cancelar del formulario
    // this = es el propio formulario
  });

// =======================================================================================
// Funciones
// =======================================================================================
// Listar Empleados
function listarEmpleados() {
  console.log("En funcion listarEmpleado");
  let peticion = new XMLHttpRequest();

  peticion.open("GET", "http://test-api.jtarrega.es/api/empleados", true);
  console.log("Peticion abierta");

  peticion.onreadystatechange = function () {
    if (peticion.readyState == 4 && peticion.status == 200) {
      console.log("Peticion realizada");
      construirTabla(JSON.parse(peticion.responseText));
    }
  };
  peticion.send();
}


function construirTabla(datosJson) {
  console.log("Construyendo tabla");
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
    tr.dataset.IdEmployee = datosJson[i].id;
    tr.append(
      crearTd(datosJson[i].id),
      crearTd(datosJson[i].nombre),
      crearTd(datosJson[i].edad),
      crearTd(datosJson[i].cargo),
      crearTd(datosJson[i].contratado),
      crearIcono('<i class="fa-solid fa-pen-to-square" onclick="updateEmployee(this)"></i>'),
      crearIcono('<i class="fa-solid fa-trash-can" onclick="deleteEmployee(this)"></i>')
    );
    table.appendChild(tr);
  }
  console.log(table);
  tableEmployeeBox.innerHTML = '';
  tableEmployeeBox.append(table);
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

function crearIcono(icono) {
  let td = document.createElement("td");
  td.innerHTML = icono;
  return td;
}









// =======================================================================================
// Añadir Empleado

function añadirEmpleado(datosEmpleado) {
  console.log("En funcion añadirEmpleado");

  let peticion = new XMLHttpRequest();

  peticion.open("POST", 'http://test-api.jtarrega.es/api/empleados', true);

  peticion.onreadystatechange = function () {
    if (peticion.readyState == 4 && (peticion.status == 200 || peticion.status == 201)) {
      console.log("Empleado añadido correctamente")
      //listarEmpleados();
    }
  }

  peticion.setRequestHeader('Content-Type', 'application/json');
  peticion.send(datosEmpleado);
  console.log("Peticion enviada a añadir");

}

function formularioAddEmployee(action, formulario) {
  switch (action) {
    case "Aceptar":
      console.log("Formulario añadir empleado aceptado"); // Verifica si el evento se captura correctamente

      let datosEmpleado = {
        nombre: document.getElementById("nombre").value,
        edad: document.getElementById("edad").value,
        cargo: document.getElementById("cargo").value,
        contratado: document.getElementById("contratado").checked ? 1 : 0,
      };

      console.log("empleado convertido en JSON");
      añadirEmpleado(JSON.stringify(datosEmpleado));
      formulario.reset();
      break;

    case "Cancelar":
      console.log("Formulario añadir empleado cancelado"); // Verifica si el evento se capturó
      eliminarClaseOcultar(tableEmployeeBox);
      añadirClaseOcultar(addEmployeeBox);

      btnAñadirEmpleado.removeAttribute("disabled");
      console.log("Boton añadir empleado activado");
      listarEmpleados();
      break;
  }
}













































// =======================================================================================
// Eliminar Empleado

function deleteEmployee(elemento) {
  let IdEmployee = elemento.closest('tr').dataset.IdEmployee;
  console.log("eliminando empleado con id = " + IdEmployee);

  let peticion = new XMLHttpRequest();

  peticion.open("GET", "http://test-api.jtarrega.es/api/empleados/" + IdEmployee, true);
  console.log("Peticion abierta");

  peticion.onreadystatechange = function () {
    if (peticion.readyState == 4 && peticion.status == 200) {
      console.log("Peticion realizada");
      rellenarFormulario(JSON.parse(peticion.responseText));
    }
  };
  peticion.send();

  añadirClaseOcultar(tableEmployeeBox);
  eliminarClaseOcultar(deleteEmployeeBox);
  console.log("Boton añadir empleado desactivado");
  btnAñadirEmpleado.setAttribute('disabled', true);
}

function rellenarFormulario(datosEmpleado) {
  console.log(datosEmpleado);
  document.getElementById('id2').value = datosEmpleado[0].id;
  document.getElementById('nombre2').value = datosEmpleado[0].nombre;
  document.getElementById('edad2').value = datosEmpleado[0].edad;
  document.getElementById('cargo2').value = datosEmpleado[0].cargo;
}

function formularioDeleteEmployee(action, formulario) {
  switch (action) {
    case "Aceptar":
      console.log("Formulario eliminar empleado aceptado"); // Verifica si el evento se captura correctamente
      eliminarEmpleado(document.getElementById('id2').value)
      break;

    case "Cancelar":
      console.log("Formulario añadir empleado cancelado"); // Verifica si el evento se capturó
      eliminarClaseOcultar(tableEmployeeBox);
      añadirClaseOcultar(deleteEmployeeBox);

      btnAñadirEmpleado.removeAttribute("disabled");
      console.log("Boton añadir empleado activado");
      listarEmpleados();
      break;
  }
}

function eliminarEmpleado(IdEmployee) {
  let peticion = new XMLHttpRequest();
  peticion.open("DELETE", 'http://test-api.jtarrega.es/api/empleados/' + IdEmployee, true)

  peticion.onreadystatechange = function () {
    if (peticion.readyState == 4 && (peticion.status == 200 || peticion.status == 201 || peticion.status == 204)) {
      console.log("Empleado eliminado correctamente.")
      añadirClaseOcultar(deleteEmployeeBox);
      eliminarClaseOcultar(tableEmployeeBox);
      listarEmpleados();
      btnAñadirEmpleado.removeAttribute("disabled");
    }
  }
  peticion.send();
  console.log("Peticion enviada a eliminar")
}

// =======================================================================================
// Actualizar Empleado

function updateEmployee(elemento) {
  let IdEmployee = elemento.closest('tr').dataset.IdEmployee;
  console.log("actualizando empleado con id = " + IdEmployee);

  let peticion = new XMLHttpRequest();

  peticion.open("GET", "http://test-api.jtarrega.es/api/empleados/" + IdEmployee, true);
  console.log("Peticion abierta");

  peticion.onreadystatechange = function () {
    if (peticion.readyState == 4 && peticion.status == 200) {
      console.log("Peticion realizada");
      rellenarFormulario2(JSON.parse(peticion.responseText));
    }
  };
  peticion.send();

  añadirClaseOcultar(tableEmployeeBox);
  eliminarClaseOcultar(updateEmployeeBox);
  console.log("Boton añadir empleado desactivado");
  btnAñadirEmpleado.setAttribute('disabled', true);
}

function rellenarFormulario2(datosEmpleado) {
  console.log(datosEmpleado);
  document.getElementById('id3').value = datosEmpleado[0].id;
}

function formularioUpdateEmployee(action, formulario) {
  switch (action) {
    case "Aceptar":
      console.log("Formulario eliminar empleado aceptado"); // Verifica si el evento se captura correctamente

      let datosEmpleado = {
        nombre: document.getElementById("nombre3").value,
        edad: document.getElementById("edad3").value,
        cargo: document.getElementById("cargo3").value,
        contratado: document.getElementById("contratado3").checked ? 1 : 0,
      };

      console.log("empleado convertido en JSON");
      actualizarEmpleado(JSON.stringify(datosEmpleado));
      añadirClaseOcultar(updateEmployeeBox);
      eliminarClaseOcultar(tableEmployeeBox);
      break;

    case "Cancelar":
      console.log("Formulario añadir empleado cancelado"); // Verifica si el evento se capturó
      eliminarClaseOcultar(tableEmployeeBox);
      añadirClaseOcultar(updateEmployeeBox);

      btnAñadirEmpleado.removeAttribute("disabled");
      console.log("Boton añadir empleado activado");
      listarEmpleados();
      break;
  }
}

function actualizarEmpleado(datosEmpleado) {
  let peticion = new XMLHttpRequest();
  peticion.open("PUT", 'http://test-api.jtarrega.es/api/empleados/' + document.getElementById('id3').value, true)

  peticion.onreadystatechange = function () {
    if (peticion.readyState == 4 && (peticion.status == 200 || peticion.status == 201)) {
      console.log("Empleado añadido correctamente")
      //listarEmpleados();
    }
  }

  peticion.setRequestHeader('Content-Type', 'application/json');
  peticion.send(datosEmpleado);
  console.log("Peticion enviada a añadir");

}

// =======================================================================================
// Funciones generales para CSS

function añadirClaseOcultar(elemento) {
  elemento.classList.add("ocultar");
}

function eliminarClaseOcultar(elemento) {
  elemento.classList.remove("ocultar");
}


// =======================================================================================

window.onload = function () {
  listarEmpleados();
}