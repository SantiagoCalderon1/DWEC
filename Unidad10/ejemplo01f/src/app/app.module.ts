import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContadorComponent } from './contador/contador.component';
import { EmpleadosModule } from './empleados/empleados.module';

import { FacturasModule } from './facturas/facturas.module';
import { NominasModule } from './nominas/nominas.module';

import { EmpleadoComponent } from
  './empleados/components/empleado/empleado.component';
import { ListaComponent } from
  './empleados/components/lista/lista.component';
import { BienvenidoComponent } from './bienvenido/bienvenido.component';


@NgModule({
  declarations: [
    AppComponent,
    ContadorComponent,
    BienvenidoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EmpleadosModule,
    FacturasModule,
    NominasModule,
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }