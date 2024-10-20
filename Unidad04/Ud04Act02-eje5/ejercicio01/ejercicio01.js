//Santiago Calderon Castaño

//Declaración de objetos
const Hospital = {
  /** Defino una función que crea un hospital.
   * El metodo se llama para crear y devolver una nueva instancia de un hospital
   * 
   * Las propiedades se inician con los valores pasados como argumentos a crearHospital function( codHospital ....)
   * y todo por la sintaxis de propiedad abreviada.
   * 
   * por ejemplo: codHospital se que convierte una propiedad del objeto con el mismo nombre y valor
   */
  crearHospital: function (
    codHospital,
    nombreHospital,
    direccion,
    telefono,
    poblacion,
    codPostal
  ) {
    return {
      codHospital,
      nombreHospital,
      direccion,
      telefono,
      poblacion,
      codPostal,

      /**
       * Este método está integrada en crearHospital por lo tanto cuando se cuando se cree el objeto 
       * también será una propiedad del objeto.
       * 
       * Este método devuelve una cadena con un formato de parrafo
       */
      mostrarDatos: function () {
        return `<p>Datos Hospital <br> 
              codHospital: ${this.codHospital} 
              nombreHospital: ${this.nombreHospital} 
              Direccion: ${this.direccion} 
              Telefono: ${this.telefono} 
              Poblacion:  ${this.poblacion} 
              Codigo Postal: ${this.codPostal}</p>`;
        //Usamos this. para acceder a las propiedades del mismop objeto que está invocando el método
      }
    };
  },
};

//Lo mismo que Hospital pero para Medico
const Medico = {
  crearMedico: function (
    codMedico,
    nombre,
    apellidos,
    dni,
    direccion,
    telefono,
    poblacion,
    codPostal,
    fechaNacimiento,
    especialidad,
    sueldo,
    hospital
  ) {
    return {
      codMedico,
      nombre,
      apellidos,
      dni,
      direccion,
      telefono,
      poblacion,
      codPostal,
      fechaNacimiento,
      especialidad,
      sueldo,
      hospital,

      //Función que modifica la propiedad sueldo, tambien viene integrada al objeto, y usamos también this. para referirnos a si mismo
      cambiarSueldo: function (newSueldo) {
        this.sueldo = newSueldo;
      },

      //Función que calcula la retención de un Medico
      retencionMedico: function (sueldo, porcentajeRetencion) {
        return sueldo * (porcentajeRetencion / 100);
      },

      //Este método devuelve una cadena en formato parrafo, también está integrado en el objeto
      mostrarDatos: function () {
        return `<p> Datos Médico <br> 
              Nombre: ${this.nombre} 
              Apellidos: ${this.apellidos} 
              DNI: ${this.dni}  
              Direccion: ${this.direccion} 
              Telefono: ${this.telefono} 
              Poblacion:  ${this.poblacion} 
              Cod Postal: ${this.codPostal} 
              Fecha Nacimiento: ${this.fechaNacimiento}  
              Especialidad: ${this.especialidad} 
              Sueldo: ${this.sueldo} 
              Hospital: ${this.hospital.mostrarDatos()}</p>`;
      },
    };
  },
};