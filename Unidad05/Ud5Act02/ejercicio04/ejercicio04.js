document.addEventListener("DOMContentLoaded", function () {
    const submitButton = document.getElementById("btnEnviar");

    submitButton.addEventListener("click", function (event) {
        event.preventDefault(); // Evita el envío del formulario al servidor
        validarFormulario(); // Llama a la función de validación
    });

    function validarFormulario() {
        const camposRequeridos = document.querySelectorAll(".requerido");
        let formularioValido = true;

        camposRequeridos.forEach(campo => {
            let esValido = true;
            const valor = campo.value.trim();

            switch (campo.id) {
                case "dni":
                    esValido = /^[0-9]{8}[A-Z]$/.test(valor);
                    break;
                case "nombre":
                    esValido = valor.length >= 3 && valor.length <= 30;
                    break;
                case "Foto":
                    esValido = valor.length > 0;
                    break;
                case "edad":
                    esValido = valor >= 0;
                    break;
                case "poblacion":
                    esValido = valor !== "";
                    break;
            }

            if (!esValido) {
                campo.classList.add("error");
                campo.setCustomValidity("Este campo no es válido.");
                formularioValido = false;
            } else {
                campo.classList.remove("error");
                campo.setCustomValidity("");
            }
        });

        if (formularioValido) {
            alert("Formulario enviado correctamente.");
        } else {
            alert("Por favor, corrija los errores en los campos resaltados.");
        }
    }
});
