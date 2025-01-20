import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { NominaComponent } from './components/nomina/nomina.component';
import { ListaComponent } from './components/lista/lista.component';
import { SueldoNetoPipe } from './pipes/sueldo-neto.pipe';



@NgModule({
  declarations: [
    NominaComponent,
    ListaComponent,
    SueldoNetoPipe
  ],
  exports: [
    NominaComponent,
    ListaComponent
    ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class NominasModule { }
