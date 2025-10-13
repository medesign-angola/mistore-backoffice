import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { IProduct, IProductResponse } from "@store/models/product.model";
import { FavoritesComponent } from "./favorites.component";
import { FavoriteService } from "./favorites.api.service";

@Injectable({
    providedIn: FavoritesComponent
})
export class FavoriteFacade{

    private api = inject(FavoriteService);

    products(page: number, limit: number): Observable<IProductResponse>{
        return this.api.products(page, limit);
    }

    get statistics(): Observable<any>{
        return this.api.getStatistics();
    }

}