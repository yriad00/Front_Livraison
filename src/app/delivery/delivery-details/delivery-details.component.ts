import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface DeliveryStatus {
  name: string;
  completed: boolean;
  timestamp?: Date;
  proofImage?: string;
  notes?: string;
  returnReason?: string;
}

@Component({
  selector: 'app-delivery-details',
  templateUrl: './delivery-details.component.html',
  styleUrls: ['./delivery-details.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule]
})
export class DeliveryDetailsComponent implements OnInit {
  orderId: number = 0;
  currentStep: number = 0;
  selectedImage: File | null = null;
  notes: string = '';
  
  // Mock order data
  order = {
    id: 1003,
    client: 'Robert Johnson',
    phone: '+33 6 12 34 56 78',
    address: '789 Boulevard Saint-Germain, Paris',
    items: [
      { name: 'MacBook Pro', quantity: 1 },
      { name: 'Magic Mouse', quantity: 2 },
      { name: 'USB-C Adapter', quantity: 3 }
    ],
    total: '2450.00 €',
    paymentMethod: 'Credit Card',
    specialInstructions: 'Call when arrived. Apartment on 3rd floor.'
  };
  
  deliveryStatuses: DeliveryStatus[] = [
    { name: 'Order Accepted', completed: true, timestamp: new Date(Date.now() - 60 * 60 * 1000) },
    { name: 'Picked Up from Warehouse', completed: false },
    { name: 'On the Way', completed: false },
    { name: 'Delivered', completed: false },
    { name: 'Returned', completed: false }
  ];

  returnReasons: string[] = [
    'Client Absent',
    'Address Not Found',
    'Client Refused Package',
    'Damaged Package',
    'Other'
  ];
  
  selectedReturnReason: string = '';
  showReturnOptions: boolean = false;
  
  constructor(private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.orderId = +id;
      }
    });
    
    // Find the current active step
    for (let i = 0; i < this.deliveryStatuses.length; i++) {
      if (!this.deliveryStatuses[i].completed) {
        this.currentStep = i;
        break;
      }
    }
  }
  
  onFileSelected(event: any): void {
    this.selectedImage = event.target.files[0];
  }
  
  updateDeliveryStatus(): void {
    if (this.currentStep < this.deliveryStatuses.length) {
      this.deliveryStatuses[this.currentStep].completed = true;
      this.deliveryStatuses[this.currentStep].timestamp = new Date();
      this.deliveryStatuses[this.currentStep].notes = this.notes;
      
      if (this.selectedImage) {
        // In a real app, you'd upload the image
        // Here we just create a mock URL
        this.deliveryStatuses[this.currentStep].proofImage = 'delivery-proof.jpg';
      }
      
      this.notes = '';
      this.selectedImage = null;
      
      if (this.currentStep < this.deliveryStatuses.length - 1) {
        this.currentStep++;
      }
    }
  }
  
  markAsReturned(): void {
    if (this.selectedReturnReason) {
      // Skip to the 'Returned' status (which is the last one)
      this.currentStep = 4; // Index of 'Returned' status
      
      this.deliveryStatuses[this.currentStep].completed = true;
      this.deliveryStatuses[this.currentStep].timestamp = new Date();
      this.deliveryStatuses[this.currentStep].notes = this.notes;
      this.deliveryStatuses[this.currentStep].returnReason = this.selectedReturnReason;
      
      if (this.selectedImage) {
        // In a real app, you'd upload the image
        // Here we just create a mock URL
        this.deliveryStatuses[this.currentStep].proofImage = 'return-proof.jpg';
      }
      
      this.notes = '';
      this.selectedImage = null;
      this.selectedReturnReason = '';
      this.showReturnOptions = false;
    }
  }
  
  toggleReturnOptions(): void {
    this.showReturnOptions = !this.showReturnOptions;
  }
} 