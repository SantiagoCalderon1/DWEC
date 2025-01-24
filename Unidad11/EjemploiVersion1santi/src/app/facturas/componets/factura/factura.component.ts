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
  public facturaact: Factura = { numero: 0, fecha: '', iva: false, cantidad: 0 }
  public titulo: string = 'Nueva Factura';
  public tipo: number = 0;
  public nfra: number = 0;
  public txtBtn: string = 'Guardar';
  public formularioCambiado: boolean = false;

  constructor(private _aroute: ActivatedRoute, private _facturasService: FacturasService, private _route: Router) { }
  ngOnInit() {
    this.tipo = +this._aroute.snapshot.params['tipo'];
    this.nfra = +this._aroute.snapshot.params['id']; // Recibimos parámetro
    if (this.tipo == 1) {
      this.titulo = 'Modificar Factura (' + this.nfra + ')';
      this.facturaact = this._facturasService.obtengoFactura(this.nfra);
    } else if (this.tipo == 2) {
      this.titulo = 'Borrar Empleado (' + this.nfra + ')';
      this.txtBtn = 'BORRAR';
      this.facturaact = this._facturasService.obtengoFactura(this.nfra);
    }
  }
  guardaFactura(): void {
    if (this.facturaForm!.valid) {
      this.formularioCambiado = false;
      if (this.tipo == 0) {
        this._facturasService.guardaNuevaFactura(this.facturaact).subscribe({
          next: (resultado) => {
            console.log('Valor agregado. Array actualizado:', resultado);
            this._route.navigate(['/facturas']);
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
        this._facturasService.modificaFactura(this.nfra, this.facturaact).subscribe({
          next: (resultado) => {
            console.log('Valor modificado. Array modificado:', resultado);
            this._route.navigate(['/facturas']);
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
        this._facturasService.borraFactura(this.nfra).subscribe({
          next: (resultado) => {
            console.log('Valor eliminado. Array actualizado:', resultado);
            this._route.navigate(['/facturas']);
          },
          error: (error) => {
            console.error('Error al borrar el valor:', error);
          },
          complete: () => {
            console.log('Operación completada.');
          },
        });
      }
      // this._route.navigate(['/facturas']);
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
}
