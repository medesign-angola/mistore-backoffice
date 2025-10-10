import { HttpHeaders, HttpStatusCode } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AuthModule } from "@auth/auth.module";
import { PasswordReset } from "@core/base-models/auth/PasswordReset";
import { UserLogin } from "@core/base-models/auth/UserLogin";
import { UserInterface } from "@core/base-models/base/user.model";
import { UUIDGenerator } from "@core/services/uuid-generator.service";
import { delay, Observable, of } from "rxjs";

@Injectable({ providedIn: 'any' })
export class Simulator{
    private MY_SIMULATED_PASS = 'cngvP';
    private MY_SIMULATED_RESET_PASSWORD_TOKEN = 'VtXcoymiZM05eMCR9QrbM7Z5AWEuI5W55Gpz5GfdbHioL7UTtCTzlkIY3eirRDw8';
    
    private users: UserInterface[] = [
        {
            Id: UUIDGenerator.generate(),
            Name: 'Isaquias Sebastião Marques',
            Email: 'is@example.com',
            ShopMeta: {
                Id: "1c13d9e3-41a3-47c5-83ae-8785441c878b",
                Shop: 'Isaquias\'Shop',
                Profile: '/assets/images/profile/profile.png',
                Cover: '/assets/images/profile/cover.jpg',
                Phone: '+244 000 000 000',
                Nif: '59392342134',
                Category: [ 'boutique', 'cosméticos' ],
                Location: [ 'Urbanização Nova Vida', 'Xyami Shopping' ],
                Description: 'A minha descrição é esta aqui!!'
            },
            Token: "",
            IsFirstAcess: false,
        }
    ];
    
    login(login: UserLogin): Observable<any>{
        const user = this.users.find(u => u.Email === login.email && login.password === this.MY_SIMULATED_PASS);
        if(user){
            return of({
                status: HttpStatusCode.Ok,
                data: {
                    ...user,
                    Token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30"
                }
            }).pipe(delay(2000));
        }

        return of({
            status: HttpStatusCode.Unauthorized,
            data: { message: 'Credenciais inválidas.' }
        }).pipe(delay(2000));
    }

    resetPassword(data: PasswordReset, options: any): Observable<any>{
        this.MY_SIMULATED_PASS = data.password;

        const headers = options.headers as HttpHeaders;
        const success = {
            status: HttpStatusCode.Ok,
            message: "password redifinida com êxito."
        }
        const failed = {
            status: HttpStatusCode.Forbidden,
            message: "invalid token."
        };

        const token = headers.get('authorization')?.split(" ")[1];

        return of(
            (token === this.MY_SIMULATED_RESET_PASSWORD_TOKEN) ? success : failed
        ).pipe(delay(2000));
    }

    logout(): Observable<any>{
        return of({
            status: HttpStatusCode.NoContent,
            message: "logout executed"
        }).pipe(delay(1000));
    }
}