import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function prefJavValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const valor = control.value;
    if (typeof valor === 'string' && valor.startsWith('san')) {
      return null; // Válido
    }
    return { empiezaConJav: true }; // No válido
    };
}