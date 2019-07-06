import { AppModule } from './../../projects/maintenance/src/app/app.module';
import { NoModuleComponent } from './components/no-module/no-module.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentAppModule } from 'projects/payments/src/app/app.module';
import { DashboardModule } from 'projects/dashboard/src/app/dashboard.module';
import { LoginComponent } from './components/login/login.component';
import { ShellComponent } from './pages/shell/shell.component';
import {LoggedInGuard} from 'ngx-auth-firebaseui';
import { environment } from '../environments/environment';

const routesWithoutAuth: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: ShellComponent,
    children: [
      {
        path: 'payments',
        loadChildren: "../../projects/payments/src/app/app.module#PaymentAppModule",
        outlet: 'details'
      },
      {
        path: 'maintenance',
        loadChildren: "../../projects/maintenance/src/app/app.module#AppModule",
        outlet: 'details'
      },
      {
        path: 'dashboard',
        loadChildren: "../../projects/dashboard/src/app/dashboard.module#DashboardModule",
        outlet: 'details'
      }
    ]
  },
  { path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: '**', 
    component: NoModuleComponent
  }
];
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: ShellComponent,
    canActivate: [LoggedInGuard],
    children: [
      {
        path: 'payments',
        loadChildren: "../../projects/payments/src/app/app.module#PaymentAppModule",
        outlet: 'details',
        canActivate: [LoggedInGuard]
      },
      {
        path: 'maintenance',
        loadChildren: "../../projects/maintenance/src/app/app.module#AppModule",
        outlet: 'details',
        canActivate: [LoggedInGuard]
      },
      {
        path: 'dashboard',
        loadChildren: "../../projects/dashboard/src/app/dashboard.module#DashboardModule",
        outlet: 'details',
        canActivate: [LoggedInGuard]
      }
    ]
  },
  { path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: '**', 
    component: NoModuleComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(environment.production ? routes : routes, {enableTracing:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
