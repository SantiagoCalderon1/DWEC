import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelojComponent } from './components/reloj/reloj.component';

@NgModule({
    declarations: [
        RelojComponent, // Agrega el componente aquí
    ],
    imports: [
        CommonModule
    ],
    exports: [
        RelojComponent, // Exporta el componente si debe usarse en otros módulos
    ]
})
export class ClientesModule { }