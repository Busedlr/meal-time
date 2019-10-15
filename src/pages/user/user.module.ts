import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UserPage } from './user.page';
import { UserProfileComponent } from 'src/components/user-profile/user-profile.component';
import { RecipeScrollComponent } from 'src/components/recipe-scroll/recipe-scroll.component';
import { ComponentsModule } from 'src/components/components.module';

const routes: Routes = [
  {
    path: '',
    component: UserPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [UserProfileComponent, RecipeScrollComponent],
  declarations: [UserPage, UserProfileComponent,RecipeScrollComponent]
})
export class UserPageModule {}
