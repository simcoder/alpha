import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as loginActions from '../actions/login.action';
import {  exhaustMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class LoginEffects {

    constructor(private actions$: Actions, private auth: AuthService) {}

    signoutUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loginActions.USER_LOGOUT_REQUEST),
            exhaustMap(() =>
                this.auth.logout().pipe(map(() => 
                    new loginActions.UserLogoutSuccess(), 
                    catchError(error => of(new loginActions.UserLogoutFailure(error)))))
                )
            )
    );
}