import { Component, ViewChild, HostListener, Input } from "@angular/core";

import { UserDataService } from "src/services/user-data.service";

import * as firebase from "firebase/app";
import "firebase/auth";
import { Router } from "@angular/router";
import { RecipeDataService } from "src/services/recipe-data.service";
import { IonSlides } from "@ionic/angular";

@Component({
  selector: "home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  constructor(
    public userService: UserDataService,
    public router: Router,
    public recipeService: RecipeDataService
  ) {
    this.onAuthChange();
    this.getRecipes();
  }
  @ViewChild("slides", { static: false }) slides: IonSlides;
  user: any;
  displayRecipes: any = [];
  allRecipes: any = [];
  categoryRecipes: any = [];
  searchedRecipes: any = [];
  controlMenu: boolean;
  showMenu: boolean;
  hideHeader: boolean = false;

  slideOpts = {
    slidesPerView: 1,
    freeMode: false,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pager: true,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true
    }
  };

  @HostListener("window:click", ["$event"])
  clickout() {
    this.closeDropdown();
  }

  onScroll(ev) {
    if (ev.detail.deltaY > 0) {
      this.hideHeader = true;
    } else if (ev.detail.deltaY < 0) {
      this.hideHeader = false;
    }
  }

  openDropdown(ev) {
    this.showMenu = !this.showMenu;
    this.controlMenu = true;

    if (!this.showMenu) {
      ev.stopPropagation();
      this.controlMenu = false;
    }
  }

  closeDropdown() {
    this.showMenu = false;

    if (this.controlMenu) {
      this.showMenu = true;
      this.controlMenu = false;
    }
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

  getRecipes() {
    this.recipeService.getAllRecipes().then(result => {
      result.docs.forEach(doc => {
        const recipe = doc.data();
        recipe.id = doc.id;
        this.recipeService.getRecipeImageUrl(recipe.path).then(url => {
          recipe.imageUrl = url;
          this.allRecipes.push(recipe);
        });
      });
      this.displayRecipes = this.allRecipes;
    });
  }

  goToUserPage() {
    this.router.navigate(["/user"], { queryParams: this.user });
  }

  filterRecipes(category) {
    if (category == 'all') {
      this.displayRecipes = this.allRecipes;
    } else {
      this.categoryRecipes = [];
      this.recipeService.getcategoryRecipes(category).then(result => {
        result.docs.forEach(doc => {
          const recipe = doc.data();
          recipe.id = doc.id;
          this.recipeService.getRecipeImageUrl(recipe.path).then(url => {
            recipe.imageUrl = url;
            this.categoryRecipes.push(recipe);
          });
        });
        this.displayRecipes = this.categoryRecipes;
      });
    }
  }

  searchRecipes(ev) {
    this.searchedRecipes = [];
    if( ev.keyCode === 13 ) {
      const query = ev.srcElement.value.toLowerCase();
      this.recipeService.searchRecipes(query).then((result) => {
        result.docs.forEach(doc => {
          const recipe = doc.data();
          recipe.id = doc.id;
          this.recipeService.getRecipeImageUrl(recipe.path).then(url => {
            recipe.imageUrl = url;
            this.searchedRecipes.push(recipe);
          });
        });
        this.displayRecipes = this.searchedRecipes;
      })
    }
  }

  cancelSearch(ev) {
    if (!ev.detail.value) {
      this.displayRecipes = this.allRecipes;
    }
  }
}
