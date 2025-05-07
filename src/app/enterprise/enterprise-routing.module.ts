import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
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
    path: 'import-orders',
    loadComponent: () => import('./import-orders/import-orders.component').then(c => c.ImportOrdersComponent)
  },
  {
    path: 'all-orders',
    loadComponent: () => import('./all-orders/all-orders.component').then(c => c.AllOrdersComponent)
  },
  {
    path: 'process-orders',
    loadComponent: () => import('./process-orders/process-orders.component').then(c => c.ProcessOrdersComponent)
  },
  {
    path: 'agents',
    loadComponent: () => import('./agents/agents.component').then(c => c.AgentsComponent)
  },
  {
    path: 'delivery-agents',
    loadComponent: () => import('./delivery-agents/delivery-agents.component').then(c => c.DeliveryAgentsComponent)
  },
  {
    path: 'reclamations',
    loadComponent: () => import('./reclamation-list/reclamation-list.component').then(c => c.ReclamationListComponent)
  },
  {
    path: 'platform-issue',
    loadComponent: () => import('./platform-issue/platform-issue.component').then(c => c.PlatformIssueComponent)
  },
  {
    path: 'billing',
    loadComponent: () => import('./billing/billing.component').then(c => c.BillingComponent)
  },
  {
    path: 'subscription',
    loadComponent: () => import('./subscription/subscription.component').then(c => c.SubscriptionComponent)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnterpriseRoutingModule { }
