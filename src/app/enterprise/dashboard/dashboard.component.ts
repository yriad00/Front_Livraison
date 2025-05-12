import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { trigger, style, animate, transition, query, stagger, state } from '@angular/animations';

interface User {
  firstName: string;
  lastName: string;
  company: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(15px)' }),
          stagger(80, [
            animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.6s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('fadeInRight', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-20px)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ]),
    trigger('pulse', [
      state('pulse', style({ transform: 'scale(1)' })),
      transition('* => pulse', [
        animate('0.5s ease-in-out', style({ transform: 'scale(1.05)' })),
        animate('0.5s ease-in-out', style({ transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class DashboardComponent implements OnInit {
  currentUser: User = { firstName: 'Jane', lastName: 'Smith', company: 'TechCorp Logistics' };
  orderStats = {
    pending: 78,
    processing: 112,
    transit: 143,
    delivered: 123,
    total: 456
  };
  
  recentOrders = [
    { id: 'ORD-12345', date: '2023-07-15', client: 'TechCorp Inc.', status: 'Delivered', items: '3 items', total: '€349.99' },
    { id: 'ORD-12346', date: '2023-07-16', client: 'GlobalTech Ltd.', status: 'In Transit', items: '5 items', total: '€529.99' },
    { id: 'ORD-12347', date: '2023-07-17', client: 'InnoSystems', status: 'Processing', items: '2 items', total: '€189.50' },
    { id: 'ORD-12348', date: '2023-07-18', client: 'NextGen Solutions', status: 'Pending', items: '7 items', total: '€899.99' },
    { id: 'ORD-12349', date: '2023-07-19', client: 'EcoTech Industries', status: 'Delivered', items: '1 item', total: '€129.99' }
  ];
  
  agentActivity = [
    { id: 'AG-001', name: 'John Smith', status: 'Active', deliveries: 42, area: 'North' },
    { id: 'AG-002', name: 'Emily Johnson', status: 'Active', deliveries: 38, area: 'Central' },
    { id: 'AG-003', name: 'Michael Brown', status: 'Idle', deliveries: 27, area: 'South' },
    { id: 'AG-004', name: 'Jessica Miller', status: 'Active', deliveries: 31, area: 'East' }
  ];
  
  animationState = '';

  constructor() {}

  ngOnInit(): void {
    // Trigger animations on page load
    setTimeout(() => {
      this.animationState = 'pulse';
    }, 1000);
  }
  
  pulseAnimation() {
    this.animationState = '';
    setTimeout(() => {
      this.animationState = 'pulse';
    }, 100);
  }

  getStatusInFrench(status: string): string {
    const statusMap: {[key: string]: string} = {
      'Pending': 'En Attente',
      'Processing': 'En Traitement',
      'In Transit': 'En Transit',
      'Delivered': 'Livré',
      'Ready for pickup': 'Prêt pour enlèvement',
      'Waiting': 'En Attente',
      'Cancelled': 'Annulé',
      'Active': 'Actif',
      'Idle': 'Inactif'
    };
    
    return statusMap[status] || status;
  }
}