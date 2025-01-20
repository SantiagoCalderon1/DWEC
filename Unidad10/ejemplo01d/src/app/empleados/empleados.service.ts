import { Injectable } from '@angular/core';
import { Empleado } from './empleado';

@Injectable({
  providedIn: 'root'
})

export class EmpleadosService {
  constructor() { }
  private empleados: Empleado[] = [
    new Empleado(1, 'Javier', 25, true),
    new Empleado(2, 'Pepe', 52),
    new Empleado(3, 'Paco', 19, true),
    new Empleado(4, 'Pedro', 22)
  ];
  obtengoEmpleados(): Empleado[] {
    return this.empleados;
  }
}
