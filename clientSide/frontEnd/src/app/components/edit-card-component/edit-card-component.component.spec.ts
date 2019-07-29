import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCardComponentComponent } from './edit-card-component.component';

describe('EditCardComponentComponent', () => {
  let component: EditCardComponentComponent;
  let fixture: ComponentFixture<EditCardComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCardComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCardComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
