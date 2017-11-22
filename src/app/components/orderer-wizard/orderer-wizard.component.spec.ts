import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdererWizardComponent } from './orderer-wizard.component';

describe('OrdererWizardComponent', () => {
  let component: OrdererWizardComponent;
  let fixture: ComponentFixture<OrdererWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdererWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdererWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
