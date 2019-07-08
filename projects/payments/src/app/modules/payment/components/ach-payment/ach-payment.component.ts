import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AchPayment } from './ach-payment.interfaces.ts';
declare var Stripe//: StripeCheckoutStatic;

@Component({
  selector: 'app-ach-payment',
  templateUrl: './ach-payment.component.html',
  styleUrls: ['./ach-payment.component.scss']
})
export class AchPaymentComponent implements OnInit {
  publicKey = environment.plaid.key;
  plaidEnvironment = environment.plaid.env;
  mockAchPayment:AchPayment = {
    country: 'US',
    currency: 'usd',
    routingNumber: '110000000',
    accountNumber: '000123456789',
    accountHolderName: 'Jenny Rosen',
    accountHolderType: 'individual',
  }
  verifiedPaymentMethod;
  achForm: FormGroup;
  confirmation: any;
  stripe;
  @Input() amount: any = '2000';
  loading: boolean;
  error: boolean;
  constructor(private formBuilder: FormBuilder, private functions: AngularFireFunctions) { }
  
  ngOnInit() {
    this.stripe = Stripe(environment.stripeKey);
    this.achForm = this.formBuilder.group({
      routingNumber: [''],
      accountNumber: [''],
      name: [''],
      accountType: [''],
    });
  }
  onPlaidClick(event) {
    event.preventDefault();
    console.log(event);
  }
  async onPlaidSuccess(event) {
    // after plaid linked account verification
    const token = event.token;
    const accountId = event.metadata.account_id || event.metadata.accounts[0].id;
    const createPlaidVerifiedToken = this.functions.httpsCallable('plaidBankToken');
    const createStripeCustomer = this.functions.httpsCallable('stripeCreateCustomer');
    const saveCustomerPayment = this.functions.httpsCallable('saveCustomerPayment');
    this.loading = true;
    this.error = false;
    await createPlaidVerifiedToken({ token, accountId }).toPromise().then(async resp => {
      await createStripeCustomer({ token: resp.stripe_bank_account_token }).toPromise().then(async customer => {
        console.log(customer);
        let accountMeta = event.metadata.account;
        if(event.metadata.account.mask === null){
          debugger;
          //TODO remove this after testing
          accountMeta = { id: "45354535", name: "Jp Morgan Chase", type: "personal", subtype: null, mask: "XXXX1534" };
        } else {
          accountMeta = event.metadata.account;
        }
        //TODO implement save payment checkbox
          await saveCustomerPayment({ customerId: customer.id, account:accountMeta }).toPromise().then(response => {
            this.loading = false;
            console.log(response);
          }).catch(error => {
            this.loading = false;
            this.error = true;
            console.log(error);
          });
        // selects linked account
        this.verifiedPaymentMethod = customer.id
      }).catch(error => {
        this.loading = false;
        this.error = true;
        console.log(error);
      });
    }).catch(error => {
      this.loading = false;
      this.error = true;
      console.log(error);
    });
  }
  onPlaidExit(event) {
    console.log(event);
  }
  onPlaidLoad(event) {
    console.log(event);
  }
  onPlaidEvent(event) {
    console.log(event);
  }
  async charge(){
    // before chargin ACH using must check off consent to withdraw from his or her bank account
    this.loading = true;
    const stripeCharge = this.functions.httpsCallable('stripeCharge');
    await stripeCharge({ customerId:  this.verifiedPaymentMethod, amount: this.amount }).toPromise().then(charge => {
          this.loading = false;
          console.log(charge);
          //sucess notification
          this.confirmation = charge;
        }).catch(error => {
          this.loading = false;
          this.error = true;
          console.log(error);
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
    this.stripe.createToken('bank_account', mockObject).then(async source => {
      if (source.error) {
         this.error = true;
      } else {
        const fun = this.functions.httpsCallable('stripeCreateCustomer');
        this.confirmation = await fun({ token: source.token.id }).toPromise();
        console.log(this.confirmation);
      }
    })
  }
}
