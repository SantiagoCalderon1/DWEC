import { Component, ViewChild } from '@angular/core';
import { Empleado } from '../../empleado';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadosService } from '../../empleados.service';
import { CanComponentDeactivate } from '../../../can-component-deactivate.interface';
import { NgForm, NgModel } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
    private _route: Router,
    private toastr: ToastrService
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
    this._empleadosService.obtengoEmpleadoApi(id).subscribe({
      next: (resultado) => {
        if (resultado.mensaje == 'OK') {
          this.empleadoact = resultado.datos;
          this.inputChecked = this.empleadoact.contratado == 1;
        } else {
          this.toastr.error(resultado.mensaje, 'Error al obtener el empleado');
        }
      },
      error: (error) => {
        this.toastr.error(error, 'Error al obtener el empleado');
      },
      complete: () => {
        console.log('Operación completada.');
      },
    });
  }
  guardaEmpleado(): void {
    if (this.empleadoForm!.valid || this.tipo == 2) {
      //El borrado era readonly
      this.formularioCambiado = false;
      if (this.tipo == 0) {
        this.empleadoact.contratado = this.inputChecked ? 1 : 0;
        this._empleadosService
          .guardaNuevoEmpleadoApi(this.empleadoact)
          .subscribe({
            next: (resultado) => {
              if (resultado.mensaje == 'OK') {
                this.toastr.success(
                  'Se ha agregado ' + resultado.datos.nombre,
                  'Empleado agregado correctamente!',  {positionClass: 'toast-bottom-right'}
                );
                this._route.navigate(['/empleados']);
              } else {
                // console.error('Error al agregar el empleado:',resultado.errores);
                this.toastr.error(
                  resultado.errores,
                  'Error guardando empleado'
                );
              }
            },
            error: (error) => {
              // console.error('Error al agregar el empleado:',error.error.errores);
              this.toastr.error(
                error.error.errores,
                'Error guardando empleado'
              );
            },

            complete: () => {
              console.log('Operación completada.');
            },
          });
      } else if (this.tipo == 1) {
        this.empleadoact.contratado = this.inputChecked ? 1 : 0;
        this._empleadosService
          .modificaEmpleadoApi(this.id, this.empleadoact)
          .subscribe({
            next: (resultado) => {
              if (resultado.mensaje == 'OK') {
                this.toastr.success(
                  'Se ha modificado ' + resultado.datos.nombre,
                  'Empleado modificado correctamente!'
                );
                this._route.navigate(['/empleados']);
                this._route.navigate(['/empleados']);
              } else {
                this.toastr.error(
                  resultado.errores,
                  'Error modificando empleado'
                );
              }
            },
            error: (error) => {
              this.toastr.error(
                error.error.errores,
                'Error modificando empleado'
              );
            },
            complete: () => {
              console.log('Operación completada.');
            },
          });
      } else if (this.tipo == 2) {
        this._empleadosService.borraEmpleadoApi(this.id).subscribe({
          next: (resultado) => {
            if (resultado.mensaje == 'OK') {
              this.toastr.success(
                'Se ha eliminado ' + resultado.datos.nombre,
                'Empleado eliminado correctamente!'
              );
              this._route.navigate(['/empleados']);
            } else {
              this.toastr.error(resultado.errores, 'Error eliminando empleado');
            }
          },
          error: (error) => {
            this.toastr.error(error.error.errores, 'Error eliminando empleado');
          },
          complete: () => {
            console.log('Operación completada.');
          },
        });
      }
    } else
      this.toastr.error(
        'El formulario tiene campos inválidos',
        'Error de validación'
      );
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

  cancelar(event: Event): void {
    event.preventDefault(); // Previene que el formulario intente enviarse
    this._route.navigate(['/empleados'], { queryParams: {} });
  }

  
}
