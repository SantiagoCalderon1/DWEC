import { Component } from '@angular/core';
import { Empleado } from '../empleado';

@Component({
  selector: 'app-empleados-empleado',
  standalone: false,
  templateUrl: './empleado.component.html',
  styleUrl: './empleado.component.css'
})

export class EmpleadoComponent {
  public empleado1: Empleado = new Empleado('Javier', 25);

  get enMayusculaNombre(): string {
    return this.empleado1.nombre.toUpperCase();
  }

  getNombreEdad(): string {
    return `${this.empleado1.nombre} - ${this.empleado1.edad}`
  }

  cambiaEmpleado(): void {
    this.empleado1.nombre = 'Paco';
  }
  cambiaEdad(): void {
    this.empleado1.edad = 44;
  }

  restableceValores(): void {
    // this.empleado1.nombre = 'Javier';
    this.empleado1.edad = 25;
    document.querySelectorAll('h1')!.forEach(elemento => {
      elemento.innerHTML = "<h1>Pedro (con JS)</h1>";
    })
  }

  

  
}
