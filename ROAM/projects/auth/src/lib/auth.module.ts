import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [],
  imports: [
  ],
  exports: [],
  providers: [AuthGuard, AuthService]
})
export class AuthModule { }
