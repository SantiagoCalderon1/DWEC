import { Component, EventEmitter, Input, Output  } from '@angular/core';
import { Nomina } from '../../nomina';
import { NominasService } from '../../nominas.service';

@Component({
  selector: 'app-nominas-lista',
  standalone: false,

  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {
  nominas: Nomina[] = [];
    constructor(private _nominasService: NominasService) { }
    ngOnInit() {
      this.nominas = this._nominasService.obtengoNominas();
    }
    // modificar(nnomina: number): void {   }
    // borrar(nnomina: number): void {   }

}
