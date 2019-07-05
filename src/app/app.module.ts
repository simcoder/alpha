import { NoModuleComponent } from './components/no-module/no-module.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatIconModule, MatListModule, MatDividerModule, MatCardModule, MatTooltipModule } from '@angular/material';
import { MatBadgeModule } from '@angular/material/badge';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { LoginComponent } from './components/login/login.component';
import { ShellComponent } from './pages/shell/shell.component';
import {MatPagesModule} from '@angular-material-extensions/pages';
import { AvatarComponent } from './components/avatar/avatar.component';

export function firebaseAppNameFactory() {
  return `property-management-advisor`;
}

@NgModule({
  declarations: [
    AppComponent,
    NoModuleComponent,
    LoginComponent,
    ShellComponent,
    AvatarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    AppRoutingModule,
    MatSidenavModule,
    MatTooltipModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatMenuModule,
    FontAwesomeModule,
    MatPagesModule.forRoot(),
    NgxAuthFirebaseUIModule.forRoot(environment.firebase),
    MatIconModule,
    MatBadgeModule,
    MatListModule,
    MatDividerModule,
    MatCardModule,
    BrowserModule.withServerTransition({appId: 'property-management-advisor'}),
    AngularFireModule.initializeApp(environment.firebase),
    NgxAuthFirebaseUIModule.forRoot(environment.firebase, firebaseAppNameFactory,
      {
        
        enableFirestoreSync: true,
        authGuardFallbackURL: '/login',
        toastMessageOnAuthSuccess: false,
        toastMessageOnAuthError: true
      }),
  ],
  entryComponents:[],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
