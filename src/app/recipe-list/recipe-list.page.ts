import { Component, OnInit } from "@angular/core";
import { RecipeDataService } from "../services/recipe-data.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.page.html",
  styleUrls: ["./recipe-list.page.scss"]
})
export class RecipeListPage implements OnInit {
  db: any;
  recipes: any = [];
  imageUrl: any;

  constructor(public recipeService: RecipeDataService, private router: Router) {
    this.getRecipes();
  }

  ngOnInit() {}

  getRecipes() {
    this.recipeService.getRecipes().then(result => {
      result.docs.forEach(doc => {
        let recipe = doc.data();
        recipe.id = doc.id;
        this.recipeService.getRecipeImageUrl(recipe.path).then(url => {
          recipe.imageUrl = url;
          this.recipes.push(recipe);
        });
      });
    });
  }

  goToRecipeDetail(id) {
    this.recipeService.getRecipeDetail(id).then(result => {
      this.router.navigate(["recipe-detail"]);
      console.log(result.data().name); //delete this
    });
  }
}
