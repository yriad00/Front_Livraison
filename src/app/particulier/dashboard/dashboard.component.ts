import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { cardAnimation, listAnimation } from '../../shared/animations/route-animations';

interface User {
  firstName: string;
  lastName: string;
}

interface Agent {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  reviews: number;
  area: string;
  deliveries: number;
  status: 'Active' | 'Busy' | 'Offline';
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
  animations: [cardAnimation, listAnimation]
})
export class DashboardComponent implements OnInit {
  currentUser: User = { firstName: 'John', lastName: 'Doe' };
  orders = [
    { id: 'IND-1002', date: 'May 6, 2025', status: 'In Progress', destination: '123 Main St, Paris', action: 'Track' },
    { id: 'IND-1001', date: 'May 5, 2025', status: 'Delivered', destination: '456 Oak Ave, Lyon', action: 'View' },
    { id: 'IND-998', date: 'May 1, 2025', status: 'Delivered', destination: '789 Pine Rd, Marseille', action: 'View' }
  ];
  recentActivity = [
    { type: 'Order Created', date: 'May 6, 2025', details: 'Order #IND-1002 created' },
    { type: 'Delivery Completed', date: 'May 5, 2025', details: 'Order #IND-1001 delivered successfully' },
    { type: 'Payment Processed', date: 'May 5, 2025', details: '€45.00 payment for order #IND-1001' }
  ];
  summaryData = {
    activeOrders: 3,
    totalOrders: 12,
    pendingDeliveries: 2,
    completed: 10
  };

  availableAgents: Agent[] = [
    {
      id: 'AG-001',
      name: 'David Martin',
      rating: 4.8,
      reviews: 156,
      area: 'Central Paris',
      deliveries: 312,
      status: 'Active'
    },
    {
      id: 'AG-008',
      name: 'Sophie Laurent',
      avatar: 'assets/images/agents/sophie.jpg',
      rating: 4.9,
      reviews: 241,
      area: 'West Paris',
      deliveries: 428,
      status: 'Active'
    },
    {
      id: 'AG-015',
      name: 'Thomas Dubois',
      rating: 4.7,
      reviews: 89,
      area: 'North Paris',
      deliveries: 156,
      status: 'Busy'
    },
    {
      id: 'AG-023',
      name: 'Emma Blanc',
      avatar: 'assets/images/agents/emma.jpg',
      rating: 4.6,
      reviews: 72,
      area: 'South Paris',
      deliveries: 108,
      status: 'Active'
    }
  ];

  constructor() {}

  ngOnInit(): void {}
  
  requestAgent(agentId: string): void {
    console.log(`Requesting agent ${agentId}`);
    // Implementation for requesting an agent would go here
  }
}