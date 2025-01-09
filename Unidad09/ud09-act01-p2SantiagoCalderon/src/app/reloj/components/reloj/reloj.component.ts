import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reloj',
  standalone: false,
  
  templateUrl: './reloj.component.html',
  styleUrl: './reloj.component.css'
})
export class RelojComponent implements OnInit{
  horaActual: string = '';

  actualizarReloj() : void{
    const ahora = new Date();

    let horas = ahora.getHours().toString().padStart(2, '0');
    let minutos = ahora.getMinutes().toString().padStart(2, '0');
    let segundos = ahora.getSeconds().toString().padStart(2, '0');

    this.horaActual = `${horas}:${minutos}:${segundos}`;
  }
  
  ngOnInit(): void {
    this.actualizarReloj();
    setInterval(() => this.actualizarReloj(), 1000);
  }
}
