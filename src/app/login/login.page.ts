import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  userForm: FormGroup;
  email: any = "";
  password: any = "";

  constructor(public formBuilder: FormBuilder) {
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
    this.email = this.userForm.controls.email.value;
    this.password = this.userForm.controls.password.value;
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.email, this.password)
      .catch(error => {
        console.log(error);
      });
      this.initForm();
  }
}
