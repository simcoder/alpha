import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DynamicFormModule, InputComponent, ButtonComponent, SelectComponent } from 'projects/dynamic-form/src/public-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    DynamicFormModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class PaymentAppModule { }
