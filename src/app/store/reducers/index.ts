import * as fromLogin from './login.reducer';
import * as fromUser from './user.reducer';
import * as fromApp from './app.reducer';
import * as fromResident from './resident.reducer';
import { ActionReducerMap, createSelector } from '@ngrx/store'

export interface AppState {
  loginState: fromLogin.LoginState,
  userState: fromUser.UserState,
  appState: fromApp.AppState,
  residentState:  fromResident.ResidentState
}

 export const reducers: ActionReducerMap<AppState> = {
  loginState: fromLogin.reducer,
   userState: fromUser.reducer,
   appState: fromApp.reducer,
   residentState: fromResident.reducer
 };
 
export const selectApp = (state: AppState) => state;

export const getUser = createSelector(
  selectApp,
  (state:AppState) => state.userState.user
);

export const userLoading = createSelector(
  selectApp,
  (state:AppState) => state.userState.loading
);
export const userLoaded = createSelector(
  selectApp,
  (state:AppState) => state.userState.loaded
);
export const userSignoutState = createSelector(
  selectApp,
  (state:AppState) => state.loginState.signedOut
);
export const appMenu = createSelector(
  selectApp,
  (state:AppState) => state.appState.menu
);
export const appProperties = createSelector(
  selectApp,
  (state:AppState) => state.appState.properties
);
export const getResidentAssociatedUser = createSelector(
  selectApp,
  (state:AppState) => state.residentState.residentAssociatedUser
);
export const loadedResident = createSelector(
  selectApp,
  (state:AppState) => state.residentState.loaded
);
export const linkedUserToResident = createSelector(
  selectApp,
  (state:AppState) => state.userState.updatedUser
);
//TODO make this generic error handling
export const registrationError = createSelector(
  selectApp,
  (state:AppState) => state.userState.error
);

export const residentActivationRequestSuccess = createSelector(
  selectApp,
  (state:AppState) => state.residentState.residentActivationRequestCompleted
);





