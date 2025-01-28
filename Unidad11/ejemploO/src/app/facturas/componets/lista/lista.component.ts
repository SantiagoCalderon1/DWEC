import { Component } from '@angular/core';
import { Factura } from '../../factura';
import { FacturasService } from '../../facturas.service';

@Component({
  selector: 'app-facturas-lista',
  standalone: false,

  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {
  facturas: any;
  constructor(private _facturasService: FacturasService) { }
  ngOnInit() {
    this._facturasService.obtengoFacturasApi().subscribe({
      next: (resultado) => {
        if (resultado.mensaje == "OK"){
          this.facturas = resultado.datos;
        }else{
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
