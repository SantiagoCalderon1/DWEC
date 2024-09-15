
var numero1 = parseInt(prompt("Introduce el primer número: "));
var numero2 = parseInt(prompt("Introduce el segundo número: "));


function mostrarResultado() {

    document.write("El resultado de la suma es: " + (numero1 + numero2) + "<br>");
    document.write("El resultado de la resta es: " + (numero1 - numero2) + "<br>");
    document.write("El resultado de la multiplicación es: " + (numero1 * numero2) + "<br>");
    document.write("El resultado de la división es: " + (numero1 / numero2) + "<br>");
    

    /*
    alert("El resultado de la suma es: " + (numero1 + numero2));
    alert("El resultado de la resta es: " + (numero1 - numero2));
    alert("El resultado de la multiplicación es: " + (numero1 * numero2));
    alert("El resultado de la división es: " + (numero1 / numero2));
     */
}

mostrarResultado();