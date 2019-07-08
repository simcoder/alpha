import { Component, OnInit, Input } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';

@Component({
  selector: 'app-saved-payment',
  templateUrl: './saved-payment.component.html',
  styleUrls: ['./saved-payment.component.scss']
})
export class SavedPaymentComponent implements OnInit {
  payment: any;
  constructor( private functions: AngularFireFunctions) { }

  async ngOnInit() {
    const getCustomerPaymentsFunction = this.functions.httpsCallable('getCustomerPayments');
    this.payment = await getCustomerPaymentsFunction({}).toPromise();
    console.log(this.payment.account);

  }

}
