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
  paymentMethod: string;
}

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule]
})
export class AllOrdersComponent {
  searchTerm: string = '';
  statusFilter: string = 'all';

  // Mock data for orders
  orders: Order[] = [
    {
      id: 1001,
      customer: 'ABC Corporation',
      date: '2023-04-15',
      amount: '€1,250.00',
      status: 'delivered',
      address: '123 Business Avenue, Paris',
      paymentMethod: 'Credit Card'
    },
    {
      id: 1002,
      customer: 'XYZ Ltd',
      date: '2023-04-16',
      amount: '€980.50',
      status: 'processing',
      address: '456 Enterprise Street, Lyon',
      paymentMethod: 'Bank Transfer'
    },
    {
      id: 1003,
      customer: 'Tech Solutions',
      date: '2023-04-16',
      amount: '€2,340.00',
      status: 'shipped',
      address: '789 Technology Park, Marseille',
      paymentMethod: 'Credit Card'
    },
    {
      id: 1004,
      customer: 'Global Services',
      date: '2023-04-17',
      amount: '€780.25',
      status: 'pending',
      address: '101 Service Road, Toulouse',
      paymentMethod: 'PayPal'
    },
    {
      id: 1005,
      customer: 'City Logistics',
      date: '2023-04-17',
      amount: '€1,800.75',
      status: 'cancelled',
      address: '202 Logistics Avenue, Nice',
      paymentMethod: 'Bank Transfer'
    },
    {
      id: 1006,
      customer: 'SmartTech Inc',
      date: '2023-04-18',
      amount: '€3,420.00',
      status: 'pending',
      address: '303 Innovation Street, Bordeaux',
      paymentMethod: 'Credit Card'
    }
  ];

  get filteredOrders(): Order[] {
    return this.orders.filter(order => {
      // Apply status filter
      if (this.statusFilter !== 'all' && order.status !== this.statusFilter) {
        return false;
      }
      
      // Apply search filter
      if (this.searchTerm.trim() !== '') {
        const term = this.searchTerm.toLowerCase();
        return order.id.toString().includes(term) || 
               order.customer.toLowerCase().includes(term) ||
               order.address.toLowerCase().includes(term);
      }
      
      return true;
    });
  }

  viewOrderDetails(orderId: number): void {
    alert(`Viewing details for Order #${orderId}`);
  }

  deleteOrder(orderId: number): void {
    if (confirm(`Are you sure you want to delete Order #${orderId}?`)) {
      this.orders = this.orders.filter(order => order.id !== orderId);
    }
  }
} 