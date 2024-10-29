//Santiago Calderon Castaño

// Array de las ubicaciones de las librerías
const ubicaciones = [
    "Calle Duque de mandas, 37",
    "Avenida del cid, 103",
    "Plaza menorca, 5",
    "Camino viejo de moncada",
    "Avenida Primat reig. 57"
];

let ubicacionesMostradas = 1;

// Función para agregar una editorial
function agregarEditorial() {
    let nuevaEditorial = document.getElementById("nuevaEditorial").value;
    //Verificamos que el texto no esté vacío
    if (nuevaEditorial.trim() !== "") {
        //Creamos otra opción
        let option = document.createElement("option");
        //le añadimos el valor que han introducido
        option.text = nuevaEditorial;
        //Añadimos la nueva opción al formulario
        document.getElementById("editorial").add(option);
        document.getElementById("nuevaEditorial").value = "";
    }
}

// Función para actualizar las ubicaciones de librerías mostradas
function actualizarUbicaciones() {
    //Obtenemos las ubicaciones
    let listaUbicaciones = document.getElementById("ubicacionesLibrerias");
    //Limpiamos las que teniamos para volver a insertar las nuevas
    listaUbicaciones.innerHTML = "";
    //Recorremos el array de ubicaciones
    for (let i = 0; i < ubicacionesMostradas; i++) {
        //Creamos otro li
        const li = document.createElement("li");
        //le añadimos el texto de la ubicación y  lo insertamos en el ul
        li.textContent = ubicaciones[i];
        listaUbicaciones.appendChild(li);
    }
}

// Función para agregar una ubicación a la lista
function agregarUbicacion() {
    // Si aun no hemos llegado al tamaño del arrray aregamos una ubicación más
    if (ubicacionesMostradas < ubicaciones.length) {
        ubicacionesMostradas++;
        actualizarUbicaciones();
    }
}

// Función para quitar una ubicación de la lista
function quitarUbicacion() {
    // Nos podemos quedar con sólo minímo una ubicación
    if (ubicacionesMostradas > 1) {
        ubicacionesMostradas--;
        actualizarUbicaciones();
    }
}

// Inicializar la primera ubicación al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    //Lo primero es actualizar las ubicaciones
    actualizarUbicaciones();

    // Captura del formulario para manejar el evento submit
    document.getElementById("bookForm").addEventListener("submit", function (event) {
        event.preventDefault(); //Evitamos el que el formulario se envie y nos de error
        //Obtenemos los datos del formulario
        let titulo = document.getElementById("titulo").value;
        let autor = document.getElementById("autor").value;
        let precio = document.getElementById("precio").value;
        let editorial = document.getElementById("editorial").value;
        // Crear un nuevo elemento <li> para el libro guardado
        const li = document.createElement("li");
        li.textContent = `Libro guardado: Título: ${titulo}, Autor: ${autor}, Precio: $${precio}, Editorial: ${editorial}`;
        // Añadir el elemento <li> a la lista de resultados
        document.getElementById("ulResultado").appendChild(li);
        //Limpia el formulario
        document.getElementById("bookForm").reset();
    });
});