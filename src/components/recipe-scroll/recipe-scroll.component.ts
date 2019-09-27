import { Component, OnInit } from "@angular/core";
import { RecipeDataService } from "src/services/recipe-data.service";

@Component({
  selector: "app-recipe-scroll",
  templateUrl: "./recipe-scroll.component.html",
  styleUrls: ["./recipe-scroll.component.scss"]
})
export class RecipeScrollComponent implements OnInit {
  myRecipes: any = [];

  constructor(public recipeService: RecipeDataService) {
    this.getRecipes();
  }

  ngOnInit() {}

  getRecipes() {
    console.log("resipe scroll works")
    this.recipeService.getRecipes().then(result => {
      result.docs.forEach(doc => {
        console.log("doc", doc)
        let recipe = doc.data();
        console.log("recipe", recipe)
        recipe.id = doc.id;
        this.recipeService.getRecipeImageUrl(recipe.path).then(url => {
          recipe.imageUrl = url;
          this.myRecipes.push(recipe);
        });
      });
    });
  }

  slideOpts = {
    slidesPerView: 4,
    freeMode: false,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
  }
}
