import { Widget } from './widget.interfaces';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'lib-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {
  
  @Input() widgets: Widget[];
  constructor() { }

  ngOnInit() {
  }

}
