import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'recipe-create', loadChildren: './recipe-create/recipe-create.module#RecipeCreatePageModule' },
  { path: 'recipe-list', loadChildren: './recipe-list/recipe-list.module#RecipeListPageModule' },
  { path: 'recipe-detail/:id', loadChildren: './recipe-detail/recipe-detail.module#RecipeDetailPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
