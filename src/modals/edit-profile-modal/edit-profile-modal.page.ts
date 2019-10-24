import { Component, OnInit } from "@angular/core";
import { NavParams, ModalController } from "@ionic/angular";
import * as firebase from "firebase/app";
import { UserDataService } from 'src/services/user-data.service';

@Component({
  selector: "app-edit-profile-modal",
  templateUrl: "./edit-profile-modal.page.html",
  styleUrls: ["./edit-profile-modal.page.scss"]
})
export class EditProfileModalPage implements OnInit {
  storageRef: any;
  user: any;
  imageToSave: any = null;

  constructor(
    public navParams: NavParams,
    public modalController: ModalController,
    public userService: UserDataService,
  ) {}

  ngOnInit() {
    console.log(this.user)
  }

  getProfileImage() {
    this.userService.getProfileImage(this.user.id).then(imageUrl => {
      this.user.profileImageUrl = imageUrl;
    });
  }

  getCoverImage() {
    this.userService.getCoverImage(this.user.id).then(coverUrl => {
      this.user.coverImageUrl = coverUrl;
    });
  }

  saveProfileImage() {
    if (this.imageToSave) {
      const path = "user_images/" + this.user.id;
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

  closeModal() {
    this.modalController.dismiss();
  }
}
