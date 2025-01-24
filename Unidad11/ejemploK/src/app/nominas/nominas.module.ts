import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NominaComponent } from './componets/nomina/nomina.component';
import { ListaComponent } from './componets/lista/lista.component';
import { FormsModule } from '@angular/forms';
import { SueldoNetoPipe } from './pipes/sueldo-neto.pipe';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NominaComponent,
    ListaComponent,
    SueldoNetoPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    NominaComponent,
    ListaComponent
  ],
})
export class NominasModule { }
