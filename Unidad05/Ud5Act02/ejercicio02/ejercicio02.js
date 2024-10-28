/**
 * DOMContentLoaded es un evento que se dispara cuando el documento HTML 
 * ha sido completamente cargado y analizado, sin esperar a que se carguen 
 * hojas de estilo, imágenes, etc.
 */
document.addEventListener("DOMContentLoaded", function () {
    // Obtener todos los inputs
    const inputs = {
        nombre: document.getElementById("nombre"),
        apellidos: document.getElementById("apellidos"),
        direccion: document.getElementById("direccion"),
        poblacion: document.getElementById("poblacion"),
        codigoPostal: document.getElementById("codigoPostal"),
        telefono: document.getElementById("telefono"),
        movil: document.getElementById("movil"),
        dni: document.getElementById("dni"),
        cuentaCorriente: document.getElementById("cuentaCorriente"),
        cuota: document.getElementById("cuota"),
        fechaNacimiento: document.getElementById("fechaNacimiento"),
        numHijos: document.getElementById("numHijos"),
        email: document.getElementById("email"),
    };

    // Añadir eventos de entrada para cada input
    for (let key in inputs) {
        inputs[key].addEventListener("input", function () {
            validateInput(this); // Validar en tiempo real
        });
        
        inputs[key].addEventListener("blur", function () {
            validateInput(this); // Validar al salir del campo
        });
    }

    // Función para validar cada input
    function validateInput(input) {
        let value = input.value.trim();
        let valid = false;

        switch (input.id) {
            case "nombre":
                valid = validarNombre(value);
                input.setCustomValidity(valid ? "" : "El nombre debe tener entre 3 y 30 caracteres alfabéticos.");
                break;
            case "apellidos":
                valid = validarApellidos(value);
                input.setCustomValidity(valid ? "" : "Los apellidos deben tener entre 3 y 60 caracteres alfabéticos.");
                break;
            case "direccion":
                valid = validarDireccion(value);
                input.setCustomValidity(valid ? "" : "La dirección debe tener entre 3 y 50 caracteres.");
                break;
            case "poblacion":
                valid = validarPoblacion(value);
                input.setCustomValidity(valid ? "" : "La población debe tener entre 3 y 30 caracteres alfabéticos.");
                break;
            case "codigoPostal":
                valid = validarCodigoPostal(value);
                input.setCustomValidity(valid ? "" : "El código postal debe tener exactamente 5 dígitos.");
                break;
            case "telefono":
                valid = validarTelefono(value);
                input.setCustomValidity(valid ? "" : "El teléfono debe tener el formato (963) 498-473.");
                break;
            case "movil":
                valid = validarMovil(value);
                input.setCustomValidity(valid ? "" : "El móvil debe tener el formato 687-458-785 y comenzar con 6.");
                break;
            case "dni":
                valid = validarDni(value);
                input.setCustomValidity(valid ? "" : "El DNI debe tener el formato 24.547.785-T.");
                break;
            case "cuentaCorriente":
                valid = validarCuentaCorriente(value);
                input.setCustomValidity(valid ? "" : "La cuenta corriente debe tener el formato 0098-5098-76-9876754568.");
                break;
            case "cuota":
                valid = parseFloat(value) > 0;
                input.setCustomValidity(valid ? "" : "La cuota mensual debe ser un número decimal positivo.");
                break;
            case "fechaNacimiento":
                valid = validarFechaNacimiento(value);
                input.setCustomValidity(valid ? "" : "La fecha debe tener el formato dd/mm/yyyy.");
                break;
            case "numHijos":
                valid = parseInt(value) >= 0;
                input.setCustomValidity(valid ? "" : "El número de hijos debe ser un número entero positivo.");
                break;
            case "email":
                valid = validarEmail(value);
                input.setCustomValidity(valid ? "" : "Ingresa un correo electrónico válido.");
                break;
            default:
                break;
        }

        input.reportValidity(); // Muestra el mensaje de error si es necesario
    }

    // Funciones de validación
    function validarNombre(nombre) {
        return /^[a-zA-ZÀ-ÿ\s]{3,30}$/.test(nombre);
    }

    function validarApellidos(apellidos) {
        return /^[a-zA-ZÀ-ÿ\s]{3,60}$/.test(apellidos);
    }

    function validarDireccion(direccion) {
        return /^.{3,50}$/.test(direccion);
    }

    function validarPoblacion(poblacion) {
        return /^[a-zA-ZÀ-ÿ\s]{3,30}$/.test(poblacion);
    }

    function validarCodigoPostal(codigoPostal) {
        return /^\d{5}$/.test(codigoPostal);
    }

    function validarTelefono(telefono) {
        return /^\(\d{3}\) \d{3}-\d{3}$/.test(telefono);
    }

    function validarMovil(movil) {
        return /^6\d{2}-\d{3}-\d{3}$/.test(movil);
    }

    function validarDni(dni) {
        return /^\d{2}\.\d{3}\.\d{3}-[A-Z]$/.test(dni);
    }

    function validarCuentaCorriente(cuentaCorriente) {
        return /^\d{4}-\d{4}-\d{2}-\d{10}$/.test(cuentaCorriente);
    }

    function validarFechaNacimiento(fechaNacimiento) {
        return /^\d{2}\/\d{2}\/\d{4}$/.test(fechaNacimiento);
    }

    function validarEmail(email) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    }
});
