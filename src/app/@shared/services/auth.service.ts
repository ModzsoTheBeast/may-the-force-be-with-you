import {Injectable, Signal} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '@env/environment';
import { AuthResponse, LoginDetails } from '@app/@types';
import {toSignal} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly API_URL: string = `${environment.apiUrl}authentication/`;

  login(userDetails: LoginDetails): Signal<AuthResponse | undefined> {
    return toSignal<AuthResponse>(this.http.post<AuthResponse>(this.API_URL, userDetails));
  }

  getAuthToken(): string | null {
    return null
  }
}
