import { Component, OnInit } from "@angular/core";
import { RecipeDataService } from "../services/recipe-data.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.page.html",
  styleUrls: ["./recipe-detail.page.scss"]
})
export class RecipeDetailPage implements OnInit {
  recipeId: any;
  recipe: any = {};
  imageUrl: any;

  constructor(
    public recipeService: RecipeDataService,
    private route: ActivatedRoute
  ) {
    this.getRecipe();
  }

  ngOnInit() {}

  getRecipe() {
    this.recipeId = this.route.snapshot.paramMap.get("id");
    this.recipeService.getRecipeDetail(this.recipeId).then(result => {
      this.recipe = result.data();
      this.recipeService.getRecipeImageUrl(this.recipe.path).then(url => {
        this.imageUrl = url;
      });
    });
  }
}
