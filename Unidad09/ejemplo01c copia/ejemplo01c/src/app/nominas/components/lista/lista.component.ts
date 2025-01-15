import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Nomina } from '../../nomina';
@Component({
  selector: 'app-nominas-lista',
  standalone: false,
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {
  @Input() nominas: Nomina[] = [];
  @Output() nominasActualizadas = new EventEmitter<Nomina[]>();
  borrar(indice: number): void {
    this.nominas.splice(indice, 1);
    this.nominasActualizadas.emit(this.nominas);
  }
}