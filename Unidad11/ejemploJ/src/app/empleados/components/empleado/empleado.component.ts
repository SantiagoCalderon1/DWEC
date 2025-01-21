import { Component, ViewChild } from '@angular/core';
import { Empleado } from '../../empleado';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadosService } from '../../empleados.service';
import { CanComponentDeactivate } from '../../../can-component-deactivate.interface';
import { NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-empleados-empleado',
  standalone: false,

  templateUrl: './empleado.component.html',
  styleUrl: './empleado.component.css'
})

export class EmpleadoComponent implements CanComponentDeactivate {
  @ViewChild('empleadoForm', { static: true }) empleadoForm: NgForm | undefined;
  public empleadoact: Empleado = { id: 0, nombre: '', edad: 0, cargo : '', contratado: 0 }
  public titulo: string = 'Nuevo Empleado';
  public tipo: number = 0;
  public id: number = 0;
  public txtBtn: string = 'Guardar';
  public formularioCambiado: boolean = false;

  constructor(private _aroute: ActivatedRoute, private _empleadosService: EmpleadosService, private _route: Router) { }
  ngOnInit() {
    this.tipo = +this._aroute.snapshot.params['tipo'];
    this.id = +this._aroute.snapshot.params['id']; // Recibimos parámetro
    if (this.tipo == 1) {
      this.titulo = 'Modificar Empleado (' + this.id + ')';
      // this.empleadoact = this._empleadosService.obtengoEmpleado(this.id);
      this.empleadoact = this._aroute.snapshot.data['empleadoact'];
    } else if (this.tipo == 2) {
      this.titulo = 'Borrar Empleado (' + this.id + ')';
      this.txtBtn = 'BORRAR';
      // this.empleadoact = this._empleadosService.obtengoEmpleado(this.id);
      this.empleadoact = this._aroute.snapshot.data['empleadoact'];
    }
  }
  guardaEmpleado(): void {
    if (this.empleadoForm!.valid) {
      this.formularioCambiado = false;
      if (this.tipo == 0) {
        this._empleadosService.guardaNuevoEmpleado(this.empleadoact).subscribe({
          next: (resultado) => {
            console.log('Valor agregado. Array actualizado:', resultado);
            this._route.navigate(['/empleados']);
          },
          error: (error) => {
            console.error('Error al agregar el valor:', error);
          },
          complete: () => {
            console.log('Operación completada.');
          },
        });
      }
      else if (this.tipo == 1) {
        this._empleadosService.modificaEmpleado(this.id, this.empleadoact).subscribe({
          next: (resultado) => {
            console.log('Valor modificado. Array modificado:', resultado);
            this._route.navigate(['/empleados']);
          },
          error: (error) => {
            console.error('Error al modificar el valor:', error);
          },
          complete: () => {
            console.log('Operación completada.');
          },
        });
      }
      else if (this.tipo == 2) {
        this._empleadosService.borraEmpleado(this.id).subscribe({
          next: (resultado) => {
            console.log('Valor eliminado. Array actualizado:', resultado);
            this._route.navigate(['/empleados']);
          },
          error: (error) => {
            console.error('Error al borrar el valor:', error);
          },
          complete: () => {
            console.log('Operación completada.');
          },
        });
      }
    } else alert("El formulario tiene campos inválidos");
  }
  // Método que será llamado por el guard
  canDeactivate(): boolean {
    if (this.formularioCambiado) {
      return confirm(
        'Tienes cambios sin guardar. ¿Estás seguro de que quieres salir?'
      );
    }
    return true;
  }
  cambiado(): void {
    this.formularioCambiado = true;
  }
  validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
    return {
      [validClass]: ngModel.touched && ngModel.valid,
      [errorClass]: ngModel.touched && ngModel.invalid
    };
  }

}
