class Factura {
  Empresa = {
    nombre: "",
    direccion: "",
    telefono: "",
    NIF: "",
  };

  Cliente = {
    nombre: "",
    direccion: "",
    telefono: "",
    NIF: "",
  };

  DetallesFacturas = [];
  // elemento: {
  //     descripcion: "",
  //     precio,
  //     cantidad
  // }

  TotalesFactura = {
    baseImponible: 0,
    importeTotal: 0,
    tipoIVA: 0,
    formaDePago: "",
  };

  constructor(empresa, cliente, detalle, tIVA, formaPago) {
    if (typeof tIVA !== 'number' || tIVA < 0) {
        throw new Error("El tipo de IVA debe ser un número positivo.");
      }
      
      if (!Array.isArray(detalle) || detalle.length === 0) {
        throw new Error("Debe haber al menos un producto en los detalles.");
      }

    this.Empresa = {
      nombre: empresa.nombre,
      direccion: empresa.direccion,
      telefono: empresa.telefono,
      NIF: empresa.NIF,
    };
    this.Cliente = {
      nombre: cliente.nombre,
      direccion: cliente.direccion,
      telefono: cliente.telefono,
      NIF: cliente.NIF,
    };
    this.DetallesFacturas = detalle;
    // Producto: {
    //     descripcion: detalle.descripcion,
    //     precio: detalle.precio,
    //     cantidad: detalle.cantidad
    // }

    this.TotalesFactura = {
      baseImponible: 0, //detalle.precio * detalle.cantidad,
      importeTotal: 0, //detalle.precio * detalle.cantidad * tIVA,
      tipoIVA: tIVA,
      formaDePago: formaPago,
    };
  }

  calcularTotal() {
    let baseImponible = 0;

    this.DetallesFacturas.forEach((producto) => {
      baseImponible += producto.precio * producto.cantidad;
    });

    this.TotalesFactura.baseImponible = baseImponible;

    let totalIVA =
      (this.TotalesFactura.baseImponible * this.TotalesFactura.tipoIVA) / 100;

    this.TotalesFactura.importeTotal =
      this.TotalesFactura.baseImponible + totalIVA;
  }

  muestraTotal() {
    console.log("Importe Total: " + this.TotalesFactura.importeTotal);
    console.log("IVA aplicado: " + this.TotalesFactura.tipoIVA);
    console.log("Forma de pago: " + this.TotalesFactura.formaDePago);
  }

 imprimirFactura() {
  let fechaImpresion = new Date().toLocaleString();
  let facturaString = `Fecha: ${fechaImpresion}\n`;

  facturaString += `Datos de la empresa:\nEmpresa: ${this.Empresa.nombre}\nDirección: ${this.Empresa.direccion}\nTeléfono: ${this.Empresa.telefono}\nNIF: ${this.Empresa.NIF}\n`;

  facturaString += `Datos del Cliente:\nNombre: ${this.Cliente.nombre}\nDirección: ${this.Cliente.direccion}\nTeléfono: ${this.Cliente.telefono}\nNIF: ${this.Cliente.NIF}\n`;

  facturaString += "Detalles de la factura:\n";

  this.DetallesFacturas.forEach((elemento) => {
    facturaString += `Descripción: ${elemento.descripcion}\nPrecio: ${elemento.precio}\nCantidad: ${elemento.cantidad}\n`;
  });

  facturaString += `Total de la factura:\nBase imponible: ${this.TotalesFactura.baseImponible}\nImporte Total: ${this.TotalesFactura.importeTotal}\nTipo de IVA: ${this.TotalesFactura.tipoIVA}\nForma de pago: ${this.TotalesFactura.formaDePago}`;

  return facturaString;
}

}
