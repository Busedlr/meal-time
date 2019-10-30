import { Component, OnInit } from "@angular/core";
import { NavParams, ModalController } from "@ionic/angular";
import { UserDataService } from "src/services/user-data.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-edit-profile-modal",
  templateUrl: "./edit-profile-modal.page.html",
  styleUrls: ["./edit-profile-modal.page.scss"]
})
export class EditProfileModalPage implements OnInit {
  profileForm: FormGroup;
  storageRef: any;
  user: any;
  profileImageToSave: any = null;
  coverImageToSave: any = null;
  imageToSave: any = null;
  image: any;
  coverImage: any;
  profileImage: any;

  constructor(
    public navParams: NavParams,
    public modalController: ModalController,
    public userService: UserDataService,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
    this.coverImage = document.getElementById("coverImage") as HTMLImageElement;
    this.coverImage.src = this.user.coverImageUrl;
    this.profileImage = document.getElementById(
      "profileImage"
    ) as HTMLImageElement;
    this.profileImage.src = this.user.profileImageUrl;
  }

  initForm() {
    this.profileForm = this.formBuilder.group({
      username: ["", Validators.minLength(3)],
      description: ["", Validators.maxLength(250)]
    });
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

  selectImage(event, type) {
    const file = event.srcElement.files[0];
    if (
      file &&
      (file.type === "image/jpeg" || file.type === "image/png") &&
      file.size <= 5e6
    ) {
      const imageType = type + "Image";
      const imageToSave = type + "ImageToSave";

      this[imageToSave] = file;
      this[imageType].src = URL.createObjectURL(file);
    }
  }

  saveChanges() {
    console.log(this.profileForm);
    if (this.profileImageToSave) {
      const path = "profile_images/" + this.user.id;
      this.userService
        .addProfileImage(path, this.profileImageToSave)
        .then(() => {
          this.getProfileImage();
        });
    }
    if (this.coverImageToSave) {
      const path = "cover_images/" + this.user.id;
      this.userService.addCoverImage(path, this.coverImageToSave).then(() => {
        this.getCoverImage();
      });
    }
    const controls = this.profileForm.controls;
    this.userService.updateUserInfo(
      this.user,
      controls.username.value,
      controls.description.value
    );
    this.closeModal(true);
  }

  closeModal(reloadUser) {
    this.modalController.dismiss(reloadUser);
  }
}
