import { inject, Injectable } from "@angular/core";
import { GenericApi } from "@core/api/generic.api.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'any'
})
export class ProfileApi {
    private store = inject(GenericApi);

    getProfile(): Observable<any>{
        return this.store.get(`api/profile?shop=${ this.store.getUserShopId }`);
    }
}