import { Component, OnInit } from '@angular/core';
import { AuthProvider } from 'ngx-auth-firebaseui';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  providers = AuthProvider;
  defaultTheme: string = "my-theme";
  constructor(private router: Router) { }
  onSuccess(user){
    this.router.navigate(['home']);
  }
  onError(){
    debugger;
  }
  ngOnInit() {
  }

}
