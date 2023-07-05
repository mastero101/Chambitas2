import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NavBarPageModule } from './nav-bar/nav-bar.module';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'nav',
    loadChildren: () => import('./nav-bar/nav-bar.module').then( m => m.NavBarPageModule)
  },
  {
    path: 'computo',
    loadChildren: () => import('./computo/computo.module').then( m => m.ComputoPageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
