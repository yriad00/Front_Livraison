import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface DeliveryRecord {
  id: number;
  orderId: string;
  date: Date;
  clientName: string;
  address: string;
  status: 'completed' | 'canceled' | 'returned';
}

@Component({
  selector: 'app-delivery-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delivery-history.component.html',
  styleUrl: './delivery-history.component.scss'
})
export class DeliveryHistoryComponent {
  deliveryHistory: DeliveryRecord[] = [
    {
      id: 1,
      orderId: 'ORD-001',
      date: new Date('2025-05-01'),
      clientName: 'John Doe',
      address: '123 Main St, Anytown',
      status: 'completed'
    },
    {
      id: 2,
      orderId: 'ORD-002',
      date: new Date('2025-04-29'),
      clientName: 'Jane Smith',
      address: '456 Oak Ave, Somewhere',
      status: 'completed'
    },
    {
      id: 3,
      orderId: 'ORD-003',
      date: new Date('2025-04-28'),
      clientName: 'Mark Johnson',
      address: '789 Pine Rd, Elsewhere',
      status: 'canceled'
    },
    {
      id: 4,
      orderId: 'ORD-004',
      date: new Date('2025-04-27'),
      clientName: 'Sarah Williams',
      address: '321 Elm Blvd, Nowhere',
      status: 'returned'
    }
  ];

  filterDeliveries(status: string | null = null): void {
    if (!status) {
      // Reset filter
      this.deliveryHistory = this.getHistoricalDeliveries();
    } else {
      this.deliveryHistory = this.getHistoricalDeliveries().filter(
        delivery => delivery.status === status
      );
    }
  }

  private getHistoricalDeliveries(): DeliveryRecord[] {
    // In a real app, this would fetch from an API
    return [
      {
        id: 1,
        orderId: 'ORD-001',
        date: new Date('2025-05-01'),
        clientName: 'John Doe',
        address: '123 Main St, Anytown',
        status: 'completed'
      },
      {
        id: 2,
        orderId: 'ORD-002',
        date: new Date('2025-04-29'),
        clientName: 'Jane Smith',
        address: '456 Oak Ave, Somewhere',
        status: 'completed'
      },
      {
        id: 3,
        orderId: 'ORD-003',
        date: new Date('2025-04-28'),
        clientName: 'Mark Johnson',
        address: '789 Pine Rd, Elsewhere',
        status: 'canceled'
      },
      {
        id: 4,
        orderId: 'ORD-004',
        date: new Date('2025-04-27'),
        clientName: 'Sarah Williams',
        address: '321 Elm Blvd, Nowhere',
        status: 'returned'
      }
    ];
  }
}
