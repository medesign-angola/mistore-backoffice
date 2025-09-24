import { inject, Injectable } from "@angular/core";
import { AuthApi } from "@auth/api/api.service";
import { AuthModule } from "@auth/auth.module";
import { UserLogin } from "@core/base-models/auth/UserLogin";
import { Observable } from "rxjs";

@Injectable({
    providedIn: AuthModule
})
export class LoginFacade {
    private api = inject(AuthApi);

    login(user: UserLogin): Observable<any>{
        return this.api.login(user).pipe();
    }
}