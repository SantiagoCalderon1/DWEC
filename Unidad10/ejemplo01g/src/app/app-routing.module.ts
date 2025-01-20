import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidoComponent } from './bienvenido/bienvenido.component';
import { ListaComponent } from
  './empleados/components/lista/lista.component';
import { ListaComponent as ListaFacturas } from
  './facturas/components/lista/lista.component';
import { ListaComponent as ListaNominas } from
  './nominas/components/lista/lista.component';

import { EmpleadoComponent } from './empleados/components/empleado/empleado.component';
import { FacturaComponent } from './facturas/components/factura/factura.component';
import { NominaComponent } from './nominas/components/nomina/nomina.component';
import { empleadoGuard } from './empleados/empleado.guard';
import { abandonarPaginaGuard } from './empleados/abandonar-pagina.guard';
import { empleadoResolveGuard } from './empleados/empleado-resolve.guard';

const routes: Routes = [
  { path: 'bienvenido', component: BienvenidoComponent },
  { path: 'empleados', component: ListaComponent },
  {
    path: 'empleados/:tipo/:id', component: EmpleadoComponent, canActivate:
      [empleadoGuard], canDeactivate: [abandonarPaginaGuard], resolve: {
        empleadoact: empleadoResolveGuard
      },
  },
  { path: 'facturas', component: ListaFacturas },
  { path: 'facturas/:tipo/:id', component: FacturaComponent },
  { path: 'nominas', component: ListaNominas },
  { path: 'nominas/:tipo/:id', component: NominaComponent },
  // Ruta por defecto (vacía) -> Redirigir a /welcome
  { path: '', redirectTo: '/bienvenido', pathMatch: 'full' },
  // Ruta que no coincide con ninguna de las anteriores
  { path: '**', redirectTo: '/bienvenido', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }