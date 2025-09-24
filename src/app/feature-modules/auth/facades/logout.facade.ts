import { HttpStatusCode } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AuthApi } from "@auth/api/api.service";
import { AuthenticationService } from "@core/services/auth/authentication.service";
import { map, Observable } from "rxjs";

@Injectable({
    providedIn: 'any'
})
export class LogoutFacade {
    private api = inject(AuthApi);
    private authService = inject(AuthenticationService);

    logout(): Observable<any>{
        return this.api.logout().pipe(
            map(response => {
                if(response.status === HttpStatusCode.NoContent){
                    this.authService.cleanAuthenticationDataFromLocalStorage()
                }
                return response
            })
        );
    }
}