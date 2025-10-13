import { inject, Injectable } from "@angular/core";
import { GenericApi } from "@core/api/generic.api.service";
import { Paginator } from "@shared/component-classes/pagination/paginator.class";
import { Transformer } from "@shared/component-classes/transformation/transformer.class";
import { IProduct } from "@store/models/product.model";
import { Observable, map } from "rxjs";
import { HttpStatusCode } from "@angular/common/http";
import { PromotionFacade } from "./promotion.facade";
import { PromotionSimulator } from "./simulator.service";

@Injectable({
    providedIn: PromotionFacade
})
export class PromotionService {
    private api = inject(GenericApi);
    private simulator = inject(PromotionSimulator);

    getStatistics(): Observable<any>{
        // return this.api.get(`api/get-store-dashboard-widgets-data`);
        return this.simulator.getStatistics()
        .pipe(
            map(response => {
                if(response.status === HttpStatusCode.Ok){
                    // response.data.
                }

                return response;
            }),
        );
    }

    products(page: number = 1, limit_per_page: number): Observable<IProduct[]>{
        return this.api.get<IProduct[]>(`api/products/GET-ListOfProductsClient?id=${ this.api.getUserShopId }`)
        .pipe(
            map((incoming: any) => incoming ?? []),
            map((filteredProducts: IProduct[]) => {
                return filteredProducts.filter(product => product.promotion_price > 0) ?? []
            }),
            map((incomingProducts: IProduct[]) => {
                return Paginator.paginate(incomingProducts, page, limit_per_page);
            }),
        );
    }
}