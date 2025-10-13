import { inject, Injectable } from "@angular/core";
import { WalletFacade } from "./wallet.facade";
import { GenericApi } from "@core/api/generic.api.service";
import { Paginator } from "@shared/component-classes/pagination/paginator.class";
import { Transformer } from "@shared/component-classes/transformation/transformer.class";
import { IProduct } from "@store/models/product.model";
import { Observable, map } from "rxjs";
import { WalletSimulator } from "./simulator.service";
import { HttpStatusCode } from "@angular/common/http";

@Injectable({
    providedIn: WalletFacade
})
export class WalletService {
    private api = inject(GenericApi);
    private simulator = inject(WalletSimulator);

    getStatistics(): Observable<any>{
        // return this.api.get(`api/get-store-dashboard-widgets-data`);
        return this.simulator.getStatistics().pipe(
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
            map((incomingProducts: any) => {
                return Paginator.paginate(Transformer.products(incomingProducts ?? []), page, limit_per_page);
            })
        );
    }
}