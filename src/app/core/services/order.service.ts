import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MockDataService } from './mock-data.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private mockDataService: MockDataService) {}

  getOrders(): Observable<any[]> {
    return this.mockDataService.getOrders();
  }

  getOrdersByStatus(status: string): Observable<any[]> {
    return this.mockDataService.getOrdersByStatus(status);
  }

  getOrderById(id: number): Observable<any> {
    return this.mockDataService.getOrderById(id);
  }
} 