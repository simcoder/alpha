import { PMAUser } from './../../models/user.interace';
import { Action } from '@ngrx/store';

export const RESIDENT_REQUEST = '[Registration Component] ResidentRequest';
export const RESIDENT_SUCCESS = '[Registration Component] ResidentSuccess';
export const RESIDENT_FAILURE = '[Registration Component] ResidentError';

export const RESIDENT_ACTIVATION_REQUEST = '[Registration Component] ResidentActivationRequest';
export const RESIDENT_ACTIVATION_SUCCESS = '[Registration Component] ResidentActivationSuccess';
export const RESIDENT_ACTIVATION_FAILURE = '[Registration Component] ResidentActivationError';


export class ResidentRequest implements Action {
    readonly type: string = RESIDENT_REQUEST; 
    constructor(public residentId: string, public user:PMAUser){}
}
export class ResidentSuccess implements Action {
    readonly type: string = RESIDENT_SUCCESS; 
    constructor(public residentAssociatedUser: any){}
}
export class ResidentFailure implements Action {
    readonly type: string = RESIDENT_FAILURE;
    constructor(public error: any){} 
}

export class ResidentActivationRequest implements Action {
    readonly type: string = RESIDENT_ACTIVATION_REQUEST; 
    constructor(public residentPayload: any){}
}
export class ResidentActivationSuccess implements Action {
    readonly type: string = RESIDENT_ACTIVATION_SUCCESS; 
}
export class ResidentActivationFailure implements Action {
    readonly type: string = RESIDENT_ACTIVATION_FAILURE;
    constructor(public error: any){} 
}
export type ResidentActions = ResidentRequest | 
                              ResidentSuccess | 
                              ResidentFailure | 
                              ResidentActivationRequest | 
                              ResidentActivationSuccess | 
                              ResidentActivationFailure 