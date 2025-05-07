import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

interface SupportTicket {
  id: number;
  subject: string;
  message: string;
  status: 'open' | 'in-progress' | 'resolved';
  date: Date;
}

@Component({
  selector: 'app-enterprise-support',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './support.component.html',
  styleUrl: './support.component.scss'
})
export class EnterpriseSupportComponent {
  supportForm: FormGroup;
  supportTickets: SupportTicket[] = [
    {
      id: 1,
      subject: 'Platform Issue',
      message: 'We are experiencing issues with the order processing system.',
      status: 'in-progress',
      date: new Date('2025-04-30')
    },
    {
      id: 2,
      subject: 'API Integration Problem',
      message: 'Our system is not properly syncing with your platform API.',
      status: 'open',
      date: new Date('2025-05-02')
    },
    {
      id: 3,
      subject: 'Billing Discrepancy',
      message: 'There appears to be a discrepancy in our monthly billing statement.',
      status: 'resolved',
      date: new Date('2025-04-25')
    }
  ];

  constructor(private fb: FormBuilder) {
    this.supportForm = this.fb.group({
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  submitTicket(): void {
    if (this.supportForm.valid) {
      const newTicket: SupportTicket = {
        id: this.supportTickets.length + 1,
        subject: this.supportForm.value.subject,
        message: this.supportForm.value.message,
        status: 'open',
        date: new Date()
      };
      
      this.supportTickets.unshift(newTicket);
      this.supportForm.reset();
    }
  }

  filterTickets(status: string | null = null): void {
    if (!status) {
      // Reset filter to show all tickets
      this.supportTickets = this.getAllTickets();
    } else {
      this.supportTickets = this.getAllTickets().filter(
        ticket => ticket.status === status
      );
    }
  }

  private getAllTickets(): SupportTicket[] {
    // In a real app, this would fetch from an API
    return [
      {
        id: 1,
        subject: 'Platform Issue',
        message: 'We are experiencing issues with the order processing system.',
        status: 'in-progress',
        date: new Date('2025-04-30')
      },
      {
        id: 2,
        subject: 'API Integration Problem',
        message: 'Our system is not properly syncing with your platform API.',
        status: 'open',
        date: new Date('2025-05-02')
      },
      {
        id: 3,
        subject: 'Billing Discrepancy',
        message: 'There appears to be a discrepancy in our monthly billing statement.',
        status: 'resolved',
        date: new Date('2025-04-25')
      }
    ];
  }
}
