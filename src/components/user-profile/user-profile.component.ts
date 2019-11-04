import { Component, OnInit } from "@angular/core";
import * as firebase from "firebase/app";
import { UserDataService } from "src/services/user-data.service";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"]
})
export class UserProfileComponent implements OnInit {
  user: any;
  userId: any;
  imageToSave: any;

  constructor(public userService: UserDataService) {
    this.getUser();
  }

  ngOnInit() {}

  getUser() {
    firebase.auth().onAuthStateChanged(res => {
      if (res) {
        this.userService.getUser(res.uid).then(doc => {
          this.user = doc.data();
          this.user.id = doc.id;
          this.getProfileImage();
          this.getCoverImage();
        });
      }
    });
  }

  saveProfileImage() {
    if (this.imageToSave) {
      const path = "profile_images/" + this.user.id;
      this.userService.addProfileImage(path, this.imageToSave).then(() => {
        this.getProfileImage();
      });
    }
  }

  saveCoverImage() {
    if (this.imageToSave) {
      const path = "cover_images/" + this.user.id;
      this.userService.addCoverImage(path, this.imageToSave).then(() => {
        this.getCoverImage();
      });
    }
  }

  getProfileImage() {
    this.userService.getImages(this.user.id, "profile").then(imageUrl => {
      this.user.profileImageUrl = imageUrl;
    });
  }

  getCoverImage() {
    this.userService.getImages(this.user.id, "cover").then(coverUrl => {
      this.user.coverImageUrl = coverUrl;
    });
  }

  resetInput(inputId) {
    const fileInput = document.getElementById(inputId) as HTMLInputElement;
    fileInput.value = "";
  }

  selectFile(event) {
    const file = event.srcElement.files[0];
    if (
      file &&
      (file.type === "image/jpeg" || file.type === "image/png") &&
      file.size <= 5e6
    ) {
      this.imageToSave = file;
    }
  }
}
