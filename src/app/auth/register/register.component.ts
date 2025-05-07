import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  error = '';
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Redirect if already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
      return;
    }

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.pattern('^[0-9+\\s-]{8,15}$')],
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      role: ['client', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });

    // Listen for role changes to handle enterprise registration differently
    this.registerForm.get('role')?.valueChanges.subscribe(role => {
      if (role === 'enterprise') {
        // Redirect to enterprise registration page with current form data
        this.router.navigate(['/auth/register-enterprise']);
      }
    });
  }

  // Custom validator to check if passwords match
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
      return null;
    }
  }

  // Convenience getter for form fields
  get f() { return this.registerForm.controls; }

  onSubmit(): void {
    // Stop if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    // If enterprise role is selected, redirect to enterprise registration
    if (this.f['role'].value === 'enterprise') {
      this.router.navigate(['/auth/register-enterprise']);
      return;
    }

    this.loading = true;
    this.error = '';

    const userData = {
      firstName: this.f['firstName'].value,
      lastName: this.f['lastName'].value,
      email: this.f['email'].value,
      phone: this.f['phone'].value,
      username: this.f['username'].value,
      password: this.f['password'].value,
      role: this.f['role'].value
    };

    this.authService.register(userData)
      .subscribe({
        next: () => {
          this.router.navigate(['/login'], { queryParams: { registered: true } });
        },
        error: error => {
          this.error = error.message || 'Registration failed. Please try again.';
          this.loading = false;
        }
      });
  }
} 