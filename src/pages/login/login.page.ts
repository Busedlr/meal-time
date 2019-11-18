import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserDataService } from "../../services/user-data.service";
import { Router } from "@angular/router";
import { AuthService } from "src/services/auth.service";

@Component({
  selector: "login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  userForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    public userService: UserDataService,
    private router: Router,
    public authService: AuthService
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
    this.authService.logIn(this.userForm).then(() => {
      this.router.navigate(["./home"]);
    });
  }

  logOut() {
    this.authService.logOut();
  }
}
