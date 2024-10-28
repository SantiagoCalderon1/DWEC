// Escucha el evento 'DOMContentLoaded' para asegurarse de que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", function () {
    // Obtiene el botón de envío del formulario por su ID
    const submitButton = document.getElementById("btnEnviar");

    // Añade un evento 'click' al botón de envío
    submitButton.addEventListener("click", function (event) {
        event.preventDefault(); // Evita el envío del formulario al servidor
        validarFormulario(); // Llama a la función de validación
    });

    // Función para validar los campos del formulario
    function validarFormulario() {
        // Selecciona todos los campos que tienen la clase 'requerido'
        const camposRequeridos = document.querySelectorAll(".requerido");
        let formularioValido = true; // Inicializa una variable para verificar la validez del formulario

        // Recorre cada campo requerido para realizar la validación
        camposRequeridos.forEach(campo => {
            let esValido = true; // Variable para comprobar si el campo actual es válido
            const valor = campo.value.trim(); // Obtiene el valor del campo y elimina espacios en blanco

            // Verifica el valor de cada campo según su ID
            switch (campo.id) {
                case "dni":
                    // Valida que el DNI tenga 8 dígitos seguidos de una letra mayúscula
                    esValido = /^[0-9]{8}[A-Z]$/.test(valor);
                    break;
                case "nombre":
                    // Valida que el nombre tenga entre 3 y 30 caracteres
                    esValido = valor.length >= 3 && valor.length <= 30;
                    break;
                case "Foto":
                    // Verifica que se haya proporcionado una foto (que el campo no esté vacío)
                    esValido = valor.length > 0;
                    break;
                case "edad":
                    // Verifica que la edad sea un número mayor o igual a 0
                    esValido = valor >= 0;
                    break;
                case "poblacion":
                    // Verifica que el campo de población no esté vacío
                    esValido = valor !== "";
                    break;
            }

            // Si el campo no es válido, se añade la clase 'error' y se establece un mensaje de validez personalizada
            if (!esValido) {
                campo.classList.add("error"); // Agrega la clase 'error' para resaltar el campo
                campo.setCustomValidity("Este campo no es válido."); // Mensaje personalizado de error
                formularioValido = false; // Cambia el estado del formulario a no válido
            } else {
                // Si el campo es válido, se elimina la clase 'error' y se restablece el mensaje de validez
                campo.classList.remove("error"); // Elimina la clase 'error' si el campo es válido
                campo.setCustomValidity(""); // Restablece el mensaje de error
            }
        });

        // Si todos los campos son válidos, muestra un mensaje de éxito
        if (formularioValido) {
            alert("Formulario enviado correctamente."); // Mensaje de éxito
        } else {
            // Si hay errores, pide al usuario que corrija los errores
            alert("Por favor, corrija los errores en los campos resaltados."); // Mensaje de error
        }
    }
});
