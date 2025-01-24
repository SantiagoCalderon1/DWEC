import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidoComponent } from './bienvenido/bienvenido.component';
import { ListaComponent } from './empleados/components/lista/lista.component';
import { ListaComponent as ListaFacturas } from './facturas/componets/lista/lista.component';
import { ListaComponent as ListaNominas } from './nominas/componets/lista/lista.component';
import { EmpleadoComponent } from './empleados/components/empleado/empleado.component';
import { FacturaComponent } from './facturas/componets/factura/factura.component';
import { NominaComponent } from './nominas/componets/nomina/nomina.component';
import { empleadoGuard } from './empleados/empleado.guard';
import { abandonarPaginaGuard } from './empleados/abandonar-pagina.guard';
import { empleadoResolveGuard } from './empleados/empleado-resolve.guard';
import { LoginComponent } from './login/components/login/login.component';
import { loginGuard } from './login/login.guard';
import { LogoutComponent } from './login/components/logout/logout.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'bienvenido', component: BienvenidoComponent, canActivate: [loginGuard] },
  { path: 'empleados', component: ListaComponent, canActivate: [loginGuard] },
  {
    path: 'empleados/:tipo/:id', component: EmpleadoComponent, canActivate: [loginGuard, empleadoGuard],
    canDeactivate: [abandonarPaginaGuard], resolve: { empleadoact: empleadoResolveGuard },
  },
  { path: 'facturas', component: ListaFacturas, canActivate: [loginGuard] },
  { path: 'facturas/:tipo/:id', component: FacturaComponent, canActivate: [loginGuard], canDeactivate: [abandonarPaginaGuard] },
  { path: 'nominas', component: ListaNominas, canActivate: [loginGuard] },
  { path: 'nominas/:tipo/:id', component: NominaComponent, canActivate: [loginGuard], canDeactivate: [abandonarPaginaGuard] },
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
