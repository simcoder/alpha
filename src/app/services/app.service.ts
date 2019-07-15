import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Role } from '../enums/role.enum';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private db: AngularFirestore) { }


 linkUserToResident(newRole: Role, userId: string, residentId:string) {
    return this.db.collection("users").get().pipe().subscribe(resp => {
      resp.docs.forEach(user => {
        const userUniqueId = user.id;
        if (user.exists) {
          const userdata = user.data();
          if (userdata.uid === userId) {
            const role = { role: newRole, residentId };
            const newUserObject = Object.assign(userdata, role);
            this.db.collection("users").doc(userUniqueId).set(newUserObject);
          }
        }
      });
    });
  }
}
