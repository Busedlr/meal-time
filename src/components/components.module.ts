import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import {  RouterModule } from '@angular/router';

import { HeaderComponent } from "./header/header.component";
import { RecipeScrollComponent } from './recipe-scroll/recipe-scroll.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
  declarations: [HeaderComponent,RecipeScrollComponent],
  exports: [HeaderComponent, RecipeScrollComponent]
})
export class ComponentsModule {}
