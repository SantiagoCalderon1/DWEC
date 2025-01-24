import { CanDeactivateFn } from '@angular/router';
import { CanComponentDeactivate } from '../can-component-deactivate.interface';

export const abandonarPaginaGuard: CanDeactivateFn<CanComponentDeactivate> = (component, currentRoute, currentState, nextState) => {
  return component.canDeactivate();
};
