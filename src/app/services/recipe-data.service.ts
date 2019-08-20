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
  imageRef: any;

  constructor() {
    this.db = firebase.firestore();
    this.recipesRef = this.db.collection("recipes");
    this.storageRef = firebase.storage().ref();
    this.imageRef = this.storageRef.child("recipe_images");
  }

  saveRecipe(recipeData) {
    this.recipesRef
      .add(recipeData)
      .then(doc => {
        console.log("document saved with id", doc.id);
      })
      .catch(error => {
        console.log(error);
      });
  }

  
  addRecipeImage(event) {
    let file = event.srcElement.files[0];

    this.imageRef
      .put(file)
      .then(result => {
        console.log(result);
        //success feedback
      })
      .catch(error => {
        console.log(error);
      });
  }

}
