import { Action } from '@ngrx/store';
import { Menu } from '../../app.component.interfaces';
import { Property } from '../../models/property.interface';
import { Role } from '../../enums/role.enum';

export const APP_MENU_REQUEST = '[Shell Component] AppMenuRequest';
export const APP_MENU_SUCCESS = '[Shell Component] AppMenuSuccess';
export const APP_MENU_ERROR = '[Shell Component] AppMenuError';
export const APP_PROPERTIES_ERROR = '[Registration Component] AppPropertiesError';
export const APP_PROPERTIES_REQUEST = '[Registration Component] AppPropertiesRequest';
export const APP_PROPERTIES_SUCCESS = '[Registration Component] AppPropertiesSuccess';


export class AppMenuRequest implements Action {
    readonly type: string = APP_MENU_REQUEST;
    constructor(public role: Role) { }
}
export class AppMenuSuccess implements Action {
    readonly type: string = APP_MENU_SUCCESS;
    constructor(public menu: Menu[]) { }
}
export class AppMenuFailure implements Action {
    readonly type: string = APP_MENU_ERROR;
    constructor(public error: any) { }
}
export class AppPropertiesFailure implements Action {
    readonly type: string = APP_PROPERTIES_ERROR;
    constructor(public error: any) { }
}
export class AppPropertiesSuccess implements Action {
    readonly type: string = APP_PROPERTIES_SUCCESS;
    constructor(public properties: Property[]) { }
}
export class AppPropertiesRequest implements Action {
    readonly type: string = APP_PROPERTIES_REQUEST;
}

export type AppActions = AppMenuRequest | AppMenuSuccess | AppMenuFailure | AppPropertiesFailure | AppPropertiesSuccess | AppPropertiesRequest