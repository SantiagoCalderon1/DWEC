import { Component } from '@angular/core';
import { Nomina } from '../../nomina';
import { NominasService } from '../../nominas.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nominas-nomina',
  standalone: false,

  templateUrl: './nomina.component.html',
  styleUrl: './nomina.component.css'
})
export class NominaComponent 
{ 
   public nominaact: Nomina = { numero: 0, fecha: '', bruto: 0, retencion: 0 }
     public titulo: string = 'Nueva Nómina';
     public tipo: number = 0;
     public id: number = 0;
     public txtBtn: string = 'Guardar';
     constructor(private _aroute: ActivatedRoute, private _nominasService: NominasService, private _route: Router) { }
     ngOnInit() {
       this.tipo = +this._aroute.snapshot.params['tipo'];
       this.id = +this._aroute.snapshot.params['id']; // Recibimos parámetro 
       if (this.tipo == 1) {
         this.titulo = 'Modificar Nómina (' + this.id + ')';
         this.nominaact = this._nominasService.obtengoNomina(this.id);
       } else if (this.tipo == 2) {
         this.titulo = 'Borrar Nómina (' + this.id + ')';
         this.txtBtn = 'BORRAR';
         this.nominaact = this._nominasService.obtengoNomina(this.id);
       }
     }
     guardaNomina(): void {
       if (this.tipo == 0) {
         this._nominasService.guardaNuevaNomina(this.nominaact);
       }
       else if (this.tipo == 1) {
         this._nominasService.modificaNomina(this.id, this.nominaact);
       }
       else if (this.tipo == 2) {
         this._nominasService.borraNomina(this.id);
       }
       this._route.navigate(['/nominas']);
     }
}