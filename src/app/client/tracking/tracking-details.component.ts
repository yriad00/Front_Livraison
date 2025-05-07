import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { MockDataService } from '../../core/services/mock-data.service';

@Component({
  selector: 'app-tracking-details',
  templateUrl: './tracking-details.component.html',
  styleUrls: ['./tracking-details.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class TrackingDetailsComponent implements OnInit {
  orderId: number | null = null;
  order: any = null;
  deliverySteps = [
    { 
      title: 'Order Confirmed', 
      time: 'Apr 16, 9:15 AM', 
      description: 'Your order has been received and confirmed',
      active: true,
      completed: true
    },
    { 
      title: 'Processing', 
      time: 'Apr 16, 10:30 AM', 
      description: 'Your order is being processed and prepared for shipping',
      active: true,
      completed: true
    },
    { 
      title: 'Out for Delivery', 
      time: 'Apr 16, 11:45 AM', 
      description: 'Your order is on its way to you',
      active: true,
      completed: false
    },
    { 
      title: 'Delivered', 
      time: 'Estimated: Apr 16, 1:00 PM', 
      description: 'Your order has been delivered',
      active: false,
      completed: false
    }
  ];
  
  deliveryAgent = {
    name: 'Jean Dupont',
    phone: '+33 6 12 34 56 78',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    vehicle: 'Motorcycle',
    rating: 4.8
  };

  constructor(
    private route: ActivatedRoute,
    private mockDataService: MockDataService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.orderId = +id;
        this.loadOrderDetails(this.orderId);
      }
    });
  }

  loadOrderDetails(orderId: number): void {
    this.mockDataService.getOrderById(orderId).subscribe(order => {
      this.order = order;
    });
  }

  getMapUrl(): string {
    // This would normally return a real map URL
    return 'https://maps.googleapis.com/maps/api/staticmap?center=Paris,France&zoom=13&size=600x300&maptype=roadmap&markers=color:red%7Clabel:A%7CParis,France&key=YOUR_API_KEY';
  }

  contactDeliveryAgent(): void {
    alert(`Calling delivery agent: ${this.deliveryAgent.phone}`);
  }
} 