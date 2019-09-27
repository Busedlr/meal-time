import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../services/user-data.service';
import { Router, ActivatedRoute } from '@angular/router';

import * as firebase from 'firebase/app';
import 'firebase/auth';

@Component({
	selector: 'app-user',
	templateUrl: './user.page.html',
	styleUrls: ['./user.page.scss']
})
export class UserPage implements OnInit {
	user: any;
	storageRef: any;
	imageToSave: any = null;

	constructor(
		public userService: UserDataService,
		public router: Router,
		public activatedRoute: ActivatedRoute
	) {
		this.getUser();
	}

	ngOnInit() {}

	getUser() {
		firebase.auth().onAuthStateChanged(res => {
			if (res) {
				this.userService.getUser(res.uid).then(doc => {
					this.user = doc.data();
					this.user.id = doc.id;
				});
			}
		});
	}



	goToRecipeCreate() {
		this.router.navigate(['/recipe-create'], { queryParams: this.user });
	}

	goToRecipeList() {
		this.router.navigate(['/recipe-list']);
	}
}
