import { inject, Injectable } from "@angular/core";
import { GenericApi } from "@core/api/generic.api.service";
import { environment } from "@env/environment.development";
import { Paginator } from "@shared/component-classes/pagination/paginator.class";
import { Transformer } from "@shared/component-classes/transformation/transformer.class";
import { IProduct, IProductResponse } from "@store/models/product.model";
import { map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ProductApiService{
    
    private api = inject(GenericApi);

    getFavoritesProducts(page: number = 1, limit_per_page: number): Observable<IProductResponse>{
        return this.api.get<IProductResponse>(`${ environment.backend }/api/products/GET-ListOfProductsClient?id=${ this.api.getUserShopId }&page=${ page }`)
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

    getProducts(page: number = 1, limit_per_page: number): Observable<IProductResponse>{
        return this.api.get<IProductResponse>(`api/products/getallproductsbyshop?id=${ this.api.getUserShopId }&page=${ page }&page_size=${ limit_per_page }&sortColumn=create_date&order=desc`)
        .pipe(
            map((incomingProducts: any) => 
                ({
                    total: (incomingProducts) ? incomingProducts.totalProductCount : [],
                    products: Transformer.products((incomingProducts) ? incomingProducts.products : [])
                })
            )
        );
    }

    getProductById(id: string): Observable<any>{
        return this.api.get<IProduct[]>(`api/products/GetProductById?id=${id}`)
        .pipe(
            map((products) => Transformer.products( (products) ? [products] : [])[0])
        )
    }

    createProductStock(data: any): Observable<any>{
        return this.api.post<any>(`api/StockApi`, data);
    }

    addProduct(product: JSON): Observable<any>{
        return this.api.post(`api/products/Product-Insert`, product);
    }

    editProduct(product: any): Observable<any>{
        return this.api.patch<any>(`api/products/Updateproduct`, product);
    }

    productColor(data: any): Observable<any>{
        return this.api.post<any>(`api/ProductColor`, data);
    }

    productImage(data: any): Observable<any>{
        return this.api.put<any>(`api/ProductImage/update`, data);
    }

    productDiscount(data: any): Observable<any>{
        return this.api.post<any>(`api/Discount`, data);
    }

    updateProductStock(data: any, stockId: string): Observable<any>{
        return this.api.put<any>(`api/StockApi/${ stockId }`, data);
    }

    deleteProduct(product: IProduct){
        const url = this.buildDeleteProductQuery(product);
        return this.api.delete<any>(url);
    }

    private buildDeleteProductQuery(product: IProduct): string {
        const params = new URLSearchParams();

        // Imagem principal (primeiro feature image, se existir)
        const featureImage = product.featureImages?.[0]?.filename ?? null;
        if (featureImage) params.append('filename_image', featureImage);

        // Imagem de capa
        if (product.coverImageFilename) {
            params.append('filename_coverimage', product.coverImageFilename);
        }

        // Imagem de cor (primeira cor, se existir)
        const colorImage = product.colors?.[0]?.filenameImage ?? null;
        if (colorImage) params.append('filename_image_color', colorImage);

        // IDs obrigatórios
        params.append('product_id', product.id);
        params.append('userid', this.api.getUserShopId);

        return `api/products/RemoveProduct?${params.toString()}`;
    }

}