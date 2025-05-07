import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

interface DeliveryAgent {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'on-leave';
  rating: number;
  deliveriesCompleted: number;
  joinDate: Date;
}

@Component({
  selector: 'app-delivery-agents',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './delivery-agents.component.html',
  styleUrl: './delivery-agents.component.scss'
})
export class DeliveryAgentsComponent {
  agents: DeliveryAgent[] = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+33 6 12 34 56 78',
      status: 'active',
      rating: 4.8,
      deliveriesCompleted: 245,
      joinDate: new Date('2024-01-15')
    },
    {
      id: 2,
      name: 'Marie Dubois',
      email: 'marie.dubois@example.com',
      phone: '+33 6 23 45 67 89',
      status: 'active',
      rating: 4.9,
      deliveriesCompleted: 312,
      joinDate: new Date('2023-11-10')
    },
    {
      id: 3,
      name: 'Ahmed Hassan',
      email: 'ahmed.hassan@example.com',
      phone: '+33 6 34 56 78 90',
      status: 'on-leave',
      rating: 4.7,
      deliveriesCompleted: 187,
      joinDate: new Date('2024-02-05')
    },
    {
      id: 4,
      name: 'Sophie Martin',
      email: 'sophie.martin@example.com',
      phone: '+33 6 45 67 89 01',
      status: 'inactive',
      rating: 4.2,
      deliveriesCompleted: 98,
      joinDate: new Date('2024-03-20')
    }
  ];

  filteredAgents: DeliveryAgent[] = this.agents;
  agentForm: FormGroup;
  showAddForm = false;
  editingAgentId: number | null = null;

  constructor(private fb: FormBuilder) {
    this.agentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      status: ['active', Validators.required]
    });
  }

  filterAgents(status: string | null = null): void {
    if (!status || status === 'all') {
      this.filteredAgents = this.agents;
    } else {
      this.filteredAgents = this.agents.filter(agent => agent.status === status);
    }
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.resetForm();
    }
  }

  editAgent(agent: DeliveryAgent): void {
    this.editingAgentId = agent.id;
    this.agentForm.patchValue({
      name: agent.name,
      email: agent.email,
      phone: agent.phone,
      status: agent.status
    });
    this.showAddForm = true;
  }

  saveAgent(): void {
    if (this.agentForm.valid) {
      if (this.editingAgentId) {
        // Update existing agent
        const index = this.agents.findIndex(a => a.id === this.editingAgentId);
        if (index !== -1) {
          this.agents[index] = {
            ...this.agents[index],
            name: this.agentForm.value.name,
            email: this.agentForm.value.email,
            phone: this.agentForm.value.phone,
            status: this.agentForm.value.status
          };
        }
      } else {
        // Add new agent
        const newAgent: DeliveryAgent = {
          id: this.getNextId(),
          name: this.agentForm.value.name,
          email: this.agentForm.value.email,
          phone: this.agentForm.value.phone,
          status: this.agentForm.value.status,
          rating: 0,
          deliveriesCompleted: 0,
          joinDate: new Date()
        };
        this.agents.push(newAgent);
      }
      
      this.resetForm();
      this.filterAgents(); // Refresh the filtered list
    }
  }

  deleteAgent(id: number): void {
    if (confirm('Are you sure you want to delete this agent?')) {
      this.agents = this.agents.filter(agent => agent.id !== id);
      this.filteredAgents = this.filteredAgents.filter(agent => agent.id !== id);
    }
  }

  private resetForm(): void {
    this.agentForm.reset({ status: 'active' });
    this.editingAgentId = null;
    this.showAddForm = false;
  }

  private getNextId(): number {
    return Math.max(0, ...this.agents.map(a => a.id)) + 1;
  }
}
