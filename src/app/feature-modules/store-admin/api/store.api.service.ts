import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IBrand } from "@core/base-models/base/brands.model";
import { ColorOption } from "@core/base-models/base/ColorOption.model";
import { IProductCategory } from "@core/base-models/base/product-category.model";
import { APIExtender } from "@core/class/api/api-extender.class";
import { environment } from "@env/environment.development";
import { Paginator } from "@shared/component-classes/pagination/paginator.class";
import { Transformer } from "@shared/component-classes/transformation/transformer.class";
import { ILook, ILookResponse } from "@store/models/looks.model";
import { IProduct, IProductResponse, IProductSize } from "@store/models/product.model";
import { map, Observable, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class StoreApi extends APIExtender {

    storeId: string = '1c13d9e3-41a3-47c5-83ae-8785441c878b';

    getWalletProducts(page: number = 1, limit_per_page: number): Observable<IProduct[]>{
        return this.http.get<IProduct[]>(`${ environment.backend }/api/products/GET-ListOfProductsClient?id=${ this.storeId }`,
            { headers: this.headers }
        )
        .pipe(
            map((incomingProducts: IProduct[]) => {
                return Paginator.paginate(Transformer.products(incomingProducts), page, limit_per_page);
            })
        );
    }

    getProducts(page: number = 1, limit_per_page: number): Observable<IProductResponse>{
        return this.http.get<IProductResponse>(`${ environment.backend }/api/products/GET-ListOfProductsClient?id=${ this.storeId }&page=${ page }&page_size=${ limit_per_page }`,
            { headers: this.headers }
        )
        .pipe(
            map((incomingProducts: any) => {
                return {
                    total: incomingProducts.totalProductCount,
                    // products: Paginator.paginate(Transformer.products(incomingProducts.products), page, limit_per_page)
                    products: Transformer.products(incomingProducts.products)
                };
            })
        );
    }

    getProductById(id: string): Observable<any>{
        return this.http.get<IProduct[]>(`${ environment.backend }/api/products/GetProductById?id=${id}`,
            { headers: this.headers }
        )
    }

    addProduct(product: JSON): Observable<any>{
        return this.http.post(`${ environment.backend }/api/products/Product-Insert`, product, { headers: this.headers });
    }

    getPromotionProducts(page: number = 1, limit_per_page: number): Observable<IProduct[]>{
        return this.http.get<IProduct[]>(`api/products`).pipe(
            map((filteredProducts: IProduct[]) => {
                return filteredProducts.filter(product => product.promotion_price > 0) ?? []
            }),
            map((incomingProducts: IProduct[]) => {
                return Paginator.paginate(incomingProducts, page, limit_per_page);
            }),
        );
    }

    getFavoritesProducts(page: number = 1, limit_per_page: number): Observable<IProductResponse>{
        return this.http.get<IProductResponse>(`${ environment.backend }/api/products/GET-ListOfProductsClient?id=${ this.storeId }&page=${ page }`,
            { headers: this.headers }
        )
        .pipe(
            map((incoming: any) => {
                return {
                    total: incoming.totalProductCount,
                    products: Transformer.products(incoming.products)
                }
            }),
            map((filteredProducts: IProductResponse) => {
                return {
                    ...filteredProducts,
                    products: filteredProducts.products.filter(product => product.favoritesCount && product.favoritesCount > 0) ?? []
                }
            })
        );
    }
    
    getBrands(): Observable<IBrand[]>{
        return this.http.get<IBrand[]>(`${ environment.backend }/api/brands/all`, { headers: this.headers })
                        .pipe(
                            map((incoming: any[]) => Transformer.brands(incoming)),
                        );
    }

    getLooks(page: number, limit_per_page: number): Observable<ILookResponse>{
        return this.http.get<ILook[]>(`${ environment.backend }/api/LookApi/GetLookByUser?shop_id=${ this.storeId }&page=${ page }&page_size=${ limit_per_page }&sortColumn=created_at&order=desc`,
            { headers: this.headers }
        )
        .pipe(
            map((incomingLooks: any) => ({
                total: incomingLooks.look_count,
                looks: Transformer.looks(incomingLooks.looks)
            }))
        )
    }

    getLookById(id: string): Observable<ILook[]>{
        return this.http.get<ILook[]>(`${ environment.backend }/api/LookApi/GetByIdlookDetails?id=${ id }`, { headers: this.headers })
                        .pipe(
                            map((incoming: any) => Transformer.looks(incoming.looks))
                        )
    }

    publishLook(look: any): Observable<any>{
        const localHeaders = new HttpHeaders().set('Content-Type', 'text/json');
        return this.http.post(`${ environment.backend }/api/LookApi/InsertLook`, look, { headers: localHeaders });
    }

    editLook(look: any): Observable<any>{
        // console.log(look, look.look_id, look.user_id);
        const localHeaders = new HttpHeaders().set('Content-Type', 'text/json');
        return this.http.put(`${ environment.backend }/api/LookApi/UpdateLook?look_id=${ look.look_id }&user_id=${ look.user_id }`, look, { headers: localHeaders });
    }

    updateLookProducts(data: any): Observable<any>{
        const localHeaders = new HttpHeaders().set('Content-Type', 'text/json');
        return this.http.put(`${ environment.backend }/api/LookApi/ProductListUpdate`, data, { headers: localHeaders });
    }

    getCategories(): Observable<IProductCategory[]>{
        return this.http.get<IProductCategory[]>(`${ environment.backend }/api/categories/all`, { headers: this.headers })
                        .pipe(
                            map((incoming: any[]) => Transformer.categories(incoming))
                        );
    }

    getSizes(subcategory_id?: string): Observable<IProductSize[]>{
        const headers = new HttpHeaders().set('apiKey', environment.supabase_key);
        return this.http.get<IProductSize[]>(`${ environment.supabase_url }/rest/v1/Sizes`, { headers: headers }).pipe(
            map((incoming: any[]) => Transformer.sizes(incoming)),
            map(incoming => (subcategory_id) ? incoming.filter(size => size.subcategory_id === subcategory_id) : incoming)
        );
    }

    getColors(): Observable<ColorOption[]>{
        const headers = new HttpHeaders().set('apiKey', environment.supabase_key);
        return this.http.get<ColorOption[]>(`${ environment.supabase_url }/rest/v1/Colors`, { headers: headers }).pipe(
            map((incoming: any[]) => Transformer.colors(incoming))
        );
    }

    deleteLook(look: any): Observable<any>{
        const options = {
            body: look,
            headers: { 'Content-Type': 'application/json' }
        };
        return this.http.delete<any>(`${ environment.backend }/api/LookApi/DeleteLook`, options);
    }

    deleteProduct(product: IProduct){
        const options = {}
        return this.http.delete<any>(`${ environment.backend }/api/products/RemoveProduct?filename_image=${ (product.featureImages && product.featureImages.length > 0) ? product.featureImages[0].filename : null }&filename_coverimage=${ product.coverImageFilename ?? null }&filename_image_color=${ (product.colors && product.colors.length > 0) ? product.colors[0].filenameImage : null }&product_id=${ product.id }&userid=${ this.storeId }`, {headers: this.headers});
    }

}