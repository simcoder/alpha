import { AppService } from './../../services/app.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as residentActions from '../actions/resident.action';
import { exhaustMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ResidentEffects {

    constructor(private actions$: Actions, private app: AppService) { }

    getResident$ = createEffect(() =>
        this.actions$.pipe(
            ofType(residentActions.RESIDENT_REQUEST),
            exhaustMap((action: residentActions.ResidentRequest) =>
                this.app.getResidentById(action.residentId).pipe(map(resident =>
                    new residentActions.ResidentSuccess({resident:resident, user: action.user}),
                    catchError(error => of(new residentActions.ResidentFailure(error))))))));

    residentActivationRequest$ = createEffect(() =>
                    this.actions$.pipe(
                        ofType(residentActions.RESIDENT_ACTIVATION_REQUEST),
                        exhaustMap((action: residentActions.ResidentActivationRequest) =>
                            this.app.addPendingActivationRecord(action.residentPayload).pipe(map(() =>
                                new residentActions.ResidentActivationSuccess(),
                                catchError(error => of(new residentActions.ResidentFailure(error))))))));
                    

}