import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NominaComponent } from './componets/nomina/nomina.component';
import { ListaComponent } from './componets/lista/lista.component';
import { FormsModule } from '@angular/forms';
import { SueldoNetoPipe } from './pipes/sueldo-neto.pipe';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';



@NgModule({
  declarations: [
    NominaComponent,
    ListaComponent,
    SueldoNetoPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    DataTablesModule

  ],
  exports: [
    NominaComponent,
    ListaComponent
  ],
})
export class NominasModule { }
