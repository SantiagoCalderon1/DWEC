function pedirDatos() {
    let numeros = [];

    let numero;
    do {
        numero = parseInt(prompt("Introduce un número (0 para parar): "));

        if (numero !== 0 && !isNaN(numero)) {
            numeros.push(numero);
        }
    } while (numero !== 0);
    return numeros;
}
function mostrarDatos() {
    let numeros = pedirDatos();

    let datos = "La longitud del array es: " + numeros.length + "<br>";

    //numeros.reverse();

    while (numeros.length > 0) {
        datos += numeros.pop();
        if (numeros.length > 0) {
            datos += ",";
        }
        as
        datos += "<br> La nueva longitud del array es: " + numeros.length;

        document.getElementById("respuesta").innerHTML = "<br>" + datos;
    }

    window.onload = mostrarDatos;