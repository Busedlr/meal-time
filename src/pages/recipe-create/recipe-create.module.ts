import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecipeCreatePage } from './recipe-create.page';
import { ComponentsModule } from 'src/components/components.module';

const routes: Routes = [
  {
    path: '',
    component: RecipeCreatePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  declarations: [RecipeCreatePage]
})
export class RecipeCreatePageModule {}
