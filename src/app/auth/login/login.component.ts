import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  error = '';
  returnUrl: string = '/';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    // Get return URL from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    
    // Redirect if already logged in
    if (this.authService.isLoggedIn()) {
      this.checkUserAndNavigate();
    }
  }

  // Convenience getter for form fields
  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    // Stop if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.login(this.f['email'].value, this.f['password'].value)
      .subscribe({
        next: (user) => {
          this.loading = false;
          console.log('Login successful for user:', user);
          this.navigateBasedOnRole(user);
        },
        error: error => {
          console.error('Login failed:', error);
          this.error = error.message || 'Invalid credentials';
          this.loading = false;
        }
      });
  }

  private checkUserAndNavigate(): void {
    this.authService.getCurrentUser().subscribe(
      user => {
        if (user) {
          this.navigateBasedOnRole(user);
        }
      },
      error => {
        console.error('Error getting current user:', error);
        this.error = 'Session error. Please try again.';
      }
    );
  }

  private navigateBasedOnRole(user?: User): void {
    if (user) {
      this.routeBasedOnUserRole(user);
    } else {
      this.authService.getCurrentUser().subscribe(currentUser => {
        if (currentUser) {
          this.routeBasedOnUserRole(currentUser);
        }
      });
    }
  }

  private routeBasedOnUserRole(user: User): void {
    console.log('Routing user to dashboard based on role:', user.role);
    
    // Route to appropriate module based on user role
    switch (user.role) {
      case 'admin':
        this.router.navigateByUrl('/admin');
        break;
      case 'enterprise':
        this.router.navigateByUrl('/enterprise');
        break;
      case 'delivery':
        this.router.navigateByUrl('/delivery');
        break;
      case 'particulier':
        this.router.navigateByUrl('/particulier');
        break;
      case 'client':
        this.router.navigateByUrl('/client');
        break;
      default:
        console.log('Default routing to /client');
        this.router.navigateByUrl('/client');
        break;
    }
  }
} 