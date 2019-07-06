import { Widget } from './../widget.interfaces';
import { PaymentComponent } from './../widgets/payment/payment.component';
import { NoWidgetComponent } from './../widgets/no-widget/no-widget.component';
import { Input, Directive, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { WeatherComponent } from '../widgets/weather/weather.component';
const widgetMapper = {
  weather:WeatherComponent,
  payment:PaymentComponent,
  //add more widget defination here
};
@Directive({
  selector: '[dynamicComponent]'
})
export class DynamicComponentDirective {
  @Input() widget: Widget;
  componentRef: any;
  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) { }

  ngOnInit(): void {
    const widget = widgetMapper[this.widget.name.toLowerCase()];
    //this will resolve to existing widget from widget definition above, if not found a noWidget message will be displayed
    const factory = this.resolver.resolveComponentFactory(widget? widget: NoWidgetComponent);
    this.componentRef = this.container.createComponent(factory);
    
    //refactor this to switch statement
    if(this.widget.name.toLowerCase() === "weather"){
      console.log("set weather data using component ref");
    } else if (this.widget.name.toLowerCase() === "table"){
      console.log("set table meta using component ref");
    }else if (this.widget.name.toLowerCase() === "payment"){
      this.componentRef.instance.amountDue = this.widget.metadata.amountDue;
    }
  }

}