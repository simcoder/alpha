import { Component, OnInit, Input, HostListener } from '@angular/core';

import { environment } from '../../../../../environments/environment';
import { PaymentService } from '../../services/payment.service';

 declare var StripeCheckout//: StripeCheckoutStatic;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  
  handler//: StripeCheckoutHandler;
  confirmation: any;
  user:any
  @Input() amount = 0;
  constructor(private paymentService: PaymentService) { }

  ngOnInit() {
    this.handler = StripeCheckout.configure({
      key: environment.stripeKey,
      // image: '/your/awesome/logo.jpg',
      locale: 'auto',
      token: token => {
        this.paymentService.processPayment(token, this.amount)
      }
    });
  }

  async checkout(e) {
    this.handler.open({
      name: 'Store',
      description: 'Rent',
      amount: this.amount,
      email: this.paymentService.userEmail
    });
  }
   
  @HostListener('window:popstate')
  onPopstate() {
    this.handler.close();
  }
}
