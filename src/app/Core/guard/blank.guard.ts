import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

export const blankGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);
  const _AuthService = inject(AuthService);
  const data = _AuthService.decodeUserData();
  if (data?.role == 'CaregiverUser') {
    _Router.navigate(['/orders']);
    return false;
  } 
   else if (data?.role == 'AdminUser') {
     _Router.navigate(['/admin-dashboard']);
     return false;
   } else {
     return true;
   }
};
