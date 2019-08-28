import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { UserDataService } from '../../services/user-data.service';

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
		public userService: UserDataService
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

	register() {
		console.log('form', this.userForm)
		const email = this.userForm.controls.email.value;
		const name = this.userForm.controls.username.value;
		const password = this.userForm.controls.password.value;
		/* const controls = this.userForm.controls;
		console.log('controls', controls) */
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(result => {
				this.saveUser(result.user, name);
				this.findLoggedInUser();
			})
			.catch(error => {
				console.log(error);
			});
	}

	saveUser(user, name) {
		const userData = {
			email: user.email,
			userName: name
    };
    
    const uid = user.uid
    this.userService.saveUser(uid, userData).then(() => {});
    //feedback to user will be added here
	}

	findLoggedInUser() {
		this.userService.getLoggedInUser();
	}
}
