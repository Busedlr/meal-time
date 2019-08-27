import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'signup', pathMatch: 'full' },
  { path: 'signup', loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)},
  { path: 'recipe-create', loadChildren: './recipe-create/recipe-create.module#RecipeCreatePageModule' },
  { path: 'recipe-list', loadChildren: './recipe-list/recipe-list.module#RecipeListPageModule' },
  { path: 'recipe-detail/:id', loadChildren: './recipe-detail/recipe-detail.module#RecipeDetailPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'user', loadChildren: './user/user.module#UserPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
