import { Component, NgZone } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import { firebaseConfig } from './credentials';
import 'firebase/firestore';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss']
})
export class AppComponent {
	zone: NgZone = new NgZone({});
	constructor(
		private platform: Platform,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar
	) {
		firebase.initializeApp(firebaseConfig);
		this.initializeApp();
	}

	initializeApp() {
		this.platform.ready().then(() => {
			this.onAuthChange();
			this.statusBar.styleDefault();
			this.splashScreen.hide();
		});
	}

	onAuthChange() {
		firebase.auth().onAuthStateChanged(user => {
			console.log('user', user);
		});
	}
}
