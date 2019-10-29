import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { UserDataService } from 'src/services/user-data.service';

@Component({
	selector: 'app-edit-profile-modal',
	templateUrl: './edit-profile-modal.page.html',
	styleUrls: ['./edit-profile-modal.page.scss']
})
export class EditProfileModalPage implements OnInit {
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
		public userService: UserDataService
	) {}

	ngOnInit() {
		this.coverImage = document.getElementById('coverImage') as HTMLImageElement;
		this.coverImage.src = this.user.coverImageUrl;
		this.profileImage = document.getElementById(
			'profileImage'
		) as HTMLImageElement;
		this.profileImage.src = this.user.profileImageUrl;
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

	resetInput(inputId) {
		const fileInput = document.getElementById(inputId) as HTMLInputElement;
		fileInput.value = '';
	}

	/* selectImage(event, type) {
		const file = event.srcElement.files[0];
		if (
			file &&
			(file.type === 'image/jpeg' || file.type === 'image/png') &&
			file.size <= 5e6
		) {

			if (type === 'profile') {
				this.profileImageToSave = file;
				this.profileImage.src = URL.createObjectURL(file);
			} else if (type === 'cover') {
				this.coverImageToSave = file;
				this.coverImage.src = URL.createObjectURL(file);
			}
    }
    //this whole function does exactly the same thing as the other 'selectImage' function underneath. 
    The one below is just more compact and uses a different syntax to recreate the variable names
  } */

	selectImage(event, type) {
		const file = event.srcElement.files[0];
		if (
			file &&
			(file.type === 'image/jpeg' || file.type === 'image/png') &&
			file.size <= 5e6
		) {
			const imageType = type + 'Image';
			const imageToSave = type + 'ImageToSave';

			this[imageToSave] = file;
			this[imageType].src = URL.createObjectURL(file);
		}
	}

	saveChanges() {
		if (this.profileImageToSave) {
			const path = 'user_images/' + this.user.id;
			this.userService
				.addProfileImage(path, this.profileImageToSave)
				.then(() => {
					this.getProfileImage();
				});
		}
		if (this.coverImageToSave) {
			const path = 'cover_images/' + this.user.id;
			this.userService.addCoverImage(path, this.coverImageToSave).then(() => {
				this.getCoverImage();
			});
		}
		this.closeModal();
	}

	/*  saveProfileImage() {
    if (this.profileImageToSave) {
      const path = "user_images/" + this.user.id;
      this.userService
        .addProfileImage(path, this.profileImageToSave)
        .then(() => {
          this.getProfileImage();
        });
    }
  }

  saveCoverImage() {
    if (this.coverImageToSave) {
      const path = "cover_images/" + this.user.id;
      this.userService.addCoverImage(path, this.coverImageToSave).then(() => {
        this.getCoverImage();
      });
    }
  } */

	closeModal() {
		this.modalController.dismiss();
	}
}
