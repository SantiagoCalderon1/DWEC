import { Injectable } from '@angular/core';
import { Factura } from './factura';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {
  urlApi='http://test-api25s.jtarrega.es/api/facturas';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http: HttpClient) { }
  private facturas: Factura[] = [
    // new Factura(1, '2024-01-01', true, 25),
    // new Factura(2, '2024-01-01', true, 52),
    // new Factura(3, '2024-01-01', true, 19),
    // new Factura(4, '2024-01-01', true, 22)
  ];

  // ARRAY
  // obtengoFacturas(): Factura[] {
  //   return this.facturas;
  // }
  // guardaNuevaFactura(factura: Factura): Observable<any> {
  //   let ultimoNum: number = 0;
  //   if (this.facturas.length > 0)
  //     ultimoNum = this.facturas[this.facturas.length - 1].numero;
  //   this.facturas.push(new Factura(ultimoNum + 1, factura.fecha, factura.iva, factura.cantidad));
  //   return of(this.facturas[this.facturas.length - 1]);
  // }
  // modificaFactura(nfactura: number, factura: Factura): Observable<any> {
  //   let indice = this.facturas.findIndex(item => item.numero == nfactura);
  //   this.facturas[indice] = factura;
  //   return of(this.facturas[indice]);
  // }
  // borraFactura(nfactura: number): Observable<any> {
  //   let indice = this.facturas.findIndex(item => item.numero == nfactura);
  //   let facturaAborrar = this.facturas[indice];
  //   this.facturas.splice(indice, 1);
  //   return of(facturaAborrar);
  // }
  // obtengoFactura(nfactura: number): Factura {
  //   let indice = this.facturas.findIndex(item => item.numero == nfactura);
  //   let tmpFactura = new Factura(this.facturas[indice].numero, this.facturas[indice].fecha, this.facturas[indice].iva, this.facturas[indice].cantidad);
  //   return tmpFactura;
  // }

  // API
  obtengoFacturasApi(): Observable<any> {
    return this.http.get(`${this.urlApi}`);
  }
  guardaNuevoFacturaApi(factura: Factura): Observable<any> {
    return this.http.post<any>(`${this.urlApi}`, JSON.stringify(factura), this.httpOptions);
  }
  obtengoFacturaApi(nfactura: number): Observable<any> {
    return this.http.get(`${this.urlApi}/${nfactura}`);
  }
  modificaFacturaApi(nfactura: number, factura: Factura): Observable<any> {
    return this.http.put<any>(`${this.urlApi}/${nfactura}`, JSON.stringify(factura), this.httpOptions);
  }
  borraFacturaApi(nfactura: number): Observable<any> {
    return this.http.delete(`${this.urlApi}/${nfactura}`);
  }
}
