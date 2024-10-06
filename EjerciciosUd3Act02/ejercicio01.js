//Santiago Calderon Castaño

//Funciones para la ventana principal
function escribirPantallaPrincipal() {
    let nombre = obtenerNombre().trim(); //uso trim para borrar posibles espacios en blanco del inicio o final
    document.write("<h1>TAREA DWEC03</h1>");
    document.write("<p>Buenos dias " + nombre + ".")
    document.write("<p>Tu nombre tiene " + nombre.length + " caracteres, incluido espacios.")

    nombre = nombre.toUpperCase();
    // Uso toUpperCase para no tener que buscar tambien la a minuscula
    if (nombre.includes('A')) {
        document.write("<p>La primera letra A de tu nombre está en la posicioón: " + nombre.indexOf('A') + "</p>")
        document.write("<p>La última letra A de tu nombre está en la posicioón: " + nombre.lastIndexOf('A') + "</p>")
    } else {
        document.write("<p>Tu nombre no contiene la letra A.</p>")
    }

    document.write("<p>Tu nombre menos las 3 primeras letras es: " + nombre.slice(3)+ "</p>");

    document.write("<p>Tu nombre todo en mayusculas es mayúsculas es: " + nombre + "</p>"); //Nombre ya está en mayúsculas

    document.write("<p>Tu edad es: " + calcularEdad() + "</p>");

    let fechaNacimiento = obtenerFecha();

    let diaSemana = fechaNacimiento.toLocaleString("es-ES", { weekday: "long" });
    let mes = fechaNacimiento.toLocaleString("es-ES", { month: "long" });

    document.write("<p>Naciste un feliz " + diaSemana + ", " + fechaNacimiento.getDate() + " del año " + fechaNacimiento.getFullYear() + "</p>");

    document.write("<p>El coseno de 180 es: " + calcularCoseno(180) + "</p>");

    let numeros = [34, 67, 23, 75, 35, 19];
    //numeros.sort((a,b) => a - b).reverse();
    document.write("<p>El número mayor de (" + numeros.join(",") + ") es: " + Math.max(...numeros) + "</p>");

    document.write("<p>Ejemplo de número al azar: " + Math.floor(Math.random() * 9000000000) + 1000000000) + "</p>";
}

function obtenerNombre() {
    return document.getElementById("input-nombre").value + " " + document.getElementById("input-apellido").value;
}

function obtenerFecha() {
    let dia = parseInt(document.getElementById("input-dia").value);
    let mes = parseInt(document.getElementById("input-mes").value);
    let año = parseInt(document.getElementById("input-año").value);
    return new Date(año, (mes - 1), dia)
}

function calcularEdad() {
    let fechaActual = new Date();
    let fechaNacimiento = obtenerFecha();

    alert("Fecha actual:", fechaActual);
    alert("Fecha de nacimiento:", fechaNacimiento);

    
    //Aqui uso un if ternario, me gusta más pero es más dificil de leer.
    let edad = ((fechaActual.getFullYear() - fechaNacimiento.getFullYear() > 0) ?
        (fechaActual.getMonth() > fechaNacimiento.getMonth() ||
            (fechaActual.getMonth() === fechaNacimiento.getMonth() && fechaActual.getDate() >= fechaNacimiento.getDate()) ?
            fechaActual.getFullYear() - fechaNacimiento.getFullYear() : fechaActual.getFullYear() - fechaNacimiento.getFullYear() - 1)
        : 0); 

    return edad;
    /**
     *  Primero se verifica si el año actual es mayor que el año de nacimiento.
        Segundo se verifica si ya ha pasado el cumpleaños (comparando el mes y el día).
        Tercero, se calcula la edad, teniendo en cuenta si ya has cumplido años o no.
     */

    /** Empleando con un if tradicional. Es más sencillo de leer pero más largo
    if ((fechaActual.getFullYear() - fechaNacimiento.getFullYear()) > 0) {
        if ((fechaActual.getMonth() > fechaNacimiento.getMonth()) || (fechaActual.getMonth() === fechaNacimiento.getMonth() && fechaActual.getDate() >= fechaNacimiento.getDate())) {
            edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
        }else{
            edad = (fechaActual.getFullYear() - fechaNacimiento.getFullYear()) - 1 ;
        }
    }
     */
}

function calcularCoseno(grados) {
    /**
     * Versión larga.
    let radianes = grados * (Math.PI / 180);
    return Math.cos(radianes);
    
    La función Math.cos() devuelve el coseno de un número en radianes.
     */

    //Versión corta
    return Math.cos(grados * (Math.PI / 180));

}



//Funciones para la ventana secundaria
function abrirVentana() {
    let ventanaSecundaria = window.open("", "Acceso", "width=400,height=400");
    ventanaSecundaria.document.write(datosNuevaVentana(ventanaSecundaria.document));
    //Enviamos document correspondiente a la pagina secundaria por parametros.
}

function datosNuevaVentana(doc) {
    /** 
     * doc corresponde a la ventana actual, que es la secundaria, no la principal
     * si usara document. correspondria a la página principal
     * */
    let contenido =
        `<!DOCTYPE html>
        <html lang="es">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Actividad 1</title>
        </head>
        <body>
            <h3>Ejemplo de Ventana Nueva</h3>
            <div id="contenedor">
                <!--Suelo usar span cuando debo insertar datos dentro de una etiqueta ya creada-->
                <p>URL Completa: <span id="url-completa">${doc.URL}</span></p>
                <p>Protocolo utilizado: <span id="protocolo">${doc.location.protocol}</span></p>
                <p>Nombre del código del navegador: <span id="codigo-navegador">${obtenerNavegador()}</span></p>
                <p>Java <span id="java-disponible">${(navigator.javaEnabled() ? "SI" : "NO")}</span> disponible en esta ventana.</p>
                <div id="contenedor-ifame">
                    <!-- Como google rechazaba la conexión, udé wikipedia, que se que seguro funciona. -->
                    <iframe src="https://es.wikipedia.org/wiki/Wikipedia:Portada" width="800" height="600"></iframe>
                </div>
            </div>
        </body>
        </html>
        `;
    return contenido;

}

// como navigator.userAgent; el formato lo da horrible, pues pensé que una funcion para darle formato esta bien
function obtenerNavegador() {
    let userAgent = navigator.userAgent;
    if (userAgent.includes("Chrome") && !userAgent.includes("Edge")) {
        return "Google Chrome";
    } else if (userAgent.includes("Firefox")) {
        return "Mozilla Firefox";
    } else if (userAgent.includes("MSI") || userAgent.includes("Trident")) {
        return "Internet Explorer"
    } else if (userAgent.includes("Edg")) {
        return "Microsoft Edge"
    } else if (userAgent.includes("OPR")) {
        return "Opera";
    } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
        return "Safari";
    } else {
        return "Navegador desconocido";
    }
}

//window.onload = escribirPantallaPrincipal();

