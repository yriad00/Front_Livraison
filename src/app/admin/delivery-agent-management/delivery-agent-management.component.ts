import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../core/services/admin.service';
import { User } from '../../core/services/auth.service';

interface DeliveryAgent extends User {
  status: 'pending' | 'approved' | 'rejected';
  applicationDate?: Date;
  enterpriseName?: string;
  agentType: 'platform' | 'enterprise';
  documentUrl?: string;
}

@Component({
  selector: 'app-delivery-agent-management',
  templateUrl: './delivery-agent-management.component.html',
  styleUrls: ['./delivery-agent-management.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class DeliveryAgentManagementComponent implements OnInit {
  deliveryAgents: DeliveryAgent[] = [];
  filteredAgents: DeliveryAgent[] = [];
  loading = true;
  error = '';
  statusFilter: 'all' | 'pending' | 'approved' | 'rejected' = 'all';
  typeFilter: 'all' | 'platform' | 'enterprise' = 'all';
  
  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadDeliveryAgents();
  }

  loadDeliveryAgents(): void {
    // In a real app, this would come from the AdminService
    // For now, we'll use mock data
    this.loading = true;
    setTimeout(() => {
      this.deliveryAgents = [
        {
          id: 101,
          email: 'agent1@example.com',
          role: 'delivery',
          username: 'agent1',
          firstName: 'John',
          lastName: 'Delivery',
          phone: '123-456-7890',
          status: 'pending',
          applicationDate: new Date(2023, 10, 15),
          agentType: 'platform'
        },
        {
          id: 102,
          email: 'agent2@example.com',
          role: 'delivery',
          username: 'agent2',
          firstName: 'Jane',
          lastName: 'Runner',
          phone: '123-456-7891',
          status: 'approved',
          applicationDate: new Date(2023, 9, 20),
          agentType: 'platform'
        },
        {
          id: 103,
          email: 'agent3@enterprise.com',
          role: 'delivery',
          username: 'agent3',
          firstName: 'Robert',
          lastName: 'Swift',
          phone: '123-456-7892',
          status: 'rejected',
          applicationDate: new Date(2023, 10, 5),
          agentType: 'enterprise',
          enterpriseName: 'Fast Delivery Inc.',
          documentUrl: '/assets/mock/delivery-credentials.pdf'
        },
        {
          id: 104,
          email: 'agent4@enterprise.com',
          role: 'delivery',
          username: 'agent4',
          firstName: 'Emma',
          lastName: 'Quick',
          phone: '123-456-7893',
          status: 'pending',
          applicationDate: new Date(2023, 10, 18),
          agentType: 'enterprise',
          enterpriseName: 'Fast Delivery Inc.',
          documentUrl: '/assets/mock/delivery-credentials.pdf'
        }
      ];
      this.applyFilters();
      this.loading = false;
    }, 1000); // Simulate network delay
  }

  applyFilters(): void {
    this.filteredAgents = this.deliveryAgents.filter(agent => {
      const matchesStatus = this.statusFilter === 'all' || agent.status === this.statusFilter;
      const matchesType = this.typeFilter === 'all' || agent.agentType === this.typeFilter;
      return matchesStatus && matchesType;
    });
  }

  approveAgent(agent: DeliveryAgent): void {
    // In a real app, call the service to approve the agent
    this.loading = true;
    
    setTimeout(() => {
      const index = this.deliveryAgents.findIndex(a => a.id === agent.id);
      if (index !== -1) {
        this.deliveryAgents[index].status = 'approved';
        this.applyFilters();
      }
      this.loading = false;
    }, 500);
  }

  rejectAgent(agent: DeliveryAgent): void {
    // In a real app, call the service to reject the agent
    this.loading = true;
    
    setTimeout(() => {
      const index = this.deliveryAgents.findIndex(a => a.id === agent.id);
      if (index !== -1) {
        this.deliveryAgents[index].status = 'rejected';
        this.applyFilters();
      }
      this.loading = false;
    }, 500);
  }

  viewDocument(documentUrl?: string): void {
    // In a real app, this would open the document or display it in a modal
    if (documentUrl) {
      alert(`In a real app, this would open the document: ${documentUrl}`);
      // window.open(documentUrl, '_blank');
    }
  }
} 