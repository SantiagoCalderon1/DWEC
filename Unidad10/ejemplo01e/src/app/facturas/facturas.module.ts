import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FacturaComponent } from './components/factura/factura.component';
import { ListaComponent } from './components/lista/lista.component';

@NgModule({
  declarations: [
    FacturaComponent,
    ListaComponent
  ],
  exports: [
    FacturaComponent,
    ListaComponent
    ],
  imports: [
    CommonModule,
    FormsModule
  ]
  
})
export class FacturasModule { }
