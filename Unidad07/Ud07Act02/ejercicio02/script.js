// Santiago Calderon Castaño

// Varibles gobales
const formRegister = document.getElementById('formRegister');
const formConsult = document.getElementById('formConsult');
const formDelete = document.getElementById('formDelete');

// Eventos
formRegister.addEventListener('submit', function (event) {
    console.log('prevencion del formRegister');
    event.preventDefault();
    let idPacient = this.id.value;

    writeData(idPacient);
    this.reset();
});

formConsult.addEventListener('submit', function (event) {
    console.log('prevencion del formConsult');

    event.preventDefault();
    let idPacient = this.id.value;
    console.log('id paciente'+ idPacient);
    switch (event.submitter.value) {
        case 'Consultar':
            console.log('formConsult Consultar');
            readData(idPacient);
            break;
        case 'Borrar':
            console.log('formConsult Borrar');
            deletePacient(idPacient);
            break;
    }
});

formDelete.addEventListener('submit', function (event) {
    console.log('prevencion del formDelete');

    event.preventDefault();
    let verificacion = this.verificacion.value;
    if (verificacion === 'Si Estoy Seguro') {
        deleteAllData();
        console.log('Eliminacion de datos aceptada.');
        this.reset();
    }

    if (verificacion !== 'Si Estoy Seguro') {
        this.reset();
        alert('Eliminación de datos cancelada.');
    }

});

// Funciones
function getData() {
    console.log('en getData()');
    datosCita = {
        id: formRegister.id.value,
        nombre: formRegister.nombre.value,
        apellidos: formRegister.apellidos.value,
        fecha: formRegister.fecha.value,
        hora: formRegister.hora.value
    };
    console.log('convirtinedo datos en Json');
    return JSON.stringify(datosCita);
}

function writeData(idPacient) {
    console.log('En writeData()');
    let datosCita = getData();
    sessionStorage.setItem(idPacient, datosCita);
    console.log('datosCita: ', datosCita);
    console.log('paciente escrito');
}

function readData(idPacient) {
    console.log('En readData()');
    let datosCita = JSON.parse(sessionStorage.getItem(idPacient));
    console.log(datosCita);
    let ulDatosBox = document.getElementById('datosBox').querySelector('ul');
    ulDatosBox.innerHTML = 
    `<li>Id del paciente: ${datosCita.id}</li>
    <li>Nombre: ${datosCita.nombre}</li>
    <li>Apellidos: ${datosCita.apellidos}</li>
    <li>Fecha: ${datosCita.fecha}</li>
    <li>Hora: ${datosCita.hora}</li>`;
    console.log('Inyectando datos en datosBox');
}


function deletePacient(idPacient) {
    console.log('En deletePacient()');
    sessionStorage.removeItem(idPacient);
    console.log('paciente con ' + idPacient +' eliminado');
}

function deleteAllData() {
    console.log('En deleteAllData()');
    sessionStorage.clear();
    console.log('Todos los pacientes eliminados');
}

