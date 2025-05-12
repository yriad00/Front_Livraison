import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { cardAnimation, listAnimation } from '../../shared/animations/route-animations';

interface User {
  firstName: string;
  lastName: string;
  vehicleType: string;
  rating: number;
}

interface DeliveryOrder {
  id: string;
  customer: string;
  address: string;
  status: string;
  time: string;
  distance: string;
  earnings: string;
}

interface EarningsSummary {
  today: string;
  week: string;
  month: string;
  deliveries: number;
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
  isOnline = true;
  
  currentUser: User = {
    firstName: 'Michael',
    lastName: 'Rodriguez',
    vehicleType: 'Motorcycle',
    rating: 4.8
  };
  
  earningsData: EarningsSummary = {
    today: '€45.50',
    week: '€285.75',
    month: '€1,250.00',
    deliveries: 28
  };
  
  pendingDeliveries: DeliveryOrder[] = [
    {
      id: 'DEL-5061',
      customer: 'Laura Martin',
      address: '123 Avenue Victor Hugo, Paris',
      status: 'Ready for pickup',
      time: '15 min',
      distance: '2.4 km',
      earnings: '€7.50'
    },
    {
      id: 'DEL-5062',
      customer: 'Thomas Dubois',
      address: '45 Rue de la République, Lyon',
      status: 'Waiting',
      time: '25 min',
      distance: '3.8 km',
      earnings: '€9.25'
    }
  ];
  
  recentDeliveries: DeliveryOrder[] = [
    {
      id: 'DEL-5060',
      customer: 'Sophie Bernard',
      address: '78 Boulevard Saint-Michel, Paris',
      status: 'Delivered',
      time: '35 min ago',
      distance: '4.2 km',
      earnings: '€10.75'
    },
    {
      id: 'DEL-5059',
      customer: 'Lucas Petit',
      address: '12 Place Bellecour, Lyon',
      status: 'Delivered',
      time: '1 hour ago',
      distance: '5.1 km',
      earnings: '€12.00'
    },
    {
      id: 'DEL-5058',
      customer: 'Emma Dupont',
      address: '35 Rue du Faubourg, Marseille',
      status: 'Delivered',
      time: '3 hours ago',
      distance: '3.7 km',
      earnings: '€9.50'
    }
  ];

  constructor() {}

  ngOnInit(): void {}
  
  toggleOnlineStatus(): void {
    this.isOnline = !this.isOnline;
  }

  getStatusInFrench(status: string): string {
    const statusMap: Record<string, string> = {
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