import { Injectable } from '@angular/core';
import { Empleado } from './empleado';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmpleadosService {
  urlPhp = 'http://test-php.jtarrega.es/';
  constructor(private http: HttpClient) {}
  private empleados: Empleado[] = [
    // new Empleado(1,'Javier', 25, '', 1),
    // new Empleado(2,'Pepe', 52, ''),
    // new Empleado(3,'Paco', 19, '', 1),
    // new Empleado(4,'Pedro', 22, '')
  ];

  // obtengoEmpleados(): Empleado[] {
  //   return this.empleados;
  // }

  // guardaNuevoEmpleado(empleado: Empleado): Observable<any> {
  //   let ultimoId: number = 0;
  //   if (this.empleados.length > 0)
  //     ultimoId = this.empleados[this.empleados.length - 1].id;
  //   this.empleados.push(
  //     new Empleado(
  //       ultimoId + 1,
  //       empleado.nombre,
  //       empleado.edad,
  //       empleado.cargo,
  //       empleado.contratado
  //     )
  //   );
  //   return of(this.empleados[this.empleados.length - 1]);
  // }

  // modificaEmpleado(nempleado: number, empleado: Empleado): Observable<any> {
  //   let indice = this.empleados.findIndex((item) => item.id == nempleado);
  //   this.empleados[indice] = empleado;
  //   return of(this.empleados[indice]);
  // }

  // borraEmpleado(nempleado: number): Observable<any> {
  //   let indice = this.empleados.findIndex((item) => item.id == nempleado);
  //   let empleadoAborrar = this.empleados[indice];
  //   this.empleados.splice(indice, 1);
  //   return of(empleadoAborrar);
  // }

  // obtengoEmpleado(nempleado: number): Empleado {
  //   let indice = this.empleados.findIndex((item) => item.id == nempleado);
  //   let tmpEmpleado: Empleado = new Empleado(
  //     this.empleados[indice].id,
  //     this.empleados[indice].nombre,
  //     this.empleados[indice].edad,
  //     this.empleados[indice].cargo,
  //     this.empleados[indice].contratado
  //   );
  //   return tmpEmpleado;
  // }

  modificaEmpleadoPhp(nempleado:number, empleado:Empleado): Observable<any>{
    return this.http.post<any>(`${this.urlPhp}/modificacion.php`,
   {'id':nempleado,'nombre':empleado.nombre, 'edad':empleado.edad,
   'cargo':empleado.cargo, 'contratado': empleado.contratado});
    }

  obtengoEmpleadoPhp(nempleado:number):Observable<any> {
    return this.http.get(`${this.urlPhp}seleccionar.php?id=${nempleado}`);
    }

  obtengoEmpleadosPhp(): Observable<any> {
    return this.http.get(`${this.urlPhp}recuperartodos.php`);
  }

  guardaNuevoEmpleadoPhp(empleado: Empleado): Observable<any> {
    return this.http.post<any>(
      `${this.urlPhp}/alta.php`,
      JSON.stringify(empleado)
    );
  }

  borraEmpleadoPhp(nempleado:number): Observable<any>{
    return this.http.get(`${this.urlPhp}baja.php?id=${nempleado}`);
    }
}
