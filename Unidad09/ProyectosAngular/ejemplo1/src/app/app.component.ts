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
  public title: string = 'ejemplo01';
  public contador: number = 10;
  incrementaEn(valor:number):void{
  this.contador += valor;
  }
  public reseteaContador(): void{
  this.contador = 10;
  }
 }
