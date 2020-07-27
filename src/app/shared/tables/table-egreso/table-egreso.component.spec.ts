import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableEgresoComponent } from './table-egreso.component';

describe('TableEgresoComponent', () => {
  let component: TableEgresoComponent;
  let fixture: ComponentFixture<TableEgresoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableEgresoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableEgresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
