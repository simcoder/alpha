import * as fromLogin from '../actions/login.action';
import { PMAUser } from '../../models/user.interace';

export interface LoginState {
    signedIn: boolean
    signedOut: boolean
}

export const initialState: LoginState = {
    signedIn: false,
    signedOut: true,
  };

  export function reducer (state = initialState, action: fromLogin.UserLoginActions) : LoginState {
    switch(action.type){
        case fromLogin.USER_LOGIN_SUCCESS : {
            return {
                ...state,
                signedIn: true,
                signedOut: false
            }
        }
        case fromLogin.USER_LOGIN_ERROR : {
            return {
                ...state,
                signedIn: false,
                signedOut: true
            }
        }
        case fromLogin.USER_LOGOUT_SUCCESS : {
            return {
                ...state,
                signedIn: false,
                signedOut: true
            }
        }
    }
    return state
}
