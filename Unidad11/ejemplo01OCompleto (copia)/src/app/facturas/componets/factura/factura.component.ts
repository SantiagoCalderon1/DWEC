import { Component, ViewChild } from '@angular/core';
import { Factura } from '../../factura';
import { ActivatedRoute, Router } from '@angular/router';
import { FacturasService } from '../../facturas.service';
import { CanComponentDeactivate } from '../../../can-component-deactivate.interface';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-facturas-factura',
  standalone: false,

  templateUrl: './factura.component.html',
  styleUrl: './factura.component.css'
})
export class FacturaComponent implements CanComponentDeactivate {
  @ViewChild('facturaForm', { static: true }) facturaForm: NgForm | undefined;
  public facturaact: Factura = { id: 0, cliente:'', fecha: '', iva: false, importe: 0 }
  public titulo: string = 'Nueva Factura';
  public tipo: number = 0;
  public id: number = 0;
  public txtBtn: string = 'Guardar';
  public formularioCambiado: boolean = false;

  constructor(private _aroute: ActivatedRoute, private _facturasService: FacturasService, private _route: Router, private toastr: ToastrService) { }
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
  private traeFactura(id:number){
    this._facturasService.obtengoFacturaApi(id).subscribe({
      next: (resultado) => {
        if (resultado.mensaje == "OK") {
          this.facturaact = resultado.datos;
        } else {
          this.toastr.error(resultado.mensaje, 'Error al obtener la factura');
        }
      },
      error: (error) => {
        this.toastr.error(error, 'Error al obtener la factura');
      },
      complete: () => {
        console.log('Operación completada.');
      },
    });
  }
  guardaFactura(): void {
    if (this.facturaForm!.valid || this.tipo == 2 ) {
      this.formularioCambiado = false;
      if (this.tipo == 0) {
        this._facturasService.guardaNuevoFacturaApi(this.facturaact).subscribe({
          next: (resultado) => {
            if (resultado.mensaje == "OK") {
              this.toastr.success('Se ha agregado '+resultado.datos.cliente, 'Factura agregada correctamente!');
              this._route.navigate(['/facturas']);
            } else {
              this.toastr.error(resultado.errores, 'Error guardando factura');
            }
          },
          error: (error) => {
            this.toastr.error(error.error.errores, 'Error guardando factura');
          },
          complete: () => {
            console.log('Operación completada.');
          },
        });
      }
      else if (this.tipo == 1) {
        this._facturasService.modificaFacturaApi(this.id, this.facturaact).subscribe({
          next: (resultado) => {
            if (resultado.mensaje == "OK") {
              this.toastr.success('Se ha modificado '+resultado.datos.cliente, 'Factura modificada correctamente!');
              this._route.navigate(['/facturas']);
            } else {
              this.toastr.error(resultado.errores, 'Error modificando factura');
            }
          },
          error: (error) => {
            this.toastr.error(error.error.errores, 'Error modificando factura');
          },
          complete: () => {
            console.log('Operación completada.');
          },
        });
      }
      else if (this.tipo == 2) {
        this._facturasService.borraFacturaApi(this.id).subscribe({
          next: (resultado) => {
            if (resultado.mensaje == "OK") {
              this.toastr.success('Se ha eliminado '+resultado.datos.cliente, 'Factura eliminada correctamente!');
              this._route.navigate(['/facturas']);
            } else {
              this.toastr.error(resultado.errores, 'Error eliminando factura');
            }
          },
          error: (error) => {
            this.toastr.error(error.error.errores, 'Error eliminando factura');
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
  canDeactivate(): boolean {
    if (this.formularioCambiado) {
      return confirm(
        'Tienes cambios sin guardar. ¿Estás seguro de que quieres salir?'
      );
    }
    return true;
  }
}
