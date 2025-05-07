import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class UnauthorizedComponent {
  constructor() {}
} 