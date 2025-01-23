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
  styleUrl: './empleado.component.css',
})
export class EmpleadoComponent implements CanComponentDeactivate {
  @ViewChild('empleadoForm', { static: true }) empleadoForm: NgForm | undefined;
  public empleadoact: Empleado = {
    id: 0,
    nombre: '',
    edad: 0,
    cargo: '',
    contratado: 0,
  };
  public titulo: string = 'Nuevo Empleado';
  public tipo: number = 0;
  public id: number = 0;
  public txtBtn: string = 'Guardar';
  public formularioCambiado: boolean = false;

  public inputChecked: boolean = false; //Nueva vble para el checkbox

  constructor(
    private _aroute: ActivatedRoute,
    private _empleadosService: EmpleadosService,
    private _route: Router
  ) {}

  ngOnInit() {
    this.tipo = +this._aroute.snapshot.params['tipo'];
    this.id = +this._aroute.snapshot.params['id']; // Recibimos parámetro
    if (this.tipo == 1) {
      this.titulo = 'Modificar Empleado (' + this.id + ')';
      this.traeEmpleado(this.id);
    } else if (this.tipo == 2) {
      this.titulo = 'Borrar Empleado (' + this.id + ')';
      this.txtBtn = 'BORRAR';
      this.traeEmpleado(this.id);
    }
  }

  private traeEmpleado(id: number) {
    this._empleadosService.obtengoEmpleadoPhp(id).subscribe({
      next: (resultado) => {
        if (resultado.success) {
          // console.log('Empleado obtenido:', resultado.data[0]);
          this.empleadoact = resultado.data[0];
          this.inputChecked = this.empleadoact.contratado == 1;
        } else {
          console.error('Error al obtener el empleado:', resultado.message);
        }
      },
      error: (error) => {
        console.error('Error al obtener el empleado:', error);
      },
      complete: () => {
        console.log('Operación completada.');
      },
    });
  }

  // ngOnInit() {
  //   this.tipo = +this._aroute.snapshot.params['tipo'];
  //   this.id = +this._aroute.snapshot.params['id']; // Recibimos parámetro
  //   if (this.tipo == 1) {
  //     this.titulo = 'Modificar Empleado (' + this.id + ')';
  //     // this.empleadoact = this._empleadosService.obtengoEmpleado(this.id);
  //     this.empleadoact = this._aroute.snapshot.data['empleadoact'];
  //   } else if (this.tipo == 2) {
  //     this.titulo = 'Borrar Empleado (' + this.id + ')';
  //     this.txtBtn = 'BORRAR';
  //     // this.empleadoact = this._empleadosService.obtengoEmpleado(this.id);
  //     this.empleadoact = this._aroute.snapshot.data['empleadoact'];
  //   }
  // }

  guardaEmpleado(): void {
    if (this.empleadoForm!.valid || this.tipo == 2) {
      //El borrado era readonly;
      this.formularioCambiado = false;
      if (this.tipo == 0) {
        this.empleadoact.contratado = this.inputChecked ? 1 : 0;

        this._empleadosService
          .guardaNuevoEmpleadoPhp(this.empleadoact)
          .subscribe({
            next: (resultado) => {
              if (resultado.success) {
                console.log('Empleado agregado:', resultado.message);
                this._route.navigate(['/empleados']);
              } else {
                console.error(
                  'Error al agregar el empleado:',
                  resultado.message
                );
              }
            },
            error: (error) => {
              console.error('Error al agregar el empleado:', error);
            },
            complete: () => {
              console.log('Operación completada.');
            },
          });
      } else if (this.tipo == 1) {
        this.empleadoact.contratado = this.inputChecked ? 1 : 0;
        this._empleadosService
          .modificaEmpleadoPhp(this.id, this.empleadoact)
          .subscribe({
            next: (resultado) => {
              if (resultado.success) {
                console.log('Valor modificado:', resultado.message);
                this._route.navigate(['/empleados']);
              } else {
                console.error(
                  'Error al modificar el empleado:',
                  resultado.message
                );
              }
            },
            error: (error) => {
              console.error('Error al modificar el empleado:', error);
            },
            complete: () => {
              console.log('Operación completada.');
            },
          });
      } else if (this.tipo == 2) {
        this._empleadosService.borraEmpleadoPhp(this.id).subscribe({
          next: (resultado) => {
            if (resultado.success) {
              console.log('Valor eliminado:', resultado.message);
              this._route.navigate(['/empleados']);
            } else {
              console.error(
                'Error al eliminar el empleado:',
                resultado.message
              );
            }
          },
          error: (error) => {
            console.error('Error al borrar el valor:', error);
          },
          complete: () => {
            console.log('Operación completada.');
          },
        });
      }
    } else alert('El formulario tiene campos inválidos');
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
      [errorClass]: ngModel.touched && ngModel.invalid,
    };
  }
}
