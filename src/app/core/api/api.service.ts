import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IProduct } from "@store/models/product.model";
import { Observable, map } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ApiService{

    constructor(private http: HttpClient) { }

    getWalletProducts(page: number = 1, limit_per_page: number): Observable<IProduct[]>{
        const startIndex = (page - 1) * limit_per_page;
        const endIndex = startIndex + (limit_per_page - 1);

        return this.http.get<IProduct[]>(`api/products`).pipe(
            map((incomingProducts: IProduct[]) => {
                return incomingProducts.slice(startIndex, endIndex + 1)
            })
        );
    }
}