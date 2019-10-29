import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PenroseComponent } from './penrose.component';

describe('PenroseComponent', () => {
  let component: PenroseComponent;
  let fixture: ComponentFixture<PenroseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PenroseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenroseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
