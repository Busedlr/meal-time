import { Component, OnInit } from "@angular/core";
import * as firebase from "firebase/app";
import "firebase/auth";
import { Router } from "@angular/router";
import { UserDataService } from "src/services/user-data.service";
import { AuthService } from "src/services/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  user: any;

  constructor(
    public router: Router,
    public userService: UserDataService,
    public authService: AuthService
  ) {
    this.onAuthChange();
  }

  ngOnInit() {}

  onAuthChange() {
    firebase.auth().onAuthStateChanged(res => {
      if (res) {
        this.userService.getUser(res.uid).then(doc => {
          this.user = doc.data();
          this.user.id = doc.id;
        });
      }
    });
  }

  toLogIn() {
    this.router.navigate(["/login"]);
  }

  logOut() {
    this.authService.logOut().then(() => {
      this.user = null;
      this.router.navigate(["/home"]);
    });
  }

  toSignUp() {
    this.router.navigate(["/signup"]);
  }

  toUserPage() {
    this.router.navigate(["/user"]);
  }
}
