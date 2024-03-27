import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

export const nurseGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);
  const _AuthService = inject(AuthService);
  const data = _AuthService.decodeUserData();
  if (data?.role != 'CaregiverUser' || localStorage.getItem('etoken') == null) {
    _Router.navigate(['/home']);
    return false;
  }  
  else {
    return true;
  }
};
