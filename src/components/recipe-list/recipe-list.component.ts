import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  @Input() recipes: [];

  constructor() { }

  ngOnInit() {}

}
