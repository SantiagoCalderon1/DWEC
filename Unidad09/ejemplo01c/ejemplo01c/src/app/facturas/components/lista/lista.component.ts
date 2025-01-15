import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Factura } from '../../factura';
@Component({
  selector: 'app-facturas-lista',
  standalone: false,
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {
  @Input() facturas: Factura[] = [];
  @Output() facturasActualizadas = new EventEmitter<Factura[]>();
  sinIva(indice: number): void {
    this.facturas[indice].iva = false;
    this.facturasActualizadas.emit(this.facturas);
  }
  conIva(indice: number): void {
    this.facturas[indice].iva = true;
    this.facturasActualizadas.emit(this.facturas);
  }
  public colorD: string = 'lime';
  public colorC: string = 'red';
  borrar(indice: number): void {
    this.facturas.splice(indice, 1);
    this.facturasActualizadas.emit(this.facturas);
  }
}