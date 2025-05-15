import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '@env/environment';
import { AuthResponse, LoginDetails } from '@app/@types';
import { catchError, Observable, of, tap } from 'rxjs';
import { AUTH_MOCK } from './mocks/auth.mock';
import { MockDataService } from './mock-data.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly router: Router = inject(Router);
  private readonly API_URL: string = `${environment.apiUrl}authentication/`;
  private currentUserData: WritableSignal<AuthResponse | undefined> = signal<
    AuthResponse | undefined
  >(undefined);
  private readonly mockDataService: MockDataService = inject(MockDataService);

  user = computed(()=>{
    return this.currentUserData()?.user
  })

  login(userDetails: LoginDetails): Observable<AuthResponse | undefined> {
    return this.http.post<AuthResponse>(this.API_URL, userDetails).pipe(
      tap((result: AuthResponse): void => this.currentUserData.set(result)),
      catchError((error: HttpErrorResponse): Observable<AuthResponse | undefined> => {
        if (error.status === 401 || error.status === 0) {
          console.warn(`Auth failed with ${error.status}, using mock data instead`);
          this.currentUserData.set(AUTH_MOCK);
          this.mockDataService.enableMockData();
          return of(this.currentUserData());
        }
        throw error;
      })
    );
  }

  getAuthToken(): string | null {
    const userData: AuthResponse | undefined = this.currentUserData();
    console.log(userData)
    if (!userData) return null;
    return userData.token;
  }

  logout() {
    this.currentUserData.set(undefined)
    this.router.navigate(['login'])
  }
}
