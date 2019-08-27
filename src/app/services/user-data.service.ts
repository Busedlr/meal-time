import { Injectable } from "@angular/core";
import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

@Injectable({
  providedIn: "root"
})
export class UserDataService {
  db: any;
  usersRef: any;
  storageRef: any;

  constructor() {
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

  findUser(user) {
    let userEmail = user.email;
    console.log(userEmail)
   return this.usersRef
      .where("email", "==", userEmail)
      .get()
      .then((docs) => docs.forEach(doc => {
        let userData = doc.data();
        return userData
      }))
      .catch(error => {
        console.log(error);
      });
  }

  addProfileImage(file, path) {
    let imageRef = this.storageRef.child(path);
    return imageRef
      .put(file)
      .then(result => {
        console.log(result);
        //success feedback
      })
      .catch(error => {
        console.log(error);
      });
  }
}
