import { Injectable, EventEmitter } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class UserDataService {
	db: any;
	usersRef: any;
	storageRef: any;
	user: any;

	userDetected = new EventEmitter<string>();

	constructor(public router: Router) {
		this.db = firebase.firestore();
		this.usersRef = this.db.collection('users');
		this.storageRef = firebase.storage().ref();
	}

	saveUser(uid, userData) {
		return this.usersRef
			.doc(uid)
			.set(userData)
			.then(res => {
				return res;
			})
			.catch(error => {
				console.log(error);
			});
	}

	getLoggedInUser() {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.findUser(user).then(console.log('User is signed in.'));
			} else {
				console.log('No user is signed in.');
			}
		});
	}

	/* findUser(user) {
    return this.usersRef
      .where("email", "==", user.email)
      .get()
      .then(docs =>
        docs.forEach(doc => {
          this.user = doc.data();
          this.user.id = doc.id;
          this.userDetected.emit(this.user);
          this.router.navigate(["/user"]);
        })
      )
      .catch(error => {
        console.log(error);
      });
  } */

	findUser(user) {
		return this.usersRef
			.where('email', '==', user.email)
			.get()
			.then(docs =>
				docs.forEach(doc => {
					this.user = doc.data();
					this.user.id = doc.id;
					this.userDetected.emit(this.user);
					this.router.navigate(['/user']);
				})
			)
			.catch(error => {
				console.log(error);
			});
	}

	getUser(uid) {
    return this.usersRef.doc(uid).get().then((doc) => {
      return doc;
    })
  }

	addProfileImage(file) {
		const path = 'user_images/' + this.user.id;
		const imageRef = this.storageRef.child(path);
		return imageRef
			.put(file)
			.then(() => {
				console.log('profile photo is saved');
				// success feedback
			})
			.catch(error => {
				console.log(error);
			});
	}
}
