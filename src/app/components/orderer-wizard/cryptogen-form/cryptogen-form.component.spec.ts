import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptogenFormComponent } from './cryptogen-form.component';

describe('CryptogenFormComponent', () => {
  let component: CryptogenFormComponent;
  let fixture: ComponentFixture<CryptogenFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CryptogenFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptogenFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
