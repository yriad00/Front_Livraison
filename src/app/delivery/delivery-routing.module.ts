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
    path: 'orders',
    loadComponent: () => import('./order-queue/order-queue.component').then(c => c.OrderQueueComponent)
  },
  {
    path: 'map',
    loadComponent: () => import('./order-map/order-map.component').then(c => c.OrderMapComponent)
  },
  {
    path: 'delivery/:id',
    loadComponent: () => import('./delivery-details/delivery-details.component').then(c => c.DeliveryDetailsComponent)
  },
  {
    path: 'history',
    loadComponent: () => import('./delivery-history/delivery-history.component').then(c => c.DeliveryHistoryComponent)
  },
  {
    path: 'reviews',
    loadComponent: () => import('./reviews/reviews.component').then(c => c.ReviewsComponent)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryRoutingModule { }
