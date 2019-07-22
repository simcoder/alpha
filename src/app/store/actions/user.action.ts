import { Action } from '@ngrx/store';
import { PMAUser } from '../../models/user.interace';

export const USER_REQUEST = '[Shell Component] UserRoleRequest';
export const USER_SUCCESS = '[Shell Component] UserRoleSuccess';
export const USER_FAILURE = '[Shell Component] UserRoleFailure';

export const USER_UPDATE_REQUEST = '[Registration Component] UserRegistrationRequest';
export const USER_UPDATE_SUCCESS = '[Registration Component] UserRegistrationSuccess';
export const USER_UPDATE_FAILURE = '[Registration Component] UserRegistrationFailure';

export class UserRequest implements Action {
    readonly type: string = USER_REQUEST; 
    constructor(public userUUID: string){}
}
export class UserSuccess implements Action {
    readonly type: string = USER_SUCCESS; 
    constructor(public user: PMAUser){}
}
export class UserFailure implements Action {
    readonly type: string = USER_FAILURE;
    constructor(public error: any){} 
}

export class UserUpdateRequest implements Action {
    readonly type: string = USER_UPDATE_REQUEST; 
    constructor(public userUUID: string, public user: PMAUser){}
}
export class UserUpdateSuccess implements Action {
    readonly type: string = USER_UPDATE_SUCCESS; 
    constructor(public user: PMAUser){}
}
export class UserUpdateFailure implements Action {
    readonly type: string = USER_UPDATE_FAILURE;
    constructor(public error: any){} 
}

export type UserActions = UserRequest | UserSuccess | UserFailure | UserUpdateRequest | UserUpdateSuccess | UserUpdateFailure