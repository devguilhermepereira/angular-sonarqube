import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import firebase from "firebase/compat";
import CollectionReference = firebase.firestore.CollectionReference;

@Injectable({
  providedIn: 'root'
})
export class RolesService {


  constructor(private firestore: AngularFirestore) {
  }

  get(): Observable<any> {
    return this.firestore.collection('roles', (ref: CollectionReference) => ref.where('name', '!=', 'null')).valueChanges({idField: 'id'});
  }
}
