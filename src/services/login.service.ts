import { Injectable } from '@angular/core';
import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  logIn(userForm) {
    const email = userForm.controls.email.value;
    const password = userForm.controls.password.value;
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
       console.log("user logged in")
      })
      .catch(error => {
        console.log(error);
      });
  }

  logOut() {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("user logged out");
      })
      .catch(error => {
        console.log(error);
      });
  }
}
