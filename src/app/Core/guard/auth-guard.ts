import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
//on reserve only
export const authGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);
  if (localStorage.getItem('etoken') != null) {
    _Router.navigate(['/home']);
    return true;
  }
   else {
    return true;
  }
};
