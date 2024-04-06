import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

export const pendingGuard: CanActivateFn = (route, state) => {
     const _Router = inject(Router);
     const _AuthService = inject(AuthService);
     const data = _AuthService.decodeUserData();
     if (
       localStorage.getItem('etoken') != null &&
       data.Status &&
       data.Status !== 'pending'
     ) {
       _Router.navigate(['/']);
       return false;
     } else {
       return true;
     }
};
