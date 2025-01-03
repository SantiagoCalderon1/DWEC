import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaComponent } from './components/lista/lista.component';
import { EmpleadoComponent } from './components/empleado/empleado.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EmpleadoComponent,
    ListaComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    EmpleadoComponent,
    ListaComponent
  ],
})
export class EmpleadosModule { }