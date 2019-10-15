import { Component, ViewChild } from '@angular/core';
import { UserDataService } from 'src/services/user-data.service';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Router } from '@angular/router';
import { RecipeDataService } from 'src/services/recipe-data.service';
import { IonSlides } from '@ionic/angular';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss']
})
export class HomePage {
	@ViewChild("slides", { static: false }) slides: IonSlides;
	user: any;
	allRecipes: any = [];


	constructor(public userService: UserDataService, public router: Router, public recipeService: RecipeDataService) {
		this.onAuthChange();
		this.getRecipes();
	}

	
	slideOpts = {
		slidesPerView: 1,
		freeMode: false,
		coverflowEffect: {
		  rotate: 50,
		  stretch: 0,
		  depth: 100,
		  modifier: 1,
		  slideShadows: true
		}
	  };

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



	getRecipes() {
		this.recipeService.getAllRecipes().then(result => {
		  result.docs.forEach(doc => {
			let recipe = doc.data();
			recipe.id = doc.id;
			this.recipeService.getRecipeImageUrl(recipe.path).then(url => {
			  recipe.imageUrl = url;
			  this.allRecipes.push(recipe);
			});
		  });
		});
	  }

	goToUserPage() {
		this.router.navigate(['/user'], { queryParams: this.user });
	}


	  
}
