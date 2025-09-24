import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '@core/services/auth/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ClientAuthGuard implements CanActivateChild {

  authService = inject(AuthenticationService);

  constructor(
    private router: Router,
  ) {}

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    const token = this.authService.getUserToken();
    const isFirstAcess = this.authService.getIsFirstAcess();

    if(token && !isFirstAcess){
      return true;
    }

    else if(token && isFirstAcess){
      // this.router.navigate(['autenticacao/primeira-vez']);
      return true;
    }

    else {
      this.router.navigate(['/auth/sign-in']);
      return false;
    }
  }

}