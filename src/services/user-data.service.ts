import { Injectable, EventEmitter } from "@angular/core";
import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class UserDataService {
  db: any;
  usersRef: any;
  storageRef: any;
  user: any;

  userDetected = new EventEmitter<string>();

  constructor(public router: Router) {
    this.db = firebase.firestore();
    this.usersRef = this.db.collection("users");
    this.storageRef = firebase.storage().ref();
  }

  saveUser(uid, userData) {
    return this.usersRef
      .doc(uid)
      .set(userData)
      .then(() => {
        return true;
      })
      .catch(error => {
        console.log(error);
      });
  }

  getUser(uid) {
    return this.usersRef
      .doc(uid)
      .get()
      .then(doc => {
        return doc;
      });
  }

  addProfileImage(path, file) {
    return this.storageRef.child(path)
      .put(file)
      .then(() => {
        console.log("profile photo is saved");
        // success feedback
      })
      .catch(error => {
        console.log(error);
      });
  }
}
