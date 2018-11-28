import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletePreviewComponent } from './complete-preview.component';

describe('CompletePreviewComponent', () => {
  let component: CompletePreviewComponent;
  let fixture: ComponentFixture<CompletePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
