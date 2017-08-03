import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppendInputOutputComponent } from './append-input-output.component';

describe('AppendInputOutputComponent', () => {
  let component: AppendInputOutputComponent;
  let fixture: ComponentFixture<AppendInputOutputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppendInputOutputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppendInputOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
