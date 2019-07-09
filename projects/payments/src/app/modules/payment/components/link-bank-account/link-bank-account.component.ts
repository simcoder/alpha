import { Component, Output, EventEmitter } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { OverlaySpinnerService } from 'libs/components/overlay-spinner/src/public-api';
import { MatSnackBar } from '@angular/material';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-link-bank-account',
  templateUrl: './link-bank-account.component.html',
  styleUrls: ['./link-bank-account.component.scss']
})
export class LinkBankAccountComponent {
  @Output() verifiedPayment: EventEmitter<any> = new EventEmitter();

  publicKey = environment.plaid.key;
  plaidEnvironment = environment.plaid.env;
  constructor(private functions: AngularFireFunctions,
    private spinner: OverlaySpinnerService,
    private snackBar: MatSnackBar) { }

  achLinkButtonStyle: any = {
    "background-color": "#00796B",
    "transition-duration": "350ms",
    "transition-property": "background-color, box-shadow",
    "transition-timing-function": "ease-in-out",
    "-webkit-appearance": "button",
    "border": "0",
    "border-radius": "4px",
    "box-shadow": "0 2px 4px 0 rgba(0,0,0,0.1), inset 0 1px 0 0 rgba(255,255,255,0.1)",
    "color": "#fff",
    "font-size": "14px",
    "height": "40px",
    "outline": "0",
    "text-align": "center",
    "text-transform": "none",
    "padding": "0 2em",
    "cursor": "pointer"
  }


  async onPlaidSuccess(event) {
    this.spinner.spin$.next(true);
    // after plaid linked account verification
    const token = event.token;
    const accountId = event.metadata.account_id || event.metadata.accounts[0].id;
    const createPlaidVerifiedToken = this.functions.httpsCallable('plaidBankToken');
    const createStripeCustomer = this.functions.httpsCallable('stripeCreateCustomer');
    const saveCustomerPayment = this.functions.httpsCallable('saveCustomerPayment');
    await createPlaidVerifiedToken({ token, accountId }).toPromise().then(async resp => {
      await createStripeCustomer({ token: resp.stripe_bank_account_token }).toPromise().then(async customer => {
        let accountMeta = event.metadata.account;
        if (event.metadata.account.mask === null) {
          //TODO remove this after testing
          accountMeta = { id: "45354535", name: "Jp Morgan Chase", type: "personal", subtype: null, mask: "XXXX1534" };
        } else {
          accountMeta = event.metadata.account;
        }
        //TODO implement save payment checkbox
        await saveCustomerPayment({ customerId: customer.id, account: accountMeta }).toPromise().then(response => {
          this.spinner.spin$.next(false);
          this.verifiedPayment.emit({ customerId: customer.id, account: accountMeta });
          this.snackBar.open("Your Account was linked successfully", "success", {
            duration: 5000
          });
        }).catch(error => {
          this.spinner.spin$.next(false);
          this.snackBar.open("Ooops an error occurred. Try again!", "error", {
            duration: 5000
          });
        });
      }).catch(error => {
        this.spinner.spin$.next(false);
        this.snackBar.open("Ooops an error occurred. Try again!", "error", {
          duration: 5000
        });
      });
    }).catch(error => {
      this.spinner.spin$.next(false);
      this.snackBar.open("Ooops an error occurred. Try again!", "error", {
        duration: 5000
      });
    });
  }
}
