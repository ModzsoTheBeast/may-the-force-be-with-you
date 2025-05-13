import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { environment } from '@env/environment';
import { inject } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';
import { Observable } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  // Inject the current `AuthService` and use it to get an authentication token:
  const authToken: string | null = inject(AuthService).getAuthToken();

  let headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Applicant-Id': environment.applicantId,
  };

  if (authToken) {
    headers['Application-Authorization'] = `Bearer ${authToken}`;
  }

  // Clone the request to add the headers
  const clonedReq: HttpRequest<unknown> = req.clone({
    setHeaders: headers,
  });

  return next(clonedReq);
};
