import { Component, OnInit } from "@angular/core";
import { UserDataService } from "../services/user-data.service";
import { Router } from "@angular/Router";
import { create } from 'domain';

@Component({
  selector: "app-user",
  templateUrl: "./user.page.html",
  styleUrls: ["./user.page.scss"]
})
export class UserPage implements OnInit {
  file: any;
  imageValid: boolean = false;
  user: any;
  userData: any;

  constructor(public userService: UserDataService, public router: Router) {
    /* this.userService.userDetected.subscribe(doc => {
      this.user = doc;
      this.userData = doc.data();
      console.log("doc:", doc)
      console.log("docdata:", doc.data())
      console.log("userinside", this.user)
    console.log("userdatainside:", this.userData)
    });
    //this.user stays undefined */
  }

  ngOnInit() {}

  resetInput(inputId) {
    let fileInput = document.getElementById(inputId) as HTMLInputElement;
    fileInput.value = "";
  }

  selectFile(event) {
    this.imageValid = false;
    this.file = event.srcElement.files[0];
    if (
      this.file &&
      (this.file.type === "image/jpeg" || this.file.type === "image/png") &&
      this.file.size <= 5e6
    ) {
      this.imageValid = true;
    }
  }

  saveProfileImage() {
    this.userService.addProfileImage(this.file);
  }


  /*  getUser() { // this also worked but doesnt work after refreshing!!!
    this.user = this.userService.user
    this.userData = this.userService.userData
    console.log("username",this.userData.userName)
    console.log("userdata",this.userData)
  } */
}
