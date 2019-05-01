import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardAppModule } from 'projects/dashboard/src/app/app.module';
import { PaymentAppModule } from 'projects/payments/src/app/app.module';
import { AuthGuard } from './services/auth-guard.service';
import { CallbackComponent } from './components/callback/callback.component';

const routes: Routes = [
  {
    path: 'payments',
    loadChildren: ()=> PaymentAppModule,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    loadChildren: ()=> DashboardAppModule,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'callback',
    component: CallbackComponent
  },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
