import * as fromResident from '../actions/resident.action';

export interface ResidentState {
    loading: boolean;
    loaded: boolean;
    residentAssociatedUser: any;
    residentActivationRequestInitiated:boolean,
    residentActivationRequestCompleted:boolean
}

export const initialState: ResidentState = {
    residentAssociatedUser: null,
    loading: false,
    loaded: false,
    residentActivationRequestInitiated: false,
    residentActivationRequestCompleted: false
  };

  export function reducer (state = initialState, action: any) : ResidentState {
    switch(action.type){
        case fromResident.RESIDENT_REQUEST : {
            return {
                ...state,
                loading : true,
                loaded: false,
                residentAssociatedUser: null
            }
        }
        case fromResident.RESIDENT_SUCCESS : {
            return {
                ...state,
                loading : false,
                loaded: true,
                residentAssociatedUser:action.residentAssociatedUser
            }
        }
        case fromResident.RESIDENT_FAILURE : {
            return {
                ...state,
                loading : false,
                loaded: false
            }
        }
        case fromResident.RESIDENT_ACTIVATION_REQUEST : {
            return {
                ...state,
                residentActivationRequestInitiated: true,
                residentActivationRequestCompleted: false
            }
        }
        case fromResident.RESIDENT_ACTIVATION_SUCCESS : {
            return {
                ...state,
                residentActivationRequestInitiated: false,
                residentActivationRequestCompleted: true
            }
        }
        case fromResident.RESIDENT_ACTIVATION_FAILURE : {
            return {
                ...state,
                residentActivationRequestInitiated: false,
                residentActivationRequestCompleted: false
            }
        }
    }
    return state
}
