import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

interface Plan {
  id: number;
  name: string;
  price: number;
  features: string[];
}

interface Transaction {
  id: number;
  date: Date;
  amount: number;
  description: string;
  status: 'paid' | 'pending' | 'failed';
}

interface SubscriptionStatus {
  status: 'trial' | 'active' | 'expired';
  statusText: string;
  planName: string;
  daysRemaining?: number;
  nextBillingDate?: Date;
  expiryDate?: Date;
}

@Component({
  selector: 'app-billing',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.scss'
})
export class BillingComponent implements OnInit {
  subscriptionStatus: SubscriptionStatus = {
    status: 'active',
    statusText: 'Active',
    planName: 'Business',
    nextBillingDate: new Date('2025-06-03')
  };

  availablePlans: Plan[] = [
    {
      id: 1,
      name: 'Basic',
      price: 19.99,
      features: ['Up to 50 deliveries', 'Basic analytics', 'Email support']
    },
    {
      id: 2,
      name: 'Business',
      price: 49.99,
      features: ['Unlimited deliveries', 'Advanced analytics', 'Priority support', 'Custom reports']
    },
    {
      id: 3,
      name: 'Enterprise',
      price: 99.99,
      features: ['All Business features', 'Dedicated account manager', 'API access', 'Custom integrations']
    }
  ];

  billingHistory: Transaction[] = [
    {
      id: 1001,
      date: new Date('2025-04-03'),
      amount: 49.99,
      description: 'Monthly subscription - Business Plan',
      status: 'paid'
    },
    {
      id: 1002,
      date: new Date('2025-03-03'),
      amount: 49.99,
      description: 'Monthly subscription - Business Plan',
      status: 'paid'
    }
  ];

  paymentForm: FormGroup;
  showPaymentForm = false;
  selectedPlanId: number | null = null;

  get isTrialPeriod(): boolean {
    return this.subscriptionStatus.status === 'trial';
  }

  get isActiveSubscription(): boolean {
    return this.subscriptionStatus.status === 'active';
  }

  get isExpiredSubscription(): boolean {
    return this.subscriptionStatus.status === 'expired';
  }

  constructor(private fb: FormBuilder) {
    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{16}$/)]],
      expiryDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]],
      cardholderName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Set the current plan ID
    const currentPlan = this.availablePlans.find(plan => plan.name === this.subscriptionStatus.planName);
    if (currentPlan) {
      this.selectedPlanId = currentPlan.id;
    }
  }

  isCurrentPlan(planId: number): boolean {
    return this.selectedPlanId === planId;
  }

  selectPlan(planId: number): void {
    if (this.selectedPlanId !== planId) {
      this.selectedPlanId = planId;
      this.showPaymentForm = true;
    }
  }

  processPayment(): void {
    if (this.paymentForm.valid) {
      console.log('Processing payment:', this.paymentForm.value);
      
      // Here you would call a service to process the payment
      // For demo purposes, we'll just update the UI
      const selectedPlan = this.availablePlans.find(plan => plan.id === this.selectedPlanId);
      
      if (selectedPlan) {
        // Update subscription status
        this.subscriptionStatus = {
          status: 'active',
          statusText: 'Active',
          planName: selectedPlan.name,
          nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
        };
        
        // Add to billing history
        this.billingHistory.unshift({
          id: Date.now(),
          date: new Date(),
          amount: selectedPlan.price,
          description: `Monthly subscription - ${selectedPlan.name} Plan`,
          status: 'paid'
        });
        
        // Reset form
        this.paymentForm.reset();
        this.showPaymentForm = false;
      }
    }
  }

  cancelPayment(): void {
    this.showPaymentForm = false;
    this.paymentForm.reset();
  }

  downloadInvoice(transactionId: number): void {
    console.log(`Downloading invoice for transaction #${transactionId}`);
    // Implement invoice download logic
  }
}
