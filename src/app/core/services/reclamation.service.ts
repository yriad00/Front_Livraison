import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MockDataService } from './mock-data.service';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  constructor(private mockDataService: MockDataService) {}

  getReclamations(): Observable<any[]> {
    return this.mockDataService.getReclamations();
  }

  getReclamationsByStatus(status: string): Observable<any[]> {
    return this.mockDataService.getReclamationsByStatus(status);
  }

  getReclamationById(id: number): Observable<any> {
    return this.mockDataService.getReclamationById(id);
  }

  submitReclamation(reclamationData: any): Observable<any> {
    // In a real application, this would make an HTTP request to the backend
    // For now, we'll simulate a successful submission
    const newReclamation = {
      id: Math.floor(Math.random() * 10000) + 3000,
      clientName: reclamationData.clientName || 'Current User',
      orderId: reclamationData.orderId,
      submissionDate: new Date(),
      status: 'new',
      issue: reclamationData.issueType,
      description: reclamationData.description
    };
    
    // Return the new reclamation as if it was saved on the server
    return of(newReclamation);
  }

  updateReclamationStatus(id: number, newStatus: string): Observable<any> {
    // In a real application, this would make an HTTP request to update the status
    // For now, we'll simulate a successful update
    return of({ success: true, id, newStatus });
  }
} 