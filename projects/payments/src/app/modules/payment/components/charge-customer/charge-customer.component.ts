import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { OverlaySpinnerService } from 'libs/components/overlay-spinner/src/public-api';
import { MatSnackBar } from '@angular/material';
import { verifiedACHPaymentMethod$ } from '../ach-payment/ach-payment.component';
import { paymentAmount$ } from 'projects/payments/src/app/components/make-payment/make-payment.component';

@Component({
  selector: 'app-charge-customer',
  templateUrl: './charge-customer.component.html',
  styleUrls: ['./charge-customer.component.scss']
})
export class ChargeCustomerComponent implements OnInit {
  verifiedPaymentInfo:any;
  paymentAmount:number;
  //TODO make this dynamic
  isACHPayment:boolean = true;

  constructor(private functions: AngularFireFunctions, private spinner: OverlaySpinnerService, private snackBar: MatSnackBar) { }

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
      chargeObj = { customerId: this.verifiedPaymentInfo.customerId, amount: this.paymentAmount };
      console.log(chargeObj);
      await stripeCharge(chargeObj).toPromise().then(charge => {
        this.spinner.spin$.next(false);
        console.log(charge);
        
        //sucess notification
        //this.confirmation = charge;
      }).catch(error => {
        this.spinner.spin$.next(false);
        console.log(error);
      });
    } else {
      this.spinner.spin$.next(false);
      this.snackBar.open("cannot make a payment", "error", {
        duration: 5000
      });
    }
    
  }

}
