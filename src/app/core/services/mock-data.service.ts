import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  private orders = [
    {
      id: 1001,
      clientName: 'John Doe',
      clientPhone: '+33 6 12 34 56 78',
      deliveryAddress: '123 Rue de Paris, 75001 Paris',
      orderDate: new Date('2023-04-15T10:30:00'),
      estimatedDelivery: new Date('2023-04-15T14:30:00'),
      status: 'delivered',
      items: ['Laptop', 'Mouse', 'Keyboard'],
      deliveryNotes: 'Leave at reception'
    },
    {
      id: 1002,
      clientName: 'Jane Smith',
      clientPhone: '+33 6 98 76 54 32',
      deliveryAddress: '456 Avenue des Champs-Élysées, 75008 Paris',
      orderDate: new Date('2023-04-16T09:15:00'),
      estimatedDelivery: new Date('2023-04-16T13:00:00'),
      status: 'in-progress',
      items: ['Smartphone', 'Phone Case', 'Screen Protector'],
      deliveryNotes: 'Call before arrival'
    },
    {
      id: 1003,
      clientName: 'Robert Johnson',
      clientPhone: '+33 6 45 67 89 01',
      deliveryAddress: '789 Boulevard Saint-Germain, 75007 Paris',
      orderDate: new Date('2023-04-16T14:45:00'),
      estimatedDelivery: new Date('2023-04-16T17:30:00'),
      status: 'pending',
      items: ['Tablet', 'Charger'],
      deliveryNotes: ''
    },
    {
      id: 1004,
      clientName: 'Alice Martin',
      clientPhone: '+33 6 23 45 67 89',
      deliveryAddress: '101 Rue de Rivoli, 75001 Paris',
      orderDate: new Date('2023-04-17T11:00:00'),
      estimatedDelivery: new Date('2023-04-17T15:00:00'),
      status: 'cancelled',
      items: ['Headphones'],
      deliveryNotes: 'Customer cancelled'
    },
    {
      id: 1005,
      clientName: 'Michel Dupont',
      clientPhone: '+33 6 34 56 78 90',
      deliveryAddress: '202 Avenue Montaigne, 75008 Paris',
      orderDate: new Date('2023-04-17T16:30:00'),
      estimatedDelivery: new Date('2023-04-18T10:00:00'),
      status: 'pending',
      items: ['Desktop Computer', 'Monitor', 'Speakers'],
      deliveryNotes: 'Heavy items, need two delivery persons'
    }
  ];

  private reclamations = [
    {
      id: 2001,
      clientName: 'John Doe',
      orderId: 1001,
      submissionDate: new Date('2023-04-16T11:30:00'),
      status: 'closed',
      issue: 'Damaged Item',
      description: 'The laptop was damaged during delivery. The screen is cracked.'
    },
    {
      id: 2002,
      clientName: 'Michel Dupont',
      orderId: 1005,
      submissionDate: new Date('2023-04-18T14:00:00'),
      status: 'new',
      issue: 'Wrong Item',
      description: 'I ordered a 27" monitor but received a 24" one.'
    },
    {
      id: 2003,
      clientName: 'Jane Smith',
      orderId: 1002,
      submissionDate: new Date('2023-04-17T09:45:00'),
      status: 'in-progress',
      issue: 'Late Delivery',
      description: 'My order was supposed to arrive yesterday but I still haven\'t received it.'
    }
  ];

  private billingHistory = [
    {
      id: 'INV-001',
      date: new Date('2023-03-15'),
      amount: 29.99,
      description: 'Monthly Subscription - Basic Plan',
      status: 'paid',
      invoiceUrl: '/assets/invoices/INV-001.pdf'
    },
    {
      id: 'INV-002',
      date: new Date('2023-04-15'),
      amount: 29.99,
      description: 'Monthly Subscription - Basic Plan',
      status: 'paid',
      invoiceUrl: '/assets/invoices/INV-002.pdf'
    },
    {
      id: 'INV-003',
      date: new Date('2023-05-15'),
      amount: 59.99,
      description: 'Monthly Subscription - Pro Plan (Upgrade)',
      status: 'pending',
      invoiceUrl: '/assets/invoices/INV-003.pdf'
    }
  ];

  constructor() { }

  getOrders(): Observable<any[]> {
    return of(this.orders);
  }

  getOrdersByStatus(status: string): Observable<any[]> {
    if (status === 'all') {
      return of(this.orders);
    }
    return of(this.orders.filter(order => order.status === status));
  }

  getOrderById(id: number): Observable<any> {
    const order = this.orders.find(o => o.id === id);
    return of(order);
  }

  getReclamations(): Observable<any[]> {
    return of(this.reclamations);
  }

  getReclamationsByStatus(status: string): Observable<any[]> {
    if (status === 'all') {
      return of(this.reclamations);
    }
    return of(this.reclamations.filter(rec => rec.status === status));
  }

  getReclamationById(id: number): Observable<any> {
    const reclamation = this.reclamations.find(r => r.id === id);
    return of(reclamation);
  }

  getBillingHistory(): Observable<any[]> {
    return of(this.billingHistory);
  }
} 