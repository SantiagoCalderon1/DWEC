import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { empleadoResolveGuard } from './empleado-resolve.guard';

describe('empleadoResolveGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => empleadoResolveGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
