import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import {  RouterModule } from '@angular/router';

import { HeaderComponent } from "./header/header.component";
import { RecipeScrollComponent } from './recipe-scroll/recipe-scroll.component';
import { RecipeScrollDownComponent } from './recipe-scroll-down/recipe-scroll-down.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
  declarations: [HeaderComponent,RecipeScrollComponent, RecipeScrollDownComponent],
  exports: [HeaderComponent, RecipeScrollComponent, RecipeScrollDownComponent]
})
export class ComponentsModule {}
