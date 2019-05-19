import { CommonModule } from '@angular/common';
import { WeatherComponent } from './widgets/weather/weather.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WidgetComponent } from './widget.component';
import { MatCardModule } from '@angular/material';
import { DynamicComponentDirective } from './directives/dynamic-component.directive';
import { NoWidgetComponent } from './widgets/no-widget/no-widget.component';
import {CdkTableModule} from '@angular/cdk/table';


@NgModule({
  declarations: [WidgetComponent, WeatherComponent, DynamicComponentDirective, NoWidgetComponent],
  imports: [
    MatCardModule,
    CommonModule,
    CdkTableModule
  ],
  entryComponents: [WeatherComponent, NoWidgetComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [WidgetComponent, WeatherComponent, DynamicComponentDirective, NoWidgetComponent]
})
export class WidgetModule { }
