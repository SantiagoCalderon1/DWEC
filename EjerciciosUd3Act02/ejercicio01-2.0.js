
function abrirVentana() {
    let ventana = window.open("", "Acceso", "width=400,height=400");
    ventana.document.write(datosNuevaVentana());
    ventana.onload = function () {
        obtenerDatosNuevaVentana(ventana.document);
    }
}

function datosNuevaVentana() {

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
    <p>URL Completa: <span id="url-completa"></span></p>
    <p>Protocolo utilizado: <span id="protocolo"></span></p>
    <p>Nombre del código del navegador: <span id="codigo-navegador"></span></p>
    <p>Java <span id="java-disponible"></span> disponible en esta ventana.</p>
    <div id="contenedor-ifame">
        <!-- Como google rechazaba la conexión, udé wikipedia, que se que seguro funciona. -->
        <iframe src="https://es.wikipedia.org/wiki/Wikipedia:Portada" width="800" height="600"></iframe>
    </div>
</div>
</body>
</html>
` ;
    return contenido;

}


//Funciones para la nueva ventaba (ventana secundaria)
function obtenerDatosNuevaVentana(doc) {
    doc.getElementById("url-completa").innerHTML = doc.URL;
    //document.getElementById("url-completa").innerHTML = window.location.href; esta seria otra forma de hacerlo
    doc.getElementById("protocolo").innerHTML = doc.location.protocol;
    //document.getElementById("codigo-navegador").innerHTML = navigator.userAgent; en esta forma el formato lo da horrible
    doc.getElementById("codigo-navegador").innerHTML = obtenerNavegador();
    doc.getElementById("java-disponible").innerHTML = (navigator.javaEnabled() ? "SI" : "NO");
}
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

