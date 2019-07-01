import { Component } from '@angular/core';
import { Widget } from 'projects/widget/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dashboard';
  appMeta: any = {
    widgets: [
      {
        name: "Payment",
        metadata: {
          amountDue: 1245
        }
      }
    ],
    welcomeMessage: "Welcome to your Resident Portal. Here you can make payments, submit tickets, and much more..."
  }
  
}
