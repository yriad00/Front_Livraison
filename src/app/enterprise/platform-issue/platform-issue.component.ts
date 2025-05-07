import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-platform-issue',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './platform-issue.component.html',
  styleUrls: ['./platform-issue.component.scss']
})
export class PlatformIssueComponent {
  showForm = true;
  issue = '';
  description = '';
  submitted = false;

  submitIssue() {
    if (this.issue && this.description) {
      // TODO: Send to backend or service
      this.submitted = true;
      this.showForm = false;
    }
  }

  resetForm() {
    this.showForm = true;
    this.submitted = false;
    this.issue = '';
    this.description = '';
  }
}
