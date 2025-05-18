import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '@env/environment';
import { AuthService } from '@shared/services/auth.service';
import { Observable } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const authToken: string | null = inject(AuthService).getAuthToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Applicant-Id': environment.applicantId,
  };

  if (authToken) {
    headers['Application-Authorization'] = `Bearer ${authToken}`;
  }

  const clonedReq: HttpRequest<unknown> = req.clone({
    setHeaders: headers,
  });

  return next(clonedReq);
};
