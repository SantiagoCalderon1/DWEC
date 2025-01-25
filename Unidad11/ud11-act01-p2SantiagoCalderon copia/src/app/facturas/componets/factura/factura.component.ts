import { Component, ViewChild } from '@angular/core';
import { Factura } from '../../factura';
import { ActivatedRoute, Router } from '@angular/router';
import { FacturasService } from '../../facturas.service';
import { CanComponentDeactivate } from '../../../can-component-deactivate.interface';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-facturas-factura',
  standalone: false,

  templateUrl: './factura.component.html',
  styleUrl: './factura.component.css'
})
export class FacturaComponent implements CanComponentDeactivate {
  @ViewChild('facturaForm', { static: true }) facturaForm: NgForm | undefined;

  public facturaact: Factura = { id: 0, cliente: '', fecha: '', iva: false, importe: 0 }
  public titulo: string = 'Nueva Factura';
  public tipo: number = 0;
  public id: number = 0;
  public txtBtn: string = 'Guardar';
  public formularioCambiado: boolean = false;

  constructor(
    private _aroute: ActivatedRoute,
    private _facturasService: FacturasService,
    private _route: Router
  ) { }


  ngOnInit() {
    this.tipo = +this._aroute.snapshot.params['tipo'];
    this.id = +this._aroute.snapshot.params['id']; // Recibimos parámetro
    if (this.tipo == 1) {
      this.titulo = 'Modificar Factura (' + this.id + ')';
      this.traeFactura(this.id);
    } else if (this.tipo == 2) {
      this.titulo = 'Borrar Empleado (' + this.id + ')';
      this.txtBtn = 'BORRAR';
      this.traeFactura(this.id);
    }
  }

  private traeFactura(id: number) {
    this._facturasService.obtengoFacturaApi(id).subscribe({
      next: (resultado) => {
        if (resultado.mensaje == 'OK') {
          this.facturaact = resultado.datos;
          console.log(this.facturaact);
        } else {
          console.error('Error al obtener la factura:', resultado.mensaje);
        }
      },
      error: (error) => {
        console.error('Error al obtener la factura:', error);
      },
      complete: () => {
        console.log('Operación completada.');
      },
    });
  }


  guardaFactura(): void {
    if (this.facturaForm!.valid) {
      this.formularioCambiado = false;
      if (this.tipo == 0) {
        this._facturasService.guardaNuevoFacturaApi(this.facturaact).subscribe({
          next: (resultado) => {
            console.log('Factura Agregada: ', resultado);
            this._route.navigate(['/facturas']);
          },
          error: (error) => {
            console.error('Error al agregar la factura.', error);
          },
          complete: () => {
            console.log('Operación completada.');
          },
        });
      }
      else if (this.tipo == 1) {
        this._facturasService.modificaFacturaApi(this.id, this.facturaact).subscribe({
          next: (resultado) => {
            console.log('Factura modificada: ', resultado);
            this._route.navigate(['/facturas']);
          },
          error: (error) => {
            console.error('Error al modificar la factura:', error);
          },
          complete: () => {
            console.log('Operación completada.');
          },
        });
      }
      else if (this.tipo == 2) {
        this._facturasService.borraFacturaApi(this.id).subscribe({
          next: (resultado) => {
            console.log('Factura eliminada: ', resultado);
            this._route.navigate(['/facturas']);
          },
          error: (error) => {
            console.error('Error al borrar la factura:', error);
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

  canDeactivate(): boolean {
    if (this.formularioCambiado) {
      return confirm(
        'Tienes cambios sin guardar. ¿Estás seguro de que quieres salir?'
      );
    }
    return true;
  }


  /// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

}
