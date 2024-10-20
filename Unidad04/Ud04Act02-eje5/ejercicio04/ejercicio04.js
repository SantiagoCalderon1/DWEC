//Santiago Calderon Castaño
class Factura {
  //Declaración de atributos

  //Atributo 1
  Empresa = {
    nombre: "",
    direccion: "",
    telefono: "",
    NIF: "",
  };

  //Atributo 2
  Cliente = {
    nombre: "",
    direccion: "",
    telefono: "",
    NIF: "",
  };

  //Atributo 3
  DetallesFacturas = [];

  //Atributo 4
  TotalesFactura = {
    baseImponible: 0,
    importeTotal: 0,
    tipoIVA: 0,
    formaDePago: "",
  };

  //Constructor para Factura
  constructor(empresa, cliente, detalle, tIVA, formaPago) {
    //Hacemos una comprobación para tIVA
    if (typeof tIVA !== 'number' || tIVA < 0) {
      throw new Error("El tipo de IVA debe ser un número positivo.");
    }

    //Hacemos una comprobación para detalle, debe ser un array
    if (!Array.isArray(detalle) || detalle.length === 0) {
      throw new Error("Debe haber al menos un producto en los detalles.");
    }

    //Inicializamos la empresa
    this.Empresa = {
      nombre: empresa.nombre,
      direccion: empresa.direccion,
      telefono: empresa.telefono,
      NIF: empresa.NIF,
    };

    //Inicializamos a cliente
    this.Cliente = {
      nombre: cliente.nombre,
      direccion: cliente.direccion,
      telefono: cliente.telefono,
      NIF: cliente.NIF,
    };

    //Inicializamos el detalle
    this.DetallesFacturas = detalle;

    this.TotalesFactura = {
      baseImponible: 0, //detalle.precio * detalle.cantidad,
      importeTotal: 0, //detalle.precio * detalle.cantidad * tIVA,
      tipoIVA: tIVA,
      formaDePago: formaPago,
    };
  }

  //Función para calcular el total de la factura
  calcularTotal() {
    let baseImponible = 0;

    //Obtenemos la base imponible
    this.DetallesFacturas.forEach((producto) => {
      baseImponible += producto.precio * producto.cantidad;
    });

    //Asignamos esa base al atributo baseImponible de Factura
    this.TotalesFactura.baseImponible = baseImponible;

    //Calculamos el total del IVA
    let totalIVA = (this.TotalesFactura.baseImponible * this.TotalesFactura.tipoIVA) / 100;

    //Asignmos ese total al atributo importeTotal
    this.TotalesFactura.importeTotal = this.TotalesFactura.baseImponible + totalIVA;
  }

  //Función que muesta el total de la factura
  muestraTotal() {
    console.log("Importe Total: " + this.TotalesFactura.importeTotal);
    console.log("IVA aplicado: " + this.TotalesFactura.tipoIVA);
    console.log("Forma de pago: " + this.TotalesFactura.formaDePago);
  }

  //Función para imprimir la factura, retorna un tipo String
  imprimirFactura() {
    //Creamos la varibale facturaString quer almacenará la información y la fecha de hoy de la factura
    let facturaString = `Fecha: ${new Date().toLocaleString()}\n`;

    //Rellenamos con información, creando el formato que queremos
    facturaString += `Datos de la empresa:\nEmpresa: ${this.Empresa.nombre}\nDirección: ${this.Empresa.direccion}\nTeléfono: ${this.Empresa.telefono}\nNIF: ${this.Empresa.NIF}\n`;

    facturaString += `Datos del Cliente:\nNombre: ${this.Cliente.nombre}\nDirección: ${this.Cliente.direccion}\nTeléfono: ${this.Cliente.telefono}\nNIF: ${this.Cliente.NIF}\n`;

    facturaString += "Detalles de la factura:\n";

    //Iteramos sobre DetalleFactura para poder obtener más detalles de la factura
    this.DetallesFacturas.forEach((elemento) => {
      facturaString += `Descripción: ${elemento.descripcion}\nPrecio: ${elemento.precio}\nCantidad: ${elemento.cantidad}\n`;
    });

    //Guardamos más datos
    facturaString += `Total de la factura:\nBase imponible: ${this.TotalesFactura.baseImponible}\nImporte Total: ${this.TotalesFactura.importeTotal}\nTipo de IVA: ${this.TotalesFactura.tipoIVA}\nForma de pago: ${this.TotalesFactura.formaDePago}`;

    //Retornamos el String
    return facturaString;
  }

}
