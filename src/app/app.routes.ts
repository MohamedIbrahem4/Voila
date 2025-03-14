import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./core/user-view/pages/user-view/user-view.component').then((m) => m.UserViewComponent),
    children: [
      {
        path: '',
        loadChildren: () => import('./components/home/home.routes').then(m => m.homeRoutes)
      },
    ]
  },
];
