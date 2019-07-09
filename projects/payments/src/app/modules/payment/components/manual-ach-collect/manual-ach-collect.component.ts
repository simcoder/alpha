import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AchPayment } from '../ach-payment/ach-payment.interfaces.ts';

@Component({
  selector: 'app-manual-ach-collect',
  templateUrl: './manual-ach-collect.component.html',
  styleUrls: ['./manual-ach-collect.component.scss']
})
export class ManualAchCollectComponent implements OnInit {
  achForm: FormGroup;
  mockAchPayment:AchPayment = {
    country: 'US',
    currency: 'usd',
    routingNumber: '110000000',
    accountNumber: '000123456789',
    accountHolderName: 'Jenny Rosen',
    accountHolderType: 'individual',
  }
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.achForm = this.formBuilder.group({
      routingNumber: [''],
      accountNumber: [''],
      accountNumberVerify: [''],
      name: [''],
      accountType: [''],
    });
  }

  handleForm(event) {
    const mockObject = {
      country: this.mockAchPayment.country,
      currency: this.mockAchPayment.currency,
      routing_number: this.mockAchPayment.routingNumber,
      account_number: this.mockAchPayment.accountNumber,
      account_holder_name: this.mockAchPayment.accountHolderName,
      account_holder_type: this.mockAchPayment.accountHolderType
    }
    // this.stripe.createToken('bank_account', mockObject).then(async source => {
    //   if (source.error) {
    //      this.error = true;
    //   } else {
    //     const fun = this.functions.httpsCallable('stripeCreateCustomer');
    //     this.confirmation = await fun({ token: source.token.id }).toPromise();
    //     console.log(this.confirmation);
    //   }
    // })
  }

}
