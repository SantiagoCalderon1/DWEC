import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Empleado } from '../../empleado';
import { EmpleadosService } from '../../empleados.service';

@Component({
  selector: 'app-empleados-lista',
  standalone: false,

  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css',
})
export class ListaComponent {
  public filterSearch: string = '';
  // empleados: Empleado[] = [];
  empleados: any;
  constructor(private _empleadosService: EmpleadosService) {}
  ngOnInit() {
    // this.empleados = this._empleadosService.obtengoEmpleados();
    this._empleadosService.obtengoEmpleadosPhp().subscribe({
      next: (resultado) => {
        if (resultado.success) {
          this.empleados = resultado.data;
        } else {
          console.error('Error al recibir datos:', resultado.message);
        }
      },
      error: (error) => {
        console.error('Error al recibir datos:', error);
      },
      complete: () => {
        console.log('Operación completada.');
      },
    });
  }
}
