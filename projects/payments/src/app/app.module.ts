import { BillingInfoComponent } from './components/billing-info/billing-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatStepperModule} from '@angular/material/stepper';
import { MatButtonModule, MatInputModule, MatIconModule, MatCardModule } from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';
import { MakePaymentComponent } from './components/make-payment/make-payment.component';
import { PaymentHistoryComponent } from './components/payment-history/payment-history.component';
import {MatTableModule} from '@angular/material/table';
import { ScheduledPaymentComponent } from './components/scheduled-payment/scheduled-payment.component';
import { PaymentModule } from './modules/payment/payment.module';
import { DynamicFormModule } from 'libs/components/dynamic-form/src/public-api';
import { HeaderModule } from 'libs/components/header/src/public-api';
import { AngularFireAuth } from '@angular/fire/auth';
import { resident$ } from './app.defaults';
import { first, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';


@NgModule({
  declarations: [
    AppComponent,
    MakePaymentComponent,
    PaymentHistoryComponent,
    BillingInfoComponent,
    ScheduledPaymentComponent
  ],
  imports: [
    AppRoutingModule,
    DynamicFormModule,
    CommonModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    HeaderModule,
    MatTabsModule,
    MatIconModule,
    MatTableModule,
    PaymentModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class PaymentAppModule { 
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore){
    //set up initial state
    this.afAuth.authState.pipe(first()).subscribe(async authUser => {
      if(authUser){
        this.db.collection("users").doc(authUser.uid).get().pipe(first(), map(snapshot=>{
          this.db.collection("residents").doc(snapshot.data().residentId).get().pipe(first(), map(snap=>{
            const data = snap.data();
            const resident = {
               id:snap.id,
               amountDue: data.amountDue,
               email: authUser.email,
               frequency: data.frenquency,
               name: authUser.displayName,
               propertyId: data.propertyId,
               rent: data.rent,
               unit: data.unit,
               userId: authUser.uid
            }
            resident$.next(resident);
          })).subscribe()
        })).subscribe();
      }
    })
  }
}
