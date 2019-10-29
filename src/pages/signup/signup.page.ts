import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { UserDataService } from '../../services/user-data.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.page.html',
	styleUrls: ['./signup.page.scss']
})
export class SignupPage implements OnInit {
	userForm: FormGroup;
	email: any = '';
	password: any = '';

	constructor(
		public formBuilder: FormBuilder,
		public userService: UserDataService,
		public router: Router
	) {
		this.initForm();
	}

	ngOnInit() {}

	initForm() {
		this.userForm = this.formBuilder.group({
			username: ['', Validators.required],
			email: ['', Validators.compose([Validators.email, Validators.required])],
			password: ['', Validators.required]
		});
	}

	registerUser() {
		firebase
			.auth()
			.createUserWithEmailAndPassword(
				this.userForm.controls.email.value,
				this.userForm.controls.password.value
			)
			.then(result => {
				this.saveUser(result.user, this.userForm.controls.username.value);
			})
			.catch(error => {
				console.log(error);
			});
	}

	saveUser(user, username) {
		const userData = {
			email: user.email,
			username: username,
			rank: 'New Chef'
		};
		const uid = user.uid;
		this.userService.saveUser(uid, userData).then(() => {
			this.router.navigate(["/home"]);
		});
		// feedback to user will be added here
	}
}
