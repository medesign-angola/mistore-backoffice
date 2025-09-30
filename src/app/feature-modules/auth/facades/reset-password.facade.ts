import { inject, Injectable } from "@angular/core";
import { AuthApi } from "@auth/api/api.service";
import { PasswordReset } from "@core/base-models/auth/PasswordReset";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'any'
})
export class ResetPasswordFacade{
    private api = inject(AuthApi);

    requestResetingLink(email: string): Observable<any>{
        return this.api.requestResetingLink(email).pipe();
    }

    resetPassword(data: PasswordReset): Observable<any>{
        return this.api.resetPassword(data);
    }
}