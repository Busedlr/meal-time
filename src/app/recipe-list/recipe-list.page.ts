import { Component, OnInit } from "@angular/core";
import { RecipeDataService } from "../services/recipe-data.service";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.page.html",
  styleUrls: ["./recipe-list.page.scss"]
})
export class RecipeListPage implements OnInit {
  db: any;
  recipes: any = [];
  imageUrl: any;

  constructor(public recipeService: RecipeDataService) {
    this.getRecipes();
  }

  ngOnInit() {}

  getRecipes() {
    this.recipeService.getRecipes().then(result => {
      result.docs.forEach(doc => {
        let recipe = doc.data();
        this.recipeService.getRecipeImageUrl(recipe.path).then(url => {
          recipe.imageUrl = url;
          this.recipes.push(recipe);
        });
      });
    });
  }
}
