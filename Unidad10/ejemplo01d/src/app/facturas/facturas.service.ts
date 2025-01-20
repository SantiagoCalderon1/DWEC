import { Injectable } from '@angular/core';
import { Factura } from './factura';
@Injectable({
  providedIn: 'root'
})
export class FacturasService {
  constructor() { }
  private facturas: Factura[] = [
    new Factura(1, '01/01/2024', true, 25),
    new Factura(2, '01/01/2024', true, 52),
    new Factura(3, '01/01/2024', true, 19),
    new Factura(4, '01/01/2024', true, 22)
  ];
  obtengoFacturas(): Factura[] {
    return this.facturas;
  }
}