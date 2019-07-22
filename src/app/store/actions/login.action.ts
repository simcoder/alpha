import { Action } from '@ngrx/store';

export const USER_LOGIN_SUCCESS = '[Login Component] LoginSuccess';
export const USER_LOGIN_ERROR = '[Login Component] LoginError';
export const USER_LOGOUT_REQUEST = '[Login Component] LogoutRequest';
export const USER_LOGOUT_ERROR = '[Login Component] LogoutError';
export const USER_LOGOUT_SUCCESS = '[Login Component] LogoutSuccess';


export class UserLoginSuccess implements Action {
    readonly type: string = USER_LOGIN_SUCCESS;
}
export class UserLoginFailure implements Action {
    readonly type: string = USER_LOGIN_ERROR;
    constructor(public error: any){}
}

export class UserLogoutRequest implements Action {
    readonly type: string = USER_LOGOUT_REQUEST;
}
export class UserLogoutSuccess implements Action {
    readonly type: string = USER_LOGOUT_SUCCESS;
}

export class UserLogoutFailure implements Action {
    readonly type: string = USER_LOGOUT_ERROR;
    constructor(public error: any){}
}

export type UserLoginActions = UserLoginSuccess | UserLoginFailure