import { AppService } from './../../services/app.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as appActions from '../actions/app.action';
import { exhaustMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AppEffects {

    constructor(private actions$: Actions, private app: AppService) { }

    getUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(appActions.APP_MENU_REQUEST),
            exhaustMap((action: appActions.AppMenuRequest) =>
                this.app.getAppMenu(action.role).pipe(map(menu =>
                    new appActions.AppMenuSuccess(menu),
                    catchError(error => of(new appActions.AppMenuFailure(error))))))));

    getProperties$ = createEffect(() =>
        this.actions$.pipe(
            ofType(appActions.APP_PROPERTIES_REQUEST),
            exhaustMap(() =>
                this.app.getAppProperties().pipe(map(properties =>
                    new appActions.AppPropertiesSuccess(properties),
                    catchError(error => of(new appActions.AppPropertiesFailure(error)))
                )))));
}