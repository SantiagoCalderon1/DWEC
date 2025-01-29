import { Component } from '@angular/core';
import { Factura } from '../../factura';
import { FacturasService } from '../../facturas.service';
import { Config } from 'datatables.net';

@Component({
  selector: 'app-facturas-lista',
  standalone: false,

  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css',
})
export class ListaComponent {
  facturas: any;
  dtOptions: Config = {};
  constructor(private _facturasService: FacturasService) {}
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

    this._facturasService.obtengoFacturasApi().subscribe({
      next: (resultado) => {
        if (resultado.mensaje == 'OK') {
          this.facturas = resultado.datos;
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
