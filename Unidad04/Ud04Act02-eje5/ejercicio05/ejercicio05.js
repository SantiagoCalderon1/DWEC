class Edificio {
  calle = "";
  numero = "";
  codigoPostal = "";

  //edificio
  plantasEdificio = {
    //planta
    planta: {
      numeroPlanta: 0,
      numeroPuertas: 0,
      //puerta
      puerta: {
        numeroPuerta: 0,
        nombrePropietario: "",
      },
    },
  };

  constructor(calle, numero, codigoPostal) {
    this.calle = calle;
    this.numero = numero;
    this.codigoPostal = codigoPostal;
  }

  agregarPlantasYPuertas(numPlantas, numPuertas) {

    for (let index = 1; index <= numPlantas; index++) {
      let planta = this.plantasEdificio.planta;
      planta.numeroPlanta = index;
      planta.numeroPuertas = numPuertas;

      for (let index = 1; index <= numPuertas; index++) {
        let puerta = planta.puerta;
        puerta.numeroPuerta = index;
        puerta.nombrePropietario = "";
      }
    }
  }

  modificarNumero(numero) {
    this.numero = numero;
  }

  modificarCalle(calle) {
    this.calle = calle;
  }

  modificarCodigoPostal(codigo) {
    this.codigoPostal = codigo;
  }

  imprimirCalle() {
    return this.calle;
  }

  imprimirNumero() {
    return this.numero;
  }

  imprimirCodigoPostal() {
    return this.codigoPostal;
  }

  agregarPropietario(nombre, planta, puerta) {
    this.plantasEdificio.planta.puerta.nombrePropietario = nombre;
  }

  imprimePlantas() {
    let datos = "";
    datos += "Listado de pro"
    this.plantasEdificio.forEach((planta, index) => {
        datos += planta.calle;
    });
  }
}
