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

  constructor() {
    this.db = firebase.firestore();
    this.recipesRef = this.db.collection("recipes");
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
}
