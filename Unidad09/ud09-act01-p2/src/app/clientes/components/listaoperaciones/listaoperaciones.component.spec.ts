import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaoperacionesComponent } from './listaoperaciones.component';

describe('ListaoperacionesComponent', () => {
  let component: ListaoperacionesComponent;
  let fixture: ComponentFixture<ListaoperacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaoperacionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaoperacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
