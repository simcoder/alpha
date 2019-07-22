import * as fromApp from '../actions/app.action';
import { Menu } from '../../app.component.interfaces';
import { Property } from '../../models/property.interface';

export interface AppState {
    loadingMenu: boolean;
    menuLoaded: boolean;
    menu: Menu[];
    properties: Property[];
    loadingProperties:boolean;
    propertiesLoaded:boolean;
}

export const initialState: AppState = {
    menu: [],
    loadingMenu: false,
    menuLoaded: false,
    properties: [],
    loadingProperties: false,
    propertiesLoaded: false
  };

  export function reducer (state = initialState, action: any) : AppState {
    switch(action.type){
        case fromApp.APP_MENU_REQUEST : {
            return {
                ...state,
                loadingMenu : true,
                menuLoaded: false
            }
        }
        case fromApp.APP_MENU_SUCCESS : {
            return {
                ...state,
                loadingMenu : false,
                menuLoaded: true,
                menu:action.menu
            }
        }
        case fromApp.APP_MENU_ERROR : {
            return {
                ...state,
                loadingMenu : false,
                menuLoaded: false
            }
        }
        case fromApp.APP_PROPERTIES_REQUEST : {
            return {
                ...state,
                loadingProperties: true,
                propertiesLoaded: false
            }
        }
        case fromApp.APP_PROPERTIES_SUCCESS : {
            return {
                ...state,
                loadingProperties: false,
                propertiesLoaded: true,
                properties: action.properties
                
            }
        }
        case fromApp.APP_PROPERTIES_ERROR : {
            return {
                ...state,
                loadingProperties: false,
                propertiesLoaded: false,
                properties: []
                
            }
        }
    }
    return state
}
