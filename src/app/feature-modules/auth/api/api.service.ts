import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserLogin } from "@core/base-models/auth/UserLogin";
import { environment } from "@env/environment.development";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService{
    constructor (private http: HttpClient) {}

    register(user: UserRegister): Observable<any> {
        return this.http.post(`${ environment.backend }/api/ShopApi/RegisterShop`, {
            fullname: user.name,
            
        }, { observe: 'response' }).pipe();
    }

    login(user: UserLogin): Observable<any> {
        return this.http.post(`${ environment.backend }/api/login`, user, { observe: 'response' });
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