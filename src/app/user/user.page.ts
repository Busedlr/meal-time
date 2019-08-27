import { Component, OnInit } from "@angular/core";
import { UserDataService } from "../services/user-data.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.page.html",
  styleUrls: ["./user.page.scss"]
})
export class UserPage implements OnInit {
  file: any;
  imageValid: boolean = false;
  constructor(public userService: UserDataService) {}

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
    let path = "user_images/buse"
    this.userService.addProfileImage(this.file, path)
  }
}
