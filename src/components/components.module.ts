import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import {  RouterModule } from '@angular/router';

import { HeaderComponent } from "./header/header.component";
import { SlideComponent } from './slide/slide.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
  declarations: [HeaderComponent,SlideComponent, RecipeListComponent, UserProfileComponent],
  exports: [HeaderComponent, SlideComponent, RecipeListComponent]
})
export class ComponentsModule {}
