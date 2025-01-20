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
  guardaNuevoEmpleado(empleado: Empleado) {
    let ultimoId: number = 0; if (this.empleados.length > 0)
      ultimoId = this.empleados[this.empleados.length - 1].id;
    this.empleados.push(new Empleado(ultimoId + 1, empleado.nombre,
      empleado.edad, empleado.contratado));
  }
  modificaEmpleado(nempleado: number, empleado: Empleado) {
    let indice = this.empleados.findIndex(item => item.id == nempleado);
    this.empleados[indice] = empleado;
  }
  borraEmpleado(nempleado: number) {
    let indice = this.empleados.findIndex(item => item.id == nempleado);
    this.empleados.splice(indice, 1);
  }
  obtengoEmpleado(nempleado: number): Empleado {
    let indice = this.empleados.findIndex(item => item.id == nempleado);
    return this.empleados[indice];
  }
}