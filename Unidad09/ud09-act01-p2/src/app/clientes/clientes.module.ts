import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

import { ClienteComponent } from './components/cliente/cliente.component';
import { ListaclienteComponent } from './components/listacliente/listacliente.component';
import { ListaoperacionesComponent } from './components/listaoperaciones/listaoperaciones.component';

@NgModule({
    declarations: [
        ClienteComponent, // Agrega el componente aquí
        ListaclienteComponent,
        ListaoperacionesComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        ClienteComponent, // Exporta el componente si debe usarse en otros módulos
        ListaclienteComponent,
        ListaoperacionesComponent
    ]
})
export class ClientesModule { }