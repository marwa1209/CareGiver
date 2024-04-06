import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const reservationGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);
  if (localStorage.getItem('etoken') == null) {
    _Router.navigate(['/signin']);
    return false;
  } else {
    return true;
  }
};
