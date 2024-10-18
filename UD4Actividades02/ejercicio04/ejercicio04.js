class Factura {

    Empresa = {
        nombre: "",
        direccion: "",
        telefono: "",
        NIF: ""
    };

    Cliente = {
        nombre: "",
        direccion: "",
        telefono: "",
        NIF: ""
    };


    DetallesFacturas = {
        elemento: {
            descripcion: "",
            precio,
            cantidad
        }
    };

    TotalesFactura = {
        baseImponible,
        importeTotal,
        tipoIVA,
        formaPago: ""
    };

    Factura(empresa, cliente, detalle, tIVA, formaPago) {
        this.Empresa = {
            nombre: empresa.nombre,
            direccion: empresa.direccion,
            telefono: empresa.telefono,
            NIF: empresa.NIF
        }
        this.Cliente = {
            nombre: cliente.nombre,
            direccion: cliente.direccion,
            telefono: cliente.telefono,
            NIF: cliente.NIF
        }
    }
};
