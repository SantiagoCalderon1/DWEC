// Santiago Calderon Castaño

// Variables gobales
const formVehicle = document.getElementById('formVehicle');

// Eventos

formVehicle.addEventListener('submit', function (event) {
    event.preventDefault();
    let matricula = this.matricula.value;
    switch (event.submitter.value) {
        case 'Registrar':
            recordDataVehicle(matricula);
            break;
        case 'Consultar Datos':
            consultDataVehicle(matricula);
            break;
        case 'Eliminar Datos':

            break;
        case 'Eliminar Todos Los Datos':

            break;
    }
});

function recordDataVehicle(matricula) {
    let vehiculo = {
        matricula: matricula,
        marca: formVehicle.marca.value,
        modelo: formVehicle.modelo.value,
        precio: formVehicle.precio.value,
        color: formVehicle.color.value
    };
    localStorage[matricula] = JSON.stringify(vehiculo);
}

function consultDataVehicle(matricula) {
    let ul = document.getElementById('printData').querySelector('ul');
    if (typeof (localStorage[matricula]) != 'undefined') {
        let vehicle = JSON.parse(localStorage[matricula]);
        ul.innerHTML = 
        `<li>Matricula: ${vehicle.matricula}</li>
        <li>Marca: ${vehicle.marca}</li>
        <li>Modelo: ${vehicle.modelo}</li>
        <li>Precio: ${vehicle.precio}</li>
        <li>Color: ${vehicle.color}</li>`;
    } else {
        ul.innerHTML = '<li>No hay datos registrados</li>';
    }
}



function deleteDataVehicle() {

}

function deleteAllDataVehicle() {
    window.localStorage.clear();
}

