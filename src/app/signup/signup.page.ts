import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { Router } from "@angular/router";
import { UserDataService } from "../services/user-data.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.page.html",
  styleUrls: ["./signup.page.scss"]
})
export class SignupPage implements OnInit {
  userForm: FormGroup;
  email: any = "";
  password: any = "";

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    public userService: UserDataService
  ) {
    this.initForm();
  }

  ngOnInit() {}

  initForm() {
    this.userForm = this.formBuilder.group({
      email: ["", Validators.compose([Validators.email, Validators.required])],
      password: ["", Validators.required]
    });
  }

  register() {
    let email = this.userForm.controls.email.value;
    let password = this.userForm.controls.password.value;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        this.saveUser(result);
        this.getSignedInUser();
        this.initForm();
      })
      .catch(error => {
        console.log(error);
      });
  }

  saveUser(res) {
    let userData = {
      email: res.user.email
    };
    this.userService.saveUser(userData).then(res => {
      console.log(res);
    });
  }

  getSignedInUser() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("user is signedin", user);
      } else {
        console.log("No user is signed in.");
      }
    });
  }
}
