// Santiago Calderón Castaño

/**
 * Me encontré con varios problemas al usar document.write.
 * Algunas funciones no se ejecutaban y me lanzaba este erro:
 * 
 * Uncaught TypeError: Cannot read properties of null (reading 'value')
 * at obtenerFecha (ejercicio01.js:48:54)
 * 
 * Me di cuenta que el document.write sobrescribía todo lo del DOM, por ende
 * el input que me dabía dar la fecha desaparecia y en mi función obtener fecha
 * se establecia a null su return.
 * 
 * lo solucioné con innerText, como solo me interesaba mostrar texto, hice 
 * las etiquetas <p> y le inserté el texto a cada etiqueta correspondiente.
 */


// Funciones para la ventana principal
function escribirPantallaPrincipal() {
    document.getElementById("titulo").innerText = "TAREA DWEC03";
    let nombre = obtenerNombre().trim(); // Uso trim para borrar posibles espacios en blanco del inicio o final
    if (nombre !== "") {
        
    document.getElementById("texto2").innerText = "Buenos días " + nombre;
    document.getElementById("texto3").innerText = "Tu nombre tiene " + nombre.length + " caracteres, incluidos espacios.";

    nombre = nombre.toLowerCase(); // Uso toLowerCase para no tener que buscar también la 'a' minúscula
    // Verificamos que la cadena incluya 'A'
    if (nombre.includes('A')) {
        document.getElementById("texto4").innerText = "La primera letra A de tu nombre está en la posición: " + nombre.indexOf('A');
        document.getElementById("texto5").innerText = "La primera letra A de tu nombre está en la posición: " + nombre.indexOf('A');
    } else {
        document.getElementById("texto4").innerText = "Tu nombre no contiene la letra A.";
    }

    //Aqui obtenemos una parte de la cadena desde el index 3 hasta el final, sin modificar la original.
    document.getElementById("texto6").innerText = "Tu nombre menos las 3 primeras letras es: " + nombre.slice(3);
    document.getElementById("texto7").innerText = "Tu nombre todo en mayúsculas es: " + nombre.toUpperCase();

    document.getElementById("texto8").innerText = "Tu edad es: " + calcularEdad();

    //Variables para el formato del texto9
    let fechaNacimiento = obtenerFecha();
    let diaSemana = fechaNacimiento.toLocaleString("es-ES", { weekday: "long" });
    let mes = fechaNacimiento.toLocaleString("es-ES", { month: "long" });

    document.getElementById("texto9").innerText = "Naciste un feliz " + diaSemana + ", " + fechaNacimiento.getDate() + " de " + mes + " del año " + fechaNacimiento.getFullYear();
    
    }else{
        alert("Los datos estan vacios, solo se enseñará los que no requiren datos de entrada.");
    }
    
    document.getElementById("texto10").innerText = "El coseno de 180 es: " + calcularCoseno(180);

    //Variable array que acontinuación usaremos
    let numeros = [34, 67, 23, 75, 35, 19];
    // unimos el array usando join y separandolo con ',' , luego con MAth.max(...array) obtener el número más grande, solo funciona con números
    document.getElementById("texto11").innerText = "El número mayor de (" + numeros.join(",") + ") es: " + Math.max(...numeros);

    // Generamos un número random de 10 digitos, porque hay 10 x en la actividad
    document.getElementById("texto12").innerText = "Ejemplo de número al azar: " + (Math.floor(Math.random() * 9000000000) + 1000000000);
}

//Función para obtener el nombre, no tiene más.
function obtenerNombre() {
    return document.getElementById("input-nombreCompleto").value;
}

//Función para obtener la fecha, devuelve un objeto fecha ya construido.
function obtenerFecha() {
    return new Date(document.getElementById("input-date").value);
}

/**Funcion para calcular la edad, tiene en cuenta si el dia de tu cumpleaños ya pasó.
 * 
 * Ejemplo: hoy 08/10/2024
 *          Nacimiento 20/10/2003
 * 
 * 2024 -2003 = 21, pero yo aún no es 20 de octubre, así que en teoría no tengo 21 todavía,
 * entonces también tiene en cuenta si es tu dia de cumpleaños no ha pasado, y si no ha pasado
 * te resta un 1 año.
 * 
 * Lo hice con if tradicionales, pero así creo que también se entiende
 * */

function calcularEdad() {
    let fechaActual = new Date();
    let fechaNacimiento = obtenerFecha();

    // Aquí uso un operador ternario para calcular la edad
    let edad = ((fechaActual.getFullYear() - fechaNacimiento.getFullYear())) > 0 ?
        (fechaActual.getMonth() > fechaNacimiento.getMonth() ||
            (fechaActual.getMonth() === fechaNacimiento.getMonth() && fechaActual.getDate() > fechaNacimiento.getDate())
            ? fechaActual.getFullYear() - fechaNacimiento.getFullYear()
            : fechaActual.getFullYear() - fechaNacimiento.getFullYear() - 1)
        : 0;
    return edad;
}

//Función para calcular el coseno de un número, me apoyé de internet, no sé como va esto de las formulas.
function calcularCoseno(grados) {
    return Math.cos(grados * (Math.PI / 180)); // Convierte grados a radianes y calcula el coseno
}

/** Funcione para la ventana secundaria
 * En mi ordenador no me deja que la ventana se abra en pop-up, pero en el instituto sí.
 * 
 * Lo de que no se deje redimensionar no lo he logrado, creía que pasadole por parametros
 * una medida definida no dejaría redimensionarla
 *  */ 
function abrirVentana() {
    let ventanaSecundaria = window.open("", "Acceso", "width=400,height=400");
    ventanaSecundaria.document.write(datosNuevaVentana(ventanaSecundaria.document));
    // Enviamos document correspondiente a la página secundaria por parámetros. porque si no tomaria el document de la página principal
}

function datosNuevaVentana(doc) {
    // Contenido de la nueva ventana, no me gusta mucho de esta forma, pero es más sencillo que construirla totalmente de 0
    let contenido =
        `<!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Actividad 1</title>
                <style>
        body {
            display: flex;
            /* Activar Flexbox */
            flex-direction: column;
            /* Disponer elementos en columna */
            justify-content: center;
            /* Centrar verticalmente */
            align-items: center;
            /* Centrar horizontalmente */
            height: 100vh;
            /* Ocupa toda la altura de la ventana */
            margin: 0;
            /* Eliminar márgenes por defecto */
            background-color: #f0f0f0;
            /* Color de fondo (opcional) */
        }

        .contenedor {
            margin-top: 30px;
            /* Eliminar márgenes por defecto */
            text-align: center;
            /* Centrar texto dentro del contenedor */
            padding: 50px 20px;
            /* Espaciado interno */
            background-color: white;
            /* Color de fondo del contenedor */
        }

        iframe{
            width: 800px;
            height: 600px:
        }

    </style>
        </head>
        <body>
            <h3>Ejemplo de Ventana Nueva</h3>
            <div id="contenedor">
                <p style="margin-top: 150px;">URL Completa: <span id="url-completa">${doc.URL}</span></p>
                <p>Protocolo utilizado: <span id="protocolo">${doc.location.protocol}</span></p>
                <p>Nombre del código del navegador: <span id="codigo-navegador">${obtenerNavegador()}</span></p>
                <p>Java <span id="java-disponible">${navigator.javaEnabled() ? "SI" : "NO"}</span> disponible en esta ventana.</p>
                <div id="contenedor-iframe">
                    <iframe src="https://es.wikipedia.org/wiki/Wikipedia:Portada" width="800" height="600"></iframe>
                </div>
            </div>
        </body>
        </html>`;
    return contenido;
}

// Función para obtener el navegador, esto simplemente es para darle formato, ya que da un código muy largo y casi inentendible
function obtenerNavegador() {
    let userAgent = navigator.userAgent;

    if (userAgent.includes("Chrome") && !userAgent.includes("Edge")) {
        return "Google Chrome";
    } else if (userAgent.includes("Firefox")) {
        return "Mozilla Firefox";
    } else if (userAgent.includes("MSI") || userAgent.includes("Trident")) {
        return "Internet Explorer";
    } else if (userAgent.includes("Edg")) {
        return "Microsoft Edge";
    } else if (userAgent.includes("OPR")) {
        return "Opera";
    } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
        return "Safari";
    } else {
        return "Navegador desconocido";
    }

    /**
     * return navigator.userAgent; así sería si no importase como venga el código del navegador
     */
}

//Pruebas que estuve haciendo, pero no me hizo falta.
//window.onload = function () {
//    escribirPantallaPrincipal()
//};
