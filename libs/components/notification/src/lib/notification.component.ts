import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'lib-notification',
  template: `
  <span>
     {{config?.message}}
  </span>
  `,
  styles: []
})
export class NotificationComponent implements OnInit {
  @Input() config:any;
  constructor() { }
  
  ngOnInit() {
  }

}
