import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const userGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const toast: ToastrService = inject(ToastrService);

  let tokenCheck: boolean = false;
  function checkToken(): void {
    if (localStorage.getItem('Token')) tokenCheck = true;
  }
  checkToken();

  if (tokenCheck) {
    return true;
  } else {
    router.navigate(['/user/login']);
    toast.error('Please login');
    return false;
  }
};
