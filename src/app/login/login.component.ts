import {Component, inject} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {AuthService} from '@shared/services/auth.service';
import {FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators} from '@angular/forms';
import {LoginForm} from '@app/@types';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
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

  login(): void{
    this.authService.login(
      {
        username: this.loginForm.controls.username.value,
        password: this.loginForm.controls.password.value
      }
    ).subscribe({
      next: value => {
        if (value){
          console.log(value)
        }else{
          console.log("sad")
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.message)
      }
    })
  }
}

