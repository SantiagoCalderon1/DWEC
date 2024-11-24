// Santiago Calderon Castaño

// Credenciales del admin
const usernameAdmin = "admin";
const passwordAdmin = "admin";

// Funcionamiento del formulario y la autenticación ficticia
document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    console.log("Formulario iniciar sesion enviado"); // Verifica si el evento se captura correctamente
    // Verificar las credenciales
    if (verificarUsuario()) {
      console.log("Credenciales correctas.");
      window.location.href = '../html/index.html';
    } else {
      console.log("Credenciales incorrectas.")
      alert('Credenciales incorrectas.');
      this.reset();
    }
  });

// Función para verificar si las credenciales son correctas
function verificarUsuario() {
  console.log("Verificando usuario.");
  // Comparar los valores ingresados con las credenciales predefinidas
  return (document.getElementById("username").value === usernameAdmin) && (document.getElementById("password").value === passwordAdmin);
}

