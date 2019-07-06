import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class PaymentService {

  userId: string;
  userEmail: string;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((auth) => {
      if (auth) {
        this.userId = auth.uid;
        this.userEmail = auth.email;
      }
    });
  }


   processPayment(token: any, amount: number) {
     const payment = { token, amount }
     return this.db.list(`/payments/${this.userId}`).push(payment)
   }

}
