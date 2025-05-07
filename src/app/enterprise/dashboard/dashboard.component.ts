import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-enterprise-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class DashboardComponent implements OnInit {
  currentUser: any;
  isSidebarCollapsed = false;
  screenWidth: number;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.screenWidth = window.innerWidth;
    this.isSidebarCollapsed = this.screenWidth <= 768;
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.isSidebarCollapsed = true;
    } else {
      this.isSidebarCollapsed = false;
    }
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}