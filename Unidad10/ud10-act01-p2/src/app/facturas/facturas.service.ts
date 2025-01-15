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
  guardaNuevaFactura(factura: Factura) {
    let ultimoId: number = 0;
    if (this.facturas.length > 0)
      ultimoId = this.facturas[this.facturas.length - 1].numero;
    this.facturas.push(new Factura(ultimoId + 1, factura.fecha, factura.iva, factura.cantidad));
  }
  modificaFactura(nfactura: number, factura: Factura) {
    let indice = this.facturas.findIndex(item => item.numero == nfactura);
    this.facturas[indice] = factura;
  }
  borraFactura(nfactura: number) {
    let indice = this.facturas.findIndex(item => item.numero == nfactura);
    this.facturas.splice(indice, 1);
  }
  obtengoFactura(nfactura: number): Factura {
    let indice = this.facturas.findIndex(item => item.numero == nfactura);
    return this.facturas[indice];
  }
}
