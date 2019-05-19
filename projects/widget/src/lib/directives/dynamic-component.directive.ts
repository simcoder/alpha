import { NoWidgetComponent } from './../widgets/no-widget/no-widget.component';
import { Input, Directive, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { WeatherComponent } from '../widgets/weather/weather.component';
const widgetMapper = {
  weather:WeatherComponent,
  //add more widget defination here
};
@Directive({
  selector: '[dynamicComponent]'
})
export class DynamicComponentDirective {
  @Input() widgetName: string;
  componentRef: any;
  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) { }

  ngOnInit(): void {
    const widget = widgetMapper[this.widgetName.toLowerCase()];
    //this will resolve to existing widget from widget definition above, if not found a noWidget message will be displayed
    const factory = this.resolver.resolveComponentFactory(widget? widget: NoWidgetComponent);
    this.componentRef = this.container.createComponent(factory);
    //refactor this to switch statement
    if(this.widgetName.toLowerCase() === "weather"){
      console.log("set weather data using component ref");
    } else if (this.widgetName.toLowerCase() === "table"){
      console.log("set table meta using component ref");
    }
  }

}