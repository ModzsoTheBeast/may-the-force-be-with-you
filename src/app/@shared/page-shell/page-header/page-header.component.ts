import { Component, Input, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@app/@shared/services/auth.service';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeaderComponent {
  authService: AuthService = inject(AuthService);
  user = this.authService.user;

  logout(): void {
    this.authService.logout()
  }
}
