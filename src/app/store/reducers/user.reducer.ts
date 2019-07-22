import { USER_UPDATE_FAILURE } from './../actions/user.action';
import * as fromUser from '../actions/user.action';
import { PMAUser } from '../../models/user.interace';

export interface UserState {
    loading: boolean;
    loaded: boolean;
    updatedUser:boolean;
    updatingUser:boolean;
    error:string;
    user: PMAUser;
}

export const initialState: UserState = {
    user: null,
    loading: false,
    loaded: false,
    updatingUser: false,
    updatedUser: false,
    error:  null
  };

  export function reducer (state = initialState, action: any) : UserState {
    switch(action.type){
        case fromUser.USER_REQUEST : {
            return {
                ...state,
                loading : true,
                loaded: false,
                user: null,
                error:null
            }
        }
        case fromUser.USER_SUCCESS : {
            return {
                ...state,
                loading : false,
                loaded: true,
                user:action.user,
                error:null
            }
        }
        case fromUser.USER_FAILURE : {
            return {
                ...state,
                loading : false,
                loaded: false,
                user: null,
                error: "Error getting user"
            }
        }
        case fromUser.USER_UPDATE_REQUEST : {
            return {
                ...state,
                updatingUser: true,
                updatedUser: false,
                error:null
            }
        }
        case fromUser.USER_UPDATE_SUCCESS : {
            return {
                ...state,
                updatingUser: false,
                updatedUser: true,
                user: action.user,
                error:null
            }
        }
        case fromUser.USER_UPDATE_FAILURE : {
            return {
                ...state,
                updatingUser: false,
                updatedUser: false,
                error: "Error updating user"
            }
        }
    }
    return state
}
