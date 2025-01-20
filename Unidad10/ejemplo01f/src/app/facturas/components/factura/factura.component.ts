import { Component } from '@angular/core';
import { Factura } from '../../factura';
import { ActivatedRoute, Router } from '@angular/router';
import { FacturasService } from '../../facturas.service';

@Component({
  selector: 'app-facturas-factura',
  standalone: false,

  templateUrl: './factura.component.html',
  styleUrl: './factura.component.css'
})
export class FacturaComponent {
  public facturaact: Factura = { numero: 0, fecha: '', iva: false, cantidad: 0 }
  public titulo: string = 'Nueva Factura';
  public tipo: number = 0;
  public id: number = 0;
  public txtBtn: string = 'Guardar';
  constructor(private _aroute: ActivatedRoute, private _facturasService: FacturasService, private _route: Router) { }
  ngOnInit() {
    this.tipo = +this._aroute.snapshot.params['tipo'];
    this.id = +this._aroute.snapshot.params['id']; // Recibimos parámetro 
    if (this.tipo == 1) {
      this.titulo = 'Modificar Factura (' + this.id + ')';
      this.facturaact = this._facturasService.obtengoFactura(this.id);
    } else if (this.tipo == 2) {
      this.titulo = 'Borrar Factura (' + this.id + ')';
      this.txtBtn = 'BORRAR';
      this.facturaact = this._facturasService.obtengoFactura(this.id);
    }
  }
  guardaFactura(): void {
    if (this.tipo == 0) {
      this._facturasService.guardaNuevaFactura(this.facturaact);
    }
    else if (this.tipo == 1) {
      this._facturasService.modificaFactura(this.id, this.facturaact);
    }
    else if (this.tipo == 2) {
      this._facturasService.borraFactura(this.id);
    }
    this._route.navigate(['/facturas']);
  }
}
