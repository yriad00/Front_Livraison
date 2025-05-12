import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { fadeAnimation, pulseAnimation } from '../../shared/animations/route-animations';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-delivery-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
  animations: [fadeAnimation, pulseAnimation]
})
export class LayoutComponent implements OnInit, OnDestroy {
  currentUser: any;
  isSidebarCollapsed = false;
  private routerSubscription: Subscription | null = null;
  private sidebarStateKey = 'delivery_sidebar_state';
  private preventNextCollapse = false; // Flag to prevent sidebar from collapsing on certain navigations

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    
    // Initialize sidebar state from localStorage or default to mobile behavior
    const savedState = localStorage.getItem(this.sidebarStateKey);
    if (savedState !== null) {
      this.isSidebarCollapsed = savedState === 'true';
    } else {
      this.checkScreenSize();
    }

    window.addEventListener('resize', this.checkScreenSize.bind(this));

    // Subscribe to router events to ensure sidebar state is preserved during navigation
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
