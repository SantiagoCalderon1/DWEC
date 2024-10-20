    // Declaración e instanciación de variables objeto
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

    //Función que nos inyectará los datos en el div con idenficación output con innerHTML 
    function mostrarDatos() {
      //Declaramos la constante que almacenará los datos de toda la prueba
      const output = document.getElementById("output");

      output.innerHTML += "<h2>Datos de Médicos</h2>";
      output.innerHTML += MedicoDigestivo.mostrarDatos() + "<br>";
      output.innerHTML += MedicoTraumatologo.mostrarDatos() + "<br>";

      output.innerHTML += "<h2>Sueldo de Médico Traumatologo cambiado</h2><br>";
      MedicoTraumatologo.cambiarSueldo(2.3 * MedicoTraumatologo.sueldo); // Cambia el sueldo a un nuevo valor basado en el porcentaje

      output.innerHTML += "<h2>Datos del Hospital Ribera</h2>";
      output.innerHTML += HospitalRibera.mostrarDatos();

      output.innerHTML += "<h2>Calculo de la retención de las dos instancias del objeto Médico</h2>";
      output.innerHTML += "Retención Medico Digestivo: " + MedicoDigestivo.retencionMedico(MedicoDigestivo.sueldo, 21) + "<br>"; // Obtenemos la retención del sueldo
      output.innerHTML += "Retención Medico Traumatologo: " + MedicoTraumatologo.retencionMedico(MedicoTraumatologo.sueldo, 10) + "<br>";

      MedicoDigestivo.cambiarSueldo(MedicoDigestivo.sueldo - MedicoDigestivo.retencionMedico(MedicoDigestivo.sueldo, 21)); //Modificamos los sueldos en base a la retrención
      MedicoTraumatologo.cambiarSueldo(MedicoTraumatologo.sueldo - MedicoTraumatologo.retencionMedico(MedicoTraumatologo.sueldo, 10));

      output.innerHTML += "<h2>Datos actualizados</h2>"; //Mostramos los datos ya actualizados
      output.innerHTML += MedicoDigestivo.mostrarDatos() + "<br>";
      output.innerHTML += MedicoTraumatologo.mostrarDatos();
    }

    window.onload = mostrarDatos();
