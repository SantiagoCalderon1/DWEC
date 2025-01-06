import { Component, Input, OnInit } from '@angular/core';
import { Cliente } from '../../cliente';



@Component({
  selector: 'app-listacliente',
  standalone: false,

  templateUrl: './listacliente.component.html',
  styleUrl: './listacliente.component.css'
})
export class ListaclienteComponent {

  @Input() clientes: Cliente[] = [];  // Recibe el array de clientes desde AppComponent

  ngOnInit() {
    if (this.clientes.length === 0) {
      console.log('El array de clientes está vacío');
    } else {
      console.log('Clientes recibidos:', this.clientes);
    }
  }
}
