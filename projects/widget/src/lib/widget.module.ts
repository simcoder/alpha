import { CommonModule } from '@angular/common';
import { WeatherComponent } from './widgets/weather/weather.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WidgetComponent } from './widget.component';
import { MatCardModule, MatButtonModule } from '@angular/material';
import { DynamicComponentDirective } from './directives/dynamic-component.directive';
import { NoWidgetComponent } from './widgets/no-widget/no-widget.component';
import {CdkTableModule} from '@angular/cdk/table';
import { PaymentComponent } from './widgets/payment/payment.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMoneyBillAlt } from '@fortawesome/free-solid-svg-icons';
import { faToolbox } from '@fortawesome/free-solid-svg-icons';
import { faCog } from '@fortawesome/free-solid-svg-icons';

import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [WidgetComponent, WeatherComponent, PaymentComponent, DynamicComponentDirective, NoWidgetComponent],
  imports: [
    MatCardModule,
    CommonModule,
    CdkTableModule,
    FontAwesomeModule,
    MatButtonModule,
    RouterModule
  ],
  entryComponents: [WeatherComponent, NoWidgetComponent, PaymentComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [WidgetComponent, WeatherComponent, DynamicComponentDirective, NoWidgetComponent]
})
export class WidgetModule { 
  constructor(){
    library.add(faMoneyBillAlt, faToolbox, faCog);
  }
}
