import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
/* import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth"; */
import { UserDataService } from "../../services/user-data.service";
import { Router } from "@angular/router";
import { LoginService } from "src/services/login.service";

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
    private router: Router,
    public loginService: LoginService
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

  logIn() {
    this.loginService.logIn(this.userForm).then(() => {
      this.router.navigate(["./home"]);
    });
  }

  logOut() {
    this.loginService.logOut();
  }
}
