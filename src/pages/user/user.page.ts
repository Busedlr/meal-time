import { Component, OnInit } from "@angular/core";
import { UserDataService } from "../../services/user-data.service";
import { Router, ActivatedRoute } from "@angular/router";

import * as firebase from "firebase/app";
import "firebase/auth";
import { RecipeDataService } from "src/services/recipe-data.service";

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
  segment: any;

  constructor(
    public userService: UserDataService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public recipeService: RecipeDataService
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

  saveProfileImage() {
    if (this.imageToSave) {
      const path = "user_images/" + this.user.id;
      this.userService.addProfileImage(path, this.imageToSave).then(() => {
        this.getProfileImage();
      });
    }
  }

  saveCoverImage() {
    if (this.imageToSave) {
      const path = "cover_images/" + this.user.id;
      this.userService.addCoverImage(path, this.imageToSave).then(() => {
        this.getCoverImage();
      });
    }
  }

  getProfileImage() {
    this.userService.getProfileImage(this.user.id).then(imageUrl => {
      this.user.profileImageUrl = imageUrl;
    });
  }

  getCoverImage() {
    this.userService.getCoverImage(this.user.id).then(coverUrl => {
      this.user.coverImageUrl = coverUrl;
    });
  }

  resetInput(inputId) {
    const fileInput = document.getElementById(inputId) as HTMLInputElement;
    fileInput.value = "";
  }

  selectFile(event) {
    const file = event.srcElement.files[0];
    if (
      file &&
      (file.type === "image/jpeg" || file.type === "image/png") &&
      file.size <= 5e6
    ) {
      this.imageToSave = file;
    }
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
}
