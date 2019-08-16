import { Component, OnInit } from "@angular/core";

import * as firebase from "firebase/app";
import "firebase/firestore";

import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";

@Component({
  selector: "app-recipe-create",
  templateUrl: "./recipe-create.page.html",
  styleUrls: ["./recipe-create.page.scss"]
})
export class RecipeCreatePage implements OnInit {
  db: any;
  recipesRef: any;

  recipeForm: FormGroup;

  ingredientCount: number = 1;
  ingredientControls: any[] = [];

  constructor(public formBuilder: FormBuilder) {
    this.db = firebase.firestore();
    this.recipesRef = this.db.collection("recipes");
    this.initForm();
  }

  ngOnInit() {}

  initForm() {
    this.recipeForm = this.formBuilder.group({
      ingredient1: ["", Validators.required],
      name: ["", Validators.required],
      servings: ["", Validators.required]
    });

    this.initIngredientControls();
  }

  initIngredientControls() {
    this.ingredientControls = [];
    this.ingredientControls.push({
      name: "ingredient1",
      control: this.recipeForm.controls.ingredient1
    });
  }

  addControl() {
    this.ingredientCount++;

    this.recipeForm.addControl(
      "ingredient" + this.ingredientCount,
      new FormControl("", Validators.required)
    );

    let ingredientName = "ingredient" + this.ingredientCount;
    this.ingredientControls.push({
      name: ingredientName,
      control: this.recipeForm.controls[ingredientName]
    });
  }

  removeControl(control, index) {
    this.recipeForm.removeControl(control.name);
    this.ingredientControls.splice(index, 1);
  }

  saveRecipe() {
    let recipeData = {ingredients: []};
    

    Object.keys(this.recipeForm.controls).forEach(key => {
      let value = this.recipeForm.controls[key].value;

      if (key.includes("ingredient")) {
        recipeData.ingredients.push(value);
      } else {
        recipeData[key] = value;
      }
    });

    this.recipesRef
      .add(recipeData)
      .then(doc => {
        console.log("document saved with id", doc.id);
      })
      .catch(error => {
        console.log(error);
      });
    this.initForm();
  }

}
