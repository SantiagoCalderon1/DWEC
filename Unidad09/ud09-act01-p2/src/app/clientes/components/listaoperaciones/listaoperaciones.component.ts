import { Component, Input, OnInit } from '@angular/core';
import { Operacion } from '../../Operacion';

@Component({
  selector: 'app-listaoperaciones',
  standalone: false,

  templateUrl: './listaoperaciones.component.html',
  styleUrl: './listaoperaciones.component.css'
})

export class ListaoperacionesComponent {
  @Input() operaciones: Operacion[] = [];  // Recibe el array de clientes desde AppComponent

}
