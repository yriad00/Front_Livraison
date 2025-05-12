import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { fadeAnimation, pulseAnimation } from '../../shared/animations/route-animations';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

interface User {
  firstName: string;
  lastName: string;
  company: string;
}

@Component({
  selector: 'app-enterprise-layout',
  template: `
    <div class="enterprise-dashboard">
      <button class="sidebar-toggle" (click)="toggleSidebar()" [@pulseAnimation]>
        <span *ngIf="isSidebarCollapsed">☰</span>
        <span *ngIf="!isSidebarCollapsed">✕</span>
      </button>
      
      <nav class="sidebar" [class.collapsed]="isSidebarCollapsed">
        <div class="sidebar-header">
          <h2>Portail Entreprise</h2>
          <div class="company-info">
            <div class="company-logo">{{ currentUser.company.charAt(0) }}</div>
            <div class="company-details">
              <div class="company-name">{{ currentUser.company }}</div>
              <div class="user-name">{{ currentUser.firstName }} {{ currentUser.lastName }}</div>
            </div>
          </div>
          
          <div class="space-selector">
            <select (change)="changeSpace($event)" class="space-select">
              <option value="enterprise" selected>Espace Entreprise</option>
              <option value="delivery">Espace Livreur</option>
              <option value="client">Espace Client</option>
              <option value="particulier">Espace Particulier</option>
            </select>
          </div>
        </div>
        
        <ul class="nav-links">
          <li><a routerLink="/enterprise/dashboard" routerLinkActive="active" (click)="preventCollapse($event)">
            <i class="fas fa-tachometer-alt"></i> Tableau de Bord</a>
          </li>
          <li><a routerLink="/enterprise/all-orders" routerLinkActive="active" (click)="preventCollapse($event)">
            <i class="fas fa-list-alt"></i> Toutes les Commandes</a>
          </li>
          <li><a routerLink="/enterprise/import-orders" routerLinkActive="active" (click)="preventCollapse($event)">
            <i class="fas fa-file-import"></i> Importer Commandes</a>
          </li>
          <li><a routerLink="/enterprise/process-orders" routerLinkActive="active" (click)="preventCollapse($event)">
            <i class="fas fa-cogs"></i> Traiter Commandes</a>
          </li>
          <li><a routerLink="/enterprise/agents" routerLinkActive="active" (click)="preventCollapse($event)">
            <i class="fas fa-users"></i> Gérer Agents</a>
          </li>
          <li><a routerLink="/enterprise/delivery-agents" routerLinkActive="active" (click)="preventCollapse($event)">
            <i class="fas fa-truck"></i> Agents de Livraison</a>
          </li>
          <li><a routerLink="/enterprise/reclamations" routerLinkActive="active" (click)="preventCollapse($event)">
            <i class="fas fa-exclamation-circle"></i> Réclamations</a>
          </li>
          <li><a routerLink="/enterprise/billing" routerLinkActive="active" (click)="preventCollapse($event)">
            <i class="fas fa-file-invoice-dollar"></i> Facturation</a>
          </li>
          <li><a routerLink="/enterprise/subscription" routerLinkActive="active" (click)="preventCollapse($event)">
            <i class="fas fa-credit-card"></i> Abonnement</a>
          </li>
          <li class="logout"><a (click)="logout()">
            <i class="fas fa-sign-out-alt"></i> Déconnexion</a>
          </li>
        </ul>
      </nav>
      
      <div class="main-content" [ngClass]="{'sidebar-collapsed': isSidebarCollapsed}" [@fadeAnimation]="outlet.isActivated ? outlet.activatedRoute : ''">
        <router-outlet #outlet="outlet"></router-outlet>
      </div>
    </div>
  `,
  styleUrls: ['./enterprise-layout.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
  animations: [fadeAnimation, pulseAnimation]
})
export class EnterpriseLayoutComponent implements OnInit, OnDestroy {
  currentUser: User = { firstName: 'Jane', lastName: 'Smith', company: 'TechCorp Logistics' };
  isSidebarCollapsed = false;
  private routerSubscription: Subscription | null = null;
  private sidebarStateKey = 'enterprise_sidebar_state';
  private preventNextCollapse = false; // Flag to prevent sidebar from collapsing on certain navigations

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const savedState = localStorage.getItem(this.sidebarStateKey);
    if (savedState !== null) {
      this.isSidebarCollapsed = savedState === 'true';
    } else {
      this.checkScreenSize();
    }

    window.addEventListener('resize', this.checkScreenSize.bind(this));

    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.preventNextCollapse) {
          this.preventNextCollapse = false; // Reset flag
          return;
        }

        if (window.innerWidth < 992) {
          this.isSidebarCollapsed = true;
        } else {
          const savedState = localStorage.getItem(this.sidebarStateKey);
          this.isSidebarCollapsed = savedState === 'true';
        }
      });
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.checkScreenSize.bind(this));
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  checkScreenSize(): void {
    if (localStorage.getItem(this.sidebarStateKey) === null) {
      this.isSidebarCollapsed = window.innerWidth < 992;
    }
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    localStorage.setItem(this.sidebarStateKey, this.isSidebarCollapsed.toString());
  }

  preventCollapse(event: MouseEvent): void {
    if (window.innerWidth >= 992) {
      this.isSidebarCollapsed = false;
      localStorage.setItem(this.sidebarStateKey, 'false');
    }
    this.preventNextCollapse = true; // Mark this navigation as intentional
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  changeSpace(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const space = selectElement.value;
    
    if (space) {
      this.router.navigate([`/${space}/dashboard`]);
    }
  }
} 