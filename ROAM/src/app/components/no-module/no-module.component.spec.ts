/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NoModuleComponent } from './no-module.component';

describe('NoModuleComponent', () => {
  let component: NoModuleComponent;
  let fixture: ComponentFixture<NoModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
