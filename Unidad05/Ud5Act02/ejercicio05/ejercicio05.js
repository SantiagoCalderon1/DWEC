// Función para establecer una cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Función para obtener el valor de una cookie
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Al cargar la página, verificar las cookies
window.onload = function() {
    const username = getCookie("username");
    const password = getCookie("password");
    const bgColor = getCookie("bgColor");
    const rememberMe = getCookie("rememberMe");

    if (username && password && bgColor) {
        document.getElementById("username").value = username;
        document.getElementById("password").value = password;
        document.getElementById("bgColor").value = bgColor;
        document.getElementById("rememberMe").checked = rememberMe === "true";
        document.body.style.backgroundColor = bgColor; // Aplicar color de fondo
    }
};

// Al enviar el formulario
document.getElementById("loginForm").onsubmit = function(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const bgColor = document.getElementById("bgColor").value;
    const rememberMe = document.getElementById("rememberMe").checked;

    if (rememberMe) {
        setCookie("username", username, 7); // Guardar cookie por 7 días
        setCookie("password", password, 7);
        setCookie("bgColor", bgColor, 7);
        setCookie("rememberMe", true, 7);
    } else {
        // Borrar cookies si no se selecciona "Recordar mis datos"
        setCookie("username", "", -1);
        setCookie("password", "", -1);
        setCookie("bgColor", "", -1);
        setCookie("rememberMe", "", -1);
    }

    // Cambiar el color de fondo
    document.body.style.backgroundColor = bgColor;

    // Aquí puedes agregar la lógica para enviar los datos al servidor, si es necesario
    alert("Formulario enviado con éxito");
};
