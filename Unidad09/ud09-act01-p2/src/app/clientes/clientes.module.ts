import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

import { ClienteComponent } from './components/cliente/cliente.component';
import { ListaclienteComponent } from './components/listacliente/listacliente.component';
import { ListaoperacionesComponent } from './components/listaoperaciones/listaoperaciones.component';

@NgModule({
    declarations: [

    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [

    ]
})
export class ClientesModule { }