import { Injectable } from "@angular/core";

import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";


@Injectable({
  providedIn: "root"
})
export class RecipeDataService {
  db: any;
  recipesRef: any;
  storageRef: any;
  storageFolder: string = "recipe_images/";
  recipeImagesRef: any;
  imageRef: any;
  imageUrl: any;

  constructor() {
    this.db = firebase.firestore();
    this.recipesRef = this.db.collection("recipes");
    this.storageRef = firebase.storage().ref();
  }

  saveRecipe(recipeData) {
    return this.recipesRef
      .add(recipeData)
      .then(doc => {
        console.log("document saved with id", doc.id);
      })
      .catch(error => {
        console.log(error);
      });
  }

  addRecipeImage(file, path) {
    this.imageRef = this.storageRef.child(path);
    return this.imageRef
      .put(file)
      .then(result => {
        console.log(result);
        //success feedback
      })
      .catch(error => {
        console.log(error);
      });
  }

  getRecipes() {
    return this.recipesRef
      .get()
      .then(result => {
        return result
        })
      .catch(error => {
        console.log(error);
      });
    /* this.getRecipeImage(); */
  }

  getRecipeImage() {
    return this.imageRef
      .getDownloadURL()
      .then(url => {
        return this.imageUrl = url;
      })
      .catch(error => {
        console.log(error);
      });
  }

}
