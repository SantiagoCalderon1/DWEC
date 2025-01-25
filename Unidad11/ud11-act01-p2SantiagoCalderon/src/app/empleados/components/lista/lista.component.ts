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
  empleados: Empleado[] = []; 
  
  constructor(private _empleadosService: EmpleadosService) {}

  ngOnInit() {
    //Versión Api
    this._empleadosService.obtengoEmpleadosApi().subscribe({
      next: (resultado) => {
        if (resultado.mensaje == 'OK') {
          this.empleados = resultado.datos;
        } else {
          console.error('Error al recibir datos:', resultado.error);
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
