//Santiago Calderon castaño
//Función para crear el color RGB aleatorio
function colorRBG() {
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);

    return `rgb(${red},${green},${blue})`;
}
//Funcion para construir la tabla desde 0
function construirTabla() {
    //Obtenemos el padre donde insertaremos la tabla
    let zonaDibujo = document.getElementById("zonadibujo");
    //Creamos la tabla
    let tabla = document.createElement("table");

    //Le asiganamos algunos estilos
    tabla.border = "1";
    tabla.style.borderColor = "white";
    
    //Generamos un primer bucle para las filas
    for (let filas = 0; filas < 31; filas++) {
        //Creamos una fila
        let fila = document.createElement("tr");

        //Generamos un segundo bucle para las columnas
        for (let celdas = 0; celdas < 31; celdas++) {
            //Creamos una celda
            let celda = document.createElement("td");

            //Le asiganamos los estilos requeridos
            celda.style.backgroundColor = colorRBG(); // nos devuelve algo así: rgb(xxx,xxx,xxx)
            celda.style.width = "10px";
            celda.style.height = "10px";

            //Insertamos la celda en la fila
            fila.appendChild(celda);
        }
        //Insertamos la fila en la celda
        tabla.appendChild(fila);
    }
    //Insertamos la tabla en la zona de dibujo.
    zonaDibujo.appendChild(tabla);
}

//Llamamos a la función que construye la tabla
construirTabla();