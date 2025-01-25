import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { abandonarPaginaGuard } from './abandonar-pagina.guard';

describe('abandonarPaginaGuard', () => {
  const executeGuard: CanDeactivateFn<unknown> = (...guardParameters) => 
      TestBed.runInInjectionContext(() => abandonarPaginaGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
