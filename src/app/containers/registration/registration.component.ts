import { UserUpdateRequest } from "./../../store/actions/user.action";
import {  Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { Role } from "../../enums/role.enum";
import { OverlaySpinnerService } from "libs/components/overlay-spinner/src/public-api";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromStore from "../../store/";
import { AppPropertiesRequest, ResidentRequest } from "../../store/";
import { Property } from "../../models/property.interface";
import { PMAUser } from "../../models/user.interace";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"]
})
export class RegistrationComponent implements OnInit {
  properties$: Observable<Property[]>;
  user$: Observable<PMAUser>;
  constructor(
    private store: Store<fromStore.AppState>,
    private router: Router,
    private spinner: OverlaySpinnerService
  ) {}

  ngOnInit() {
    this.store.dispatch(new AppPropertiesRequest());
    this.properties$ = this.store.select(fromStore.appProperties);
    this.user$ = this.store.select(fromStore.getUser);

    this.store.select(fromStore.linkedUserToResident).subscribe(linkedUser => {
      if (linkedUser) {
        this.spinner.spin$.next(false);
        this.router.navigate([
          { preserveFragment: true },
          {
            outlets: {
              details: "dashboard"
            }
          }
        ]);
      }
    });
    this.store.select(fromStore.registrationError).subscribe(error=>{
      if(error){
        this.spinner.spin$.next(false);
      }
    })
  }

  onSubmitForm(event: any) {

    this.store.select(fromStore.getResident).subscribe(resp => {
      if (resp) {
        const updatedUser: PMAUser = {
          ...event.user,
          residentId: resp.residentId,
          role: Role.RESIDENT
        };
        this.store.dispatch(
          new UserUpdateRequest(updatedUser.uid, updatedUser)
        );
      }
    });

    if (event.form.valid) {
      if (event.form.value.residentId) {
        this.spinner.spin$.next(true);
        this.store.dispatch(new ResidentRequest(event.form.value.residentId));
      } else {
        const pendingActivationPayload = Object.assign(event.form.value, event.user.uid);
        //dispatch pending activation
        //this.store.dispatch()
        // this.router.navigate(
        //             [
        //               { preserveFragment: true },
        //               {
        //                 outlets: {
        //                   details: 'registration-pending'
        //                 }
        //               }
        //             ]);
      }
    }
  }
}
