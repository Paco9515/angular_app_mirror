import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleFaseComponent } from './detalle-fase.component';

describe('DetalleFaseComponent', () => {
  let component: DetalleFaseComponent;
  let fixture: ComponentFixture<DetalleFaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleFaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleFaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
