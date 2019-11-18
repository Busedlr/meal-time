import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { IonSlides } from "@ionic/angular";

@Component({
  selector: "slide",
  templateUrl: "./slide.component.html",
  styleUrls: ["./slide.component.scss"]
})
export class SlideComponent implements OnInit {
  @ViewChild("slides", { static: false }) slides: IonSlides;
  user: any;
  @Input() recipes: [];
  @Input() recipeListName: any;
  scroll: boolean = false;

  constructor() {
  }

  ngOnInit() {
    
  }

  ngOnChanges() {
    
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

scrolling() {
  this.slides.length().then(res => {
    console.log('res', res)
    if(res > 4) {
      this.scroll = true;
      console.log('scroll', this.scroll)
    }
  })
      
}

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
