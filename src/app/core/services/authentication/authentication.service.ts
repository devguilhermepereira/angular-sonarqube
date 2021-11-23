import {Injectable} from '@angular/core';
import firebase from 'firebase/compat';
import CollectionReference = firebase.firestore.CollectionReference;
import {UserModel} from '../../models/user.model';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private firestore: AngularFirestore) {
  }

  login(user: any): Observable<any> {
    return this.firestore.collection('users', (ref: CollectionReference) => ref.where('email', '==', user.email)).valueChanges({
      idField: 'userId', account_type: 'account_type'
    });
  }

  create(user: UserModel) {
    return this.firestore.collection('users').add(user);
  }

  find(user?: UserModel) {
    return this.firestore.collection('users').snapshotChanges();
  }

  delete(id: number) {
    this.firestore.doc('users/' + id).delete();
  }

  update(user: UserModel) {
    this.firestore.doc('users/' + user.id).update(user);
  }
}
