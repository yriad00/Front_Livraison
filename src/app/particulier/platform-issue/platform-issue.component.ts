import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-platform-issue',
  templateUrl: './platform-issue.component.html',
  styleUrls: ['./platform-issue.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class PlatformIssueComponent implements OnInit {
  issueCategories: string[] = [
    'Website Navigation',
    'Order Placement',
    'Payment Issues',
    'Account Access',
    'Mobile App Issues',
    'Other'
  ];

  issueForm = {
    category: '',
    title: '',
    description: '',
    urgency: 'medium',
    attachments: [] as File[]
  };

  previousIssues: any[] = [];
  isSubmitted = false;
  isSubmitting = false;

  constructor() {}

  ngOnInit(): void {
    // Mock data for previous issues
    this.previousIssues = [
      {
        id: 'ISS-1001',
        date: '2025-05-02',
        category: 'Payment Issues',
        title: 'Unable to add new payment method',
        status: 'In Progress'
      },
      {
        id: 'ISS-1000',
        date: '2025-04-28',
        category: 'Mobile App Issues',
        title: 'App crashes when viewing order history',
        status: 'Resolved'
      }
    ];
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      for (let i = 0; i < input.files.length; i++) {
        this.issueForm.attachments.push(input.files[i]);
      }
    }
  }

  removeAttachment(index: number): void {
    this.issueForm.attachments.splice(index, 1);
  }

  submitIssue(): void {
    this.isSubmitting = true;
    
    // Simulate API call with timeout
    setTimeout(() => {
      // In a real application, this would be an API call
      const newIssue = {
        id: `ISS-${1002 + this.previousIssues.length}`,
        date: new Date().toISOString().split('T')[0],
        category: this.issueForm.category,
        title: this.issueForm.title,
        status: 'Submitted'
      };
      
      this.previousIssues.unshift(newIssue);
      this.isSubmitted = true;
      this.isSubmitting = false;
      
      // Reset form
      this.issueForm = {
        category: '',
        title: '',
        description: '',
        urgency: 'medium',
        attachments: []
      };
    }, 1500);
  }

  startNewIssue(): void {
    this.isSubmitted = false;
  }
}
