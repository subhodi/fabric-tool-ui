import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdererOutputComponent } from './orderer-output.component';

describe('OrdererOutputComponent', () => {
  let component: OrdererOutputComponent;
  let fixture: ComponentFixture<OrdererOutputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdererOutputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdererOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
