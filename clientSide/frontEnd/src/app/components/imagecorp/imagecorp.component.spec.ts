import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagecorpComponent } from './imagecorp.component';

describe('ImagecorpComponent', () => {
  let component: ImagecorpComponent;
  let fixture: ComponentFixture<ImagecorpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagecorpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagecorpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
