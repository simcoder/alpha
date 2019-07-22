import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Role } from "../enums/role.enum";
import { catchError, map } from "rxjs/operators";
import { Observable, from } from "rxjs";
import { transformSideMenu, transformProperties } from "../helpers/transformers";
import { PMAUser } from '../models/user.interace';

@Injectable({
  providedIn: "root"
})
export class AppService {
  constructor(private db: AngularFirestore) { }

  getUserById(userUUID: string) {
    return this.db
      .collection("users")
      .doc(userUUID)
      .get()
      .pipe(
        map(resp => {
          return resp.data();
        }),
        catchError((error: any) => Observable.throw(error.json()))
      );
  }

  getAppMenu(role: Role) {
    return this.db
      .collection("menus")
      .get()
      .pipe(
        map(snapshot => {
          return transformSideMenu(snapshot, role);
        }),
        catchError((error: any) => Observable.throw(error.json()))
      );
  }

  getAppProperties() {
    return this.db
      .collection("properties")
      .get()
      .pipe(
        map(snapshot => {
          return transformProperties(snapshot);
        }),
        catchError((error: any) => Observable.throw(error.json()))
      );
  }

  getResidentById(residentId: string) {
    return this.db
      .collection("residents")
      .doc(residentId)
      .get()
      .pipe(
        map(resp => {
          return { residentId: resp.id, resident: resp.data() };
        }),
        catchError((error: any) => Observable.throw(error.json()))
      );
  }

  updateResident(residentId: string, updatedResident:any) {
    return from(this.db
      .collection("residents")
      .doc(residentId)
      .set(updatedResident)).pipe(
        catchError((error: any) => Observable.throw(error.json()))
      );
  }

  updateUser(userUUID: string, updatedUser: PMAUser) {
    return from(this.db
      .collection("users")
      .doc(userUUID)
      .set(updatedUser)).pipe(
        catchError((error: any) => Observable.throw(error.json()))
      );
  }

  addPendingActivationRecord(pendinActivation: any) {
    return from(this.db.collection("pending-activations").add(pendinActivation)).pipe(
      catchError((error: any) => Observable.throw(error.json()))
    );
  }
}
