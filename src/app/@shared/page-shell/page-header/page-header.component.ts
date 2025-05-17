import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '@app/@shared/services/auth.service';
import { DynamicButtonComponent } from '@shared/dynamic-button/dynamic-button.component';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule, DynamicButtonComponent],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeaderComponent {
  authService: AuthService = inject(AuthService);
  user = this.authService.user;

  logout(): void {
    this.authService.logout();
  }
}
