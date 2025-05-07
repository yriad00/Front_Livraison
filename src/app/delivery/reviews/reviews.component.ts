import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Review {
  id: number;
  clientName: string;
  rating: number;
  comment: string;
  date: Date;
  orderId: string;
}

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent {
  reviews: Review[] = [
    {
      id: 1,
      clientName: 'John Doe',
      rating: 5,
      comment: 'Fast delivery and very polite delivery agent!',
      date: new Date('2025-05-01'),
      orderId: 'ORD-001'
    },
    {
      id: 2,
      clientName: 'Jane Smith',
      rating: 4,
      comment: 'Good service, would use again.',
      date: new Date('2025-04-29'),
      orderId: 'ORD-002'
    },
    {
      id: 3,
      clientName: 'Mike Johnson',
      rating: 3,
      comment: 'Delivery was a bit late, but the agent was very apologetic.',
      date: new Date('2025-04-28'),
      orderId: 'ORD-003'
    },
    {
      id: 4,
      clientName: 'Sarah Williams',
      rating: 5,
      comment: 'Excellent service! My package was handled with care.',
      date: new Date('2025-04-27'),
      orderId: 'ORD-004'
    }
  ];

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }

  getEmptyStars(rating: number): number[] {
    return Array(5 - rating).fill(0);
  }

  filterReviews(minRating: number): void {
    this.reviews = this.getAllReviews().filter(review => review.rating >= minRating);
  }

  private getAllReviews(): Review[] {
    // In a real app, this would fetch from an API
    return [
      {
        id: 1,
        clientName: 'John Doe',
        rating: 5,
        comment: 'Fast delivery and very polite delivery agent!',
        date: new Date('2025-05-01'),
        orderId: 'ORD-001'
      },
      {
        id: 2,
        clientName: 'Jane Smith',
        rating: 4,
        comment: 'Good service, would use again.',
        date: new Date('2025-04-29'),
        orderId: 'ORD-002'
      },
      {
        id: 3,
        clientName: 'Mike Johnson',
        rating: 3,
        comment: 'Delivery was a bit late, but the agent was very apologetic.',
        date: new Date('2025-04-28'),
        orderId: 'ORD-003'
      },
      {
        id: 4,
        clientName: 'Sarah Williams',
        rating: 5,
        comment: 'Excellent service! My package was handled with care.',
        date: new Date('2025-04-27'),
        orderId: 'ORD-004'
      }
    ];
  }
}
