import {Component, inject} from '@angular/core';
import { RouterModule } from '@angular/router';
import {AuthService} from '@shared/services/auth.service';
import {FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {LoginForm} from '@app/@types';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly authService: AuthService = inject(AuthService);

  validators: ValidatorFn[] = [Validators.required, Validators.minLength(3)];

  loginForm: FormGroup<LoginForm> = new FormGroup<LoginForm>({
    username: new FormControl<string>('', {nonNullable: true, validators: this.validators}),
    password: new FormControl<string>('', {nonNullable: true, validators: this.validators}),
  });

  login$ = this.authService.login({username: '', password: ''})
  login(){
  }
}
