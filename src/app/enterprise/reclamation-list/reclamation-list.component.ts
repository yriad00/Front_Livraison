import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

interface Reclamation {
  id: number;
  clientName: string;
  orderId: string;
  submissionDate: Date;
  issue: string;
  description: string;
  status: 'new' | 'in-progress' | 'resolved' | 'closed';
  isPlatformIssue?: boolean;
}

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reclamation-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './reclamation-list.component.html',
  styleUrl: './reclamation-list.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, [
            animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class ReclamationListComponent {
  reclamations: Reclamation[] = [
    {
      id: 1,
      clientName: 'John Doe',
      orderId: 'ORD-001',
      submissionDate: new Date('2025-04-28'),
      issue: 'Late Delivery',
      description: 'My package was delivered 3 days after the estimated delivery date.',
      status: 'new'
    },
    {
      id: 2,
      clientName: 'Jane Smith',
      orderId: 'ORD-002',
      submissionDate: new Date('2025-04-25'),
      issue: 'Damaged Package',
      description: 'The package arrived with visible damage on the box and contents inside.',
      status: 'in-progress'
    },
    {
      id: 3,
      clientName: 'Mike Johnson',
      orderId: 'ORD-003',
      submissionDate: new Date('2025-04-20'),
      issue: 'Wrong Item',
      description: 'I received a different item than what I ordered.',
      status: 'resolved'
    },
    {
      id: 4,
      clientName: 'Enterprise Admin',
      orderId: 'PLATFORM-001',
      submissionDate: new Date('2025-05-02'),
      issue: 'Platform Issue',
      description: 'The order processing system is not working properly. We cannot create new orders.',
      status: 'new',
      isPlatformIssue: true
    }
  ];
  
  filteredReclamations: Reclamation[] = this.reclamations;
  showPlatformIssueForm: boolean = false;
  newPlatformIssue: { issue: string, description: string } = { issue: '', description: '' };

  filterByStatus(status: string): void {
    if (status === 'all') {
      this.filteredReclamations = this.reclamations;
    } else if (status === 'platform') {
      this.filteredReclamations = this.reclamations.filter(
        (reclamation) => reclamation.isPlatformIssue === true
      );
    } else {
      this.filteredReclamations = this.reclamations.filter(
        (reclamation) => reclamation.status === status
      );
    }
  }

  viewDetails(id: number): void {
    console.log(`Viewing details for reclamation #${id}`);
    // Implement navigation to detail view
  }

  updateStatus(id: number, newStatus: 'new' | 'in-progress' | 'resolved' | 'closed'): void {
    const reclamationIndex = this.reclamations.findIndex(rec => rec.id === id);
    if (reclamationIndex !== -1) {
      this.reclamations[reclamationIndex].status = newStatus;
      this.filterByStatus(this.filteredReclamations === this.reclamations ? 'all' : newStatus);
    }
  }
  
  togglePlatformIssueForm(): void {
    this.showPlatformIssueForm = !this.showPlatformIssueForm;
    if (!this.showPlatformIssueForm) {
      // Reset form when hiding
      this.newPlatformIssue = { issue: '', description: '' };
    }
  }
  
  submitPlatformIssue(): void {
    if (this.newPlatformIssue.issue && this.newPlatformIssue.description) {
      const newReclamation: Reclamation = {
        id: this.reclamations.length + 1,
        clientName: 'Enterprise Admin',
        orderId: `PLATFORM-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        submissionDate: new Date(),
        issue: this.newPlatformIssue.issue,
        description: this.newPlatformIssue.description,
        status: 'new',
        isPlatformIssue: true
      };
      
      this.reclamations.unshift(newReclamation);
      this.filterByStatus('all');
      this.togglePlatformIssueForm();
    }
  }
}
