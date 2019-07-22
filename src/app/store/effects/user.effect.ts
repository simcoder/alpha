import { AppService } from './../../services/app.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as userActions from '../actions/user.action';
import {  exhaustMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class UserEffects {

    constructor(private actions$: Actions, private app: AppService) {}

    getUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(userActions.USER_REQUEST),
            exhaustMap((action:userActions.UserRequest) =>
                this.app.getUserById(action.userUUID).pipe(map(resp => 
                    new userActions.UserSuccess(resp), 
                    catchError(error => of(new userActions.UserFailure(error)))))
                )
            )
    );

    updateUser$ = createEffect(() =>
    this.actions$.pipe(
        ofType(userActions.USER_UPDATE_REQUEST),
        exhaustMap((action:userActions.UserUpdateRequest) =>
            this.app.updateUser(action.userUUID, action.user).pipe(map(() => 
                new userActions.UserUpdateSuccess(action.user), 
                catchError(error => of(new userActions.UserUpdateFailure(error)))))
            )
        )
);
}