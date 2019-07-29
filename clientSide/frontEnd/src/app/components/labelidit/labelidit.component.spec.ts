import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabeliditComponent } from './labelidit.component';

describe('LabeliditComponent', () => {
  let component: LabeliditComponent;
  let fixture: ComponentFixture<LabeliditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabeliditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabeliditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
