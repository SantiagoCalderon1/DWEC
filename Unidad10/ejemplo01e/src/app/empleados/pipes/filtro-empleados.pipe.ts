import { Pipe, PipeTransform } from '@angular/core';
import { Empleado } from '../empleado';

@Pipe({
  name: 'filtroEmpleados',
  standalone: false
})
export class FiltroEmpleadosPipe implements PipeTransform {

  transform(value: Empleado[], filterBy: string): Empleado[] {
    const filter = filterBy ? filterBy.toLocaleLowerCase() : null;
    return filter ? value.filter(empleado =>
      empleado.nombre.toLocaleLowerCase().includes(filter)) : value;
  }

}
