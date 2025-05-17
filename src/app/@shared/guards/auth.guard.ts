import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';

export const authGuard: CanActivateFn = (): boolean | UrlTree => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  if (!!authService.getAuthToken()) {
    return true;
  }

  console.warn('You don`t have access for this page! Please log in before.');

  return router.createUrlTree(['/login']);
};
