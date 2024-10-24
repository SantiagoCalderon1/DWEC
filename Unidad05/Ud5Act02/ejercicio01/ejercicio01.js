document.addEventListener("input", function(event){
document.getElementById("indicacionMetros").innerHTML = document.getElementById("inputProxPlaya").value;
});

document.getElementById("input", function(event){
    obtenerDatos();
});

function asignarFecha() {
    let fecha = new Date();

    document.getElementById("campoOculto").value = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}` ;
}


function obtenerDatos() {
    asignarFecha();

    let mueble = document.getElementById("selectInmueble").value;
    let provincia =  document.getElementById("datalistProvincia").value;
    let ubicacion = document.getElementById("selectUbicacion").value;
    let precioMax = document.getElementById("inputPrecioMax").value;
    let metrosMin = document.getElementById("inputMetrosMin").value;
    let alturaMin = document.getElementById("inputAlturaMin").value;
    let minHabitaciones = document.getElementById("inputMinHabitaciones").value;
    let minBaños = document.getElementById("inputMinBaños").value;
    let caracteristicas = document.getElementById("")
}