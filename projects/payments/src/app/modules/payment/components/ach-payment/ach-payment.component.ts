import { BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { OverlaySpinnerService } from 'libs/components/overlay-spinner/src/lib/overlay-spinner.service';
import { MatSnackBar } from '@angular/material';
export const verifiedACHPaymentMethod$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

@Component({
  selector: 'app-ach-payment',
  templateUrl: './ach-payment.component.html',
  styleUrls: ['./ach-payment.component.scss']
})
export class AchPaymentComponent implements OnInit {

  verifiedPayment: any;

  constructor(private functions: AngularFireFunctions, private spinner: OverlaySpinnerService, private snackBar: MatSnackBar) { }

  async ngOnInit() {
    this.spinner.spin$.next(true);
    const getCustomerPaymentsFunction = this.functions.httpsCallable('getCustomerPayments');
    this.verifiedPayment = await getCustomerPaymentsFunction({}).toPromise().catch(error=>{
      this.snackBar.open("An error has occured", "error", {
        duration: 5000
      });
      this.spinner.spin$.next(false);
    });
    verifiedACHPaymentMethod$.next(this.verifiedPayment);
    this.spinner.spin$.next(false);
  }

  handleVerifiedPayment(verifiedPayment): void {
    this.verifiedPayment = verifiedPayment;
    verifiedACHPaymentMethod$.next(verifiedPayment);
  }

}
