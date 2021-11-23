import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";
import firebase from "firebase/compat";
import CollectionReference = firebase.firestore.CollectionReference;
import {map} from "rxjs/operators";
import {UserModel} from "../../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) {
  }

  get(): Observable<any> {
    return this.firestore.collection('users', (ref: CollectionReference) => ref.where('isAdmin', '!=', true)).valueChanges({idField: 'id'}).pipe(
      map((res: any) => {
        const users: Array<UserModel> = res;
        users.forEach((row: UserModel) => {
          this.firestore.collection('user_types', (ref: CollectionReference) => ref.where('user', '==', row.id)).valueChanges({idField: 'id'}).subscribe((res) => {
            row.userType = res && res[0] ? res[0] : null;
          })
        });
        return users;
      })
    );
  }

  find(id: any): Observable<any> {
    return this.firestore.collection('users', (ref: CollectionReference) => ref.where('idField', '==', id)).valueChanges({idField: 'id'})
  }

  save(data: UserModel, role: any) {
    return this.firestore.collection('users').add(data).then((res) => {
      return this.firestore.collection('user_types').add({role: role, user: res.id});
    });
  }

  update(user: UserModel, role: any, userOld: any) {
    return this.firestore.doc('users/' + userOld.id).update(user).then((res) => {
      return this.firestore.doc('user_types/' + userOld.userType.id).update({role: role, user: userOld.id});
    });
  }
}
