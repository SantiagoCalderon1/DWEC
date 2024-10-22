//Santiago Calderon Castaño

//Función para la obtención de datos
function pedirDatos() {
    //Declaración de variables    
    let numeros = [], numero;

    do {
        numero = parseInt(prompt("Introduce un número (0 para parar): "));
        if (numero !== 0 && !isNaN(numero)) {
            numeros.push(numero);
        }

    } while (numero !== 0); //Mientras el número sea diferente a 0 repetirá el bucle
    //Retornamos el array
    return numeros;
}

//Función para imprimir los datos
function mostrarDatos() {
    //Aquí llamamos a la función y obtenemos un array
    let numeros = pedirDatos();

    //Definimos una variable para almacenar los datos
    let datos = " ";

    datos += "La longitud del array es: " + numeros.length + "<br>";

    //Mientras el tamaño del array sea mayor a 0 hacer lo siguiente
    while (numeros.length > 0) {
        //Sacamos el primer elemento del array y lo almacenamos en datos
        datos += numeros.pop();
        //Si no es el ultimo indice del array poneme al lado una ','
        if (numeros.length > 0) {
            datos += ",";
        }
    }
    //Guardamos la nueva longitud del array, que debería ser 0
    datos += "<br> La nueva longitud del array es: " + numeros.length;
    //Inyectamos la variable datos en el HTML   
    document.getElementById("respuesta").innerHTML = "<br>" + datos;
}
