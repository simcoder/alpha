import { Component, OnInit, Input, HostListener } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireFunctions } from '@angular/fire/functions';
import { environment } from '../../../../../environments/environment';
import { PaymentService } from '../../services/payment.service';

 declare var StripeCheckout: StripeCheckoutStatic;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  
  handler: StripeCheckoutHandler;
  confirmation: any;
  user:any
  @Input() amount = 500;
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
    // this.handler = StripeCheckout.configure({
    //   key: environment.stripeKey,
    //   locale: 'auto',
    //   source: async (source)=>{
    //     // this.auth.user.subscribe(async (user: any) => {
    //     //   debugger;
    //     //   this.user = user;
          
    //     // });
    //     const fun = this.functions.httpsCallable('stripeCreateCharge');
    //     this.confirmation = await fun({source: source.id, uid: 'fdfdf', amount: this.amount }).toPromise()
    //   }
    // })
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
