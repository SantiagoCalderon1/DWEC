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
<<<<<<< HEAD
import { LoginComponent } from './login/components/login/login.component';
import { loginGuard } from './login/login.guard';
import { LogoutComponent } from './login/components/logout/logout.component';
import { abandonarPaginaGuard } from './empleados/abandonar-pagina.guard';

const routes: Routes = [ 
  // Añadimos las nuevas rutas y el canActivate a las demas rutas
  { path: 'logout', component: LogoutComponent },
  { path: 'login', component: LoginComponent}, 

  { path: 'bienvenido', component: BienvenidoComponent, canActivate: [loginGuard] }, 
  { path: 'empleados', component: ListaComponent, canActivate: [loginGuard] }, 
  { path: 'empleados/:tipo/:id', component: EmpleadoComponent, canActivate: [empleadoGuard, loginGuard], canDeactivate: [abandonarPaginaGuard], resolve: { empleadoact: empleadoGuard } }, 
  { path: 'facturas', component: ListaFacturas, canActivate: [loginGuard] }, 
  { path: 'facturas/:tipo/:id', component: FacturaComponent, canActivate: [loginGuard] }, 
  { path: 'nominas', component: ListaNominas, canActivate: [loginGuard] }, 
  { path: 'nominas/:tipo/:id', component: NominaComponent, canActivate: [loginGuard] }, 
  // Ruta por defecto (vacía) -> Redirigir a /welcome 
  { path: '', redirectTo: '/bienvenido', pathMatch: 'full' }, 
  // Ruta que no coincide con ninguna de las anteriores 
  { path: '**', redirectTo: '/bienvenido', pathMatch: 'full'} 
  ];


=======

const routes: Routes = [ 
  { path: 'bienvenido', component: BienvenidoComponent }, 
  { path: 'empleados', component: ListaComponent }, 
  { path: 'empleados/:tipo/:id', component: EmpleadoComponent, canActivate: [empleadoGuard]  }, 
  { path: 'facturas', component: ListaFacturas }, 
  { path: 'facturas/:tipo/:id', component: FacturaComponent }, 
  { path: 'nominas', component: ListaNominas }, 
  { path: 'nominas/:tipo/:id', component: NominaComponent }, 
  // Ruta por defecto (vacía) -> Redirigir a /welcome 
  { path: '', redirectTo: '/bienvenido', pathMatch: 'full' }, 
  // Ruta que no coincide con ninguna de las anteriores 
  { path: '**', redirectTo: '/bienvenido', pathMatch: 'full' } 
  ];

>>>>>>> 3b76bf4 (a)
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
