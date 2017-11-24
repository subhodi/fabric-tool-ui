import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPeerorgFormComponent } from './add-peerorg-form.component';

describe('AddPeerorgFormComponent', () => {
  let component: AddPeerorgFormComponent;
  let fixture: ComponentFixture<AddPeerorgFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPeerorgFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPeerorgFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
