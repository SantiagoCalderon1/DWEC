import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export function prefJavValidator() {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const valor = control.value;

    return of(valor).pipe(
      delay(1000), // Simula un retraso asíncrono, como una llamada al servidor
      map((val: string) => {
        if (typeof val === 'string' && val.startsWith('san')) {
          return null; // Válido
        }
        return { empiezaConJav: true }; // No válido
      })
    );
  };
}


