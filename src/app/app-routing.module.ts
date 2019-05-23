import { AppModule } from './../../projects/maintenance/src/app/app.module';
import { NoModuleComponent } from './components/no-module/no-module.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CallbackComponent } from './components/callback/callback.component';
import { PaymentAppModule } from 'projects/payments/src/app/app.module';
import { DashboardModule } from 'projects/dashboard/src/app/dashboard.module';

const routes: Routes = [
  {
    path: 'payments',
    loadChildren: "../../projects/payments/src/app/app.module#PaymentAppModule"
  },
  {
    path: 'dashboard',
    loadChildren: "../../projects/dashboard/src/app/dashboard.module#DashboardModule"
  },
  {
    path: 'maintenance',
    loadChildren: "../../projects/maintenance/src/app/app.module#AppModule"
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'callback',
    component: CallbackComponent
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  { path: '**', 
    component: NoModuleComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing:false})],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
