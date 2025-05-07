import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Order {
  id: number;
  client: string;
  address: string;
  distance: string;
  estimatedTime: string;
  status: 'pending' | 'accepted' | 'rejected';
}

@Component({
  selector: 'app-order-queue',
  templateUrl: './order-queue.component.html',
  styleUrls: ['./order-queue.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class OrderQueueComponent implements OnInit {
  orders: Order[] = [
    {
      id: 1006,
      client: 'Alice Brown',
      address: '123 Rue de Rivoli, Paris',
      distance: '3.2 km',
      estimatedTime: '15 min',
      status: 'pending'
    },
    {
      id: 1007,
      client: 'Tom Wilson',
      address: '45 Avenue Montaigne, Paris',
      distance: '2.8 km',
      estimatedTime: '12 min',
      status: 'pending'
    },
    {
      id: 1008,
      client: 'Emma Davis',
      address: '67 Rue Saint-Honoré, Paris',
      distance: '4.5 km',
      estimatedTime: '20 min',
      status: 'pending'
    },
    {
      id: 1009,
      client: 'Michael Lee',
      address: '89 Boulevard Haussmann, Paris',
      distance: '3.7 km',
      estimatedTime: '18 min',
      status: 'pending'
    },
    {
      id: 1010,
      client: 'Sophia Martinez',
      address: '12 Place Vendôme, Paris',
      distance: '2.5 km',
      estimatedTime: '10 min',
      status: 'pending'
    }
  ];

  acceptedOrders: Order[] = [];
  rejectedOrders: Order[] = [];

  ngOnInit(): void {}

  acceptOrder(order: Order): void {
    order.status = 'accepted';
    this.acceptedOrders.push(order);
    this.orders = this.orders.filter(o => o.id !== order.id);
  }

  rejectOrder(order: Order): void {
    order.status = 'rejected';
    this.rejectedOrders.push(order);
    this.orders = this.orders.filter(o => o.id !== order.id);
  }
}
