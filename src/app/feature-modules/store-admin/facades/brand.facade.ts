import { inject, Injectable } from "@angular/core";
import { IBrand } from "@core/base-models/base/brands.model";
import { BrandsApiService } from "@store/api/brands.api.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class BrandFacade{
    api = inject(BrandsApiService);

    get brands(): Observable<IBrand[]>{
        return this.api.getBrands();
    }
}