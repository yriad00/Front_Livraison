import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class SubscriptionComponent {
  plans = [
    {
      name: 'Basic',
      price: '49',
      features: [
        'Up to 50 deliveries per month',
        '1 delivery agent',
        'Basic analytics',
        'Email support'
      ],
      recommended: false
    },
    {
      name: 'Professional',
      price: '99',
      features: [
        'Up to 200 deliveries per month',
        '5 delivery agents',
        'Advanced analytics',
        'Priority email support',
        'API access'
      ],
      recommended: true
    },
    {
      name: 'Enterprise',
      price: '249',
      features: [
        'Unlimited deliveries',
        'Unlimited delivery agents',
        'Premium analytics with exports',
        '24/7 phone support',
        'Advanced API access',
        'Custom integration options'
      ],
      recommended: false
    }
  ];

  currentPlan = 'Professional';

  selectPlan(planName: string): void {
    this.currentPlan = planName;
  }

  upgradePlan(): void {
    alert(`Your subscription has been upgraded to the ${this.currentPlan} plan.`);
  }
  
  getPlanPrice(): string {
    const plan = this.plans.find(p => p.name === this.currentPlan);
    return plan ? plan.price : '0';
  }
}