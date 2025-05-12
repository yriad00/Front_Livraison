import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { cardAnimation, listAnimation } from '../../shared/animations/route-animations';

interface Agent {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  reviews: number;
  area: string;
  deliveries: number;
  status: 'Active' | 'Busy' | 'Offline';
  specialties?: string[];
  description?: string;
}

@Component({
  selector: 'app-delivery-agents',
  templateUrl: './delivery-agents.component.html',
  styleUrls: ['./delivery-agents.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
  animations: [cardAnimation, listAnimation]
})
export class DeliveryAgentsComponent implements OnInit {
  searchTerm: string = '';
  selectedArea: string = 'All Areas';
  selectedStatus: string = 'All';
  
  availableAgents: Agent[] = [
    {
      id: 'AG-001',
      name: 'David Martin',
      rating: 4.8,
      reviews: 156,
      area: 'Central Paris',
      deliveries: 312,
      status: 'Active',
      specialties: ['Express Delivery', 'Fragile Items'],
      description: 'Experienced delivery agent with over 300 successful deliveries. Specialized in express and fragile item handling.'
    },
    {
      id: 'AG-008',
      name: 'Sophie Laurent',
      avatar: 'assets/images/agents/sophie.jpg',
      rating: 4.9,
      reviews: 241,
      area: 'West Paris',
      deliveries: 428,
      status: 'Active',
      specialties: ['Same-day Delivery', 'Large Packages'],
      description: 'Top-rated delivery professional with excellent customer service skills and perfect delivery record.'
    },
    {
      id: 'AG-015',
      name: 'Thomas Dubois',
      rating: 4.7,
      reviews: 89,
      area: 'North Paris',
      deliveries: 156,
      status: 'Busy',
      specialties: ['Cold Chain', 'Medical Supplies'],
      description: 'Specialized in temperature-controlled deliveries and medical supply transport with all necessary certifications.'
    },
    {
      id: 'AG-023',
      name: 'Emma Blanc',
      avatar: 'assets/images/agents/emma.jpg',
      rating: 4.6,
      reviews: 72,
      area: 'South Paris',
      deliveries: 108,
      status: 'Active',
      specialties: ['Grocery Delivery', 'Scheduled Delivery'],
      description: 'Reliable agent with perfect on-time delivery record and expertise in scheduled deliveries.'
    },
    {
      id: 'AG-031',
      name: 'Lucas Bernard',
      rating: 4.5,
      reviews: 63,
      area: 'East Paris',
      deliveries: 94,
      status: 'Active',
      specialties: ['Document Delivery', 'Rush Orders'],
      description: 'Fast and reliable delivery agent specializing in urgent document deliveries and rush orders.'
    },
    {
      id: 'AG-042',
      name: 'Julie Moreau',
      avatar: 'assets/images/agents/julie.jpg',
      rating: 4.8,
      reviews: 112,
      area: 'Central Paris',
      deliveries: 187,
      status: 'Offline',
      specialties: ['Furniture Delivery', 'Installation'],
      description: 'Expert in furniture delivery and assembly with extensive experience handling large items.'
    },
    {
      id: 'AG-055',
      name: 'Pierre Lefebvre',
      rating: 4.7,
      reviews: 98,
      area: 'West Paris',
      deliveries: 146,
      status: 'Busy',
      specialties: ['Electronics', 'High-Value Items'],
      description: 'Specialized in secure transport of high-value electronics and items requiring careful handling.'
    }
  ];

  areas: string[] = ['All Areas', 'Central Paris', 'North Paris', 'South Paris', 'East Paris', 'West Paris'];
  statuses: string[] = ['All', 'Active', 'Busy', 'Offline'];

  get filteredAgents(): Agent[] {
    return this.availableAgents.filter(agent => {
      // Filter by search term
      const matchesSearch = this.searchTerm === '' || 
        agent.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        agent.area.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (agent.specialties && agent.specialties.some(s => s.toLowerCase().includes(this.searchTerm.toLowerCase())));
      
      // Filter by area
      const matchesArea = this.selectedArea === 'All Areas' || agent.area === this.selectedArea;
      
      // Filter by status
      const matchesStatus = this.selectedStatus === 'All' || agent.status === this.selectedStatus;
      
      return matchesSearch && matchesArea && matchesStatus;
    });
  }

  constructor() {}

  ngOnInit(): void {}
  
  requestAgent(agentId: string): void {
    console.log(`Requesting agent ${agentId}`);
    // Implementation for requesting an agent would go here
    alert(`Request sent to agent ${agentId}. They will contact you shortly.`);
  }
  
  filterByArea(area: string): void {
    this.selectedArea = area;
  }
  
  filterByStatus(status: string): void {
    this.selectedStatus = status;
  }
  
  onSearch(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value;
  }
} 