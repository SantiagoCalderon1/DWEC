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
  public nominaact: Nomina = { numero: 0, fecha: '', bruto: 0, retencion: 0 }
  public titulo: string = 'Nueva Nomina';
  public tipo: number = 0;
  public nnomina: number = 0;
  public txtBtn: string = 'Guardar';
  public formularioCambiado: boolean = false;

  constructor(private _aroute: ActivatedRoute, private _nominasService: NominasService, private _route: Router) { }
  ngOnInit() {
    this.tipo = +this._aroute.snapshot.params['tipo'];
    this.nnomina = +this._aroute.snapshot.params['id']; // Recibimos parámetro
    if (this.tipo == 1) {
      this.titulo = 'Modificar Nómina (' + this.nnomina + ')';
      this.nominaact = this._nominasService.obtengoNomina(this.nnomina);
    } else if (this.tipo == 2) {
      this.titulo = 'Borrar Nómina (' + this.nnomina + ')';
      this.txtBtn = 'BORRAR';
      this.nominaact = this._nominasService.obtengoNomina(this.nnomina);
    }
  }
  guardaNomina(): void {
    if (this.nominaForm!.valid) {
      this.formularioCambiado = false;
      if (this.tipo == 0) {
        this._nominasService.guardaNuevaNomina(this.nominaact).subscribe({
          next: (resultado) => {
            console.log('Valor agregado. Array actualizado:', resultado);
            this._route.navigate(['/nominas']);
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
        this._nominasService.modificaNomina(this.nnomina, this.nominaact).subscribe({
          next: (resultado) => {
            console.log('Valor modificado. Array modificado:', resultado);
            this._route.navigate(['/nominas']);
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
        this._nominasService.borraNomina(this.nnomina).subscribe({
          next: (resultado) => {
            console.log('Valor eliminado. Array actualizado:', resultado);
            this._route.navigate(['/nominas']);
          },
          error: (error) => {
            console.error('Error al borrar el valor:', error);
          },
          complete: () => {
            console.log('Operación completada.');
          },
        });
      }
    }
  }
  cambiado(): void {
    this.formularioCambiado = true;
  }
  canDeactivate(): boolean {
    if (this.formularioCambiado) {
      return confirm(
        'Tienes cambios sin guardar. ¿Estás seguro de que quieres salir?'
      );
    }
    return true;
  }
}
