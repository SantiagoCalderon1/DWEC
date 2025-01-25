import { Injectable } from '@angular/core';
import { Empleado } from './empleado';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmpleadosService {

  urlApi = 'http://test-api25s.jtarrega.es/api/empleados';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`, // Incluye el token en las cabeceras
    }),
  };

  constructor(private http: HttpClient) { }

  // Nuevos metodos añadidos para acceder a una api

  obtengoEmpleadosApi(): Observable<any> {
    return this.http.get(`${this.urlApi}`);
  }

  guardaNuevoEmpleadoApi(empleado: Empleado): Observable<any> {
    return this.http.post<any>(
      `${this.urlApi}`,
      JSON.stringify(empleado),
      this.httpOptions
    );
  }
  obtengoEmpleadoApi(id: number): Observable<any> {
    return this.http.get(`${this.urlApi}/${id}`);
  }

  modificaEmpleadoApi(id: number, empleado: Empleado): Observable<any> {
    return this.http.put<any>(
      `${this.urlApi}/${id}`,
      JSON.stringify(empleado),
      this.httpOptions
    );
  }

  borraEmpleadoApi(id: number): Observable<any> {
    return this.http.delete(`${this.urlApi}/${id}`);
  }
}
