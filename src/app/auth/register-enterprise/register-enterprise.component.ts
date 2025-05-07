import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register-enterprise',
  templateUrl: './register-enterprise.component.html',
  styleUrls: ['./register-enterprise.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class RegisterEnterpriseComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  error = '';
  selectedFile: File | null = null;
  deliveryAgentType: 'platform' | 'enterprise' = 'platform';
  
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
      // Enterprise details
      enterpriseName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9+\\s-]{8,15}$')]],
      facturationAddress: ['', Validators.required],
      siret: ['', [Validators.required, Validators.pattern('^[0-9]{14}$')]],
      licenseNumber: ['', Validators.required],
      // Credentials
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      // Delivery agent type
      deliveryAgentType: ['platform', Validators.required],
      // Only required if delivery agent type is 'enterprise'
      deliveryAgentCredentials: [null]
    }, {
      validators: this.passwordMatchValidator
    });

    // Update validation based on delivery agent type selection
    this.registerForm.get('deliveryAgentType')?.valueChanges.subscribe(value => {
      this.deliveryAgentType = value;
      
      if (value === 'enterprise') {
        this.registerForm.get('deliveryAgentCredentials')?.setValidators(Validators.required);
      } else {
        this.registerForm.get('deliveryAgentCredentials')?.clearValidators();
      }
      
      this.registerForm.get('deliveryAgentCredentials')?.updateValueAndValidity();
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

  // File handling for delivery agent credentials
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      if (file.type === 'application/pdf') {
        this.selectedFile = file;
        this.registerForm.patchValue({
          deliveryAgentCredentials: file
        });
      } else {
        this.error = 'Only PDF files are accepted';
        this.registerForm.get('deliveryAgentCredentials')?.setErrors({ invalidFileType: true });
      }
    }
  }

  // Convenience getter for form fields
  get f() { return this.registerForm.controls; }

  onSubmit(): void {
    // Stop if form is invalid
    if (this.registerForm.invalid) {
      // Mark all fields as touched to trigger validation display
      Object.keys(this.f).forEach(key => {
        const control = this.registerForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.loading = true;
    this.error = '';

    const enterpriseData = {
      enterpriseName: this.f['enterpriseName'].value,
      email: this.f['email'].value,
      phone: this.f['phone'].value,
      facturationAddress: this.f['facturationAddress'].value,
      siret: this.f['siret'].value,
      licenseNumber: this.f['licenseNumber'].value,
      username: this.f['username'].value,
      password: this.f['password'].value,
      role: 'enterprise',
      deliveryAgentType: this.f['deliveryAgentType'].value
    };

    // In a real implementation, you would handle file upload separately
    // For this mock, we'll just include a flag indicating if a file was provided
    if (this.deliveryAgentType === 'enterprise' && this.selectedFile) {
      // In a real implementation, you'd upload the file to the server
      console.log('File to upload:', this.selectedFile.name);
    }

    this.authService.register(enterpriseData)
      .subscribe({
        next: () => {
          this.router.navigate(['/login'], { 
            queryParams: { 
              registered: true,
              enterpriseRegistration: true,
              deliveryAgentType: this.deliveryAgentType
            } 
          });
        },
        error: error => {
          this.error = error.message || 'Registration failed. Please try again.';
          this.loading = false;
        }
      });
  }
} 