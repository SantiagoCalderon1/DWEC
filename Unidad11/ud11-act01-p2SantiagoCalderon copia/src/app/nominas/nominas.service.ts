import { Injectable } from '@angular/core';
import { Nomina } from './nomina';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NominasService {

  //Para hacer la misma modificación de empleados en facturas y nominas empezaré por:
  /**
   * 1 Ver que nos devuelve la api, he probado la extensión de POSTMAN
   * 2 Modificaré la clase y añadiré los atributos que nos viene del objeto de la api
   * 3 Modificaré el servicio para que haga la petición y devuelva el objeto (o que lo edite o así)
   * 4 Modificar el componente nominas para que reciba el objeto y se pueda usar 
   * 5 Modificar el componente lista para que mueste los atributos del objeto 
   */

  urlApi = 'http://test-api25s.jtarrega.es/api/nominas';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`, // Incluye el token en las cabeceras
    }),
  };

  constructor(private http: HttpClient) { }

  obtengoNominasApi(): Observable<any> {
    return this.http.get(`${this.urlApi}`);
  }

  guardaNuevaNominaApi(nomina: Nomina): Observable<any> {
    return this.http.post<any>(
      `${this.urlApi}`,
      JSON.stringify(nomina),
      this.httpOptions
    );
  }

  obtengoNominaApi(id: number): Observable<any> {
    return this.http.get(`${this.urlApi}/${id}`);
  }

  modificaNominaApi(id: number, nomina: Nomina): Observable<any> {
    return this.http.put<any>(
      `${this.urlApi}/${id}`,
      JSON.stringify(nomina),
      this.httpOptions
    );
  }

  borraNominaApi(id: number): Observable<any> {
    return this.http.delete(`${this.urlApi}/${id}`);
  }
}