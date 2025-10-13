import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { IProduct } from "@store/models/product.model";
import { PromotionsComponent } from "./promotions.component";
import { PromotionService } from "./promotions.api.service";

@Injectable({
    providedIn: PromotionsComponent
})
export class PromotionFacade{

    private api = inject(PromotionService);

    products(page: number, limit: number): Observable<IProduct[]>{
        return this.api.products(page, limit);
    }

    get statistics(): Observable<any>{
        return this.api.getStatistics();
    }

}