import * as fromResident from '../actions/resident.action';

export interface ResidentState {
    loading: boolean;
    loaded: boolean;
    resident: any;
}

export const initialState: ResidentState = {
    resident: null,
    loading: false,
    loaded: false
  };

  export function reducer (state = initialState, action: any) : ResidentState {
    switch(action.type){
        case fromResident.RESIDENT_REQUEST : {
            return {
                ...state,
                loading : true,
                loaded: false,
                resident: null
            }
        }
        case fromResident.RESIDENT_SUCCESS : {
            return {
                ...state,
                loading : false,
                loaded: true,
                resident:action.resident
            }
        }
        case fromResident.RESIDENT_FAILURE : {
            return {
                ...state,
                loading : false,
                loaded: false,
                resident: null
            }
        }
    }
    return state
}
