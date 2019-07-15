import { AppService } from './../../services/app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, first } from 'rxjs/operators';
import { Role } from '../../enums/role.enum';
import { OverlaySpinnerService } from 'libs/components/overlay-spinner/src/public-api';
import { Router } from '@angular/router';
import { loggedInUser$, sideMenu$ } from '../../app.default';
import { transformSideMenu } from '../../helpers/transformers';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  properties$: Observable<any> = new BehaviorSubject<any>(null);
  registrationForm: FormGroup;
  loading: boolean;
  constructor(private db: AngularFirestore, private router: Router, private fb: FormBuilder, private spinner: OverlaySpinnerService, private app: AppService) { }

  ngOnInit() {
    //clear any previously loaded menus
    sideMenu$.next(null);
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      unit: ['', Validators.required],
      propertyId: ['', Validators.required],
      residentId: ['']
    });
    this.properties$ = this.db.collection("properties").get().pipe(first(), map(resp => {
      const result: any[] = []
      resp.docs.forEach(x => {
        result.push({ id: x.id, name: x.data().name });
      });
      return result;
    }));
  }

  async onRegister() {
    if (this.registrationForm.valid) {
      this.spinner.spin$.next(true);
      const loggedInuser = loggedInUser$.getValue();
      if (this.registrationForm.value.residentId) {
        this.db.collection("residents").get().pipe(first()).subscribe(residents => {
          residents.docs.forEach(async resident => {
            if (resident.id === this.registrationForm.value.residentId) {
              //update user's role
              await this.app.linkUserToResident(Role.RESIDENT, loggedInuser.uid, resident.id);
              //activate resident web access
              const obj = Object.assign(resident.data());
              obj.isActive = true;
              resident.data().isActive = true;
              await this.db.collection("residents").doc(resident.id).set(obj);
              this.db.collection("menus").get().pipe(first(), map(snapshot => {
                sideMenu$.next(transformSideMenu(snapshot, Role.RESIDENT));
              })).subscribe(x => {
                this.spinner.spin$.next(false);
                this.router.navigate(
                  [
                    { preserveFragment: true },
                    {
                      outlets: {
                        details: 'dashboard'
                      }
                    }
                  ]);
              });
            } else {
              //throw error
            }
          });
        });
      } else {

        this.db.collection("users").get().pipe(first()).subscribe(x => {
          x.forEach(user => {
            const adminUser = user.data();
            if (adminUser.role == Role.ADMIN) {
              adminUser.properties.forEach(async propertyId => {
                //find administrator for property selected
                if (this.registrationForm.value.propertyId === propertyId) {
                  const uid = { userId: loggedInuser.uid, adminId: adminUser.uid };
                  const obj = Object.assign(this.registrationForm.value, uid);
                  await this.db.collection("pending-activations").add(obj);
                  this.spinner.spin$.next(false);
                  this.router.navigate(
                    [
                      { preserveFragment: true },
                      {
                        outlets: {
                          details: 'registration-pending'
                        }
                      }
                    ]);
                }
              });
              this.spinner.spin$.next(false);
            }
          });
        });
      }
    }
  }

}
