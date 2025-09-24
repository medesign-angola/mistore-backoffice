import { HttpStatusCode } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AuthModule } from "@auth/auth.module";
import { UserLogin } from "@core/base-models/auth/UserLogin";
import { UserInterface } from "@core/base-models/base/user.model";
import { UUIDGenerator } from "@core/services/uuid-generator.service";
import { delay, Observable, of } from "rxjs";

@Injectable({ providedIn: 'any' })
export class Simulator{
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
        const user = this.users.find(u => u.Email === login.email && login.password === 'cngvP');
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

    logout(): Observable<any>{
        return of({
            status: HttpStatusCode.NoContent,
            message: "logout executed"
        }).pipe(delay(1000));
    }
}