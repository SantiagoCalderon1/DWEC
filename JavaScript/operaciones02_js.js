
var numero1 = parseInt(prompt("Introduce el primer número: "));
var numero2 = parseInt(prompt("Introduce el segundo número: "));

// Función para imprimir los números en la tabla
function imprimirNum() {
    const operaciones = ['suma', 'resta', 'multiplicacion', 'division'];

    // Iterar sobre los sufijos y asignar el mismo valor de numero1 y numero2
    operaciones.forEach(op => {
        document.getElementById(`num1-${op}`).innerHTML = numero1;
        document.getElementById(`num2-${op}`).innerHTML = numero2;
    });
}

function mostrarResultado() {
    document.getElementById("resultadoSuma").innerHTML = numero1 + numero2;
    document.getElementById("resultadoResta").innerHTML = numero1 - numero2;
    document.getElementById("resultadoMultiplicacion").innerHTML = numero1 * numero2;
    document.getElementById("resultadoDivision").innerHTML = numero1 / numero2;
}

// Función que inicializa el proceso
function inicializar() {
    imprimirNum();
    mostrarResultado();
}
window.onload = inicializar;
