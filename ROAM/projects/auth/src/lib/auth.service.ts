import { environment } from './../../../../src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _idToken: string;
  private _accessToken: string;
  private _expiresAt: number;

  auth0 = new auth0.WebAuth({
    clientID: environment.auth.clientID,
    domain: environment.auth.domain,
    responseType: 'token id_token',
    redirectUri: environment.auth.callbackURL
  });

  constructor(public router: Router) {
    this._idToken = '';
    this._accessToken = '';
    this._expiresAt = 0;
  }

  get accessToken(): string {
    return this._accessToken;
  }

  get idToken(): string {
    return this._idToken;
  }

  public login(): void {
    this.auth0.authorize();
  }

  public userInfo(): void {
    this.auth0.authorize();
  }

  userProfile: any;
  userProfile$ : BehaviorSubject<any> = new BehaviorSubject<any>(null);


  public getProfile(cb): void {
    let token = this._accessToken
    if (!token) {
      if (!localStorage.getItem("token")) {
        throw new Error('Access Token must exist to fetch profile');
      } else {
        token = localStorage.getItem("token")
      }
    }

    const self = this;
    this.auth0.client.userInfo(token, (err, profile) => {
      if (profile) {
        self.userProfile = profile;
        self.userProfile$.next(profile);
      }
      if(cb){
        cb(err, profile);
      }
    });
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.localLogin(authResult);
        this.getProfile(null);
        this.router.navigate(['dashboard']);
      } else if (err) {
        this.router.navigate(['']);
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }



  private localLogin(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = (authResult.expiresIn * 1000) + Date.now();
    this._accessToken = authResult.accessToken;
    this._idToken = authResult.idToken;
    this._expiresAt = expiresAt;
    localStorage.setItem("token", authResult.accessToken);
    localStorage.setItem("expires", authResult.expiresIn);
  }

  public renewTokens(): void {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.localLogin(authResult);
      } else if (err) {
        alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
        this.logout();
      }
    });
  }

  public logout(): void {
    // Remove tokens and expiry time
    this._accessToken = '';
    this._idToken = '';
    this._expiresAt = 0;
    localStorage.clear();
    this.auth0.logout({
      returnTo: window.location.origin
    });
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    if (this._accessToken && this._expiresAt) {
      return this._accessToken && Date.now() < this._expiresAt;
    }
    const token = localStorage.getItem("token");
    const expiresAtNumber = parseInt(localStorage.getItem("expires"), 10);
    const expiresAt = (expiresAtNumber * 1000) + Date.now();
    return token && Date.now() < expiresAt;
  }

}

