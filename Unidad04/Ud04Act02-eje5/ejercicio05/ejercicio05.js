//Santiago Calderon Castaño


class Edificio {

  nombreEdificio = ""; //Atributo opcional

  calle = "";
  numero = "";
  codigoPostal = "";

  //edificio
  plantasEdificio = {
    planta: []
    /**
    Estructura de una planta        
    planta: [
      {
        numeroPlanta: 0,
        numeroPuertas: 0,
        puerta
        puerta: [
          { numeroPuerta: 0, nombrePropietario: "" }
        ]
      }]
     */
  };

  //Constructor de edificios
  constructor(nombreEdificio, calle, numero, codigoPostal) {
    this.nombreEdificio = nombreEdificio; // opcional

    this.calle = calle;
    this.numero = numero;
    this.codigoPostal = codigoPostal;
    this.mensajeEdificioConstruido();
  }

  //Método para agregar una planta y puerta dinamicamente
  agregarPlantasYPuertas(numPlantas, numPuertas) {
    // obtenemos el nuemro de plantas ya existentes
    let numeroPlantasExistentes = this.plantasEdificio.planta.length;

    // creamos un bucle para agregar las plantas y puertas, recorriendo el número de plantas que queremos
    for (let plantaIndex = 1; plantaIndex <= numPlantas; plantaIndex++) {
      let nuevaPlanta = {
        numeroPlanta: numeroPlantasExistentes + plantaIndex, // obtenemos el último numero de las plantas y el aumentamos 1 a 1 con el plantaIndex, eso lo creará dinamicamente
        numeroPuertas: numPuertas, // asignamos el número de plantas, ese si viene por parametros
        puerta: [] // por cada planta lo inicializamos vacío, más abajo lo llenaremos
      }

      // creamos un bucle para crear y agregar las puertas al array puerta
      for (let puertaIndex = 1; puertaIndex <= numPuertas; puertaIndex++) {
        let nuevaPuerta = {
          numeroPuerta: puertaIndex, // asiganamos el número de la puerta dinamicamente
          nombrePropietario: "" //Vacío porque inicialmente no tenemos propietario
        }
        nuevaPlanta.puerta.push(nuevaPuerta); // agregamos la nueva puerta a la nueva planta
      }
      this.plantasEdificio.planta.push(nuevaPlanta); //agregamos la nueva planta al edificio
    }
  }

  //Función para agregar un nuevo propietarioo
  agregarPropietario(nombrePropietario, numeroPlanta, numeroPuerta) {
    this.plantasEdificio.planta.forEach((plantaAux) => { //recorremos el array de planta
      if (plantaAux.numeroPlanta === numeroPlanta) { //nos aseguramos de estar en la planta que queremos
        plantaAux.puerta.forEach((puertaAux) => { // recorremos todas las puerta, buscando la indicada
          if (puertaAux.numeroPuerta === numeroPuerta) { // verificamos la puerta
            puertaAux.nombrePropietario = nombrePropietario; // asignamos al propietario
          }
        });
      } else {
        console.log("No existe la planta/puerta solicitada"); // si no existe la planta nos muestra un mensaje por consola
      }
    });
    // Si todo sale bien imprimimos un mensaje de confirmación
    this.mensajePropietarioAgregado(nombrePropietario, numeroPlanta, numeroPuerta);
  }

  //Método tipo set
  modificarNumero(numero) {
    this.numero = numero;
  }

  //Método tipo set
  modificarCalle(calle) {
    this.calle = calle;
  }

  //Método tipo set
  modificarCodigoPostal(codigo) {
    this.codigoPostal = codigo;
  }

  //Método tipo get
  imprimirCalle() {
    return this.calle;
  }

  //Método tipo get
  imprimirNumero() {
    return this.numero;
  }

  //Método tipo get
  imprimirCodigoPostal() {
    return this.codigoPostal;
  }

  //Método para listar las plantas y sus puertas y sus propietarios
  imprimePlantas() {
    let datos = ""; // creamos una variable donde almacenaremos los datos
    datos += `Listado de propietarios del edificio calle ${this.calle} número ${this.numero}`; // añadimos información
    this.plantasEdificio.planta.forEach((plantaAux) => { //Recorremos las plantas
      plantaAux.puerta.forEach((puertaAux) => { // recorremos las puertas de cada planta
        datos += `Propietario del piso ${puertaAux.numeroPuerta} de la planta ${plantaAux.numeroPlanta}: ${puertaAux.nombrePropietario}\n`; // añadimos la información a la varibale datos
      })
    });
    console.log(datos); //imprimimos los datos
  }

  //Método que imprime la confirmación de construcción de un edificio
  mensajeEdificioConstruido() {
    alert("Construido nuevo edificio en calle: " + this.calle + " N: " + this.numero + ", CP: " + this.codigoPostal);
  }

  //Método que imprime la confirmación de agregación de un propietario a una puerta 
  mensajePropietarioAgregado(nombrePropietario, numeroPlanta, numeroPuerta) {
    alert(nombrePropietario + " es ahora el propietario de la puerta " + numeroPuerta + " de la planta " + numeroPlanta);
  }

  //Método que imprime un mensaje de la ubicación de un edificio
  mensajeEstaSituado() {
    alert("El edificio " + this.nombreEdificio + " está situado en la calle " + this.calle + " número " + this.numero);
  }

  //Ménsaje que muestra la calle de un edificio
  mensajeCalleEs() {
    alert("La calle del edificio " + this.nombreEdificio + " es: " + this.calle);
  }
}
