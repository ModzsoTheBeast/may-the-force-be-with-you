import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '@env/environment';
import { AuthResponse, LoginDetails } from '@app/@types';
import { catchError, Observable, of, tap } from 'rxjs';
import { AUTH_MOCK } from './mocks/auth.mock';
import { MockDataService } from './mock-data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly API_URL: string = `${environment.apiUrl}authentication/`;
  private currentUserData: WritableSignal<AuthResponse | undefined> = signal<
    AuthResponse | undefined
  >(undefined);
  private readonly mockDataService = inject(MockDataService);

  login(userDetails: LoginDetails): Observable<AuthResponse | undefined> {
    return this.http.post<AuthResponse>(this.API_URL, userDetails).pipe(
      tap((result: AuthResponse) => this.currentUserData.set(result)),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.warn('Auth failed with 401, using mock data instead');
          this.mockDataService.enableMockData();
          this.currentUserData.set(AUTH_MOCK);
          return of(AUTH_MOCK);
        }
        throw error;
      })
    );
  }

  getAuthToken(): string | null {
    // If we're using mock data, return the mock token
    if (this.mockDataService.useMockData) {
      return AUTH_MOCK.token;
    }

    const userData: AuthResponse | undefined = this.currentUserData();
    if (!userData) return null;
    return userData.token;
  }
}
