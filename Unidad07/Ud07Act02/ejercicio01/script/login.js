//Santiago Calderon castaño


// Usuarios
const userAdmin = "admin";
const passwordAdmin = "admin";


document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    console.log("Formulario iniciar sesion enviado"); // Verifica si el evento se captura correctamente


    if (validarUsuario()) {
        console.log("Credenciales correctas.")
        window.location.href = '../html/index.html';
    } else {
        alert("Credenciales Incorrectas.");
    }
    this.reset(); // Aquí "this" se refiere al formulario y lo resetea
});


function validarUsuario() {
    // Obtenemos los valores de los campos del formulario
    const usuarioIngresado = document.getElementById("username").value;
    const passwordIngresada = document.getElementById("password").value;
  
    // Comparar los valores ingresados con las credenciales predefinidas
    return usuarioIngresado === userAdmin && passwordIngresada === passwordAdmin;
  }
  