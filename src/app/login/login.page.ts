import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { UserDataService } from "../services/user-data.service";
import { Router } from "@angular/router"

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  userForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    public userService: UserDataService,
    private router: Router
  ) {
    /* this.getSignedInUser(); */
    this.initForm();
  }

  ngOnInit() {}

  initForm() {
    this.userForm = this.formBuilder.group({
      email: ["", Validators.compose([Validators.email, Validators.required])],
      password: ["", Validators.required]
    });
  }

  signIn() {
    let email = this.userForm.controls.email.value;
    let password = this.userForm.controls.password.value;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.getSignedInUser();
      })
      .catch(error => {
        console.log(error);
      });
  }

  getSignedInUser() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.userService.findUser(user)
        .then(userData => {
          this.router.navigate(['/user'])
        })
      } else {
        console.log("No user is signed in.");
      }
    });
  }
}


