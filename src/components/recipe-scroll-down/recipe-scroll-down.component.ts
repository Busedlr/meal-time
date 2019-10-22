import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-recipe-scroll-down',
  templateUrl: './recipe-scroll-down.component.html',
  styleUrls: ['./recipe-scroll-down.component.scss'],
})
export class RecipeScrollDownComponent implements OnInit {
  @Input() recipes: [];

  constructor() { }

  ngOnInit() {}

}
