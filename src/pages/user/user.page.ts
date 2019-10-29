import { Component, OnInit, ɵConsole } from "@angular/core";
import { UserDataService } from "../../services/user-data.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ModalController } from "@ionic/angular";

import * as firebase from "firebase/app";
import "firebase/auth";
import { RecipeDataService } from "src/services/recipe-data.service";
import { EditProfileModalPage } from "src/modals/edit-profile-modal/edit-profile-modal.page";

@Component({
  selector: "app-user",
  templateUrl: "./user.page.html",
  styleUrls: ["./user.page.scss"]
})
export class UserPage implements OnInit {
  user: any;
  storageRef: any;
  userId: any;
  imageToSave: any = null;
  myRecipes: any = [];
  allRecipes: any = [];
  segment: any = "myRecipes";
  showHeader: any = true;

  constructor(
    public userService: UserDataService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public recipeService: RecipeDataService,
    public modalController: ModalController
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
          this.getMyRecipes();
          this.getAllRecipes();
          this.getProfileImage();
          this.getCoverImage();
        });
      }
    });
  }

  getMyRecipes() {
    this.recipeService.getMyRecipes(this.user.id).then(result => {
      result.docs.forEach(doc => {
        let recipe = doc.data();
        recipe.id = doc.id;
        this.recipeService.getRecipeImageUrl(recipe.path).then(url => {
          recipe.imageUrl = url;
          this.myRecipes.push(recipe);
        });
      });
    });
  }

  getAllRecipes() {
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

  getProfileImage() {
    this.userService.getProfileImage(this.user.id).then(imageUrl => {
      if (imageUrl) {
        this.user.profileImageUrl = imageUrl;
      } else {
        this.userService
          .getDefaultImages("profile")
          .then(url => (this.user.profileImageUrl = url));
      }
    });
  }

  getCoverImage() {
    this.userService.getCoverImage(this.user.id).then(coverUrl => {
      if (coverUrl) {
        this.user.coverImageUrl = coverUrl;
      } else {
        this.userService
          .getDefaultImages("cover")
          .then(url => (this.user.coverImageUrl = url));
      }
    });
  }

  goToRecipeCreate() {
    this.router.navigate(["/recipe-create"], { queryParams: this.user });
  }

  goToRecipeList() {
    this.router.navigate(["/recipe-list"]);
  }

  changeSegment(seg) {
    this.segment = seg;
  }

  onScroll(ev) {
    if (ev.detail.deltaY > 0) {
      this.showHeader = false;
    } else if (ev.detail.deltaY < 0) {
      this.showHeader = true;
    }
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: EditProfileModalPage,
      componentProps: {
        foo: "hello",
        bar: "world",
        user: this.user
      }
    });
    return await modal.present();
  }
}
