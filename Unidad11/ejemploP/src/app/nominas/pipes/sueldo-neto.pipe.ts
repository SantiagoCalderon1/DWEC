import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sueldoNeto',
  standalone: false
})
export class SueldoNetoPipe implements PipeTransform {
  transform(bruto: number, retencion: number): string {
    const neto = bruto - (bruto * (retencion/100));
    return neto.toFixed(2) + "€";
  }
}
