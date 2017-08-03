import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppendServiceComponent } from './append-service.component';

describe('AppendServiceComponent', () => {
  let component: AppendServiceComponent;
  let fixture: ComponentFixture<AppendServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppendServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppendServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
