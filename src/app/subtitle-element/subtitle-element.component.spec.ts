import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtitleElementComponent } from './subtitle-element.component';

describe('SubtitleElementComponent', () => {
  let component: SubtitleElementComponent;
  let fixture: ComponentFixture<SubtitleElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubtitleElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtitleElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
