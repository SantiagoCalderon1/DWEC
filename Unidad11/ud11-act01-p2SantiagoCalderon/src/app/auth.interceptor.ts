import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Obtener el token del almacenamiento local
  const token = localStorage.getItem('token');
  // Si el token existe, clonamos la solicitud y añadimos el encabezado Authorization;
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  // Pasamos la solicitud al siguiente manejador
  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        // Manejo de errores: redirigir al login o eliminar el token
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      return throwError(() => error);
    })
  );
};
