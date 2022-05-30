import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";
import firebase from "firebase/compat";
import CollectionReference = firebase.firestore.CollectionReference;
import {UserModel} from "../../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) {
  }

  get(): Observable<any> {
    return this.firestore.collection('users', (ref: CollectionReference) => ref.where('isAdmin', '!=', true)).valueChanges({idField: 'id'});
  }

  find(id: any): Observable<any> {
    return this.firestore.collection('users', (ref: CollectionReference) => ref.where('idField', '==', id)).valueChanges({idField: 'id'})
  }

  save(data: UserModel, role: any): Promise<any> {
    return this.firestore.collection('users').add(data).then((res) => this.saveUserTypes(role, res.id));
  }

  update(user: UserModel, role: any, userOld: any): Promise<any> {
    return this.firestore.doc('users/' + userOld.id).update(user).then(() => this.upadateUserTypes(role, userOld));
  }

  saveUserTypes(role: string, id: string): Promise<any> {
    return this.firestore.collection('user_types').add({role: role, user: id});
  }

  upadateUserTypes(role: string, userOld: any): Promise<any> {
    return this.firestore.doc('user_types/' + userOld.userType.id).update({role: role, user: userOld.id});
  }

  getUserTypes(id: any): Observable<any> {
    return this.firestore.collection('user_types', (ref: CollectionReference) => ref.where('user', '==', id)).valueChanges({idField: 'id'});
  }
}
