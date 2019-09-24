import { Component, OnInit } from "@angular/core";
import { RecipeDataService } from "../../services/recipe-data.service";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";

import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-recipe-create",
  templateUrl: "./recipe-create.page.html",
  styleUrls: ["./recipe-create.page.scss"]
})
export class RecipeCreatePage implements OnInit {
  user: any;
  recipeForm: FormGroup;
  ingredientCount = 1;
  ingredientControls: any[] = [];
  stepCount = 1;
  stepControls: any[] = [];
  imageValid: boolean = false;
  file: any;
  recipeImageInput: string = "recipeImage";

  constructor(
    public formBuilder: FormBuilder,
    public recipeService: RecipeDataService,
    public activatedRoute: ActivatedRoute
  ) {
    this.initForm();
    this.getUser();
  }

  ngOnInit() {}

  getUser() {
    this.activatedRoute.queryParams.subscribe(res => {
      this.user = res;
    });
  }

  initForm() {
    this.recipeForm = this.formBuilder.group({
      ingredient1: [
        "ing1",
        Validators.compose([
          Validators.maxLength(50),
          Validators.minLength(2),
          Validators.required
        ])
      ],
      name: [
        "",
        Validators.compose([
          Validators.maxLength(100),
          Validators.minLength(3),
          Validators.required
        ])
      ],
      servings: [8, Validators.required],
      prepTime: [15, Validators.required],
      cookingTime: [20, Validators.required],
      step1: ["step 1", Validators.required]
    });

    this.initIngredientControls();
    this.initStepControls();
    this.imageValid = false;
  }

  saveRecipe() {
    let recipeData = { ingredients: [], steps: []};

    Object.keys(this.recipeForm.controls).forEach(key => {
      const value = this.recipeForm.controls[key].value;
      recipeData['path'] = "recipe_images/" + this.recipeForm.controls.name.value;
      recipeData['userId'] = this.user.id;
      if (key.includes("ingredient")) {
        recipeData.ingredients.push(value);
      } else if (key.includes("step")) {
        recipeData.steps.push(value);
      } else {
        recipeData[key] = value;
      }
    });
    this.recipeService.saveRecipe(recipeData).then(() => {
      this.recipeService.addRecipeImage(this.file, recipeData['path']).then(() => {
        this.initForm();
        this.resetInput(this.recipeImageInput);
      });
    });
  }

  selectFile(event) {
    this.imageValid = false;
    this.file = event.srcElement.files[0];
    if (
      this.file &&
      (this.file.type === "image/jpeg" || this.file.type === "image/png") &&
      this.file.size <= 5e6
    ) {
      this.imageValid = true;
    }
  }

  resetInput(inputId) {
    let fileInput = document.getElementById(inputId) as HTMLInputElement;
    fileInput.value = "";
  }

  initIngredientControls() {
    this.ingredientControls = [];
    this.ingredientControls.push({
      name: "ingredient1",
      control: this.recipeForm.controls.ingredient1
    });
  }

  addIngredientControl() {
    this.ingredientCount++;

    this.recipeForm.addControl(
      "ingredient" + this.ingredientCount,
      new FormControl("", Validators.required)
    );

    const ingredientName = "ingredient" + this.ingredientCount;
    this.ingredientControls.push({
      name: ingredientName,
      control: this.recipeForm.controls[ingredientName]
    });

    setTimeout(() => {
      this.focusInput(ingredientName);
    }, 100);
  }

  initStepControls() {
    this.stepControls = [];
    this.stepControls.push({
      name: "step1",
      control: this.recipeForm.controls.step1
    });
  }

  focusInput(id) {
    const doc: any = document.getElementById(id);
    doc.setFocus();
  }

  addStepControl() {
    this.stepCount++;

    this.recipeForm.addControl(
      "step" + this.stepCount,
      new FormControl("", Validators.required)
    );

    const stepName = "step" + this.stepCount;
    this.stepControls.push({
      name: stepName,
      control: this.recipeForm.controls[stepName]
    });
  }

  removeIngredientControl(control, index) {
    this.recipeForm.removeControl(control.name);
    this.ingredientControls.splice(index, 1);
  }

  removeStepControl(control, index) {
    this.recipeForm.removeControl(control.name);
    this.stepControls.splice(index, 1);
  }
}