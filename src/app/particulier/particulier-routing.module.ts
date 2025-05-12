import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ParticulierLayoutComponent } from './layout/particulier-layout.component';

const routes: Routes = [
  {
    path: '',
    component: ParticulierLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'all-orders',
        loadComponent: () => import('./all-orders/all-orders.component').then(c => c.AllOrdersComponent)
      },
      {
        path: 'delivery-agents',
        loadComponent: () => import('./delivery-agents/delivery-agents.component').then(c => c.DeliveryAgentsComponent)
      },
      {
        path: 'reclamations',
        loadComponent: () => import('./reclamation/reclamation.component').then(c => c.ReclamationComponent)
      },
      {
        path: 'platform-issue',
        loadComponent: () => import('./platform-issue/platform-issue.component').then(c => c.PlatformIssueComponent)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParticulierRoutingModule { }
