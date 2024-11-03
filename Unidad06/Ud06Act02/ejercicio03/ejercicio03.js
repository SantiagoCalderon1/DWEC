// Santiago Calderon Castaño

// Definimos algunas cosas utiles, como la obtención de la zona de dibujo, algunos testigos
const zonaDibujo = document.getElementById("zonaDibujo");
let pincelActivo = false; // Estado del pincel
let colorSeleccionado = "white"; // Color inicial, para poder borrar con el blanco
document.getElementById("estadoPincel").innerText = "DESACTIVADO"; // Indicamos que el pincel está desactivado por defecto

// Función para crear el tablero de dibujo
function crearZonaDibujo() {
    // Creamos el elemento de la tabla
    let table = document.createElement("table");
    table.style.border = "2px solid red";
    //Creamos 2 bucles, uno que cree las filas y otro las celdas
    for (let i = 0; i < 30; i++) {
        // Creamos el elemento tr
        let tr = document.createElement("tr");
        for (let j = 0; j < 30; j++) {
            // Creamos el elemento td
            let td = document.createElement("td");
            // Asignamos las propiedades a cada elemento
            td.style.width = "10px";
            td.style.height = "10px";
            td.classList.add("celdaZonaDibujo");

            // Evento de click en cada celda para activar/desactivar el modo de pintura
            td.addEventListener("click", () => {
                pincelActivo = !pincelActivo; // Nos cambia entre true y false
                document.getElementById("estadoPincel").innerText = pincelActivo ? "ACTIVADO" : "DESACTIVADO"; // Ternaria para saber el estado
            });

            // Evento para pintar la celda al pasar el ratón si el pincel está activo
            td.addEventListener("mouseover", () => {
                if (pincelActivo) { // si el pincel está activo, asignamos el color seleccionado
                    td.style.backgroundColor = colorSeleccionado;
                }
            });
            // añadimos el td al tr
            tr.appendChild(td);
        }
        // añadimos el tr a la tabla
        table.appendChild(tr);
    }
    // añadimos el elemento table al div zonaDibujo
    zonaDibujo.appendChild(table);
}

// Selección del color en la paleta
const colores = document.querySelectorAll(".color");

// Iteramos los colores
colores.forEach(color => {
    // Creamos para cada color un evento de click
    color.addEventListener("click", () => {
        // Elimina la clase "seleccionado" de cualquier color previamente seleccionado
        colores.forEach(c => c.classList.remove("seleccionado"));
        // Asigna la clase "seleccionado" al color actual
        color.classList.add("seleccionado");
        // Así se obtiene el color del estilo de fondo del color seleccionado
        colorSeleccionado = window.getComputedStyle(color).backgroundColor;
    });
});

// Cuando la página se cargue llama a la función crearZonaDibujo
window.onload = function () {
    crearZonaDibujo();
};
