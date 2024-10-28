// Función para establecer una cookie con nombre, valor y días de duración
function setCookie(name, value, days) {
    const date = new Date(); // Crea un objeto de fecha actual
    // Configura la fecha de expiración sumando la cantidad de días especificados en milisegundos
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    // Convierte la fecha a un string en formato UTC
    const expires = "expires=" + date.toUTCString();
    // Asigna la cookie con el nombre, valor, expiración y ruta (raíz del sitio)
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Función para obtener el valor de una cookie a partir de su nombre
function getCookie(name) {
    const nameEQ = name + "="; // Genera el prefijo de la cookie buscada (e.g., "username=")
    const ca = document.cookie.split(';'); // Divide todas las cookies en un array
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        // Elimina los espacios en blanco al inicio de cada cookie
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        // Retorna el valor de la cookie si el nombre coincide con el prefijo buscado
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    // Retorna null si no encuentra la cookie
    return null;
}

// Al cargar la página, verifica y establece los valores de las cookies
window.onload = function() {
    const username = getCookie("username"); // Obtiene el valor de la cookie "username"
    const password = getCookie("password"); // Obtiene el valor de la cookie "password"
    const bgColor = getCookie("bgColor"); // Obtiene el valor de la cookie "bgColor"
    const rememberMe = getCookie("rememberMe"); // Obtiene el valor de la cookie "rememberMe"

    // Si todas las cookies necesarias están presentes, carga sus valores en los campos correspondientes
    if (username && password && bgColor) {
        document.getElementById("username").value = username; // Llena el campo de usuario
        document.getElementById("password").value = password; // Llena el campo de contraseña
        document.getElementById("bgColor").value = bgColor; // Llena el campo del color de fondo
        document.getElementById("rememberMe").checked = rememberMe === "true"; // Marca la casilla de "Recordar" si es "true"
        document.body.style.backgroundColor = bgColor; // Aplica el color de fondo
    }
};

// Al enviar el formulario, guarda o borra cookies según la selección de "Recordar mis datos"
document.getElementById("loginForm").onsubmit = function(event) {
    event.preventDefault(); // Previene el envío del formulario

    // Obtiene los valores de los campos del formulario
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const bgColor = document.getElementById("bgColor").value;
    const rememberMe = document.getElementById("rememberMe").checked;

    if (rememberMe) {
        // Si está marcada la casilla "Recordar mis datos", guarda las cookies por 7 días
        setCookie("username", username, 7);
        setCookie("password", password, 7);
        setCookie("bgColor", bgColor, 7);
        setCookie("rememberMe", true, 7);
    } else {
        // Si no está marcada la casilla, elimina las cookies estableciendo -1 días (tiempo en el pasado)
        setCookie("username", "", -1);
        setCookie("password", "", -1);
        setCookie("bgColor", "", -1);
        setCookie("rememberMe", "", -1);
    }

    // Cambia el color de fondo según la elección del usuario
    document.body.style.backgroundColor = bgColor;

    // Muestra un mensaje de confirmación de envío del formulario
    alert("Formulario enviado con éxito");

    // Aquí podría agregarse código para enviar los datos del formulario al servidor, si es necesario
};
