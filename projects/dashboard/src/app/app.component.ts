import { Component } from '@angular/core';
import { Widget } from 'projects/widget/src/public-api';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

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
  displayName: string;

  constructor(public afa: AngularFireAuth){
    afa.user.subscribe((user: User) => {
      this.displayName = user ? user.displayName : null;
    });
  }
  
}
