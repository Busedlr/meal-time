import { Component, OnInit } from "@angular/core";
import { UserDataService } from "../../services/user-data.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-user",
  templateUrl: "./user.page.html",
  styleUrls: ["./user.page.scss"]
})
export class UserPage implements OnInit {
  file: any;
  imageValid = false;
  user: any;

  constructor(public userService: UserDataService, public router: Router) {
    this.userService.userDetected.subscribe(doc => {
      this.user = doc;
      console.log("userinside", this.user);
    });
  }

  ngOnInit() {}

  resetInput(inputId) {
    const fileInput = document.getElementById(inputId) as HTMLInputElement;
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

  goToRecipeCreate() {
    this.router.navigate(["/recipe-create"]);
  }
}
