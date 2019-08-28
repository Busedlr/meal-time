import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { UserDataService } from '../../services/user-data.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
	userForm: FormGroup;
	constructor(
		public formBuilder: FormBuilder,
		public userService: UserDataService,
		private router: Router
	) {
		/* this.getSignedInUser(); */
		this.initForm();
	}

	ngOnInit() {}

	initForm() {
		this.userForm = this.formBuilder.group({
			email: [
				'we@we.com',
				Validators.compose([Validators.email, Validators.required])
			],
			password: ['asasasas', Validators.required]
		});
	}

	signIn() {
		const email = this.userForm.controls.email.value;
		const password = this.userForm.controls.password.value;
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(() => {
				this.userService.getLoggedInUser();
			})
			.catch(error => {
				console.log(error);
			});
	}
}
