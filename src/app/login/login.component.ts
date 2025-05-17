import { AsyncPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { isMobile, ScreenSize, screenSizeObservable } from '@app/@shared';
import { AuthResponse, LoginForm } from '@app/@types';
import { AuthService } from '@shared/services/auth.service';

import { DynamicButtonComponent } from '../@shared/dynamic-button/dynamic-button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    DynamicButtonComponent,
    AsyncPipe,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  validators: ValidatorFn[] = [Validators.required, Validators.minLength(3)];
  loginForm: FormGroup<LoginForm> = new FormGroup<LoginForm>({
    username: new FormControl<string>('', {
      nonNullable: true,
      validators: [...this.validators, Validators.email],
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: this.validators,
    }),
  });

  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService
      .login({
        username: this.loginForm.controls.username.value,
        password: this.loginForm.controls.password.value,
      })
      .subscribe({
        next: (value: AuthResponse | undefined): void => {
          if (value) {
            this.router.navigate(['character-select']);
          } else {
            console.warn('something went wrong!');
          }
        },
        error: (err: HttpErrorResponse) => {
          console.error(err.message);
          this.router.navigate(['character-select']);
        },
      });
  }

  protected readonly isMobile = isMobile;
  protected readonly screenSizeObservable = screenSizeObservable;
  protected readonly ScreenSize = ScreenSize;
}
