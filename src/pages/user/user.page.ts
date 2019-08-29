import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../services/user-data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-user',
	templateUrl: './user.page.html',
	styleUrls: ['./user.page.scss']
})
export class UserPage implements OnInit {
	user: any;

	constructor(
		public userService: UserDataService,
		public router: Router,
		public activatedRoute: ActivatedRoute
	) {
		this.getUser();
	}

	ngOnInit() {}

	getUser() {
		this.activatedRoute.queryParams.subscribe(res => {
			this.user = res;
		});
	}

	resetInput(inputId) {
		const fileInput = document.getElementById(inputId) as HTMLInputElement;
		fileInput.value = '';
	}

	selectFile(event) {
		const file = event.srcElement.files[0];
		if (
			file &&
			(file.type === 'image/jpeg' || file.type === 'image/png') &&
			file.size <= 5e6
		) {
			this.saveProfileImage(file);
		}
	}

	saveProfileImage(file) {
		const path = 'user_images/' + this.user.id;
		this.userService.addProfileImage(path, file).then(() => {
      console.log('image saved')
    });
	}

	goToRecipeCreate() {
		this.router.navigate(['/recipe-create'], { queryParams: this.user });
	}

	goToRecipeList() {
		this.router.navigate(['/recipe-list']);
	}
}
