import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    children: [
      {
        path: '',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'principal',
        children: [
          {
            path: '',
            loadChildren: () => import('./principal/principal.module').then(m => m.PrincipalPageModule)

          },
          {
            path: 'mapa/:geo',
            loadChildren: () => import('./pages/mapa/mapa.module').then(m => m.MapaPageModule)
          }
          ,
          {
            path: 'userinformation/:text',
            loadChildren: () => import('./pages/userinformation/userinformation.module').then(m => m.UserinformationPageModule)
          }

        ]
      }
    ]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
]
  ;

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
