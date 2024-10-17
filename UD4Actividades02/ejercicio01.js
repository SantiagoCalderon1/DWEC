const Hospital = {
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

      mostrarDatos: function () {
        return `<p>Datos Hospital <br> 
          codHospital: ${this.codHospital} 
          nombreHospital: ${this.nombreHospital} 
          Direccion: ${this.direccion} 
          Telefono: ${this.telefono} 
          Poblacion:  ${this.poblacion} 
          Codigo Postal: ${this.codPostal}</p>`;
      },
    };
  },
};

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

      cambiarSueldo: function (newSueldo) {
        sueldo = newSueldo;
      },

      retencionMedico: function (sueldo, porcentajeRetencion) {
        return sueldo * (porcentajeRetencion / 100);
      },

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

// Declarar variables
let HospitalRibera = Hospital.crearHospital(
  "H001",
  "Hospital General del Norte",
  "Av. Libertad 456, Sector San Martín",
  "555-7890",
  "Ciudad del Norte",
  "67890"
);

let MedicoDigestivo = Medico.crearMedico(
  "M123",
  "Carlos",
  "Pérez Gómez",
  "12345678X",
  "Calle Los Robles 123, Piso 2",
  "555-4321",
  "Ciudad del Este",
  "54321",
  "1980-05-15",
  "Cardiología",
  "50000",
  HospitalRibera
);

let MedicoTraumatologo = Medico.crearMedico(
  "M456",
  "Ana",
  "Martínez Sánchez",
  "98765432Y",
  "Avenida del Libertador 456, Oficina 3",
  "555-9876",
  "Asunción",
  "12345",
  "1975-08-22",
  "Digestivo",
  "60000",
  HospitalRibera
);

function mostrarDatos() {
  document.write("<h2>Datos de Médicos</h2>");
  document.write(
    MedicoDigestivo.mostrarDatos() + "<br>" + MedicoTraumatologo.mostrarDatos()
  );

  document.write("<h2>Sueldo de Médico Traumatologo cambiado</h2><br>");
  MedicoTraumatologo.cambiarSueldo(2.3);

  document.write("<h2>Datos del Hospital Ribera</h2>");
  document.write(HospitalRibera.mostrarDatos());

  document.write(
    "<h2>Calculo de la retencion de las dos instancias del objeto Médico</h2>"
  );
  document.write(
    "Retención Medico Digstivo: " +
      MedicoDigestivo.retencionMedico(50000, 21) +
      "<br>" +
      "Retención Medico Traumatologo: " +
      MedicoTraumatologo.retencionMedico(60000, 10)
  );

  MedicoDigestivo.cambiarSueldo(MedicoDigestivo.retencionMedico(21));
  MedicoTraumatologo.cambiarSueldo(MedicoTraumatologo.retencionMedico(10));

  document.write("<h2>Datos de actualizados</h2>");
  document.write(
    MedicoDigestivo.mostrarDatos() + "<br>" + MedicoTraumatologo.mostrarDatos()
  );
}

window.onload = mostrarDatos;
