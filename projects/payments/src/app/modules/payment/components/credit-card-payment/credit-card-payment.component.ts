import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-credit-card-payment',
  templateUrl: './credit-card-payment.component.html',
  styleUrls: ['./credit-card-payment.component.scss']
})
export class CreditCardPaymentComponent implements OnInit {

  @Input() amount: number = 500;
  @Input() description: string;
  @ViewChild('cardElement', null) cardElement: ElementRef;
  constructor(private paymentService: PaymentService) { }

  stripe; // : stripe.Stripe;
  card;
  cardErrors;

  loading = false;
  confirmation;


  ngOnInit() {
    this.stripe = Stripe(environment.stripeKey);
    const elements = this.stripe.elements();

    this.card = elements.create('card');
    this.card.mount(this.cardElement.nativeElement);

    this.card.addEventListener('change', ({ error }) => {
        this.cardErrors = error && error.message;
    });
  }

  async handleForm(e) {
    e.preventDefault();
    debugger;
    //const { source, error } = await this.stripe.createSource(this.card);
    this.stripe.createToken(this.card).then(result=>{
      debugger;
      if (result.error) {
        
      } else {
        // Send the token to your server.
        this.paymentService.processPayment(result.token, this.amount);
      }
    })
  }

}
