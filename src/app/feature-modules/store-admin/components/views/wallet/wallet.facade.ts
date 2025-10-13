import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { WalletComponent } from "./wallet.component";
import { IProduct } from "@store/models/product.model";
import { WalletService } from "./wallet.api.service";

@Injectable({
    providedIn: WalletComponent
})
export class WalletFacade{

    private api = inject(WalletService);

    products(page: number, limit: number): Observable<IProduct[]>{
        return this.api.products(page, limit);
    }

    get statistics(): Observable<any>{
        return this.api.getStatistics();
    }

}