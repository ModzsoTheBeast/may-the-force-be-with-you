import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';
import {AuthResponse, LoginDetails} from '@app/@types';
import {Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly API_URL: string = `${environment.apiUrl}authentication/`;
  private currentUserData: WritableSignal<AuthResponse | undefined> = signal<AuthResponse | undefined>(undefined)

  login(userDetails: LoginDetails): Observable<AuthResponse | undefined> {
    // const authResponse: Signal<AuthResponse | undefined> = toSignal<AuthResponse>(response$)
    // if (authResponse()) {
    //   this.currentUserData.set(authResponse())
    // }
    return this.http.post<AuthResponse>(this.API_URL, userDetails).pipe(
      tap((result: AuthResponse) => this.currentUserData.set(result))
    )
  }

  getAuthToken(): string | null {
    const userData: AuthResponse | undefined = this.currentUserData();
    if (!userData) return null
    return userData.token
  }
}
