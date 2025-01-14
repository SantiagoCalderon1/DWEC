import { Component } from '@angular/core';
import { Empleado } from '../../empleado';
import { EmpleadosService } from '../../empleados.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-empleados-empleado',
  standalone: false,

  templateUrl: './empleado.component.html',
  styleUrl: './empleado.component.css'
})

export class EmpleadoComponent {
  public empleadoact: Empleado = { id:0, nombre: '', edad: 0, contratado: false }
  public titulo: string = 'Nuevo Empleado';
  public tipo: number = 0;
  public id: number = 0;
  public txtBtn: string = 'Guardar';
  constructor(private _aroute: ActivatedRoute, private _empleadosService:
    EmpleadosService, private _route: Router) { }
  ngOnInit() {
    this.tipo = +this._aroute.snapshot.params['tipo'];
    this.id = +this._aroute.snapshot.params['id']; // Recibimos parámetro 
    if (this.tipo == 1) {
      this.titulo = 'Modificar Empleado (' + this.id + ')';
      this.empleadoact = this._empleadosService.obtengoEmpleado(this.id);
    } else if (this.tipo == 2) {
      this.titulo = 'Borrar Empleado (' + this.id + ')';
      this.txtBtn = 'BORRAR';
      this.empleadoact = this._empleadosService.obtengoEmpleado(this.id);
    }
  }
  guardaEmpleado(): void {
    if (this.tipo == 0) {
      this._empleadosService.guardaNuevoEmpleado(this.empleadoact);
    }
    else if (this.tipo == 1) {
      this._empleadosService.modificaEmpleado(this.id, this.empleadoact);
    }
    else if (this.tipo == 2) {
      this._empleadosService.borraEmpleado(this.id);
    }
    this._route.navigate(['/empleados']);
  }
}
