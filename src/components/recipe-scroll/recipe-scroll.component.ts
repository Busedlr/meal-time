import { Component, OnInit, ViewChild } from "@angular/core";
import { RecipeDataService } from "src/services/recipe-data.service";
import { IonSlides } from "@ionic/angular";

@Component({
  selector: "app-recipe-scroll",
  templateUrl: "./recipe-scroll.component.html",
  styleUrls: ["./recipe-scroll.component.scss"]
})
export class RecipeScrollComponent implements OnInit {
  @ViewChild("slides", { static: false }) slides: IonSlides;
  myRecipes: any = [];

  constructor(public recipeService: RecipeDataService) {
    this.getRecipes();
  }

  ngOnInit() {}

  getRecipes() {
    console.log("resipe scroll works");
    this.recipeService.getRecipes().then(result => {
      result.docs.forEach(doc => {
        let recipe = doc.data();
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
      slideShadows: true
    }
  };

  // merge these 2 functions into one
  next() {
    this.slides.getActiveIndex().then((res) => {
      console.log(res)
      this.slides.slideTo(res+2);
    })
  }

  prev() {
    this.slides.getActiveIndex().then((res) => {
      console.log(res)
      this.slides.slideTo(res-2);
    })
  }

  

}
