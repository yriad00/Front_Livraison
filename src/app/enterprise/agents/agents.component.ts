import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Agent {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'offline' | 'busy';
  completedDeliveries: number;
  rating: number;
  joinDate: string;
}

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrl: './agents.component.scss',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule]
})
export class AgentsComponent {
  searchTerm: string = '';
  statusFilter: string = 'all';
  Math = Math; // Make Math available in template

  // Mock data for agents
  agents: Agent[] = [
    {
      id: 1,
      name: 'Jean Dupont',
      email: 'jean.dupont@example.com',
      phone: '+33 6 12 34 56 78',
      status: 'active',
      completedDeliveries: 134,
      rating: 4.8,
      joinDate: '2022-03-15'
    },
    {
      id: 2,
      name: 'Marie Lambert',
      email: 'marie.lambert@example.com',
      phone: '+33 6 23 45 67 89',
      status: 'busy',
      completedDeliveries: 87,
      rating: 4.5,
      joinDate: '2022-05-21'
    },
    {
      id: 3,
      name: 'Pierre Martin',
      email: 'pierre.martin@example.com',
      phone: '+33 6 34 56 78 90',
      status: 'offline',
      completedDeliveries: 62,
      rating: 4.2,
      joinDate: '2022-06-14'
    },
    {
      id: 4,
      name: 'Sophie Bernard',
      email: 'sophie.bernard@example.com',
      phone: '+33 6 45 67 89 01',
      status: 'active',
      completedDeliveries: 109,
      rating: 4.7,
      joinDate: '2022-04-03'
    },
    {
      id: 5,
      name: 'Lucas Moreau',
      email: 'lucas.moreau@example.com',
      phone: '+33 6 56 78 90 12',
      status: 'active',
      completedDeliveries: 155,
      rating: 4.9,
      joinDate: '2022-02-10'
    }
  ];

  get filteredAgents(): Agent[] {
    return this.agents.filter(agent => {
      // Apply status filter
      if (this.statusFilter !== 'all' && agent.status !== this.statusFilter) {
        return false;
      }
      
      // Apply search filter
      if (this.searchTerm.trim() !== '') {
        const term = this.searchTerm.toLowerCase();
        return agent.name.toLowerCase().includes(term) || 
               agent.email.toLowerCase().includes(term) ||
               agent.phone.includes(term);
      }
      
      return true;
    });
  }

  viewAgentDetails(agentId: number): void {
    alert(`Viewing details for Agent #${agentId}`);
  }

  assignDelivery(agentId: number): void {
    alert(`Assign delivery to Agent #${agentId}`);
  }
} 