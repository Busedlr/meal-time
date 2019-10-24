import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('../pages/home/home.module').then( m => m.HomePageModule)},
  { path: 'recipe-create', loadChildren: '../pages/recipe-create/recipe-create.module#RecipeCreatePageModule' },
  { path: 'recipe-list', loadChildren: '../pages/recipe-list/recipe-list.module#RecipeListPageModule' },
  { path: 'recipe-detail/:id', loadChildren: '../pages/recipe-detail/recipe-detail.module#RecipeDetailPageModule' },
  { path: 'login', loadChildren: '../pages/login/login.module#LoginPageModule' },
  { path: 'signup', loadChildren: '../pages/signup/signup.module#SignupPageModule' },
  { path: 'user', loadChildren: '../pages/user/user.module#UserPageModule' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
