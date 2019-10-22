import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { IonSlides } from "@ionic/angular";

@Component({
  selector: "app-recipe-scroll",
  templateUrl: "./recipe-scroll.component.html",
  styleUrls: ["./recipe-scroll.component.scss"]
})
export class RecipeScrollComponent implements OnInit {
  @ViewChild("slides", { static: false }) slides: IonSlides;
  user: any;
  @Input() recipes: [];
  @Input() recipeListName: any;
  
  constructor() {}

  ngOnInit() {}

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
    this.slides.getActiveIndex().then(res => {
      this.slides.slideTo(res + 2);
    });
  }

  prev() {
    this.slides.getActiveIndex().then(res => {
      this.slides.slideTo(res - 2);
    });
  }
}
