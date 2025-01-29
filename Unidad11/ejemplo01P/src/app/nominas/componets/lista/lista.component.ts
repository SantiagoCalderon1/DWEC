import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NominasService } from '../../nominas.service';
import { Config } from 'datatables.net';

@Component({
  selector: 'app-nominas-lista',
  standalone: false,

  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css',
})
export class ListaComponent {
  nominas: any;
  constructor(private _nominasService: NominasService) {}
  dtOptions: Config = {};
  
  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      language: {
        processing: 'Procesando...',
        lengthMenu: 'Mostrar _MENU_ registros',
        zeroRecords: 'No se encontraron resultados',
        emptyTable: 'Ningún dato disponible en esta tabla',
        infoEmpty: 'Mostrando registros del 0 al 0 de un total de 0 registros',
        infoFiltered: '(filtrado de un total de _MAX_ registros)',
        search: 'Buscar:',
        loadingRecords: 'Cargando...',
        paginate: {
          first: 'Primero',
          last: 'Último',
          next: 'Siguiente',
          previous: 'Anterior',
        },
        info: 'Mostrando _START_ a _END_ de _TOTAL_ registros',
      },
    };

    this._nominasService.obtengoNominasApi().subscribe({
      next: (resultado) => {
        if (resultado.mensaje == 'OK') {
          this.nominas = resultado.datos;
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
