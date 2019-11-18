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
  segment: any = "overview";
  hideHeader: any = false;

  constructor(
    public userService: UserDataService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public recipeService: RecipeDataService,
    public modalCtrl: ModalController
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
          console.log("user page is reloaded")
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
    this.userService.getImages(this.user.id, "profile").then(imageUrl => {
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
    this.userService.getImages(this.user.id, "cover").then(coverUrl => {
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
      this.hideHeader = true;
    } else if (ev.detail.deltaY < 0) {
      this.hideHeader = false;
    }
  }

  async openModal() {
    let modal = await this.modalCtrl.create({
      component: EditProfileModalPage,
      cssClass: "edit-profile-modal",
      componentProps: {
        user: this.user
      }
    });
    modal.onDidDismiss().then(reloadUser => {
      console.log('reload', reloadUser)
      if (reloadUser.data) {
        this.getUser();
      }
    });
    return await modal.present();
  }
}
