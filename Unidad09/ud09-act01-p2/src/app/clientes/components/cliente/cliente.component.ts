import { Component,OnInit } from '@angular/core';
import { Cliente } from '../../cliente';
import { Operacion } from '../../operacion';

@Component({
  selector: 'app-cliente',
  standalone: false,

  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent {
  clientes: Cliente[] = [new Cliente(1, 'Andres Rojas'), new Cliente(2, 'Camila Vargas'), new Cliente(3, 'Valeria Rios')];
  operaciones: Operacion[] = [];

  clienteSelected: number = 0;

  public nuevoCliente() {
    this.clientes.push(new Cliente(this.clientes.length + 1, ''));
    this.clienteSelected = this.clientes.length - 1;
  }

  public hacerOperacion(tipoOperacion: number): number {
    let cliente = this.clientes[this.elegirCliente()];
    let importe = 0;
  
    switch (tipoOperacion) {
      case 1: // Ingreso
        importe = cliente.ingresarDinero();
        this.operaciones.push(new Operacion(this.operaciones.length + 1, cliente.ncliente, cliente.nombre, importe, 'Ingreso', 'Aceptada'));
        break;
  
      case 2: // Pago
        importe = cliente.sacarDinero();
        if (importe < 0) {
          console.warn('El cliente no puede realizar un pago mayor a su saldo.');
          this.operaciones.push(new Operacion(this.operaciones.length + 1, cliente.ncliente, cliente.nombre, importe, 'Pago', 'Rechazada'));
          
        } else {
          this.operaciones.push(new Operacion(this.operaciones.length + 1, cliente.ncliente, cliente.nombre, importe, 'Pago', 'Aceptada'));
        }
        break;
    }
  
    return importe;
  }
  

  elegirCliente(): number {
    return Math.floor(Math.random() * this.clientes.length);
  }

  registroPrimerosClientes() : number {
    let saldoInicialBanco : number = 0;
    for (let index = 0; index < this.clientes.length; index++) {
      let cliente = this.clientes[index];
      saldoInicialBanco += cliente.saldo;
      this.operaciones.push(new Operacion(index, cliente.ncliente, cliente.nombre, cliente.saldo, 'IngresoCreacion', 'Aceptada'));
    }
    return saldoInicialBanco;
  }
}
