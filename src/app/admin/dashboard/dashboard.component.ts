import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { trigger, transition, style, animate, state, query, stagger, keyframes } from '@angular/animations';
import { AuthService } from '../../core/services/auth.service';

interface StatisticsData {
  totalOrders: number;
  enterpriseUsers: number;
  individualUsers: number;
}

interface ConfirmationData {
  title: string;
  message: string;
  confirmButtonText: string;
  confirmButtonClass: string;
  actionType: string;
  itemId: string | number;
  showEnterpriseWarning?: boolean;
  showDeliveryAgentWarning?: boolean;
}

interface Registration {
  id: string;
  name: string;
  email: string;
  userType: 'enterprise' | 'individual' | 'delivery-agent';
  date: Date;
  monthlyOrders?: number;
  deliveryCapacity?: number;
  vehicleType?: string;
  experience?: number;
  hasLicense?: boolean;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateY(-20px)', opacity: 0 }),
        animate('300ms', style({ transform: 'translateY(0)', opacity: 1 })),
      ]),
    ]),
    trigger('fadeInAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('200ms', style({ opacity: 0 }))
      ])
    ]),
    trigger('slideUpAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(100px)', opacity: 0 }),
        animate('400ms ease-out', style({ transform: 'translateY(0)', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateY(100px)', opacity: 0 })),
      ]),
    ]),
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, [
            animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('pulseAnimation', [
      state('pulse', style({ transform: 'scale(1.05)' })),
      state('normal', style({ transform: 'scale(1)' })),
      transition('normal <=> pulse', animate('300ms ease-in-out'))
    ]),
    trigger('bounceAnimation', [
      transition(':enter', [
        animate('1s', keyframes([
          style({ transform: 'scale(0)', offset: 0 }),
          style({ transform: 'scale(1.1)', offset: 0.3 }),
          style({ transform: 'scale(0.9)', offset: 0.5 }),
          style({ transform: 'scale(1.03)', offset: 0.7 }),
          style({ transform: 'scale(1)', offset: 1 })
        ]))
      ])
    ])
  ]
})
export class DashboardComponent implements OnInit {
  currentUser: any;
  activeTab: string = 'registrations';
  regType: string = 'all'; // For filtering registration types
  pulseState: 'normal' | 'pulse' = 'normal';
  showConfirmationModal: boolean = false;
  confirmationData: ConfirmationData = {
    title: '',
    message: '',
    confirmButtonText: '',
    confirmButtonClass: '',
    actionType: '',
    itemId: ''
  };

  // Statistics data
  statisticsData: StatisticsData = {
    totalOrders: 42,
    enterpriseUsers: 18,
    individualUsers: 124
  };

  // Pending registrations
  pendingRegistrations: Registration[] = [
    { 
      id: 'USR-001', 
      name: 'Acme Corporation', 
      email: 'info@acmecorp.com', 
      userType: 'enterprise',
      date: new Date('2023-12-15'),
      monthlyOrders: 75
    },
    { 
      id: 'USR-002', 
      name: 'Global Logistics', 
      email: 'contact@globallogistics.com', 
      userType: 'enterprise',
      date: new Date('2023-12-18'),
      monthlyOrders: 35
    },
    { 
      id: 'USR-003', 
      name: 'Sarah Johnson', 
      email: 'sarah.j@gmail.com', 
      userType: 'individual',
      date: new Date('2023-12-20')
    },
    {
      id: 'USR-004',
      name: 'Mohammed Ali',
      email: 'mohammed.ali@gmail.com',
      userType: 'delivery-agent',
      date: new Date('2023-12-22'),
      vehicleType: 'Motorcycle',
      deliveryCapacity: 15,
      experience: 3,
      hasLicense: true
    },
    {
      id: 'USR-005',
      name: 'Jean Dupont',
      email: 'jean.dupont@yahoo.com',
      userType: 'delivery-agent',
      date: new Date('2023-12-23'),
      vehicleType: 'Car',
      deliveryCapacity: 30,
      experience: 1,
      hasLicense: true
    },
    {
      id: 'USR-006',
      name: 'Ahmed Karim',
      email: 'ahmed.k@outlook.com',
      userType: 'delivery-agent',
      date: new Date('2023-12-24'),
      vehicleType: 'Bicycle',
      deliveryCapacity: 5,
      experience: 2,
      hasLicense: false
    }
  ];

  // Recent orders
  recentOrders = [
    { id: '1001', client: 'John Doe', address: '123 Rue de Paris, 75001 Paris', status: 'Delivered' },
    { id: '1002', client: 'Jane Smith', address: '456 Avenue des Champs-Élysées, 75008 Paris', status: 'In Progress' },
    { id: '1003', client: 'Robert Johnson', address: '789 Boulevard Saint-Germain, 75007 Paris', status: 'Pending' }
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCurrentUser();
    
    // Start pulse animation
    setInterval(() => {
      this.pulseState = this.pulseState === 'normal' ? 'pulse' : 'normal';
    }, 2000);
  }

  loadCurrentUser(): void {
    this.authService.getCurrentUser().subscribe(
      (user) => {
        this.currentUser = user;
        if (!user) {
          this.router.navigate(['/login']);
        }
      },
      (error) => {
        console.error('Error loading current user:', error);
        this.router.navigate(['/login']);
      }
    );
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  approveRegistration(id: string): void {
    const registration = this.pendingRegistrations.find(reg => reg.id === id);
    const isEnterprise = registration?.userType === 'enterprise';
    const isDeliveryAgent = registration?.userType === 'delivery-agent';
    const monthlyOrders = registration?.monthlyOrders || 0;
    const hasMinimumOrders = monthlyOrders >= 50;
    
    // Check delivery agent requirements
    const hasLicense = registration?.hasLicense === true;
    const experience = registration?.experience || 0;
    const deliveryCapacity = registration?.deliveryCapacity || 0;
    const meetsDeliveryRequirements = hasLicense && experience >= 2 && deliveryCapacity >= 10;
    
    // Determine warning type
    let showWarning = false;
    let warningType = '';
    
    if (isEnterprise && !hasMinimumOrders) {
      showWarning = true;
      warningType = 'enterprise';
    } else if (isDeliveryAgent && !meetsDeliveryRequirements) {
      showWarning = true;
      warningType = 'delivery-agent';
    }
    
    this.confirmationData = {
      title: 'Approve Registration',
      message: `Are you sure you want to approve this registration?`,
      confirmButtonText: 'Approve',
      confirmButtonClass: 'btn-success',
      actionType: 'approve',
      itemId: id,
      showEnterpriseWarning: warningType === 'enterprise',
      showDeliveryAgentWarning: warningType === 'delivery-agent'
    };
    this.showConfirmationModal = true;
  }

  rejectRegistration(id: string): void {
    this.confirmationData = {
      title: 'Reject Registration',
      message: `Are you sure you want to reject this registration? This action cannot be undone.`,
      confirmButtonText: 'Reject',
      confirmButtonClass: 'btn-danger',
      actionType: 'reject',
      itemId: id
    };
    this.showConfirmationModal = true;
  }

  confirmAction(): void {
    if (this.confirmationData.actionType === 'approve') {
      this.processApproval(this.confirmationData.itemId);
    } else if (this.confirmationData.actionType === 'reject') {
      this.processRejection(this.confirmationData.itemId);
    }
    this.closeConfirmationModal();
  }

  processApproval(id: string | number): void {
    // Here would be an API call to approve the registration
    console.log(`Approving registration ${id}`);
    
    // Get the registration before removing it
    const approvedUser = this.pendingRegistrations.find(reg => reg.id === id);
    
    // For mock, remove from pending list
    this.pendingRegistrations = this.pendingRegistrations.filter(reg => reg.id !== id);
    
    // Update user counts
    if (approvedUser) {
      if (approvedUser.userType === 'enterprise') {
        this.statisticsData.enterpriseUsers++;
      } else {
        this.statisticsData.individualUsers++;
      }
    }
    
    this.showNotification('Registration approved successfully');
  }

  processRejection(id: string | number): void {
    // Here would be an API call to reject the registration
    console.log(`Rejecting registration ${id}`);
    
    // For mock, just remove from pending list
    this.pendingRegistrations = this.pendingRegistrations.filter(reg => reg.id !== id);
    
    this.showNotification('Registration rejected');
  }

  closeConfirmationModal(): void {
    this.showConfirmationModal = false;
  }

  showNotification(message: string): void {
    alert(message); // Simple notification for now
  }

  logout(): void {
    this.authService.logout().subscribe(
      () => {
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Logout error:', error);
      }
    );
  }
  
  hasEnterpriseRegistrations(): boolean {
    return this.pendingRegistrations?.some(reg => reg?.userType === 'enterprise') || false;
  }
  
  getEnterprisePercentage(): number {
    const totalUsers = this.statisticsData.enterpriseUsers + this.statisticsData.individualUsers;
    if (totalUsers === 0) return 0;
    return Math.round((this.statisticsData.enterpriseUsers / totalUsers) * 100);
  }
  
  getIndividualPercentage(): number {
    const totalUsers = this.statisticsData.enterpriseUsers + this.statisticsData.individualUsers;
    if (totalUsers === 0) return 0;
    return Math.round((this.statisticsData.individualUsers / totalUsers) * 100);
  }

  hasDeliveryAgentRegistrations(): boolean {
    return this.pendingRegistrations?.some(reg => reg?.userType === 'delivery-agent') || false;
  }
  
  meetDeliveryAgentRequirements(registration: Registration): boolean {
    if (registration.userType !== 'delivery-agent') return true;
    
    const hasLicense = registration.hasLicense === true;
    const experience = registration.experience || 0;
    const deliveryCapacity = registration.deliveryCapacity || 0;
    
    return hasLicense && experience >= 2 && deliveryCapacity >= 10;
  }

  setRegType(type: string): void {
    this.regType = type;
  }
  
  getFilteredRegistrations(): Registration[] {
    if (this.regType === 'all') {
      return this.pendingRegistrations;
    }
    
    return this.pendingRegistrations.filter(reg => reg.userType === this.regType);
  }
  
  getRegistrationCount(type: string): number {
    return this.pendingRegistrations.filter(reg => reg.userType === type).length;
  }
} 