import { Component, ViewChild } from '@angular/core';
import { Nomina } from '../../nomina';
import { ActivatedRoute, Router } from '@angular/router';
import { NominasService } from '../../nominas.service';
import { CanComponentDeactivate } from '../../../can-component-deactivate.interface';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nominas-nomina',
  standalone: false,

  templateUrl: './nomina.component.html',
  styleUrl: './nomina.component.css'
})
export class NominaComponent implements CanComponentDeactivate {
  @ViewChild('nominaForm', { static: true }) nominaForm: NgForm | undefined;
  public nominaact: Nomina = { id: 0, nombre: '', fecha: '', bruto: 0, retencion: 0 }
  public titulo: string = 'Nueva Nomina';
  public tipo: number = 0;
  public id: number = 0;
  public txtBtn: string = 'Guardar';
  public formularioCambiado: boolean = false;

  constructor(private _aroute: ActivatedRoute, private _nominasService: NominasService, private _route: Router, private toastr: ToastrService) { }
  ngOnInit() {
    this.tipo = +this._aroute.snapshot.params['tipo'];
    this.id = +this._aroute.snapshot.params['id']; // Recibimos parámetro
    if (this.tipo == 1) {
      this.titulo = 'Modificar Nómina (' + this.id + ')';
      this.traeNomina(this.id);
    } else if (this.tipo == 2) {
      this.titulo = 'Borrar Nómina (' + this.id + ')';
      this.txtBtn = 'BORRAR';
      this.traeNomina(this.id);
    }
  }
  private traeNomina(id: number) {
    this._nominasService.obtengoNominaApi(id).subscribe({
      next: (resultado) => {
        if (resultado.mensaje == "OK") {
          this.nominaact = resultado.datos;
        } else {
          this.toastr.error(resultado.mensaje, 'Error al obtener la nómina');
        }
      },
      error: (error) => {
        this.toastr.error(error, 'Error al obtener la nómina');
      },
      complete: () => {
        console.log('Operación completada.');
      },
    });
  }
  guardaNomina(): void {
    if (this.nominaForm!.valid || this.tipo == 2) {
      this.formularioCambiado = false;
      if (this.tipo == 0) {
        this._nominasService.guardaNuevoNominaApi(this.nominaact).subscribe({
          next: (resultado) => {
            if (resultado.mensaje == "OK") {
              this.toastr.success('Se ha agregado '+resultado.datos.nombre, 'Nómina agregada correctamente!');
              this._route.navigate(['/nominas']);
            } else {
              this.toastr.error(resultado.errores, 'Error guardando nómina');
            }
          },
          error: (error) => {
            this.toastr.error(error.error.errores, 'Error guardando nómina');
          },
          complete: () => {
            console.log('Operación completada.');
          },
        });
      }
      else if (this.tipo == 1) {
        this._nominasService.modificaNominaApi(this.id, this.nominaact).subscribe({
          next: (resultado) => {
            if (resultado.mensaje == "OK") {
              this.toastr.success('Se ha modificado '+resultado.datos.nombre, 'Nómina modificada correctamente!');
              this._route.navigate(['/nominas']);
            } else {
              this.toastr.error(resultado.errores, 'Error modificando nómina');
            }
          },
          error: (error) => {
            this.toastr.error(error.error.errores, 'Error modificando nómina');
          },
          complete: () => {
            console.log('Operación completada.');
          },
        });
      }
      else if (this.tipo == 2) {
        this._nominasService.borraNominaApi(this.id).subscribe({
          next: (resultado) => {
            if (resultado.mensaje == "OK") {
              this.toastr.success('Se ha eliminado '+resultado.datos.nombre, 'Nómina eliminada correctamente!');
              this._route.navigate(['/nominas']);
            } else {
              this.toastr.error(resultado.errores, 'Error eliminando nómina');
            }
          },
          error: (error) => {
            this.toastr.error(error.error.errores, 'Error eliminando nómina');
          },
          complete: () => {
            console.log('Operación completada.');
          },
        });
      }
    } else this.toastr.error("El formulario tiene campos inválidos", 'Error de validación');
  }
  cambiado(): void {
    this.formularioCambiado = true;
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
}
