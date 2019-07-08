import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireFunctions } from '@angular/fire/functions';

@Injectable()
export class PaymentService {

  userId: string;
  userEmail: string;

  constructor(private functions: AngularFireFunctions, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((auth) => {
      if (auth) {
        this.userId = auth.uid;
        this.userEmail = auth.email;
      }
    });
  }
}
