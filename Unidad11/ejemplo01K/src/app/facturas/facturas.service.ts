import { Injectable } from '@angular/core';
import { Factura } from './factura';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  //Para hacer la misma modificación de empleados en facturas y nominas empezaré por:
  /**
   * 1 Ver que nos devuelve la api, he probado la extensión de POSTMAN
   * 2 Modificaré la clase y añadiré los atributos que nos viene del objeto de la api
   * 3 Modificaré el servicio para que haga la petición y devuelva el objeto (o que lo edite o así)
   * 4 Modificar el componente factura para que reciba el objeto y se pueda usar 
   * 5 Modificar el componente lista para que mueste los atributos del objeto 
   */

  urlApi = 'http://test-api25.jtarrega.es/api/facturas';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) { }

  obtengoFacturasApi(): Observable<any> {
    return this.http.get(`${this.urlApi}`);
  }

  guardaNuevoFacturaApi(factura: Factura): Observable<any> {
    return this.http.post<any>(
      `${this.urlApi}`,
      JSON.stringify(factura),
      this.httpOptions
    );
  }

  obtengoFacturaApi(id: number): Observable<any> {
    return this.http.get(`${this.urlApi}/${id}`);
  }

  modificaFacturaApi(id: number, factura: Factura): Observable<any> {
    return this.http.put<any>(
      `${this.urlApi}/${id}`,
      JSON.stringify(factura),
      this.httpOptions
    );
  }

  borraFacturaApi(id: number): Observable<any> {
    return this.http.delete(`${this.urlApi}/${id}`);
  }
}
