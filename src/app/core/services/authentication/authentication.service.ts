import {Injectable} from '@angular/core';
import firebase from 'firebase/compat';
import CollectionReference = firebase.firestore.CollectionReference;
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
}
