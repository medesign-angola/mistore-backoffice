import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AuthModule } from "@auth/auth.module";
import { Simulator } from "@auth/services/simulator.service";
import { GenericApi } from "@core/api/generic.api.service";
import { PasswordReset } from "@core/base-models/auth/PasswordReset";
import { UserLogin } from "@core/base-models/auth/UserLogin";
import { AuthenticationService } from "@core/services/auth/authentication.service";
import { environment } from "@env/environment.development";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'any'
})
export class AuthApi{

    api = inject(GenericApi);
    authService = inject(AuthenticationService);
    private simulator = inject(Simulator);

    register(user: UserRegister): Observable<any> {
        return this.api.post<any>(`api/ShopApi/RegisterShop`, {
            fullname: user.name,

        }, { observe: 'response' }).pipe();
    }

    login(user: UserLogin): Observable<any> {
        // return this.api.post(`api/login`, user, { observe: 'response' })
        return this.simulator.login(user);
    }

    logout(): Observable<any>{
        return this.simulator.logout();
    }

    requestResetingLink(email: string): Observable<any>{
        return this.api.post<any>(`api/password-reseting`, { email });
    }

    resetPassword(data: PasswordReset): Observable<any>{
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.authService.getResetUserPasswordToken() 
        });

        // return this.api.post<any>(`api/password-reset`, data.toObject(), { headers });
        return this.simulator.resetPassword(data, { headers })
    }
}

export interface UserRegister{
    name: string,
    email: string,
    nif: string,
    phone: string,
    password: string,
    password_confirmation: string,
    type: string,
    location: string,
    description: string,
    profile: {
        name?: string,
        encoded: string
    },
    cover: {
        name?: string,
        encoded: string
    }
}