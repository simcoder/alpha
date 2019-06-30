import { Component } from '@angular/core';
import { Widget } from 'projects/widget/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dashboard';
  mockData: Widget[] = [
    {
      name: "Payment",
      metadata: {
        amountDue: 1245
      }
    }
  ]
}
