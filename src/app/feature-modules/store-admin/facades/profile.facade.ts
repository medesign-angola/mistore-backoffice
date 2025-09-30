import { HttpStatusCode } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { User } from "@core/base-models/user/User";
import { AuthenticationService } from "@core/services/auth/authentication.service";
import { ProfileApi } from "@store/api/profile.api.service";
import { catchError, map, Observable, of, tap } from "rxjs";

@Injectable({
    providedIn: 'any'
})
export class ProfileFacade {
    private api = inject(ProfileApi);
    private authService = inject(AuthenticationService);

    get profile(): Observable<User | null>{
        return this.api.getProfile().pipe(
            tap(response => console.log),
            map(response => {
                if(!response){
                    return this.storedData()
                }
                return null
            })
        );
    }

    update(profile: any): Observable<any>{
        return this.api.updateProfile(profile).pipe();
    }

    private storedData(): User{
        return {
            Name: this.authService.getUserName(),
            Email: this.authService.getUserEmail(),
            Token: this.authService.getUserToken(),
            ShopMeta: {
                Id: this.authService.getUserShopId(),
                Shop: this.authService.getUserShopName(),
                Cover: this.authService.getUserShopCover(),
                Phone: this.authService.getUserShopPhone() ?? '',
                Profile: this.authService.getUserShopProfile(),
                Nif: this.authService.getUserShopNif(),
                Category: [],
                Location: [],
                Description: ""
            },
            RefreshToken: this.authService.getUserRefreshToken(),
            IsFirstAcess: this.authService.getIsFirstAcess(),
            id: this.authService.getUserId()
        }
    }
}