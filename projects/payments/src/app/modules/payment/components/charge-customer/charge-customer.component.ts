import { resident$, selectedTab$, disablePayments$ } from './../../../../app.defaults';
import { Component, OnInit, Input } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { OverlaySpinnerService } from 'libs/components/overlay-spinner/src/public-api';
import { MatSnackBar } from '@angular/material';
import { verifiedACHPaymentMethod$ } from '../ach-payment/ach-payment.component';
import { paymentAmount$ } from 'projects/payments/src/app/components/make-payment/make-payment.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-charge-customer',
  templateUrl: './charge-customer.component.html',
  styleUrls: ['./charge-customer.component.scss']
})
export class ChargeCustomerComponent implements OnInit {
  verifiedPaymentInfo:any;
  paymentAmount:number;
  @Input() stepper: any;
  //TODO make this dynamic
  isACHPayment:boolean = true;

  constructor(private functions: AngularFireFunctions, private spinner: OverlaySpinnerService, private snackBar: MatSnackBar, private db: AngularFirestore) { }

  ngOnInit() {
    verifiedACHPaymentMethod$.subscribe(verifiedPaymentInfo=>{
      this.verifiedPaymentInfo = verifiedPaymentInfo;
    })
    paymentAmount$.subscribe(paymentAmount=>{
      this.paymentAmount = paymentAmount
    })
  }

  async charge() {
    // before chargin ACH using must check off consent to withdraw from his or her bank account
    this.spinner.spin$.next(true);
    const stripeCharge = this.functions.httpsCallable('stripeCharge');
    let chargeObj;
    if(this.isACHPayment && this.verifiedPaymentInfo && this.paymentAmount > 0){
      chargeObj = { customerId: this.verifiedPaymentInfo.customerId, amount: this.paymentAmount * 100 };
      await stripeCharge(chargeObj).toPromise().then(charge => {
        this.spinner.spin$.next(false);
        this.snackBar.open("Your Payment Processed Succesfully. PaymentId " + charge.paymentId, "success", {
          duration: 5000
        });
        selectedTab$.next(0);
        this.stepper.reset();
        disablePayments$.next(true);
        const residentState = resident$.getValue();
        const residentId = resident$.getValue().id;
        this.db.collection("residents").doc(residentId).get().pipe(first()).subscribe(snap=>{
          const residentEntity = snap.data();
          const newAmountDue = this.paymentAmount - residentEntity.amountDue;
          residentEntity.amountDue = newAmountDue ;
          residentState.amountDue = newAmountDue;
          this.db.collection("residents").doc(residentId).set(residentEntity);
          resident$.next(residentState);
        });
      }).catch(error => {
        this.snackBar.open("An Error has occured. Please try again!", "error", {
          duration: 5000
        });
        this.spinner.spin$.next(false);
      });
    } else {
      this.spinner.spin$.next(false);
      this.snackBar.open("Cannot make a payment", "error", {
        duration: 5000
      });
    }
  }

}
