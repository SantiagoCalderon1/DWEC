import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacturaComponent } from './components/factura/factura.component';
import { ListaComponent } from './components/lista/lista.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    FacturaComponent,
    ListaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
        RouterModule
  ],
  exports: [
    FacturaComponent,
    ListaComponent
  ],
})
export class FacturasModule { }
