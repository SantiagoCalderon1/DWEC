// Santiago Calderon Cazstaño
// Variables globales
let tablero = [];          // Almacena el estado de cada celda en el tablero
let tiempo = 0;            // Contador de tiempo en segundos
let temporizador;          // Referencia al temporizador
let juegoActivo = false;   // Estado del juego (si está en progreso o no)
let columnas, filas, minasRestantes; // Dimensiones del tablero y número de minas

// Referencias a elementos HTML
const zonaTablero = document.getElementById("zonaTablero"); // Contenedor del tablero
const dificultad = document.getElementById("dificultad");   // Selector de dificultad

// Inicia el juego al hacer clic en el botón
document.getElementById("boton").addEventListener("click", iniciarJuego);

// Función para inicializar el juego
function iniciarJuego() {
    limpiarTablero();       // Limpia el tablero previo, si existe
    definirDificultad();    // Define la dificultad seleccionada
    iniciarTemporizador();  // Inicia el temporizador
    crearTablero();         // Genera el tablero visualmente
    ajustarAnchoTablero();  // Ajusta el tamaño del tablero en la pantalla
    colocarMinas();         // Coloca las minas en posiciones aleatorias
}

// Limpia el tablero y reinicia variables relevantes
function limpiarTablero() {
    zonaTablero.innerHTML = '';   // Borra el contenido HTML del tablero
    clearInterval(temporizador);  // Detiene cualquier temporizador previo
    juegoActivo = true;           // Marca el juego como activo
    tablero = [];                 // Reinicia el arreglo del tablero
}

// Define la configuración del juego según la dificultad seleccionada
function definirDificultad() {
    switch (dificultad.value) {
        case "sencillo":
            columnas = filas = obtenerNumeroAleatorio(10, 20); // Dimensiones aleatorias entre 10 y 20
            minasRestantes = 25;        // Número de minas para esta dificultad
            zonaTablero.classList.add("sencillo"); // Clase CSS para esta dificultad
            break;
        case "normal":
            columnas = filas = obtenerNumeroAleatorio(20, 40);
            minasRestantes = 60;
            zonaTablero.classList.add("normal");
            break;
        case "avanzado":
            columnas = filas = obtenerNumeroAleatorio(40, 80);
            minasRestantes = 100;
            zonaTablero.classList.add("avanzado");
            break;
        case "experto":
            columnas = filas = obtenerNumeroAleatorio(80, 100);
            minasRestantes = 140;
            zonaTablero.classList.add("experto");
            break;
    }
    mostrarNumeroMinas(minasRestantes); // Muestra el número de minas en el contador
}

// Inicia el temporizador del juego
function iniciarTemporizador() {
    tiempo = 0; // Reinicia el tiempo a 0
    document.getElementById("temporizador").textContent = tiempo; // Muestra el tiempo inicial en la pantalla
    clearInterval(temporizador); // Detiene el temporizador previo
    temporizador = setInterval(() => { // Inicia un nuevo temporizador
        if (juegoActivo) {
            tiempo++; // Incrementa el tiempo
            document.getElementById("temporizador").textContent = tiempo; // Actualiza el tiempo en pantalla
        }
    }, 1000); // Cada segundo
}

// Crea el tablero en la interfaz
function crearTablero() {
    // Define el número de columnas y filas en la cuadrícula CSS
    zonaTablero.style.gridTemplateColumns = `repeat(${columnas}, 1fr)`;
    zonaTablero.style.gridTemplateRows = `repeat(${filas}, 1fr)`;

    for (let i = 0; i < filas; i++) {
        tablero[i] = []; // Inicializa cada fila en el arreglo
        for (let j = 0; j < columnas; j++) {
            const casilla = document.createElement("div"); // Crea un elemento div para cada celda
            casilla.classList.add("cell"); // Añade clase para el estilo CSS
            casilla.dataset.fila = i;     // Guarda la fila en un atributo de datos
            casilla.dataset.columna = j;  // Guarda la columna en un atributo de datos

            // Estado inicial de cada celda
            tablero[i][j] = { mina: false, revelada: false, marcada: false };

            // Eventos de clic para la celda
            casilla.addEventListener("click", () => verificarCasilla(i, j)); // Clic izquierdo para verificar
            casilla.addEventListener("contextmenu", (e) => { // Clic derecho para marcar
                e.preventDefault(); // Previene el menú contextual
                marcarCasilla(casilla, i, j); // Marca la celda
            });

            zonaTablero.appendChild(casilla); // Añade la celda al contenedor
        }
    }
}

// Ajusta el tamaño del tablero visualmente
function ajustarAnchoTablero() {
    const anchoContenedor = columnas * 31; // Calcula el ancho en píxeles
    const altoContenedor = filas * 31;     // Calcula el alto en píxeles
    zonaTablero.style.width = `${anchoContenedor}px`;
    zonaTablero.style.height = `${altoContenedor}px`;
}

// Coloca minas en posiciones aleatorias en el tablero
function colocarMinas() {
    let minasColocadas = 0;
    while (minasColocadas < minasRestantes) {
        const fila = obtenerNumeroAleatorio(0, filas - 1); // Fila aleatoria
        const columna = obtenerNumeroAleatorio(0, columnas - 1); // Columna aleatoria

        if (!tablero[fila][columna].mina) { // Verifica que no haya una mina ya
            tablero[fila][columna].mina = true; // Coloca una mina
            minasColocadas++; // Incrementa el contador de minas colocadas
        }
    }
}

// Revela todas las minas cuando el juego termina
function revelarMinas() {
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            const celda = tablero[i][j];
            if (celda.mina) {
                const casilla = document.querySelector(`[data-fila="${i}"][data-columna="${j}"]`);
                casilla.classList.add("mina"); // Añade la clase CSS para mostrar visualmente la mina
            }
        }
    }
}

// Verifica una celda cuando el jugador hace clic
function verificarCasilla(fila, columna) {
    const casilla = document.querySelector(`[data-fila="${fila}"][data-columna="${columna}"]`);
    const celda = tablero[fila][columna];

    if (!juegoActivo || celda.revelada || celda.marcada) return; // No hace nada si la celda ya está revelada o marcada

    celda.revelada = true; // Marca la celda como revelada
    casilla.classList.add("revelada"); // Añade clase CSS para indicar revelación

    if (celda.mina) {
        casilla.classList.add("mina"); // Muestra la mina
        finalizarJuego(false); // Termina el juego con una derrota
    } else {
        const minasAdyacentes = contarMinasAdyacentes(fila, columna); // Cuenta las minas alrededor
        if (minasAdyacentes > 0) {
            casilla.textContent = minasAdyacentes; // Muestra el número de minas adyacentes
            casilla.classList.add(`number-${minasAdyacentes}`); // Añade clase para el color del número
        } else {
            revelarAdyacentes(fila, columna); // Si no hay minas adyacentes, revela las celdas cercanas
        }
    }
    verificarVictoria(); // Verifica si el jugador ha ganado
}

// Cuenta las minas en las celdas adyacentes
function contarMinasAdyacentes(fila, columna) {
    let conteo = 0;
    for (let i = fila - 1; i <= fila + 1; i++) {
        for (let j = columna - 1; j <= columna + 1; j++) {
            if (i >= 0 && i < filas && j >= 0 && j < columnas && tablero[i][j].mina) {
                conteo++; // Incrementa el conteo si hay una mina
            }
        }
    }
    return conteo;
}

// Revela celdas adyacentes en caso de que no haya minas cercanas
function revelarAdyacentes(fila, columna) {
    for (let i = fila - 1; i <= fila + 1; i++) {
        for (let j = columna - 1; j <= columna + 1; j++) {
            if (i >= 0 && i < filas && j >= 0 && j < columnas && !tablero[i][j].revelada) {
                verificarCasilla(i, j); // Verifica cada celda adyacente
            }
        }
    }
}

// Marca o desmarca una celda con bandera o signo de interrogación
function marcarCasilla(casilla, fila, columna) {
    const celda = tablero[fila][columna];
    if (celda.revelada) return; // No hace nada si la celda ya está revelada

    if (!celda.marcada) { // Marca como bandera
        celda.marcada = "bandera";
        casilla.classList.add("bandera");
        minasRestantes--;
    } else if (celda.marcada === "bandera") { // Cambia a interrogación
        celda.marcada = "interrogacion";
        casilla.classList.remove("bandera");
        casilla.classList.add("interrogacion");
        minasRestantes++;
    } else { // Remueve la marca
        celda.marcada = false;
        casilla.classList.remove("interrogacion");
    }
    mostrarNumeroMinas(minasRestantes); // Actualiza el contador de minas en pantalla
}

// Verifica si el jugador ha ganado
function verificarVictoria() {
    let reveladas = 0;
    let minasMarcadas = 0;

    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            if (tablero[i][j].revelada) {
                reveladas++;
            }
            if (tablero[i][j].mina && tablero[i][j].marcada) {
                minasMarcadas++;
            }
        }
    }

    // Verifica si se han revelado todas las celdas menos las minas, o si todas las minas están marcadas
    if (reveladas === filas * columnas - minasRestantes || minasMarcadas === minasRestantes) {
        finalizarJuego(true);
    }
}

// Termina el juego mostrando un mensaje de victoria o derrota
function finalizarJuego(victoria) {
    juegoActivo = false; // Desactiva el juego
    clearInterval(temporizador); // Detiene el temporizador
    if (victoria) {
        alert("¡Felicidades, has ganado!");
    } else {
        revelarMinas(); // Muestra todas las minas en el tablero
        alert("¡Perdiste! Has detonado una mina.");
    }
}

// Muestra el número de minas restantes en el contador
function mostrarNumeroMinas(minas) {
    document.getElementById("minas").textContent = minas;
}

// Genera un número aleatorio entre min y max
function obtenerNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}