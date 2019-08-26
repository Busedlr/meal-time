import { Injectable } from "@angular/core";
import * as firebase from "firebase/app";
import "firebase/firestore";

@Injectable({
  providedIn: "root"
})
export class UserDataService {
  db: any;
  usersRef: any;

  constructor() {
    this.db = firebase.firestore();
    this.usersRef = this.db.collection("users");
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
    this.usersRef
      .where("email", "==", userEmail)
      .get()
      .then((docs) => docs.forEach(doc => {
        let userData = doc.data();
        console.log(userData)
      }))
      .catch(error => {
        console.log(error);
      });
  }
}
