import { Widget } from './widget.interfaces';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'lib-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {
  mock: Widget[] = [
    {
     name: "weather",
      title: "Weather"
    },
    {
      name: "weather",
       title: "Weather"
     },
     {
      name: "weather",
       title: "Weather"
     },
     {
      name: "weather",
       title: "Weather"
     },
     {
      name: "weather",
       title: "Weather"
     },
     {
      name: "weather",
       title: "Weather"
     }
  ]
  @Input() widgets: Widget[] = this.mock;
  constructor() { }

  ngOnInit() {
  }

}
