import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService, User } from '../../core/services/auth.service';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { trigger, transition, style, animate, state, query, stagger } from '@angular/animations';
import { ReclamationService } from '../../core/services/reclamation.service';
import { OrderService } from '../../core/services/order.service';

interface ReclamationStats {
  total: number;
  pending: number;
  resolved: number;
  open: number;
  closed: number;
}

interface OrderStats {
  total: number;
  pending: number;
  delivered: number;
  inProgress: number;
}

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  providers: [OrderService, ReclamationService],
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
    trigger('slideInAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(20px)', opacity: 0 }),
        animate('400ms ease-out', style({ transform: 'translateY(0)', opacity: 1 })),
      ]),
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
    ])
  ],
})
export class DashboardComponent implements OnInit {
  currentUser: any;
  activeTab: string = 'dashboard';
  showReclamationModal: boolean = false;
  showReclamationViewModal: boolean = false;
  reclamationForm!: FormGroup;
  orders: any[] = [];
  selectedReclamation: any = null;
  pulseState: 'normal' | 'pulse' = 'normal';
  
  // Mock data for the dashboard
  orderStats: OrderStats = {
    total: 12,
    pending: 3,
    delivered: 8,
    inProgress: 1
  };
  
  reclamationStats: ReclamationStats = {
    total: 4,
    pending: 1,
    resolved: 3,
    open: 0,
    closed: 0
  };
  
  recentOrders = [
    { id: 'ORD-2023-001', date: '2023-12-15', status: 'Delivered', total: '240.00' },
    { id: 'ORD-2023-002', date: '2023-12-20', status: 'In Progress', total: '120.50' },
    { id: 'ORD-2023-003', date: '2023-12-28', status: 'Pending', total: '320.75' }
  ];
  
  allOrders = [
    { id: 'ORD-2023-001', date: '2023-12-15', status: 'Delivered', total: '240.00' },
    { id: 'ORD-2023-002', date: '2023-12-20', status: 'In Progress', total: '120.50' },
    { id: 'ORD-2023-003', date: '2023-12-28', status: 'Pending', total: '320.75' },
    { id: 'ORD-2023-004', date: '2023-11-05', status: 'Delivered', total: '85.99' },
    { id: 'ORD-2023-005', date: '2023-11-15', status: 'Delivered', total: '150.00' },
    { id: 'ORD-2023-006', date: '2023-10-28', status: 'Delivered', total: '78.25' }
  ];
  
  reclamations = [
    { id: 'REC-2023-001', orderId: 'ORD-2023-001', date: '2023-12-16', issue: 'Produit Endommagé', status: 'Resolved' },
    { id: 'REC-2023-002', orderId: 'ORD-2023-004', date: '2023-11-07', issue: 'Article Manquant', status: 'Resolved' },
    { id: 'REC-2023-003', orderId: 'ORD-2023-005', date: '2023-11-18', issue: 'Produit Incorrect', status: 'Resolved' },
    { id: 'REC-2023-004', orderId: 'ORD-2023-002', date: '2023-12-22', issue: 'Retard de Livraison', status: 'Pending' }
  ];
  
  trackingOrders = [
    { 
      id: 'ORD-2023-002', 
      status: 'In Progress',
      tracking: [
        { step: 'Commande Passée', date: '2023-12-20 14:30', completed: true },
        { step: 'Paiement Confirmé', date: '2023-12-20 15:10', completed: true },
        { step: 'En Traitement', date: '2023-12-21 09:45', completed: true },
        { step: 'Expédié', date: '2023-12-21 14:20', completed: false },
        { step: 'En Cours de Livraison', date: '', completed: false },
        { step: 'Livré', date: '', completed: false }
      ]
    },
    { 
      id: 'ORD-2023-003', 
      status: 'Pending',
      tracking: [
        { step: 'Commande Passée', date: '2023-12-28 10:15', completed: true },
        { step: 'Paiement Confirmé', date: '2023-12-28 10:30', completed: true },
        { step: 'En Traitement', date: '', completed: false },
        { step: 'Expédié', date: '', completed: false },
        { step: 'En Cours de Livraison', date: '', completed: false },
        { step: 'Livré', date: '', completed: false }
      ]
    }
  ];

  issueTypes = [
    'Produit Endommagé',
    'Produit Incorrect',
    'Article Manquant',
    'Retard de Livraison',
    'Problème de Qualité',
    'Autre'
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private reclamationService: ReclamationService,
    private orderService: OrderService
  ) {
    this.initReclamationForm();
    
    // Start pulse animation
    setInterval(() => {
      this.pulseState = this.pulseState === 'normal' ? 'pulse' : 'normal';
    }, 2000);
  }

  // Use a simplified notification system
  showNotification(message: string, type: string = 'info'): void {
    console.log(`[${type}] ${message}`);
    if (type === 'error') {
      alert(`Error: ${message}`);
    } else if (type === 'success') {
      // Optional: show success message
      // alert(`Success: ${message}`);
    }
  }

  ngOnInit(): void {
    console.log('Dashboard component initialized');
    this.checkUserAuthentication();
  }

  checkUserAuthentication(): void {
    console.log('Checking user authentication...');
    this.authService.getCurrentUser().subscribe(
      (user: User | null) => {
        console.log('Current user:', user);
        this.currentUser = user;
        if (!user) {
          console.log('No user found, redirecting to login');
          this.router.navigateByUrl('/login');
          return;
        }
        
        // User is authenticated, load data
        this.loadReclamations();
        this.loadOrders();
      },
      (error: any) => {
        console.error('Error fetching current user:', error);
        this.showNotification('Unable to load user information. Please try again later.', 'error');
        this.router.navigateByUrl('/login');
      }
    );
  }

  initReclamationForm(): void {
    this.reclamationForm = this.formBuilder.group({
      orderId: ['', Validators.required],
      issueType: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  openReclamationModal(orderId?: string): void {
    if (orderId) {
      this.reclamationForm.patchValue({ orderId });
    }
    this.showReclamationModal = true;
  }

  closeReclamationModal(): void {
    this.showReclamationModal = false;
    this.reclamationForm.reset();
  }

  submitReclamation(): void {
    if (this.reclamationForm.valid) {
      const formData = this.reclamationForm.value;
      
      const reclamationData = {
        orderId: formData.orderId,
        issue: formData.issueType,
        description: formData.description,
        clientName: this.currentUser.name,
        submissionDate: new Date(),
        status: 'new'
      };

      this.reclamationService.submitReclamation(reclamationData).subscribe(
        (response: any) => {
          console.log('Reclamation submitted:', response);
          this.showNotification('Your reclamation has been submitted successfully.', 'success');
          this.closeReclamationModal();
          this.loadReclamations(); // Reload reclamations to reflect the new submission
        },
        (error: any) => {
          console.error('Error submitting reclamation:', error);
          this.showNotification('Unable to submit your reclamation. Please try again.', 'error');
        }
      );
    } else {
      this.markFormGroupTouched(this.reclamationForm);
      this.showNotification('Please fill all required fields correctly.', 'error');
    }
  }

  setActiveTab(tab: string): void {
    // Apply fade out animation to current content
    setTimeout(() => {
      this.activeTab = tab;
    }, 100);
  }

  getOrderById(orderId: string) {
    return this.allOrders.find(order => order.id === orderId);
  }

  logout(): void {
    this.authService.logout().subscribe(
      (success: boolean) => {
        if (success) {
          this.showNotification('Logged out successfully', 'success');
          this.router.navigate(['/login']);
        }
      },
      (error: any) => {
        console.error('Logout error:', error);
        this.showNotification('Error during logout. Please try again.', 'error');
      }
    );
  }

  loadReclamations(): void {
    console.log('Loading reclamations...');
    this.reclamationService.getReclamations().subscribe(
      (data: any[]) => {
        console.log('Reclamations loaded:', data);
        this.reclamations = data;
        // Update reclamation stats
        this.reclamationStats.total = data.length;
        this.reclamationStats.pending = data.filter((r: any) => r.status === 'new' || r.status === 'in-progress').length;
        this.reclamationStats.resolved = data.filter((r: any) => r.status === 'closed').length;
        // Update additional tracking properties
        this.reclamationStats.open = this.reclamationStats.pending;
        this.reclamationStats.closed = this.reclamationStats.resolved;
      },
      (error: any) => {
        console.error('Error loading reclamations:', error);
        this.showNotification('Unable to load reclamation data. Please try again later.', 'error');
      }
    );
  }

  loadOrders(): void {
    console.log('Loading orders...');
    this.orderService.getOrders().subscribe(
      (data: any[]) => {
        console.log('Orders loaded:', data);
        this.orders = data;
        this.allOrders = data;
        this.recentOrders = data.slice(0, 3);
        this.orderStats.total = data.length;
        this.orderStats.pending = data.filter((o: any) => o.status === 'pending').length;
        this.orderStats.delivered = data.filter((o: any) => o.status === 'delivered').length;
        this.orderStats.inProgress = data.filter((o: any) => o.status === 'in-progress').length;
        
        // Update tracking orders
        this.trackingOrders = data
          .filter((o: any) => o.status === 'pending' || o.status === 'in-progress')
          .map((o: any) => this.formatTrackingOrder(o))
          .slice(0, 2);
      },
      (error: any) => {
        console.error('Error loading orders:', error);
        this.showNotification('Unable to load order data. Please try again later.', 'error');
      }
    );
  }

  formatTrackingOrder(order: any): any {
    // Convert date strings to Date objects if needed
    const orderDate = typeof order.orderDate === 'string' 
      ? new Date(order.orderDate) 
      : (order.orderDate || new Date(order.date));

    // This is a helper method to convert order data to tracking format
    const trackingSteps = [
      { step: 'Order Placed', date: orderDate, completed: true },
      { 
        step: 'Payment Confirmed', 
        date: new Date(orderDate.getTime() + 30 * 60000), 
        completed: true 
      },
      { 
        step: 'Processing', 
        date: order.status !== 'pending' ? new Date(orderDate.getTime() + 2 * 60 * 60000) : '', 
        completed: order.status !== 'pending' 
      },
      { 
        step: 'Dispatched', 
        date: order.status === 'in-progress' ? new Date(orderDate.getTime() + 4 * 60 * 60000) : '', 
        completed: order.status === 'in-progress' || order.status === 'delivered' 
      },
      { step: 'Out for Delivery', date: '', completed: false },
      { 
        step: 'Delivered', 
        date: order.status === 'delivered' ? (order.estimatedDelivery || '') : '', 
        completed: order.status === 'delivered' 
      }
    ];

    return {
      id: `ORD-${order.id}`,
      status: this.formatStatus(order.status),
      tracking: trackingSteps
    };
  }

  formatStatus(status: string): string {
    const statusMap: Record<string, string> = {
      'new': 'Nouvelle',
      'pending': 'En attente',
      'in_progress': 'En cours',
      'resolved': 'Résolue',
      'closed': 'Fermée'
    };
    
    return statusMap[status] || status;
  }

  getStatusInFrench(status: string): string {
    const statusMap: Record<string, string> = {
      'Pending': 'En Attente',
      'Processing': 'En Traitement',
      'In Progress': 'En Cours',
      'In Transit': 'En Transit',
      'Delivered': 'Livré',
      'Ready for pickup': 'Prêt pour enlèvement',
      'Waiting': 'En Attente',
      'Cancelled': 'Annulé',
      'Active': 'Actif',
      'Idle': 'Inactif'
    };
    
    return statusMap[status] || status;
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control) {
        control.markAsTouched();
        
        if (control instanceof FormGroup) {
          this.markFormGroupTouched(control);
        }
      }
    });
  }

  viewReclamation(reclamationId: string): void {
    // Find the reclamation by ID
    this.selectedReclamation = this.reclamations.find(rec => rec.id === reclamationId);
    if (this.selectedReclamation) {
      this.showReclamationViewModal = true;
    } else {
      this.showNotification('Reclamation not found', 'error');
    }
  }

  closeReclamationViewModal(): void {
    this.showReclamationViewModal = false;
    this.selectedReclamation = null;
  }

  changeSpace(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const space = selectElement.value;
    
    if (space) {
      this.router.navigate([`/${space}/dashboard`]);
    }
  }
} 