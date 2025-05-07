import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule]
})
export class ReclamationComponent implements OnInit {
  reclamations: any[] = [];
  showNewReclamationForm: boolean = false;
  newReclamation: any = {
    orderId: '',
    subject: '',
    description: '',
    priority: 'medium'
  };
  orders: any[] = [];

  constructor() {}

  ngOnInit(): void {
    // Mock data - would be replaced with actual API calls
    this.reclamations = [
      {
        id: 'REC-1001',
        orderId: 'ORD-1002',
        date: '2025-05-03',
        subject: 'Damaged package',
        description: 'The package arrived with visible damage to the contents.',
        status: 'Open',
        priority: 'High'
      },
      {
        id: 'REC-1002',
        orderId: 'ORD-998',
        date: '2025-05-01',
        subject: 'Wrong delivery address',
        description: 'The package was delivered to the wrong address.',
        status: 'Closed',
        priority: 'Medium'
      }
    ];

    this.orders = [
      { id: 'ORD-1001', date: '2025-05-01' },
      { id: 'ORD-1002', date: '2025-05-03' },
      { id: 'ORD-1003', date: '2025-05-05' },
      { id: 'ORD-1004', date: '2025-05-06' }
    ];
  }

  toggleReclamationForm(): void {
    this.showNewReclamationForm = !this.showNewReclamationForm;
    if (!this.showNewReclamationForm) {
      this.resetForm();
    }
  }

  submitReclamation(): void {
    // In a real app, this would be an API call
    const newId = `REC-${1000 + this.reclamations.length + 1}`;
    const today = new Date().toISOString().split('T')[0];
    
    const reclamation = {
      id: newId,
      orderId: this.newReclamation.orderId,
      date: today,
      subject: this.newReclamation.subject,
      description: this.newReclamation.description,
      status: 'Open',
      priority: this.newReclamation.priority
    };
    
    this.reclamations.unshift(reclamation);
    this.toggleReclamationForm();
  }

  resetForm(): void {
    this.newReclamation = {
      orderId: '',
      subject: '',
      description: '',
      priority: 'medium'
    };
  }
}
