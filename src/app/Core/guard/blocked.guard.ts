import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { inject } from '@angular/core';

export const blockedGuard: CanActivateFn = (route, state) => {
    const _Router = inject(Router);
    const _AuthService = inject(AuthService);
    const data = _AuthService.decodeUserData();
    if (
      localStorage.getItem('etoken') != null &&
      data.Status &&
      data.Status !== 'blocked'
    ) {
      _Router.navigate(['/']);
      return false;
    } else {
      return true;
    }
};
