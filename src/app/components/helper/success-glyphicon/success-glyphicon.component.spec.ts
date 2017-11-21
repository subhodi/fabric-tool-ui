import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessGlyphiconComponent } from './success-glyphicon.component';

describe('SuccessGlyphiconComponent', () => {
  let component: SuccessGlyphiconComponent;
  let fixture: ComponentFixture<SuccessGlyphiconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessGlyphiconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessGlyphiconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
