import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReclamationService } from '../core/services/reclamation.service';
import { OrderService } from '../core/services/order.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ClientRoutingModule,
    HttpClientModule
  ],
  providers: [
    ReclamationService,
    OrderService
  ]
})
export class ClientModule { }
