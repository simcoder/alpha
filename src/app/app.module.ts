import { effects } from './store/effects/index';
import { BehaviorSubject } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
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
import { MatIconModule, MatListModule, MatDividerModule, MatCardModule, MatTooltipModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatBadgeModule } from '@angular/material/badge';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { LoginComponent } from './components/login/login.component';
import { ShellComponent } from './pages/shell/shell.component';
import {MatPagesModule} from '@angular-material-extensions/pages';
import { AvatarComponent } from './components/avatar/avatar.component';
import { AngularFireFunctionsModule, FUNCTIONS_ORIGIN } from '@angular/fire/functions';
import { OverlaySpinnerModule } from 'libs/components/overlay-spinner/src/lib/overlay-spinner.module';
import { NotificationModule } from 'libs/components/notification/src/public-api';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationPendingComponent } from './components/registration-pending/registration-pending.component';
import { NotificationComponent } from './components/notification/notification.component';
import { StoreModule, Store } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, UserRequest } from './store'
import * as fromStore from "./store/";
import { UserLoginSuccess } from './store/actions/login.action';
import { RegistrationComponent } from './containers/registration/registration.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
export function firebaseAppNameFactory() {
  return `property-management-advisor`;
}

@NgModule({
  declarations: [
    AppComponent,
    NoModuleComponent,
    LoginComponent,
    ShellComponent,
    AvatarComponent,
    RegistrationComponent,
    RegistrationPendingComponent,
    NotificationComponent,
    RegistrationFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    OverlaySpinnerModule,
    BrowserAnimationsModule,
    MatButtonModule,
    AppRoutingModule,
    MatSidenavModule,
    MatTooltipModule,
    NotificationModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatMenuModule,
    FontAwesomeModule,
    MatPagesModule.forRoot(),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    MatIconModule,
    MatBadgeModule,
    MatListModule,
    MatDividerModule,
    MatCardModule,
    BrowserModule.withServerTransition({appId: 'property-management-advisor'}),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireFunctionsModule,
    NgxAuthFirebaseUIModule.forRoot(environment.firebase, firebaseAppNameFactory,
      {
        enableFirestoreSync: true,
        authGuardFallbackURL: '/login',
        toastMessageOnAuthSuccess: false,
        toastMessageOnAuthError: true
      }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers:[AngularFireDatabase, AngularFireAuth, AngularFirestore],
  entryComponents:[],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  //providers: [{ provide: FUNCTIONS_ORIGIN, useValue: 'http://localhost:5000' }],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private afAuth: AngularFireAuth, private store: Store<fromStore.AppState>){
    this.afAuth.authState.pipe().subscribe(async (user:any) => {
      if(user){
        this.store.dispatch(new UserRequest(user.uid));
        this.store.dispatch(new UserLoginSuccess());
      }
    })
  }
 }
