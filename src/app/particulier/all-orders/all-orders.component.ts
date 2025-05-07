import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class AllOrdersComponent implements OnInit {
  orders: any[] = [];

  constructor() {}

  ngOnInit(): void {
    // Mock data - would be replaced with actual API call
    this.orders = [
      {
        id: 'ORD-1001',
        date: '2025-05-01',
        status: 'Delivered',
        destination: '123 Main St, Paris',
        amount: '€24.99'
      },
      {
        id: 'ORD-1002',
        date: '2025-05-03',
        status: 'In Transit',
        destination: '456 Oak Ave, Lyon',
        amount: '€18.50'
      },
      {
        id: 'ORD-1003',
        date: '2025-05-05',
        status: 'Processing',
        destination: '789 Pine Rd, Marseille',
        amount: '€32.75'
      },
      {
        id: 'ORD-1004',
        date: '2025-05-06',
        status: 'Pending',
        destination: '321 Elm Blvd, Nice',
        amount: '€15.25'
      }
    ];
  }
}
