import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const empleadoGuard: CanActivateFn = (route, state) => {
  const id = +route.params['id'];
  const tipo = +route.params['tipo'];
  const router = inject(Router);
  if (isNaN(id) || isNaN(tipo) || tipo < 0 || tipo > 2 || id < 0) {
    return router.navigateByUrl('/empleados');
  }
  return true;
};