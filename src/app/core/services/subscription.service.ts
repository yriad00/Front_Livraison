import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment.dev';
import { AuthService, User } from './auth.service';

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  description?: string;
}

export interface SubscriptionStatus {
  userId: number;
  status: 'trial' | 'active' | 'expired' | 'cancelled';
  statusText: string;
  planId?: string;
  planName?: string;
  startDate?: Date;
  endDate?: Date;
  trialEndDate?: Date;
  daysRemaining?: number;
  nextBillingDate?: Date;
  expiryDate?: Date;
}

export interface PaymentMethod {
  id: string;
  cardType: string;
  lastFourDigits: string;
  expiryDate: string;
  isDefault: boolean;
}

export interface BillingHistory {
  id: string;
  date: Date;
  amount: number;
  description: string;
  status: 'paid' | 'pending' | 'failed' | 'refunded';
  invoiceUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private subscriptionStatusSubject = new BehaviorSubject<SubscriptionStatus | null>(null);
  public subscriptionStatus$ = this.subscriptionStatusSubject.asObservable();
  
  private availablePlansSubject = new BehaviorSubject<SubscriptionPlan[]>([]);
  public availablePlans$ = this.availablePlansSubject.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    // Load initial data when a user is logged in
    this.authService.currentUser$.subscribe(user => {
      if (user && user.id !== undefined) {
        this.loadSubscriptionStatus(user.id);
        this.loadAvailablePlans();
      } else {
        this.subscriptionStatusSubject.next(null);
      }
    });
  }

  private loadSubscriptionStatus(userId: number): void {
    this.http.get<SubscriptionStatus>(`${environment.apiUrl}/subscriptions/status/${userId}`)
      .pipe(
        catchError(error => {
          // If there's an error, create a default trial status
          const trialDays = environment.trialDays || 15;
          const trialStatus: SubscriptionStatus = {
            userId,
            status: 'trial',
            statusText: 'Trial Period',
            daysRemaining: trialDays,
            trialEndDate: this.calculateTrialEndDate(trialDays)
          };
          return of(trialStatus);
        })
      )
      .subscribe(status => {
        this.subscriptionStatusSubject.next(status);
      });
  }

  private loadAvailablePlans(): void {
    this.http.get<SubscriptionPlan[]>(`${environment.apiUrl}/subscriptions/plans`)
      .pipe(
        catchError(error => {
          // Return mock plans if API fails
          return of(this.getMockPlans());
        })
      )
      .subscribe(plans => {
        this.availablePlansSubject.next(plans);
      });
  }

  private calculateTrialEndDate(trialDays: number): Date {
    const date = new Date();
    date.setDate(date.getDate() + trialDays);
    return date;
  }

  private getMockPlans(): SubscriptionPlan[] {
    return [
      {
        id: 'basic',
        name: 'Basic',
        price: 29.99,
        features: [
          'Unlimited orders',
          'Basic analytics',
          'Email support',
          '5 users included'
        ]
      },
      {
        id: 'pro',
        name: 'Professional',
        price: 59.99,
        features: [
          'All Basic features',
          'Advanced analytics',
          'Priority support',
          '10 users included',
          'Custom branding'
        ]
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        price: 99.99,
        features: [
          'All Professional features',
          'Premium support',
          'Unlimited users',
          'Dedicated account manager',
          'Custom integrations'
        ]
      }
    ];
  }

  /**
   * Check if a user has an active subscription or is in trial period
   */
  hasActiveSubscription(): Observable<boolean> {
    return this.subscriptionStatus$.pipe(
      map(status => {
        if (!status) return false;
        return status.status === 'active' || status.status === 'trial';
      })
    );
  }

  /**
   * Get the number of days remaining in the trial
   */
  getTrialDaysRemaining(): Observable<number> {
    return this.subscriptionStatus$.pipe(
      map(status => {
        if (!status || status.status !== 'trial') return 0;
        return status.daysRemaining || 0;
      })
    );
  }

  /**
   * Subscribe a user to a plan
   */
  subscribeToPlan(planId: string, paymentDetails: any): Observable<SubscriptionStatus> {
    return this.authService.getCurrentUser().pipe(
      switchMap(currentUser => {
        if (!currentUser || currentUser.id === undefined) {
          return throwError(() => new Error('User must be logged in to subscribe'));
        }

        return this.http.post<SubscriptionStatus>(`${environment.apiUrl}/subscriptions/subscribe`, {
          userId: currentUser.id,
          planId,
          paymentDetails
        }).pipe(
          tap(status => {
            this.subscriptionStatusSubject.next(status);
          }),
          catchError(error => {
            return throwError(() => new Error('Unable to process subscription. Please try again.'));
          })
        );
      })
    );
  }

  /**
   * Cancel the current subscription
   */
  cancelSubscription(): Observable<SubscriptionStatus> {
    return this.authService.getCurrentUser().pipe(
      switchMap(currentUser => {
        if (!currentUser || currentUser.id === undefined) {
          return throwError(() => new Error('User must be logged in to cancel subscription'));
        }

        return this.http.post<SubscriptionStatus>(`${environment.apiUrl}/subscriptions/cancel`, {
          userId: currentUser.id
        }).pipe(
          tap(status => {
            this.subscriptionStatusSubject.next(status);
          }),
          catchError(error => {
            return throwError(() => new Error('Unable to cancel subscription. Please try again.'));
          })
        );
      })
    );
  }

  /**
   * Get billing history
   */
  getBillingHistory(): Observable<BillingHistory[]> {
    return this.authService.getCurrentUser().pipe(
      switchMap(currentUser => {
        if (!currentUser || currentUser.id === undefined) {
          return throwError(() => new Error('User must be logged in to view billing history'));
        }

        return this.http.get<BillingHistory[]>(`${environment.apiUrl}/subscriptions/billing-history/${currentUser.id}`)
          .pipe(
            catchError(error => {
              return of([]);
            })
          );
      })
    );
  }

  /**
   * Download an invoice
   */
  downloadInvoice(invoiceId: string): Observable<Blob> {
    return this.http.get(`${environment.apiUrl}/subscriptions/invoices/${invoiceId}`, {
      responseType: 'blob'
    }).pipe(
      catchError(error => {
        return throwError(() => new Error('Unable to download invoice. Please try again.'));
      })
    );
  }

  /**
   * Update payment method
   */
  updatePaymentMethod(paymentDetails: any): Observable<any> {
    return this.authService.getCurrentUser().pipe(
      switchMap(currentUser => {
        if (!currentUser || currentUser.id === undefined) {
          return throwError(() => new Error('User must be logged in to update payment method'));
        }

        return this.http.post(`${environment.apiUrl}/subscriptions/payment-methods`, {
          userId: currentUser.id,
          paymentDetails
        }).pipe(
          catchError(error => {
            return throwError(() => new Error('Unable to update payment method. Please try again.'));
          })
        );
      })
    );
  }
}
