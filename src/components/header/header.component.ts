import { Component, OnInit } from "@angular/core";
import * as firebase from "firebase/app";
import "firebase/auth";
import { Router } from "@angular/router";
import { UserDataService } from "src/services/user-data.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  user: any;

  constructor(public router: Router, public userService: UserDataService) {
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

  //delete this later its temporary so the site doesnt crush
  userSignIn() {

  }
  userSignOut() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.router.navigate(["/home"]);
        console.log("user signed out");
      })
      .catch(error => {
        console.log(error);
      });
  }
}
