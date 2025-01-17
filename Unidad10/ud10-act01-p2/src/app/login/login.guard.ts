import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';

export const loginGuard: CanActivateFn = (route, state) => {
  // Inyectamos el servicio y el Router para usarlos en el siguiente condición  
  const loginService = inject(LoginService);
  const router = inject(Router);

  // Si el usuario no está identidicadon, no lo deja pasar y lo redirecciona simpre a /login
  if (!loginService.isIdentified()) {
    return router.navigateByUrl('/login');
  }
  
  return true;
};
