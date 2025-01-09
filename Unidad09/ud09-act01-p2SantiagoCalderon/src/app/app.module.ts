import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RelojComponent } from './reloj/components/reloj/reloj.component';
import { ClienteComponent } from './clientes/components/cliente/cliente.component';
import { ListaclienteComponent } from './clientes/components/listacliente/listacliente.component';
import { ListaoperacionesComponent } from './clientes/components/listaoperaciones/listaoperaciones.component';

@NgModule({
  declarations: [
    AppComponent,
    RelojComponent,
    ClienteComponent,
    ListaclienteComponent,
    ListaoperacionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
