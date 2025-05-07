import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-import-orders',
  templateUrl: './import-orders.component.html',
  styleUrls: ['./import-orders.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class ImportOrdersComponent {
  selectedFile: File | null = null;
  importMethod: 'csv' | 'manual' | 'api' = 'csv';
  isUploading = false;
  
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
  
  importOrders(): void {
    if (this.importMethod === 'csv' && this.selectedFile) {
      this.isUploading = true;
      // Mock upload for demonstration
      setTimeout(() => {
        console.log('File imported:', this.selectedFile);
        this.isUploading = false;
        alert('Orders imported successfully!');
        this.selectedFile = null;
      }, 2000);
    }
  }
} 