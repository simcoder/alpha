import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { loggedInUser$ } from '../app.default';
firebase.initializeApp(environment.firebase);
@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  ua = navigator.userAgent.toLowerCase();
  isSafari = false;
  messaging;
  currentMessage = new BehaviorSubject(null)

  constructor(private db: AngularFirestore) {
    this.isSafari = (this.isSafari || ((this.ua.indexOf('safari') != -1) && (!(this.ua.indexOf('chrome') != -1) && (this.ua.indexOf('version/') != -1))));
    if (!this.isSafari) {
      this.messaging = firebase.messaging();
    } else {
      alert("push notification are not supported in safari");
    }
  }


  updateToken(token) {
    const user = loggedInUser$.getValue();
    if (!user) return;
    const data = { token }
    this.db.collection('fcmTokens').doc(user.uid).set(data)
  }

  getPermission() {
    if (this.messaging) {
      this.messaging.requestPermission()
        .then(() => {
          console.log('Notification permission granted.');
          return this.messaging.getToken()
        })
        .then(token => {
          console.log(token)
          this.updateToken(token)
        })
        .catch((err) => {
          console.log('Unable to get permission to notify.', err);
        });
    }
  }

  receiveMessage() {

    if (this.messaging) {
      this.messaging.onMessage((payload) => {
        console.log("Message received. ", payload);
        this.currentMessage.next(payload)
      });
    }
  }
  
  getMessages() {
    if (this.messaging) {
      this.messaging.onMessage((payload) => {
        console.log("Message received. ", payload);
        this.currentMessage.next(payload)
      });
    }
  }
}
