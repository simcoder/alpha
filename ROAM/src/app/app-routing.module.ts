import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardAppModule } from 'projects/dashboard/src/app/app.module';
import { PaymentAppModule } from 'projects/payments/src/app/app.module';

const routes: Routes = [
  {
    path: 'payments',
    loadChildren: ()=> PaymentAppModule
  },
  {
    path: 'dashboard',
    loadChildren: ()=> DashboardAppModule
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
