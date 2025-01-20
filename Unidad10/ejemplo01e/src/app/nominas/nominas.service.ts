import { Injectable } from '@angular/core';
import { Nomina } from './nomina';
@Injectable({
  providedIn: 'root'
})
export class NominasService {
  constructor() { }
  private nominas: Nomina[] = [
    new Nomina(1, '01/01/2024', 1000, 25),
    new Nomina(2, '01/01/2024', 2000, 52),
    new Nomina(3, '01/01/2024', 3000, 19),
    new Nomina(4, '01/01/2024', 4000, 22)
  ];
  obtengoNominas(): Nomina[] {
    return this.nominas;
  }
}