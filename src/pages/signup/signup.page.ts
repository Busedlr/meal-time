import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { Router } from "@angular/router";
import { UserDataService } from "../../services/user-data.service";

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
      username: ["", Validators.required],
      email: ["", Validators.compose([Validators.email, Validators.required])],
      password: ["", Validators.required]
    });
  }

  register() {
    let name = this.userForm.controls.username.value;
    let email = this.userForm.controls.email.value;
    let password = this.userForm.controls.password.value;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        this.saveUser(result, name);
        this.findLoggedInUser();
      })
      .catch(error => {
        console.log(error);
      });
  }

  saveUser(res, name) {
    let userData = {
      email: res.user.email,
      userName: name,    };
    this.userService.saveUser(userData).then(res => {
      console.log(userData.userName)
      console.log("saveuser:", res);
    });
  }

  findLoggedInUser() {
    this.userService.getLoggedInUser()
  }
}
