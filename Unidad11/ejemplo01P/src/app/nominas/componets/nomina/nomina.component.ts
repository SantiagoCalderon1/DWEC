import { Component, ViewChild } from '@angular/core';
import { Nomina } from '../../nomina';
import { ActivatedRoute, Router } from '@angular/router';
import { NominasService } from '../../nominas.service';
import { CanComponentDeactivate } from '../../../can-component-deactivate.interface';
import { NgForm } from '@angular/forms';

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

  constructor(private _aroute: ActivatedRoute, private _nominasService: NominasService, private _route: Router) { }
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
          console.error('Error al obtener la nómina:', resultado.mensaje);
        }
      },
      error: (error) => {
        console.error('Error al obtener la nómina:', error);
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
              console.log('Nómina agregada:', resultado.datos);
              this._route.navigate(['/nominas']);
            } else {
              console.error('Error al agregar la nómina:', resultado.errores);
            }
          },
          error: (error) => {
            console.error('Error al agregar la nómina:', error.error.errores);
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
              console.log('Nómina modificada:', resultado.datos);
              this._route.navigate(['/nominas']);
            } else {
              console.error('Error al modificar la nómina:', resultado.errores);
            }
          },
          error: (error) => {
            console.error('Error al modificar la nómina:', error.error.errores);
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
              console.log('Valor eliminado:', resultado.datos);
              this._route.navigate(['/nominas']);
            } else {
              console.error('Error al eliminar la nómina:', resultado.errores);
            }
          },
          error: (error) => {
            console.error('Error al borrar el valor:', error.error.errores);
          },
          complete: () => {
            console.log('Operación completada.');
          },
        });
      }
    } else alert("El formulario tiene campos inválidos");
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

  
  cancelar(event: Event): void {
    event.preventDefault(); // Previene que el formulario intente enviarse
    this._route.navigate(['/nominas'], { queryParams: {} });
  }
}
