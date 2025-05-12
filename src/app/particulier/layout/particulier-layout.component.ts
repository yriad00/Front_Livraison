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
}

@Component({
  selector: 'app-particulier-layout',
  template: `
    <div class="individual-dashboard">
      <button class="sidebar-toggle" (click)="toggleSidebar()" [@pulseAnimation]>
        <span *ngIf="isSidebarCollapsed">☰</span>
        <span *ngIf="!isSidebarCollapsed">✕</span>
      </button>
      <nav class="sidebar" [class.collapsed]="isSidebarCollapsed">
        <div class="sidebar-header">
          <h2>Espace Particulier</h2>
          <div class="user-avatar">
            <div class="avatar-circle">{{ currentUser.firstName.charAt(0) }}{{ currentUser.lastName.charAt(0) }}</div>
            <span>{{ currentUser.firstName }} {{ currentUser.lastName }}</span>
          </div>
          
          <div class="space-selector">
            <select (change)="changeSpace($event)" class="space-select">
              <option value="particulier" selected>Espace Particulier</option>
              <option value="enterprise">Espace Entreprise</option>
              <option value="delivery">Espace Livreur</option>
              <option value="client">Espace Client</option>
            </select>
          </div>
        </div>
        <ul class="nav-links">
          <li><a routerLink="/particulier/dashboard" routerLinkActive="active" (click)="preventCollapse($event)">
            <i class="fas fa-tachometer-alt"></i> Tableau de Bord</a>
          </li>
          <li><a routerLink="/particulier/all-orders" routerLinkActive="active" (click)="preventCollapse($event)">
            <i class="fas fa-box"></i> Mes Commandes</a>
          </li>
          <li><a routerLink="/particulier/delivery-agents" routerLinkActive="active" (click)="preventCollapse($event)">
            <i class="fas fa-truck"></i> Agents de Livraison</a>
          </li>
          <li><a routerLink="/particulier/reclamations" routerLinkActive="active" (click)="preventCollapse($event)">
            <i class="fas fa-exclamation-circle"></i> Mes Réclamations</a>
          </li>
          <li><a routerLink="/particulier/platform-issue" routerLinkActive="active" (click)="preventCollapse($event)">
            <i class="fas fa-bug"></i> Signaler un Problème</a>
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
  styleUrls: ['./particulier-layout.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
  animations: [fadeAnimation, pulseAnimation]
})
export class ParticulierLayoutComponent implements OnInit, OnDestroy {
  currentUser: User = { firstName: 'John', lastName: 'Doe' };
  isSidebarCollapsed = false;
  private routerSubscription: Subscription | null = null;
  private sidebarStateKey = 'particulier_sidebar_state';
  private preventNextCollapse = false; // <-- Added flag

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
    this.preventNextCollapse = true; // <-- Mark this navigation as intentional
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
