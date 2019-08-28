import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { Router } from '@angular/router';
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
		private router: Router,
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
    const controls = this.userForm.controls;
		firebase
			.auth()
			.createUserWithEmailAndPassword(controls.email.value, controls.password.value)
			.then(result => {
				this.saveUser(result.user, controls.name.value);
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
