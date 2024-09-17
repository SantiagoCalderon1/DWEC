var numero1 = parseInt(prompt("Dime un número: "));
var numero2 = parseInt(prompt("Dime otro número: "));

if (numero1 > numero2) {
    for (let index = numero2 + 1; index < numero1; index++) {
        document.write(index + "<br>");
    }
    //alert("El primer número es mayor");
} else if (numero1 < numero2) {
    for (let index = numero1 + 1; index < numero2; index++) {
        document.write(index + "<br>");
    }
    //alert("El segundo número es mayor");
} else if (numero1 == numero2) {
    alert("Los números son iguales");
} else  {
    alert("Error");
}
 