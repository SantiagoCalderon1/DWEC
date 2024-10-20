//Santiago Calderon Castaño

//Delaración de variables e inicialización de variables
let detalleFactura = [
  { descripcion: "Producto 1", precio: 100, cantidad: 2 },
  { descripcion: "Producto 2", precio: 50, cantidad: 3 },
];

let empresa = {
  nombre: "Empresa Ejemplo",
  direccion: "Calle Falsa 123",
  telefono: "555-1234",
  NIF: "A12345678",
};

let cliente = {
  nombre: "Cliente Ejemplo",
  direccion: "Avenida Real 456",
  telefono: "555-9876",
  NIF: "B98765432",
};

// Caso de prueba 1
// Crear la factura
let factura = new Factura(
  empresa,
  cliente,
  detalleFactura,
  21,
  "Tarjeta"
);

// Calculamos el total de la factura
factura.calcularTotal();

// Verificamos los totales
document.write("Base imponible esperada: 350<br>"); // (100*2 + 50*3)
document.write("Base imponible obtenida: " + factura.TotalesFactura.baseImponible + "<br>");

document.write("Importe total esperado: 423.5<br>"); // Base imponible + 21% de IVA
document.write("Importe total obtenido: " + factura.TotalesFactura.importeTotal + "<br>");

// Caso de prueba 2
// Mostramos los totales
factura.muestraTotal(); // Este método usa console.log, lo cambiaré a document.write

// Modificamos muestraTotal para usar document.write
factura.muestraTotal = function () {
  document.write("Importe Total: " + this.TotalesFactura.importeTotal + "<br>");
  document.write("IVA aplicado: " + this.TotalesFactura.tipoIVA + "<br>");
  document.write("Forma de pago: " + this.TotalesFactura.formaDePago + "<br>");
};

// Caso de prueba 3
// Imprimimos la factura
let facturaImprimible = factura.imprimirFactura();
document.write(facturaImprimible + "<br>");

// Caso de prueba 4
// Intentarmos crear una factura con IVA negativo se supone que debería arrojar un error
try {
  let facturaInvalidaIVA = new Factura(
    empresa,
    cliente,
    detalleFactura,
    -5,
    "Efectivo"
  );
} catch (e) {
  document.write("Error capturado: " + e.message + "<br>"); // Esperado: "El tipo de IVA debe ser un número positivo."
}

// Intentar crear una factura sin productos aquí también debería dar un error
try {
  let facturaSinProductos = new Factura(
    empresa,
    cliente,
    [],
    21,
    "Efectivo"
  );
} catch (e) {
  document.write("Error capturado: " + e.message + "<br>"); // Esperado: "Debe haber al menos un producto en los detalles."
}

// Caso de prueba 5
// Creamos una factura con una forma de pago diferente
let facturaEfectivo = new Factura(
  empresa,
  cliente,
  detalleFactura,
  21,
  "Efectivo"
);

facturaEfectivo.calcularTotal();
facturaEfectivo.muestraTotal(); 