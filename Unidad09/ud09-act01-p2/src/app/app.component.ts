import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { ClienteComponent } from './clientes/components/cliente/cliente.component';
import { Cliente } from './clientes/cliente';
import { Operacion } from './clientes/Operacion';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})

export class AppComponent {
  @ViewChild(ClienteComponent) clienteComponent!: ClienteComponent;

  clientes: Cliente[] = [];
  operaciones: Operacion[] = [];

  ngAfterViewInit(): void {
    this.clientes = this.clienteComponent.clientes; // Accedemos al array de clientes del componente hijo
    this.operaciones = this.clienteComponent.operaciones;
    this.saldoBanco = this.clienteComponent.registroPrimerosClientes(); // de aqui saco el primer el saldo del banco
  }
  // generarOperaciones(numOperaciones: number): void {
  //   this.clienteComponent.generarOperaciones(numOperaciones);
  // }

  generarOperaciones(numOperaciones: number): void {
    if (this.quiebra) {
      console.warn('El banco está en quiebra. No se pueden generar más operaciones.');
      return;
    }
  
    let importe: number, tipoOperacion: number;
    for (let index = 0; index < numOperaciones; index++) {
      if (!this.quiebra) {
        tipoOperacion = this.generarTipoOperacion();
        importe = this.clienteComponent.hacerOperacion(tipoOperacion);
        this.declararQuiebra(importe, tipoOperacion);
      } else {
        console.warn('El banco ha entrado en quiebra durante la generación de operaciones.');
        break;
      }
    }
  }
  

  generarTipoOperacion(): number {
    return Math.floor(Math.random() * 2) + 1;
  }

  declararQuiebra(importe: number, tipoOperacion: number): void {
    // Ajustar el saldo del banco según la operación
    this.saldoBanco += tipoOperacion === 1 ? importe : -importe;
  
    // Verificar si el saldo del banco es negativo y actualizar el estado de quiebra
    this.quiebra = this.saldoBanco < 0;
  
    // Mostrar un mensaje si el banco está en quiebra
    if (this.quiebra) {
      console.error('¡El banco está en quiebra!');
    }
  }
  

  title = 'GESTIÓN DEL BANCO';

  saldoBanco: number = 0;
  quiebra: boolean = false;
  getSaldo() : string{
    return this.saldoBanco.toFixed(2);
  }
}