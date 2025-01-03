import { Component } from "@angular/core";
@Component({
    selector: 'app-contador',
    template: `
 <h3>Contador: {{ contador}} </h3>
 <button (click)="incrementaEn(1)">+1</button>
 <button (click)="reseteaContador()">Reset</button>
 <button (click)="incrementaEn(-1)">-1</button>
 `,
    standalone: false,
})
export class ContadorComponent {
    public contador: number = 10;
    incrementaEn(valor: number): void {
        this.contador += valor;
    }
    public reseteaContador(): void {
        this.contador = 10;
    }
}