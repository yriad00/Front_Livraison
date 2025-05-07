import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full' 
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component').then(c => c.LoginComponent)
  },
  {
    path: 'auth',
    children: [
      {
        path: 'register',
        loadComponent: () => import('./auth/register/register.component').then(c => c.RegisterComponent)
      },
      {
        path: 'register-enterprise',
        loadComponent: () => import('./auth/register-enterprise/register-enterprise.component').then(c => c.RegisterEnterpriseComponent)
      }
    ]
  },
  {
    path: 'register',
    redirectTo: 'auth/register',
    pathMatch: 'full'
  },
  {
    path: 'client',
    loadChildren: () => import('./client/client.module').then(m => m.ClientModule),
    canActivate: [AuthGuard],
    data: { roles: ['client', 'admin'] }
  },
  {
    path: 'delivery',
    loadChildren: () => import('./delivery/delivery.module').then(m => m.DeliveryModule),
    canActivate: [AuthGuard],
    data: { roles: ['delivery'] }
  },
  {
    path: 'enterprise',
    loadChildren: () => import('./enterprise/enterprise.module').then(m => m.EnterpriseModule),
    canActivate: [AuthGuard],
    data: { roles: ['enterprise'] }
  },
  {
    path: 'particulier',
    loadChildren: () => import('./particulier/particulier.module').then(m => m.ParticulierModule),
    canActivate: [AuthGuard],
    data: { roles: ['particulier'] }
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'unauthorized',
    loadComponent: () => import('./shared/components/unauthorized/unauthorized.component').then(c => c.UnauthorizedComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./shared/components/not-found/not-found.component').then(c => c.NotFoundComponent)
  }
];
