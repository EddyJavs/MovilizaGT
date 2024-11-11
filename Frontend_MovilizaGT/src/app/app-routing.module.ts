import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'create-route',
    loadChildren: () => import('./create-route/create-route.module').then( m => m.CreateRoutePageModule)
  },
  {
    path: 'search-route',
    loadChildren: () => import('./search-route/search-route.module').then( m => m.SearchRoutePageModule)
  },
  {
    path: 'search-results',
    loadChildren: () => import('./search-results/search-results.module').then( m => m.SearchResultsPageModule)
  },
  {
    path: 'passenger-trips',
    loadChildren: () => import('./passenger-trips/passenger-trips.module').then( m => m.PassengerTripsPageModule)
  },
  {
    path: 'conductor-trips',
    loadChildren: () => import('./conductor-trips/conductor-trips.module').then( m => m.ConductorTripsPageModule)
  },  {
    path: 'administrator',
    loadChildren: () => import('./administrator/administrator.module').then( m => m.AdministratorPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
