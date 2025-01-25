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
      this._nominasService.obtengoNominasApi().subscribe({
        next: (resultado) => {
          if (resultado.mensaje == 'OK') {
            this.nominas = resultado.datos;
            console.log(resultado.datos);
          } else {
            console.error('Error al recibir datos:', resultado.error);
          }
        },
        error: (error) => {
          console.error('Error al recibir datos:', error);
        },
        complete: () => {
          console.log('Operación completada.');
        },
      });
    }

}
