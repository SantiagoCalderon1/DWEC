import { Component } from '@angular/core';
import { Empleado } from '../../empleado';
import { EmpleadosService } from '../../empleados.service';

@Component({
  selector: 'app-empleados-lista',
  standalone: false,

  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {
  empleados: Empleado[] = [];
  constructor(private _empleadosService: EmpleadosService) { }
  ngOnInit() {
    this.empleados = this._empleadosService.obtengoEmpleados();
  }
  modificar(id: number): void { }
  borrar(id: number): void { }
}