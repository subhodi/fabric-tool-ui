import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdererServiceFormComponent } from './orderer-service-form.component';

describe('OrdererServiceFormComponent', () => {
  let component: OrdererServiceFormComponent;
  let fixture: ComponentFixture<OrdererServiceFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdererServiceFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdererServiceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
