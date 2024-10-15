const Hospital = {
  codHospital: "",
  nombreHospital: "",
  direccion: "",
  telefono: "",
  poblacion: "",
  codPostal: "",

  crearHospital: function (
    codHospital,
    nombreHospital,
    direccion,
    telefono,
    poblacion,
    codPostal
  ) {
    return {
      codHospital: codHospital,
      nombreHospital: nombreHospital,
      direccion: direccion,
      telefono: telefono,
      poblacion: poblacion,
      codPostal: codPostal,
    };
  },
};

const Medico = {
  codMedico: "",
  nombre: "",
  apellidos: "",
  dni: "",
  direccion: "",
  telefono: "",
  poblacion: "",
  codPostal: "",
  fechaNacimiento: "",
  especialidad: "",
  sueldo: "",
  Hospital: {},

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
    Hospital = {}
  ) {
    return {
      codMedico: codMedico,
      nombre: nombre,
      apellidos: apellidos,
      dni: dni,
      direccion: direccion,
      telefono: telefono,
      poblacion: poblacion,
      codPostal: codPostal,
      fechaNacimiento: fechaNacimiento,
      especialidad: especialidad,
      sueldo: sueldo,
      Hospital: Hospital,
    };
  },

  cambiarSueldo : function(newSueldo){
    sueldo = newSueldo;
  },

  retencionMedico : function(sueldo, porcentajeRetencion){
    return  sueldo * (porcentajeRetencion / 100);
  },

  mostrarDatos : function(){
    return  `Nombre: ${this.nombre} Apellidos: ${this.apellidos} DNI: ${this.dni}  Direccion: ${this.direccion} Telefono: ${this.telefono} Poblacion:  ${this.poblacion} Cod Postal: ${this.codPostal} Fecha Nacimiento: ${this.fechaNacimiento}  Especialidad: ${this.especialidad} Sueldo: ${this.sueldo} Hospital: ${this.Hospital}`;     
  }
};
