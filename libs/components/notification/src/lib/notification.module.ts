import { NgModule } from '@angular/core';
import { NotificationComponent } from './notification.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [NotificationComponent],
  imports: [
    MatSnackBarModule
  ],
  exports: [NotificationComponent]
})
export class NotificationModule { }
