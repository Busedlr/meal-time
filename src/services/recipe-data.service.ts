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
  user: any;

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
        return doc
      })
      .catch(error => {
        console.log(error);
      });
  }

  addRecipeImage(file, path) {
    const imageRef = this.storageRef.child(path);
    return imageRef
      .put(file)
      .then(result => {
        console.log(result);
        // success feedback
      })
      .catch(error => {
        console.log(error);
      });
  }

  getMyRecipes(userId) {
    return this.recipesRef
      .where("userId", "==", userId)
      .get()
      .then(result => {
        return result;
      })
      .catch(error => {
        console.log(error);
      });
    /* this.getRecipeImage(); */
  }

 

  getAllRecipes() {
    return this.recipesRef
      .get()
      .then(result => {
        return result;
      })
      .catch(error => {
        console.log(error);
      });
  }

  getRecipeImageUrl(path) {
    return this.storageRef
      .child(path)
      .getDownloadURL()
      .then(url => {
        return url;
      });
  }

  getRecipeDetail(id) {
    return this.db
      .collection("recipes")
      .doc(id)
      .get()
      .then(result => {
        return result;
      })
      .catch(error => {
        console.log(error);
      });
  }
}
