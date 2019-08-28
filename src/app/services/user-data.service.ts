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

  testFunction() {
    console.log("working");
  }

  saveUser(userData) {
    return this.usersRef
      .add(userData)
      .then(doc => {
        return doc;
      })
      .catch(error => {
        console.log(error);
      });
  }

  getLoggedInUser() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.findUser(user).then(console.log("User is signed in."));
      } else {
        console.log("No user is signed in.");
      }
    });
  }

  /* findUser(user) {
    return this.usersRef
      .where("email", "==", user.email)
      .get()
      .then(docs =>
        docs.forEach(doc => {
          this.user = doc.data();
          this.user.id = doc.id;
          this.userDetected.emit(this.user);
          this.router.navigate(["/user"]);
        })
      )
      .catch(error => {
        console.log(error);
      });
  } */

  findUser(user) {
    return this.usersRef
      .where("email", "==", user.email)
      .get()
      .then(docs =>
        docs.forEach(doc => {
          this.user = doc.data();
          this.user.id = doc.id;
          this.userDetected.emit(this.user);
          this.router.navigate(["/user"]);
        })
      )
      .catch(error => {
        console.log(error);
      });
  }

  addProfileImage(file) {
    let path = "user_images/" + this.user.id;
    let imageRef = this.storageRef.child(path);
    return imageRef
      .put(file)
      .then(() => {
        console.log("profile photo is saved");
        //success feedback
      })
      .catch(error => {
        console.log(error);
      });
  }
}