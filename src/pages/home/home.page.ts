import { Component } from '@angular/core';
import { UserDataService } from 'src/services/user-data.service';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Router } from '@angular/router';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss']
})
export class HomePage {
	user: any;

	constructor(public userService: UserDataService, public router: Router) {
		this.onAuthChange();
	}

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

	goToUserPage() {
		this.router.navigate(['/user'], { queryParams: this.user });
	}
}
