import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCardComponrntComponent } from './edit-card-componrnt.component';

describe('EditCardComponrntComponent', () => {
  let component: EditCardComponrntComponent;
  let fixture: ComponentFixture<EditCardComponrntComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCardComponrntComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCardComponrntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
