import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface User {
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss',
})
export class PageHeaderComponent {
  user?: User;

  // This method would typically be connected to an auth service
  logout(): void {
    console.log('Logout clicked');
    // Implement actual logout functionality here
  }
}
