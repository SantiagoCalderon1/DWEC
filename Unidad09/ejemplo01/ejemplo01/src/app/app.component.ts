import { Component } from '@angular/core';
import { Empleado } from './empleados/empleado';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})

export class AppComponent {
  public seleccionado: number = 0;
  public title: string = 'ejemplo01';
  // public contador: number = 10;
  public nombre: string = 'Juan';
  // public textoInput: string = "Texto en la clase";

  // incrementaEn(valor: number): void {
  //   this.contador += valor;
  // }
  // public reseteaContador(): void {
  //   this.contador = 10;
  // }

  // public getContador(): number {
  //   return this.contador;
  // }

  // constructor() {
  //   setTimeout(() => {
  //     this.textoInput = "Por favor...";
  //   }, 3000);
  // }

  // modificarContador(event: Event) {
  //   this.contador = parseInt((<HTMLInputElement>event.target).value) || 0;
  // }

  public empleados: Empleado[] = [
    new Empleado('Javier', 25, true),
    new Empleado('Pepe', 52),
    new Empleado('Paco', 19, true),
    new Empleado('Pedro', 22)
  ];
  actualizarEmpleados(empleadosActualizados: Empleado[]) {
    this.empleados = empleadosActualizados;
    // console.log('Empleados actualizados desde el hijo:', this.empleados);
  }
}