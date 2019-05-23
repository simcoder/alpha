import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { AppChildRoutingModule } from './app-routing.child.module';
import { WidgetModule } from 'projects/widget/src/public-api';
import {CdkStepperModule} from '@angular/cdk/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomStepperComponent } from './components/custom-stepper/custom-stepper.component';
import { StepperHeaderComponent } from './components/stepper-header/stepper-header.component';
import { StepperFooterComponent } from './components/stepper-footer/stepper-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomStepperComponent,
    StepperHeaderComponent,
    StepperFooterComponent
  ],
  imports: [
    AppChildRoutingModule,
    WidgetModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CdkStepperModule
  ],
  //exports:[StepperHeaderComponent],
  providers: [],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class DashboardModule { }

