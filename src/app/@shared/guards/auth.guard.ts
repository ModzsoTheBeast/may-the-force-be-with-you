import {ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '@shared/services/auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  const authService: AuthService = inject(AuthService);

  return !!authService.getAuthToken();
};
