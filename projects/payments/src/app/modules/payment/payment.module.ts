import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AngularFireFunctions } from '@angular/fire/functions';
import { PaymentService } from './services/payment.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { CreditCardPaymentComponent } from './components/credit-card-payment/credit-card-payment.component';
import { AchPaymentComponent } from './components/ach-payment/ach-payment.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CreditCardPaymentComponent, AchPaymentComponent, CheckoutComponent],
  exports: [CreditCardPaymentComponent, AchPaymentComponent, CheckoutComponent],
  providers: [AngularFireFunctions, PaymentService, AngularFireDatabase]
})
export class PaymentModule { }
