import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireFunctions } from '@angular/fire/functions';
import { PaymentService } from './services/payment.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { CreditCardPaymentComponent } from './components/credit-card-payment/credit-card-payment.component';
import { AchPaymentComponent } from './components/ach-payment/ach-payment.component';
import { NgxPlaidLinkModule } from "ngx-plaid-link";
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule, MatIconModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { SavedPaymentComponent } from './components/saved-payment/saved-payment.component';
import { LinkBankAccountComponent } from './components/link-bank-account/link-bank-account.component';
import { ChargeCustomerComponent } from './components/charge-customer/charge-customer.component';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  imports: [
    CommonModule,
    NgxPlaidLinkModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatCheckboxModule
  ],
  declarations: [ChargeCustomerComponent, LinkBankAccountComponent, CreditCardPaymentComponent, AchPaymentComponent, SavedPaymentComponent],
  exports: [ChargeCustomerComponent, LinkBankAccountComponent, CreditCardPaymentComponent, AchPaymentComponent, SavedPaymentComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AngularFireFunctions, PaymentService, AngularFireDatabase]
})
export class PaymentModule { }
