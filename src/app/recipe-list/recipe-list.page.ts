import { Component, OnInit } from "@angular/core";

import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.page.html",
  styleUrls: ["./recipe-list.page.scss"]
})
export class RecipeListPage implements OnInit {
  db: any;
  recipesRef: any;
  recipeImagesRef: any;
  storageRef: any;
  recipes: any = [];
  imageUrl: any;

  constructor() {
    this.db = firebase.firestore();
    this.recipesRef = this.db.collection("recipes");
    this.storageRef = firebase.storage().ref();

    this.getRecipes();
  }

  ngOnInit() {}

  getRecipes() {
    this.recipesRef
      .get()
      .then(result => {
        result.forEach(document => {
          let recipe = document.data();
          recipe.id = document.id;
          this.recipes.push(recipe);
        });
        console.log("recipes:", this.recipes);
      })
      .catch(error => {
        console.log(error);
      });
    this.getRecipeImage();
  }

  getRecipeImage() {
    this.recipeImagesRef
      .getDownloadURL()
      .then(url => {
        this.imageUrl = url;
      })
      .catch(error => {
        console.log(error);
      });
  }
}
