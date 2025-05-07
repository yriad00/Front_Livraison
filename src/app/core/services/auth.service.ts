import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.dev';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface User {
  id?: number;
  username?: string;
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  password?: string;
  // Enterprise specific fields
  enterpriseName?: string;
  facturationAddress?: string;
  siret?: string;
  licenseNumber?: string;
  deliveryAgentType?: 'platform' | 'enterprise';
}

export interface AuthResponse {
  user: User;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private tokenKey = 'auth_token';
  private isBrowser: boolean;
  
  // Mock user data
  private mockUsers: User[] = [
    {
      id: 1,
      email: 'admin@livraison.com',
      password: 'Admin@123',
      role: 'admin',
      firstName: 'Admin',
      lastName: 'User',
      username: 'admin'
    },
    {
      id: 2,
      email: 'client@example.com',
      password: 'Client@123',
      role: 'client',
      firstName: 'Client',
      lastName: 'User',
      username: 'client'
    },
    {
      id: 3,
      email: 'delivery@livraison.com',
      password: 'Delivery@123',
      role: 'delivery',
      firstName: 'Delivery',
      lastName: 'Agent',
      username: 'delivery'
    },
    {
      id: 4,
      email: 'enterprise@company.com',
      password: 'Enterprise@123',
      role: 'enterprise',
      firstName: 'Enterprise',
      lastName: 'Manager',
      username: 'enterprise',
      enterpriseName: 'Sample Company',
      facturationAddress: '123 Business Ave, Business City',
      siret: '12345678901234',
      licenseNumber: 'ENT-2023-1234',
      deliveryAgentType: 'platform'
    },
    {
      id: 5,
      email: 'partner@livraison.com',
      password: 'Partner@123',
      role: 'particulier',
      firstName: 'Delivery',
      lastName: 'Partner',
      username: 'partner'
    }
  ];

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.loadStoredUser();
  }

  private loadStoredUser(): void {
    if (!this.isBrowser) {
      // Skip localStorage in server-side rendering
      return;
    }

    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      try {
        const user = this.getUserFromToken(token);
        if (user) {
          this.currentUserSubject.next(user);
        }
      } catch (error) {
        this.logout();
      }
    }
  }

  private getUserFromToken(token: string): User | null {
    if (!this.isBrowser) {
      return null;
    }
    
    try {
      const storedUser = localStorage.getItem('user_data');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  }

  login(email: string, password: string): Observable<User> {
    // Using mock authentication with static data
    const user = this.mockUsers.find(
      u => u.email === email && u.password === password
    );

    if (user) {
      // Create a clone without the password for security
      const userWithoutPassword = { ...user };
      delete userWithoutPassword.password;

      // Generate mock token
      const token = 'mock_token_' + Math.random().toString(36).substring(2);
      
      if (this.isBrowser) {
        localStorage.setItem(this.tokenKey, token);
        localStorage.setItem('user_data', JSON.stringify(userWithoutPassword));
      }
      
      this.currentUserSubject.next(userWithoutPassword);
      
      return of(userWithoutPassword);
    } else {
      return throwError(() => new Error('Login failed. Please check your credentials.'));
    }
  }

  register(userData: Partial<User> & { password: string }): Observable<User> {
    // For mock implementation, just simulate a successful registration
    const newUser: User = {
      id: this.mockUsers.length + 1,
      email: userData.email || '',
      role: userData.role || 'client', // Default role
      username: userData.username || (userData.email ? userData.email.split('@')[0] : 'user'),
    };

    // Set common fields if provided
    if (userData.firstName) newUser.firstName = userData.firstName;
    if (userData.lastName) newUser.lastName = userData.lastName;
    if (userData.phone) newUser.phone = userData.phone;

    // Set enterprise-specific fields if it's an enterprise registration
    if (userData.role === 'enterprise') {
      newUser.enterpriseName = userData.enterpriseName;
      newUser.facturationAddress = userData.facturationAddress;
      newUser.siret = userData.siret;
      newUser.licenseNumber = userData.licenseNumber;
      newUser.deliveryAgentType = userData.deliveryAgentType as 'platform' | 'enterprise';
      
      // In a real implementation, if deliveryAgentType is 'enterprise',
      // you would also process the uploaded PDF file with delivery agent credentials
      console.log('Enterprise registration with delivery agent type:', userData.deliveryAgentType);
    }

    // Add the new user to mock database
    this.mockUsers.push({...newUser, password: userData.password});

    // Generate mock token
    const token = 'mock_token_' + Math.random().toString(36).substring(2);
    
    // Remove password from the user object that will be returned and stored
    const userWithoutPassword = { ...newUser };
    
    if (this.isBrowser) {
      localStorage.setItem(this.tokenKey, token);
      localStorage.setItem('user_data', JSON.stringify(userWithoutPassword));
    }
    
    this.currentUserSubject.next(userWithoutPassword);
    
    return of(userWithoutPassword);
  }

  logout(): Observable<boolean> {
    if (this.isBrowser) {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem('user_data');
    }
    
    this.currentUserSubject.next(null);
    return of(true);
  }

  getCurrentUser(): Observable<User | null> {
    return of(this.currentUserSubject.value);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  hasRole(role: string | string[]): boolean {
    const user = this.currentUserSubject.value;
    if (!user) return false;
    
    if (Array.isArray(role)) {
      return role.includes(user.role);
    }
    
    return user.role === role;
  }

  getAuthToken(): string | null {
    if (!this.isBrowser) {
      return null;
    }
    return localStorage.getItem(this.tokenKey);
  }

  refreshToken(): Observable<string> {
    // Just return the existing token for mock implementation
    if (!this.isBrowser) {
      return of('mock_refresh_token_ssr');
    }
    const token = localStorage.getItem(this.tokenKey) || 'mock_refresh_token';
    return of(token);
  }
}
