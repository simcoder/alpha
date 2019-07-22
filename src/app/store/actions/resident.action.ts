import { Action } from '@ngrx/store';

export const RESIDENT_REQUEST = '[Registration Component] ResidentRequest';
export const RESIDENT_SUCCESS = '[Registration Component] ResidentSuccess';
export const RESIDENT_FAILURE = '[Registration Component] ResidentError';

export class ResidentRequest implements Action {
    readonly type: string = RESIDENT_REQUEST; 
    constructor(public residentId: string){}
}
export class ResidentSuccess implements Action {
    readonly type: string = RESIDENT_SUCCESS; 
    constructor(public resident: any){}
}
export class ResidentFailure implements Action {
    readonly type: string = RESIDENT_FAILURE;
    constructor(public error: any){} 
}

export type ResidentActions = ResidentRequest | ResidentSuccess | ResidentFailure