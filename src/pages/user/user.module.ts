import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UserPage } from './user.page';
import { UserProfileComponent } from 'src/components/user-profile/user-profile.component';
import { HeaderComponent } from 'src/components/header/header.component';

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
    RouterModule.forChild(routes)
  ],
  entryComponents: [UserProfileComponent, HeaderComponent],
  declarations: [UserPage, UserProfileComponent, HeaderComponent]
})
export class UserPageModule {}