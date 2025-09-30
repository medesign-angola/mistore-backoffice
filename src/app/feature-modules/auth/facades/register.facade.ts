import { inject, Injectable } from "@angular/core";
import { AuthApi, UserRegister } from "@auth/api/api.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'any'
})
export class RegisterFacade{
    private api = inject(AuthApi);

    register(user: UserRegister): Observable<any>{
        return this.api.register(user);
    }
}