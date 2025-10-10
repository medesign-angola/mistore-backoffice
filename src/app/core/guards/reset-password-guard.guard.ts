import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '@core/services/auth/authentication.service';

export const ResetPasswordGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthenticationService);
  const router = inject(Router);
  authService.setResetUserPasswordToken(route.params['token']);

  return authService.getResetUserPasswordToken() ? true : router.navigate(['/auth/sign-in']);
};
