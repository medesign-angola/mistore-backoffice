import { inject, Injectable } from "@angular/core";
import { SizesApiService } from "@store/api/sizes.api.service";
import { IProductSize } from "@store/models/product.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SizeFacade{
    private api = inject(SizesApiService);

    all(): Observable<IProductSize[]>{
        return this.api.getSizes();
    }

    sizesOfSubcategory(subcategory_id: string): Observable<IProductSize[]>{
        return this.api.getSizes(subcategory_id);
    }
}