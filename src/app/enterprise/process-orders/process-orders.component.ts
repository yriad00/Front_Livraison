import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Order {
  id: number;
  customer: string;
  date: string;
  amount: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  address: string;
  agent?: string;
}

@Component({
  selector: 'app-process-orders',
  templateUrl: './process-orders.component.html',
  styleUrls: ['./process-orders.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule]
})
export class ProcessOrdersComponent {
  // Mock data for orders
  orders: Order[] = [
    {
      id: 1004,
      customer: 'Global Services',
      date: '2023-04-17',
      amount: '€780.25',
      status: 'pending',
      address: '101 Service Road, Toulouse'
    },
    {
      id: 1006,
      customer: 'SmartTech Inc',
      date: '2023-04-18',
      amount: '€3,420.00',
      status: 'pending',
      address: '303 Innovation Street, Bordeaux'
    },
    {
      id: 1002,
      customer: 'XYZ Ltd',
      date: '2023-04-16',
      amount: '€980.50',
      status: 'processing',
      address: '456 Enterprise Street, Lyon',
      agent: 'Jean Dupont'
    },
    {
      id: 1003,
      customer: 'Tech Solutions',
      date: '2023-04-16',
      amount: '€2,340.00',
      status: 'shipped',
      address: '789 Technology Park, Marseille',
      agent: 'Marie Lambert'
    }
  ];

  // Mock data for available agents
  availableAgents = [
    'Jean Dupont',
    'Marie Lambert',
    'Pierre Martin',
    'Sophie Bernard',
    'Lucas Moreau'
  ];

  selectedOrder: Order | null = null;
  selectedAgent: string = '';
  processingStep: 'select' | 'assign' | 'confirm' = 'select';

  selectOrder(order: Order): void {
    this.selectedOrder = order;
    this.selectedAgent = order.agent || '';
    this.processingStep = 'assign';
  }

  assignAgent(): void {
    if (this.selectedOrder && this.selectedAgent) {
      this.processingStep = 'confirm';
    }
  }

  confirmProcessing(): void {
    if (this.selectedOrder && this.selectedAgent) {
      // In a real app, you would call an API to update the order
      // Here we just update it in our local array
      const index = this.orders.findIndex(o => o.id === this.selectedOrder?.id);
      if (index !== -1) {
        this.orders[index].agent = this.selectedAgent;
        this.orders[index].status = 'processing';
      }
      
      // Reset the form state
      this.resetForm();
      alert('Order has been assigned and is now being processed.');
    }
  }

  cancelProcessing(): void {
    this.resetForm();
  }

  resetForm(): void {
    this.selectedOrder = null;
    this.selectedAgent = '';
    this.processingStep = 'select';
  }
} 