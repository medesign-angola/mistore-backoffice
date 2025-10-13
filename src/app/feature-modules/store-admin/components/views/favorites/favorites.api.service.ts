import { inject, Injectable } from "@angular/core";
import { GenericApi } from "@core/api/generic.api.service";
import { Paginator } from "@shared/component-classes/pagination/paginator.class";
import { IProduct, IProductResponse } from "@store/models/product.model";
import { Observable, map } from "rxjs";
import { HttpStatusCode } from "@angular/common/http";
import { FavoriteSimulator } from "./simulator.service";
import { FavoriteFacade } from "./favorites.facade";
import { Transformer } from "@shared/component-classes/transformation/transformer.class";

@Injectable({
    providedIn: FavoriteFacade
})
export class FavoriteService {
    private api = inject(GenericApi);
    private simulator = inject(FavoriteSimulator);

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

    products(page: number = 1, limit_per_page: number): Observable<IProductResponse>{
        return this.api.get<IProduct[]>(`api/products/GET-ListOfProductsClient?id=${ this.api.getUserShopId }`)
        .pipe(
            map((incoming: any) => 
                ({
                    total: (incoming) ? incoming.totalProductCount : 0,
                    products: Transformer.products((incoming) ? incoming.products : [])
                })
            ),
            map((filteredProducts: IProductResponse) => {
                return {
                    ...filteredProducts,
                    products: filteredProducts.products.filter(product => product.favoritesCount && product.favoritesCount > 0) ?? []
                }
            })
        );
    }
}