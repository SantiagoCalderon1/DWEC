import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = '¡Mi primera WebApp en Angular19 CLI!';

  mytimer = setTimeout(()=>{
    this.title = '¡Título cambiado a los 5 segundos!';
  },5000);

  alert() : void{
    alert('¡Hola desde el componente!');
  }
}
