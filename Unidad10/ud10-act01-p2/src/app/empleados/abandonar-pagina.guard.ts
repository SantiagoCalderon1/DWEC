import { CanDeactivateFn } from '@angular/router';

export const abandonarPaginaGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  return true;
};
