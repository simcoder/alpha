/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StepperFooterComponent } from './stepper-footer.component';

describe('StepperFooterComponent', () => {
  let component: StepperFooterComponent;
  let fixture: ComponentFixture<StepperFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepperFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
