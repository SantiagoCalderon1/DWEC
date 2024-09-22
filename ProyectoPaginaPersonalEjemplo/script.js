document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    const loginError = document.getElementById('loginError');

    // Simular usuario y contraseña
    const correctUser = 'admin';
    const correctPassword = 'password123';

    // Manejador de formulario de contacto
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const apellidos = document.getElementById('apellidos').value;
        const email = document.getElementById('email').value;
        const telefono = document.getElementById('telefono').value;
        const mensaje = document.getElementById('mensaje').value;

        if (nombre && apellidos && email && telefono && mensaje) {
            // Aquí iría la lógica para enviar los datos a la base de datos (por ejemplo, con fetch o AJAX)
            alert('Formulario enviado correctamente. Gracias por contactarnos.');
            contactForm.reset();
        } else {
            errorMessage.textContent = 'Por favor, completa todos los campos.';
        }
    });

    // Manejador de inicio de sesión
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const usuario = document.getElementById('usuario').value;
        const password = document.getElementById('password').value;

        if (usuario === correctUser && password === correctPassword) {
            alert('Inicio de sesión exitoso. Ahora puedes ver los datos.');
            // Aquí iría la lógica para redirigir o mostrar los datos almacenados.
        } else {
            loginError.textContent = 'Usuario o contraseña incorrectos.';
        }
    });
});
