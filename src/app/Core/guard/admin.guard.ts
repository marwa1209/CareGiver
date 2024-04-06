import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
    const _Router = inject(Router);
    const _AuthService = inject(AuthService);
    const data = _AuthService.decodeUserData();
    if (data?.role != 'AdminUser' || localStorage.getItem('etoken') == null) {
      _Router.navigate(['/']);
      return false;
    } else {
      return true;
    }
};
